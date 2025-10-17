import numpy as np
import pandas as pd
#import requests
import lxml.html as lh
from bs4 import BeautifulSoup
import cloudscraper
import re
import sqlite3
import time
import unicodedata



regestring = r"^(.+?)\s+([A-Z]{2,}(?:\s+[A-Z]{2,})*)$"

con = sqlite3.connect("botDB.db")
cur = con.cursor()


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'}
    
baseurl = "https://sofifa.com/players"
colModifiders = "?type=all&lg%5B0%5D=13&lg%5B1%5D=31&lg%5B2%5D=53&lg%5B3%5D=19&lg%5B4%5D=16&lg%5B5%5D=14&lg%5B6%5D=60&lg%5B7%5D=61&lg%5B8%5D=32&lg%5B9%5D=54&lg%5B10%5D=10&lg%5B11%5D=17&lg%5B12%5D=308&lg%5B13%5D=4&lg%5B14%5D=319&lg%5B15%5D=41&lg%5B16%5D=1&lg%5B17%5D=68&lg%5B18%5D=63&lg%5B19%5D=50&lg%5B20%5D=189&lg%5B21%5D=80&lg%5B22%5D=66&lg%5B23%5D=56&lg%5B24%5D=64&lg%5B25%5D=332&lg%5B26%5D=317&lg%5B27%5D=318&lg%5B28%5D=313&lg%5B29%5D=65&lg%5B30%5D=330&lg%5B31%5D=322&lg%5B32%5D=338&lg%5B33%5D=2018&lg%5B34%5D=2017&lg%5B35%5D=337&lg%5B36%5D=353&lg%5B37%5D=2019&lg%5B38%5D=2020&lg%5B39%5D=39&lg%5B40%5D=350&lg%5B41%5D=83&lg%5B42%5D=335&lg%5B43%5D=2013&lg%5B44%5D=351&lg%5B45%5D=2012&lg%5B46%5D=336&lg%5B47%5D=2076&lg%5B48%5D=20&lg%5B49%5D=2149&showCol%5B%5D=ae&showCol%5B%5D=hi&showCol%5B%5D=wi&showCol%5B%5D=oa&showCol%5B%5D=cr&showCol%5B%5D=fi&showCol%5B%5D=he&showCol%5B%5D=ju&showCol%5B%5D=pe&showCol%5B%5D=wk&showCol%5B%5D=sk&showCol%5B%5D=pas&showCol%5B%5D=def"
addon = "&offset="
#maxOffset = 18420
maxOffsetNoBrazilians = 18060
#noOfPlayers = 18453
startingurl = baseurl + colModifiders + addon
scraper = cloudscraper.create_scraper() 
count = 0
while count <= maxOffsetNoBrazilians:
    time.sleep(3)
    finalurl = startingurl + str(count)
    print("Player count:" + str(count))
    playerTeamMateRequest = scraper.get(finalurl, headers=headers)
    #playerTeamMateRequest = requests.get(baseurl, headers=headers)
    soup1 = BeautifulSoup(playerTeamMateRequest.content, 'lxml')
    soup1.prettify()
    table = soup1.find("table")
    table_body = table.find('tbody')
    data = []
    rows = table_body.find_all('tr')
    for row in rows:
        #print(row)
        cols = row.find_all('td')

        #Getting Nation
        imgElm = row.find('img',{'class':'flag'})
        imgURL = imgElm.get('data-src')
        countryAbbreviation = (imgURL.split('/')[-1]).split('.')[0]

        #Splitting Name and Position
        line = unicodedata.normalize("NFC", cols[1].text.strip())
        match = re.match(regestring, line.strip())

        #print(cols[1].text)
        #print(match)

        #Stripping all spaces
        cols = [ele.text.strip() for ele in cols]

        cols[4] = cols[4].split('\n')[0]
        cols[5] = cols[5].split('cm')[0]
        cols[6] = cols[6].split('kg')[0]

        cols[1] = match.group(1)
        position = match.group(2)
        attacking = '0'
        if position[0]=='S' and position[1]=='T':
            attacking = cols[3]
        cols.append(attacking)
        cols.append(countryAbbreviation)
        cols.insert(2,position)
        #print(cols)
        colsCounter = 0
        while colsCounter < len(cols):
            if "+" in cols[colsCounter]:
                #print(cols[colsCounter])
                cols[colsCounter] = cols[colsCounter].split("+")[0]
            colsCounter+=1
        data.append([ele for ele in cols if ele]) # Get rid of empty values

    #print(data)

    cur.executemany("INSERT INTO Players(PlayerName,Position,Age,Rating,Team,Height,Weight,Crossing,Finishing,Heading,Jumping,Penalties,WeakFoot,SkillMoves,Passing,Defending,Attacking,Country) VALUES(?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)", data)
    con.commit()
    count+= 60