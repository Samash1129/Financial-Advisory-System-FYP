import requests
import pymongo
from datetime import datetime, timedelta
import time
import json
import os
from dotenv import load_dotenv

load_dotenv()

def load_queries(file_path):
    with open(file_path, "r") as queries_file:
        queries_data = json.load(queries_file)
        return queries_data.get("queries", {})

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

    # Ensure data is in the format of a list of dictionaries
    if not isinstance(data, list):
        data = [data]

    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Data for query '{ticker}' saved to '{file_path}'")


def fetch_news(query, page):
    current_date = datetime.now()
    start_date = current_date - timedelta(days=90)
    formatted_start_date = start_date.strftime("%d/%m/%Y")
    formatted_end_date = current_date.strftime("%d/%m/%Y")

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
        articles = data.get("news", [])
        print(f"Fetched {len(articles)} articles for query '{query}' (page {page})")
        return articles
    else:
        print("Error fetching articles:", response.status_code)
        return []

def retrieve_all_articles(queries):
    all_articles = {}
    for ticker, query_list in queries.items():
        all_articles[ticker] = []
        for query in query_list:
            print(f"Fetching news for query: {query}")
            page = 1
            while page < 2:
                articles = fetch_news(query, page)
                all_articles[ticker].extend(articles)
                if len(articles) < 10:
                    print(f"Fetched only {len(articles)} articles for query '{query}' (page {page}), stopping pagination.")
                    break
                page += 1
            time.sleep(2)  # Add a delay to avoid hitting API rate limits
    return all_articles

def fetch_news_for_all_queries():
    try:
        # queries = load_queries("queries2.json")
        queries = load_queries("scripts\Helpers\JSONs\queries2.json")
        all_articles = retrieve_all_articles(queries)
        for ticker, news in all_articles.items():
            all_text = ""
            for article in news:
                all_text += article.get("title", "") + " " + article.get("short_description", "") + " " + article.get("text", "") + " "
            save_to_db(ticker, news)
            save_to_json(ticker, news)
        print("All news fetched and saved.")
        return True  # Return True if successfully executed
    except Exception as e:
        print("Error fetching news:", e)
        return False  # Return False if there's an error during execution

