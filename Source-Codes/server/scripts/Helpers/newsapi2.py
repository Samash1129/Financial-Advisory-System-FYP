
#Backup file for newsapi.py

import requests
import pymongo
from datetime import datetime, timedelta
import time
import json
import os
from dotenv import load_dotenv

load_dotenv()

# with open("queries.json", "r") as queries_file:
with open("JSONs/queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])

def save_to_db(query, data):
    client = pymongo.MongoClient(os.getenv("MONGO_DB_KEY"))
    db = client["news"]
    collection = db["newsdata"]

    existing_entry = collection.find_one({"query": query})
    if existing_entry:
        collection.update_one(
            {"query": query},
            {"$set": {"data": data, "timestamp": datetime.now()}}
        )
        print(f"Data for query '{query}' updated in the database.")
    else:
        entry = {
            "query": query,
            "data": data,
            "timestamp": datetime.now()
        }
        collection.insert_one(entry)
        print(f"New entry created for query '{query}' in the database.")

    client.close()


def save_to_json(ticker, data):
    # directory = "query_responses"
    directory = "JSONs/query_responses"
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, f"{ticker}.json")
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Data for query '{ticker}' saved to '{file_path}'")


def fetch_news(query, page):
    current_date = datetime.now()
    start_date = current_date - timedelta(days=180)
    formatted_start_date = start_date.strftime("%d/%m/%Y")
    formatted_end_date = current_date.strftime("%d/%m/%Y")
    print(formatted_start_date, formatted_end_date)

    url = "https://newsnow.p.rapidapi.com/newsv2"
    payload = {
        "query": query,
        "time_bounded": True,
        "from_date": formatted_start_date,
        "to_date": formatted_end_date,
        "location": "pk",
        "language": "en",
        "page": page
    }
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": os.getenv("RAPID_API_KEY"),
        "X-RapidAPI-Host": "newsnow.p.rapidapi.com"
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        articles = data["news"]
        print(f"Fetched {len(articles)} articles for query '{query}' (page {page})")
        return articles
    else:
        print("Error fetching articles:", response.status_code)
        return None, 0

def retrieve_all_articles(query):
    all_articles = []
    page = 1
    while page<3:
        articles = fetch_news(query, page)
        all_articles.append(articles)
        if len(articles) < 10:
            print(f"Fetched only {len(articles)} articles for query '{query}' (page {page}), stopping pagination.")
            break
        
        page += 1
    
    return all_articles


def fetch_news_for_all_queries():
    try:
        for query, ticker_symbol in queries.items():
            print(f"Fetching news for query: {query}")
            news = retrieve_all_articles(query)
            all_text = ""
            for page_articles in news:
                for article in page_articles:
                    all_text += article.get("title", "") + " " + article.get("short_description", "") + " " + article.get("text", "") + " "
            save_to_db(query, news)
            save_to_json(ticker_symbol, news)
            time.sleep(2)  # Add a delay to avoid hitting API rate limits
        print("All news fetched and saved.")
        return True  # Return True if successfully executed
    except Exception as e:
        print("Error fetching news:", e)
        return False  # Return False if there's an error during execution
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/newsapi.py


=======
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/newsapi2.py




# print(os.getenv("RAPID_API_KEY"))
#print(os.getenv("MONGO_DB_KEY"))

#query = "Silk Bank Limited Pakistan Share Stock"
#ticker = "SILK"
#news2 = fetch_news(query, 1)
#news = retrieve_all_articles(query)
#print(len(news2))
#print(len(news))
#save_to_db(query, news)
#save_to_json(ticker, news)


