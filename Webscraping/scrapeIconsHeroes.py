from bs4 import BeautifulSoup
from bs4.element import PageElement, Tag, NavigableString
import cloudscraper
import sqlite3
import time

con = sqlite3.connect("botDB.db")
cur = con.cursor()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
}
    
domainUrl = "https://futbin.com"
path = "/players"
params = "?showStats=Age%2CWeight%2CFinishing%2CPenalties%2CCrossing%2CHeadingaccuracy%2CJumping&version=icons%2Cheroes&page="
#maxOffset = 18420
#noOfPlayers = 18453
startingurl = domainUrl + path + params
scraper = cloudscraper.create_scraper() 
count = 0
num_pages = 7

def getPlayerName(player: Tag):
    return player.select_one('.table-player-name').get_text()

def getCardTypeID(player: Tag):
    cardType = player.select_one('.table-name .table-player-revision').get_text()
    if(cardType == 'Icon'):
        return 5
    return 4

def getPosition(player: Tag):
    positions = player.select_one('.table-pos-main span').get_text()
    secondPos = player.select_one('.table-pos .xs-font')
    if(secondPos):
        for pos in secondPos.get_text().split(", "):
            positions += (" " + pos)
    return positions

def getAge(player: Tag):
    return player.select_one('.table-age').get_text()

def getRating(player: Tag):
    return player.select_one('.table-rating .rating-square').get_text()

def getLeague(player: Tag):
    return player.select_one('.table-player-league img').get('title')

def getTeam(player: Tag):
    cardType = player.select_one('.table-name .table-player-revision').get_text()
    if(cardType == 'Icon'):
        return cardType
    return 'Hero'

def getHeight(player: Tag):
    return player.select_one('.table-height .text-center').get_text().split('| ')[0].split('cm')[0]

def getWeight(player: Tag):
    return player.select_one('.table-weight').get_text().split('kg')[0]

def getCrossing(player: Tag):
    return player.select('.table-sub-stats .table-key-stats')[2].get_text()

def getFinishing(player: Tag):
    return player.select('.table-sub-stats .table-key-stats')[0].get_text()

def getHeading(player: Tag):
    return player.select('.table-sub-stats .table-key-stats')[3].get_text()

def getJumping(player: Tag):
    return player.select('.table-sub-stats .table-key-stats')[4].get_text()

def getPenalties(player: Tag):
    return player.select('.table-sub-stats .table-key-stats')[1].get_text()

def getWeakFoot(player: Tag):
    return player.select_one('.table-weak-foot').get_text()

def getSkillMoves(player: Tag):
    return player.select_one('.table-skills').get_text()

def getPassing(player: Tag):
    return player.select_one('.table-passing .table-key-stats').get_text()

def getDefending(player: Tag):
    return player.select_one('.table-defending .table-key-stats').get_text()

def getAttacking(player: Tag):
    mainPos = player.select_one('.table-pos-main span').get_text()
    if(mainPos == 'ST'):
        return getRating(player)
    elif(mainPos == 'GK'):
        return ""
    else:
        time.sleep(2)
        playerRequest = scraper.get(getURL(player), headers=headers)
        playerSoup = BeautifulSoup(playerRequest.content, 'lxml')
        playerSoup.prettify()
        return playerSoup.select_one('.rpp-position-rounded-rating').get_text()

def getCountry(player: Tag):
    return player.select_one('.table-player-nation img').get('title')

def getURL(player: Tag):
    return domainUrl + player.select_one('.table-player-name').get('href')

def getGender(player: Tag):
    return ""


for i in range(num_pages):
    time.sleep(3)
    finalurl = startingurl + str(i + 1)
    print("Page:" + str(i + 1))
    pageRequest = scraper.get(finalurl, headers=headers)
    soup1 = BeautifulSoup(pageRequest.content, 'lxml')
    soup1.prettify()
    playerRows = soup1.select('tbody tr.player-row')
    for player in playerRows:
        cur.execute("INSERT INTO Players(PlayerName,CardTypeID,Position,Age,Rating,League,Team,Height,Weight,Crossing,Finishing,Heading,Jumping,Penalties,WeakFoot,SkillMoves,Passing,Defending,Attacking,Country,URL,Gender) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            getPlayerName(player),
            getCardTypeID(player),
            getPosition(player),
            getAge(player),
            getRating(player),
            getLeague(player),
            getTeam(player),
            getHeight(player),
            getWeight(player),
            getCrossing(player),
            getFinishing(player),
            getHeading(player),
            getJumping(player),
            getPenalties(player),
            getWeakFoot(player),
            getSkillMoves(player),
            getPassing(player),
            getDefending(player),
            getAttacking(player),
            getCountry(player),
            getURL(player),
            getGender(player)
        ])
    con.commit()