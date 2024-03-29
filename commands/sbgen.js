const { SlashCommandBuilder } = require('discord.js');

const teamArray = [
    "Manchester City",
    "Real Madrid",
    "FC Barcelona",
    "FC Bayern München",
    "Liverpool",
    "Paris Saint-Germain",
    "Manchester United",
    "Arsenal",
    "Atlético Madrid",
    "Inter",
    "Napoli",
    "Borussia Dortmund",
    "Newcastle United",
    "Milan",
    "Bayer 04 Leverkusen",
    "Juventus",
    "Tottenham Hotspur",
    "Roma",
    "Chelsea",
    "Lazio",
    "Real Sociedad",
    "Aston Villa",
    "Sevilla FC",
    "RB Leipzig",
    "Al Nassr",
    "Al Hilal",
    "SL Benfica",
    "Al Ittihad",
    "Villarreal CF",
    "Real Betis",
    "Athletic Club de Bilbao",
    "Galatasaray SK",
    "Olympique de Marseille",
    "Free Agents",
    "Atalanta",
    "West Ham United",
    "Sporting CP",
    "FC Porto",
    "Fenerbahçe SK",
    "Fiorentina",
    "CA Osasuna",
    "Brighton & Hove Albion",
    "Stade Rennais FC",
    "AS Monaco",
    "Everton",
    "Al Ahli",
    "VfL Wolfsburg",
    "Racing Club de Lens",
    "SC Braga",
    "Rayo Vallecano",
    "Olympique Lyonnais",
    "Getafe CF",
    "Eintracht Frankfurt",
    "Nottingham Forest",
    "1. FC Union Berlin",
    "RC Celta",
    "Fulham",
    "SC Freiburg",
    "Brentford",
    "Palmeiras",
    "Girona FC",
    "Flamengo",
    "Wolverhampton Wanderers",
    "Atletico Mineiro",
    "RCD Mallorca",
    "Borussia Mönchengladbach",
    "LOSC Lille",
    "Feyenoord",
    "Crystal Palace",
    "Ajax",
    "PSV",
    "OGC Nice",
    "Valencia CF",
    "TSG 1899 Hoffenheim",
    "Torino",
    "River Plate",
    "Besiktas JK",
    "RB Bragantino",
    "Leicester City",
    "1. FSV Mainz 05",
    "UD Almería",
    "Bournemouth",
    "Sassuolo",
    "RSC Anderlecht",
    "Internacional",
    "AC Monza",
    "Cádiz CF",
    "Bologna",
    "Trabzonspor",
    "Boca Juniors",
    "Stade de Reims",
    "Salernitana",
    "UD Las Palmas",
    "Celtic",
    "Club Brugge KV",
    "Inter Miami",
    "Udinese",
    "AZ Alkmaar",
    "Club Athletico Paranaense",
    "SV Werder Bremen",
    "1. FC Koln",
    "Burnley",
    "AEK Athens",
    "Montpellier HSC",
    "Sport Club Corinthians Paulista",
    "Royal Antwerp FC",
    "Hellas Verona",
    "Santos",
    "VfB Stuttgart",
    "SK Slavia Praha",
    "RCD Espanyol",
    "FC Augsburg",
    "Panathinaikos FC",
    "Granada CF",
    "Rangers FC",
    "Fluminense",
    "FC Lorient",
    "Al Shabab",
    "Genoa",
    "Sheffield United",
    "Leeds United",
    "Sparta Praha",
    "Deportivo Alavés",
    "FC Nantes",
    "Los Angeles FC",
    "FC Red Bull Salzburg",
    "KRC Genk",
    "VfL Bochum 1848",
    "São Paulo",
    "Real Valladolid CF",
    "Southampton",
    "Empoli",
    "Estudiantes de La Plata",
    "Ettifaq FC",
    "RC Strasbourg Alsace",
    "FC København",
    "PAOK",
    "Shakhtar Donetsk",
    "Viktoria Plzeň",
    "Medipol Başakşehir FK",
    "San Lorenzo de Almagro",
    "Adana Demirspor",
    "FC Twente",
    "Norwich City",
    "Racing Club",
    "Club Atlético Talleres",
    "Dynamo Kyiv",
    "Toulouse Football Club",
    "KAA Gent",
    "Philadelphia Union",
    "Lecce",
    "Cagliari",
    "Elche CF",
    "Stade Brestois 29",
    "Seattle Sounders FC",
    "Argentinos Juniors",
    "Ferencvárosi TC",
    "Clermont Foot 63",
    "Luton Town",
    "Independiente del Valle",
    "FK Crvena Zvezda",
    "Al Wehda",
    "Botafogo",
    "Dinamo Zagreb",
    "SD Eibar",
    "Hajduk Split",
    "BSC Young Boys",
    "Al Taawoun",
    "Club Atlético Lanús",
    "Millonarios FC",
    "Hamburger SV",
    "FC Schalke 04",
    "Club Libertad",
    "Independiente",
    "Hertha BSC",
    "Spezia",
    "Portimonense SC",
    "Vitória Guimarães",
    "LDU Quito",
    "FC Cincinnati",
    "US Cremonese",
    "AS Saint-Étienne",
    "Coventry City",
    "Nashville SC",
    "Malmö FF",
    "Fortaleza",
    "Club Atlético Colón",
    "Club Atlético Tigre",
    "Middlesbrough",
    "Rosario Central",
    "América FC (Minas Gerais)",
    "Watford",
    "Hannover 96",
    "FC Metz",
    "Real Sporting de Gijón",
    "Defensa y Justicia",
    "Club Atlético Huracán",
    "Damac FC",
    "Palermo",
    "San Jose Earthquakes",
    "Alianza Lima",
    "West Bromwich Albion",
    "Brøndby IF",
    "Ulsan Hyundai FC",
    "Real Oviedo",
    "FC Midtjylland",
    "Al Ain FC",
    "Millwall",
    "Royale Union Saint-Gilloise",
    "Barcelona Sporting Club",
    "1. FC Heidenheim 1846",
    "Olimpia Asunción",
    "Real Zaragoza",
    "Frosinone",
    "SV Darmstadt 98",
    "FC Utrecht",
    "Como",
    "Stoke City",
    "LA Galaxy",
    "CD Tenerife",
    "New England Revolution",
    "Minnesota United FC",
    "Colo-Colo",
    "Atletico Nacional",
    "Atlético Tucumán",
    "MKE Ankaragücü",
    "Standard de Liège",
    "Sampdoria",
    "FC Dallas",
    "Preston North End",
    "Al Fayha",
    "SC Heerenveen",
    "Sporting de Charleroi",
    "SK Sturm Graz",
    "Pisa",
    "Levante UD",
    "Le Havre AC",
    "Karlsruher SC",
    "Nacional de Montevideo",
    "Velez Sarsfield",
    "Burgos CF",
    "Rio Ave FC",
    "Atiker Konyaspor",
    "Famalicão",
    "Independiente Medellín",
    "Fortuna Düsseldorf",
    "Aarhus GF",
    "Godoy Cruz",
    "Venezia FC",
    "FC St. Pauli",
    "Heart of Midlothian",
    "Queens Park Rangers",
    "Parma",
    "FC Arouca",
    "Hull City",
    "Jeonbuk Hyundai Motors",
    "Universidad Católica",
    "NEC Nijmegen",
    "FK Bodø/Glimt",
    "Portland Timbers",
    "Cardiff City",
    "LASK Linz",
    "Lech Poznań",
    "Peñarol",
    "FC Girondins de Bordeaux",
    "Newell's Old Boys",
    "Antalyaspor",
    "Estoril Praia",
    "BK Häcken",
    "Sporting Kansas City",
    "Orlando City SC",
    "Shandong Luneng TaiShan FC",
    "Blackburn Rovers",
    "Vancouver Whitecaps FC",
    "SC Paderborn 07",
    "Club Sporting Cristal",
    "Bari",
    "Fatih Karagümrük S.K.",
    "Atlanta United",
    "APOEL Nicosia FC",
    "Rionegro Águilas",
    "FC Basel 1893",
    "GD Chaves",
    "Club Universitario de Deportes",
    "Angers SCO",
    "Columbus Crew SC",
    "Wuhan Three Towns",
    "Raków Częstochowa",
    "Swansea City",
    "Melgar FBC",
    "Real Salt Lake",
    "FC Cartagena",
    "FC Nordsjælland",
    "Belgrano de Córdoba",
    "FCSB (Steaua)",
    "Boavista FC",
    "KVC Westerlo",
    "Oud-Heverlee Leuven",
    "Goias",
    "Birmingham City",
    "KV Mechelen",
    "Gazişehir Gaziantep F.K.",
    "Toronto FC",
    "Stade Malherbe Caen",
    "Bristol City",
    "Shanghai SIPG FC",
    "New York Red Bulls",
    "SD Huesca",
    "Albacete BP",
    "Deportes Tolima",
    "Ipswich Town",
    "Farense",
    "FC Vizela",
    "Al Khaleej",
    "Al Raed",
    "Kayserispor",
    "Sunderland",
    "1. FC Kaiserslautern",
    "Kasimpaşa SK",
    "DC United",
    "Vitesse",
    "New York City FC",
    "Al Fateh",
    "Central Córdoba",
    "Emelec",
    "Platense",
    "Servette FC",
    "Alanyaspor",
    "Gil Vicente FC",
    "SK Rapid Wien",
    "Barracas Central",
    "1. FC Nurnberg",
    "Sivasspor",
    "Vicenza",
    "Pohang Steelers",
    "Fortuna Sittard",
    "Legia Warszawa",
    "Charlotte FC",
    "Racing Santander",
    "CD Leganés",
    "FC Seoul",
    "Molde FK",
    "Casa Pia",
    "Gimnasia y Esgrima La Plata",
    "AJ Auxerre",
    "FC St. Gallen",
    "Melbourne City FC",
    "Club Atlético Banfield",
    "AC Ajaccio",
    "Austin FC",
    "Çaykur Rizespor",
    "Amiens SC",
    "Sheffield Wednesday",
    "SpVgg Greuther Furth",
    "Independiente Santa Fe",
    "ESTAC Troyes",
    "Club Atlético Sarmiento",
    "1. FC Magdeburg",
    "Holstein Kiel",
    "Chicago Fire",
    "Unión de Santa Fe",
    "Moreirense FC",
    "Daegu FC",
    "Houston Dynamo",
    "Pogoń Szczecin",
    "Sparta Rotterdam",
    "Montreal Impact",
    "FC Hansa Rostock",
    "AD Alcorcón",
    "Hatayspor",
    "SD Aucas",
    "Club Bolívar",
    "FC Lugano",
    "Huddersfield Town",
    "Ternana",
    "KV Kortrijk",
    "FC Andorra",
    "Aberdeen",
    "Liverpool Fútbol Club",
    "FC Zurich",
    "Brescia",
    "Modena",
    "Hibernian",
    "Daejeon Citizen",
    "CD Palestino",
    "FC Luzern",
    "Universitatea Craiova",
    "FK Austria Wien",
    "Cienciano",
    "Eintracht Braunschweig",
    "Incheon United FC",
    "KSV Cercle Brugge",
    "Al Hazem",
    "Paris FC",
    "Plymouth Argyle",
    "Club Guaraní",
    "Cosenza",
    "Suwon FC",
    "FC Lausanne-Sport",
    "Abha Club",
    "Al Tai",
    "Rotherham United",
    "Beijing Sinobo Guoan FC",
    "Colorado Rapids",
    "Djurgardens IF",
    "FC Farul Constanța",
    "Shanghai Greenland Shenhua FC",
    "CD Cobresal",
    "AIK",
    "Grenoble Foot 38",
    "Sporting Club de Bastia",
    "Club The Strongest",
    "Rosenborg BK",
    "VfL Osnabruck",
    "River Plate Montevideo",
    "Chengdu Rongcheng F.C.",
    "Club Cerro Porteño",
    "Pau FC",
    "Deportivo Ñublense",
    "Derby County",
    "Stade Lavallois Mayenne FC",
    "En Avant de Guingamp",
    "CFR Cluj",
    "IF Elfsborg",
    "Randers FC",
    "Südtirol",
    "Jeju United FC",
    "Academia Puerto Cabello",
    "Viking FK",
    "SV Elversberg",
    "KAS Eupen",
    "Arsenal de Sarandí",
    "Wolfsberger AC",
    "SD Amorebieta",
    "Heracles Almelo",
    "Rapid București",
    "PEC Zwolle",
    "Zagłębie Lubin",
    "Go Ahead Eagles",
    "Caracas FC",
    "Silkeborg IF",
    "Gangwon FC",
    "US Quevilly Rouen Métropole",
    "GwangJu FC",
    "Viborg FF",
    "Valerenga Fotball",
    "Deportivo Táchira FC",
    "Suwon Samsung Bluewings",
    "Reading",
    "Sepsi OSK",
    "Barnsley",
    "Blackpool",
    "Charlton Athletic",
    "Odense Boldklub",
    "Piast Gliwice",
    "İstanbulspor",
    "Hammarby IF",
    "Bolton Wanderers",
    "Lillestrøm SK",
    "Villarreal Club de Fútbol B",
    "RKC Waalwijk",
    "Melbourne Victory",
    "SV Wehen Wiesbaden",
    "Sydney FC",
    "FC U Craiova 1948",
    "Grasshopper Club Zürich",
    "Deportivo Binacional",
    "CD Mirandés",
    "FC Ingolstadt 04",
    "Jagiellonia Białystok",
    "SK Austria Klagenfurt",
    "Wycombe Wanderers",
    "IFK Goteborg",
    "Excelsior",
    "Western Sydney Wanderers",
    "1. FC Saarbrucken",
    "SV Sandhausen",
    "Sint-Truidense VV",
    "Henan Jianye FC",
    "Gornik Zabrze",
    "Lyngby BK",
    "Valenciennes FC",
    "Audax Italiano",
    "Wigan Athletic",
    "Portsmouth",
    "Radomiak Radom",
    "IFK Norrkoping",
    "Zhejiang Professional FC",
    "Ascoli",
    "Cittadella",
    "Cracovia",
    "Estudiantes de Mérida",
    "Changchun Yatai FC",
    "TSV Hartberg",
    "Oriente Petrolero",
    "FC Annecy",
    "WSG Tirol",
    "Tianjin TEDA FC",
    "Delfín SC",
    "TSV 1860 Munchen",
    "FC Hermannstadt",
    "Austria Lustenau",
    "Universitatea Cluj",
    "Metropolitanos de Caracas FC",
    "SK Brann",
    "Śląsk Wrocław",
    "SG Dynamo Dresden",
    "Oxford United",
    "DSC Arminia Bielefeld",
    "Rodez Aveyron Football",
    "Petrolul Ploiești",
    "General Caballero (JLM)",
    "Western United FC",
    "Wrexham AFC",
    "Peterborough United",
    "Dinamo Bucureşti",
    "HJK Helsinki",
    "Bristol Rovers",
    "SV Waldhof Mannheim",
    "FC Voluntari",
    "FC Winterthur",
    "Club Blooming",
    "Sarpsborg 08 FF",
    "Warta Poznań",
    "Fleetwood Town",
    "Viktoria Köln",
    "Stabæk Fotball",
    "Macarthur FC",
    "Kalmar FF",
    "St. Mirren",
    "SCR Altach",
    "Perth Glory",
    "FC Volendam",
    "Shrewsbury",
    "Vejle Boldklub",
    "Livingston FC",
    "Shijiazhuang Ever Bright F.C.",
    "Widzew Łódź",
    "MSV Duisburg",
    "Stal Mielec",
    "Strømsgodset IF",
    "SSV Jahn Regensburg",
    "Patronato",
    "FC Erzgebirge Aue",
    "LKS Lodz",
    "Club Deportivo Guabirá",
    "St. Johnstone FC",
    "Lincoln City",
    "Cambridge United",
    "SC Verl",
    "Rot-Weiß Essen",
    "Burton Albion",
    "Hallescher FC",
    "Milton Keynes Dons",
    "UTA Arad",
    "Northampton Town",
    "FC Botoşani",
    "Stockport County",
    "IFK Värnamo",
    "Mumbai City FC",
    "Korona Kielce",
    "Hamarkameratene",
    "Leyton Orient",
    "Central Coast Mariners",
    "SC Preußen Münster",
    "Adelaide United",
    "ATK Mohun Bagan FC",
    "Politehnica Iaşi",
    "VfB Lübeck",
    "FK Haugesund",
    "Salford City",
    "Tromsø IL",
    "Stevenage",
    "USL Dunkerque",
    "Forest Green Rovers",
    "Port Vale",
    "Kilmarnock",
    "Odds BK",
    "Halmstads BK",
    "Gillingham",
    "IF Brommapojkarna",
    "Club Atlético Palmaflor",
    "Shamrock Rovers",
    "Cheltenham Town",
    "Junior FC",
    "Carlisle United",
    "Brisbane Roar",
    "Aalesunds FK",
    "Notts County",
    "IK Sirius",
    "Motherwell",
    "Degerfors IF",
    "Ross County FC",
    "Bradford City",
    "Mansfield Town",
    "Dalian YiFang FC",
    "Exeter City",
    "SpVgg Unterhaching",
    "Borussia Dortmund II",
    "Wellington Phoenix",
    "Shenzhen FC",
    "SC Freiburg II",
    "Mjällby AIF",
    "Ruch Chorzow",
    "Newcastle Jets",
    "Bengaluru FC",
    "Colchester United",
    "Meizhou Hakka",
    "Dundee FC",
    "FC Goa",
    "AFC Wimbledon",
    "Sandefjord Fotball",
    "Swindon Town",
    "Barrow",
    "Derry City",
    "Grimsby Town",
    "Tranmere Rovers",
    "Walsall",
    "Harrogate Town",
    "Kerala Blasters FC",
    "Sutton United",
    "Doncaster Rovers",
    "St. Patrick's Athletic",
    "Dundalk",
    "Varbergs BoIS",
    "Accrington Stanley",
    "Crewe Alexandra",
    "SC East Bengal FC",
    "Morecambe",
    "Odisha FC",
    "Bohemian FC",
    "Hyderabad FC",
    "Newport County",
    "Shelbourne FC",
    "Crawley Town",
    "Sligo Rovers",
    "NorthEast United FC",
    "Chennaiyin FC",
    "Jamshedpur FC",
    "Drogheda United",
    "Cork City",
    "UCD AFC"
]

function generateSquadBattleOpponents() {
    EightyToNinetyTeam = teamArray[Math.floor(Math.random() * (30 + 1 - 0) + 0)];
    SeventyToEightyTeam = teamArray[Math.floor(Math.random() * (304 + 1 - 30) + 30)];
    SixtyToSeventyTeam = teamArray[Math.floor(Math.random() * (635 + 1 - 304) + 304)];
    FiftyToSixtyTeam = teamArray[Math.floor(Math.random() * (641 + 1 - 635) + 635)];

    return "Daily Squad Battles Games: \n 80-90: " + EightyToNinetyTeam + " \n 70-80: " + SeventyToEightyTeam + " \n 60-70: " + SixtyToSeventyTeam + " \n 50-60: " + FiftyToSixtyTeam;

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sbgen')
        .setDescription('Generate 4 teams for squad battles, one for each rating range'),
    async execute(interaction) {
        try {
            generatedString = generateSquadBattleOpponents();
        } catch (error) {
            console.error(error);
        }
        const r = await interaction.guild.roles.fetch("1170427348869447741");
        interaction.channel.send(`${r} \n` + generatedString);
        interaction.reply("Generated Squad Battles Games and Tagged Manager Role");
    },
};