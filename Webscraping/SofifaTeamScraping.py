#!/usr/bin/env python3
"""
SofIFA Teams Web Scraper with JavaScript Support
Uses Selenium to load JavaScript-rendered content
Stores data in SQLite database (botDB.db)
Table: TeamLeagues (with unique id for each entry)
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import sqlite3
import time
from datetime import datetime
import sys

class SofIFATeamScraper:
    def __init__(self, db_name='botDB.db'):
        """Initialize scraper and database"""
        self.db_name = db_name
        self.teams_scraped = []
        self.driver = None
        
        print("=" * 60)
        print("SofIFA TEAM LEAGUE SCRAPER (Selenium + JavaScript)")
        print("=" * 60)
        print(f"Database: {self.db_name}")
        print(f"Table: TeamLeagues")
        print()
        
        self.setup_database()
        self.setup_selenium()
    
    def setup_selenium(self):
        """Setup Selenium with Chrome"""
        try:
            print("Setting up Chrome WebDriver...")
            
            chrome_options = Options()
            # chrome_options.add_argument("--headless")  # Run in headless mode (no GUI)
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
            chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            
            self.driver = webdriver.Chrome(options=chrome_options)
            print("✓ Chrome WebDriver initialized")
            print()
            
        except Exception as e:
            print(f"✗ Error setting up Selenium: {e}")
            print("  Make sure you have chromedriver installed:")
            print("  - Windows: Download from https://chromedriver.chromium.org/")
            print("  - Mac: brew install chromedriver")
            print("  - Linux: sudo apt-get install chromium-chromedriver")
            sys.exit(1)
    
    def setup_database(self):
        """Create database and TeamLeagues table"""
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            
            # Drop existing table if it exists (for fresh start)
            cursor.execute('DROP TABLE IF EXISTS TeamLeagues')
            
            # Create TeamLeagues table with unique id
            cursor.execute('''
                CREATE TABLE TeamLeagues (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    team_name TEXT NOT NULL,
                    league TEXT NOT NULL,
                    scraped_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(team_name)
                )
            ''')
            
            # Create index for faster queries
            cursor.execute('CREATE INDEX idx_team_name ON TeamLeagues(team_name)')
            cursor.execute('CREATE INDEX idx_league ON TeamLeagues(league)')
            
            conn.commit()
            conn.close()
            print("✓ Database initialized successfully")
            print(f"✓ Table 'TeamLeagues' created with auto-increment ID")
            print()
            
        except Exception as e:
            print(f"✗ Error setting up database: {e}")
            sys.exit(1)
    
    def scrape_teams(self):
        """Scrape all teams and leagues from SofIFA using Selenium"""
        print("Starting scrape of SofIFA teams (rendering JavaScript)...")
        print("-" * 60)
        
        base_url = "https://sofifa.com/teams?type=all&lg%5B0%5D=2218&lg%5B1%5D=2222&lg%5B2%5D=2216&lg%5B3%5D=2215&lg%5B4%5D=2236&lg%5B5%5D=2228&lg%5B6%5D=2229&lg%5B7%5D=2232&lg%5B8%5D=2230&lg%5B9%5D=2231&lg%5B10%5D=2233&lg%5B11%5D=2221"
        offset = 0
        max_offset = 80
        batch_size = 60
        total_scraped = 0
        
        while offset < max_offset:
            url = f"{base_url}&offset={offset}" if offset > 0 else base_url
            
            try:
                print(f"Scraping offset {offset:>5}... ", end='', flush=True)
                
                # Load page with Selenium
                self.driver.get(url)
                
                # Wait for table rows to load
                wait = WebDriverWait(self.driver, 15)
                wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "tr")))
                
                # Wait additional time for all data to render
                time.sleep(2)
                
                # Get page source and parse with BeautifulSoup
                page_source = self.driver.page_source
                soup = BeautifulSoup(page_source, 'html.parser')
                rows = soup.find_all('tr')
                
                if len(rows) < 2:
                    print("No data found. Stopping.")
                    break
                
                batch_count = 0
                
                for row in rows[1:]:  # Skip header
                    try:
                        cells = row.find_all('td')
                        if len(cells) < 2:
                            continue
                        
                        # Extract team name
                        team_name = None
                        team_link = None
                        
                        for cell in cells:
                            link = cell.find('a')
                            if link:
                                href = link.get('href', '')
                                if '/team/' in href:
                                    team_name = link.get_text(strip=True)
                                    team_link = link
                                    break
                        
                        if not team_name:
                            continue
                        
                        # Extract league name
                        league = self._extract_league(row, team_link)
                        
                        self.teams_scraped.append({
                            'team_name': team_name,
                            'league': league
                        })
                        
                        batch_count += 1
                        total_scraped += 1
                        
                    except Exception as e:
                        continue
                
                print(f"Found {batch_count} teams")
                
                if batch_count < 10:  # If very few teams found, likely reached end
                    print("No more teams found. Stopping.")
                    break
                
                offset += batch_size
                # Respectful delay between requests
                time.sleep(1)
                
            except Exception as e:
                print(f"✗ Error: {e}")
                break
        
        print()
        print(f"✓ Total teams scraped: {total_scraped}")
        return self.teams_scraped
    
    def _extract_league(self, row, team_link):
        """Extract league information from a row"""
        league = "Unknown"
        
        try:
            # Method 1: Look for league span
            league_span = row.find('span', {'class': lambda x: x and 'league' in x.lower()})
            if league_span:
                league = league_span.get_text(strip=True)
                return league
            
            # Method 2: Look for text after team name
            if team_link:
                parent_cell = team_link.parent
                all_text = parent_cell.get_text(strip=True)
                
                parts = all_text.split(team_link.get_text(strip=True))
                if len(parts) > 1:
                    after_text = parts[1].strip()
                    if after_text and len(after_text) > 1 and not after_text.isdigit():
                        league = after_text
                        return league
            
            # Method 3: Look through all cells
            cells = row.find_all('td')
            for cell in cells:
                text = cell.get_text(strip=True)
                if (text and len(text) > 3 and 
                    not text.isdigit() and 
                    any(word in text.lower() for word in ['league', 'division', 'bundesliga', 'serie', 'ligue', 'laliga', 'premier', 'championship', 'eredivisie'])):
                    league = text
                    return league
        
        except Exception as e:
            league = "Unknown"
        
        return league if league else "Unknown"
    
    def save_to_database(self, teams):
        """Save teams to SQLite database"""
        print("Saving to database...")
        print("-" * 60)
        
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            
            added = 0
            duplicates = 0
            errors = 0
            
            for team in teams:
                try:
                    cursor.execute('''
                        INSERT INTO TeamLeagues (team_name, league)
                        VALUES (?, ?)
                    ''', (team['team_name'], team['league']))
                    added += 1
                    
                except sqlite3.IntegrityError:
                    duplicates += 1
                except Exception as e:
                    print(f"  Error inserting {team['team_name']}: {e}")
                    errors += 1
            
            conn.commit()
            conn.close()
            
            print(f"✓ Teams added to database: {added}")
            print(f"✓ Duplicates skipped: {duplicates}")
            if errors > 0:
                print(f"✗ Errors: {errors}")
            print()
            
            return added
        
        except Exception as e:
            print(f"✗ Error saving to database: {e}")
            sys.exit(1)
    
    def display_summary(self):
        """Display database summary statistics"""
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) FROM TeamLeagues')
            total = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(DISTINCT league) FROM TeamLeagues')
            leagues_count = cursor.fetchone()[0]
            
            cursor.execute('SELECT id, team_name, league FROM TeamLeagues LIMIT 10')
            samples = cursor.fetchall()
            
            cursor.execute('SELECT DISTINCT league FROM TeamLeagues ORDER BY league')
            leagues = cursor.fetchall()
            
            conn.close()
            
            print("DATABASE SUMMARY")
            print("=" * 60)
            print(f"Total Teams in Database: {total}")
            print(f"Total Unique Leagues: {leagues_count}")
            print()
            
            print("Sample Data (First 10 entries):")
            print("-" * 60)
            print(f"{'ID':<5} {'Team Name':<30} {'League':<25}")
            print("-" * 60)
            for entry_id, team_name, league in samples:
                print(f"{entry_id:<5} {team_name[:29]:<30} {league[:24]:<25}")
            print()
            
            print("All Leagues in Database:")
            print("-" * 60)
            for idx, (league,) in enumerate(leagues, 1):
                print(f"  {idx:2}. {league}")
            print()
            
        except Exception as e:
            print(f"Error displaying summary: {e}")
    
    def export_to_csv(self, filename='teams_export.csv'):
        """Export teams from database to CSV"""
        import csv
        
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            cursor.execute('SELECT id, team_name, league FROM TeamLeagues ORDER BY id')
            teams = cursor.fetchall()
            conn.close()
            
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(['ID', 'Team Name', 'League'])
                writer.writerows(teams)
            
            print(f"✓ Exported {len(teams)} teams to {filename}")
            
        except Exception as e:
            print(f"✗ Error exporting to CSV: {e}")
    
    def cleanup(self):
        """Close browser and cleanup"""
        if self.driver:
            self.driver.quit()
            print("✓ Browser closed")
    
    def run(self):
        """Execute the complete scraping and saving process"""
        try:
            teams = self.scrape_teams()
            
            if not teams:
                print("No teams scraped. Exiting.")
                return
            
            added = self.save_to_database(teams)
            self.display_summary()
            self.export_to_csv('teams_export.csv')
            
            print("=" * 60)
            print("✓ SCRAPING COMPLETE")
            print("=" * 60)
            print(f"Database file: {self.db_name}")
            print(f"Table: TeamLeagues")
            print(f"Records added: {added}")
            print()
            
        except KeyboardInterrupt:
            print("\n\nScraping interrupted by user.")
        except Exception as e:
            print(f"\n✗ Unexpected error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            self.cleanup()


def main():
    """Main entry point"""
    scraper = SofIFATeamScraper('botDB.db')
    scraper.run()


if __name__ == "__main__":
    main()
