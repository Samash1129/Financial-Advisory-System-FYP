import requests
import pymongo
from datetime import datetime, timedelta
import time
import json
import os
from dotenv import load_dotenv

load_dotenv()

with open("queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])
    

def save_to_db(query, data):
    # Connect to MongoDB
    client = pymongo.MongoClient(os.getenv("MONGO_DB_KEY"))
    db = client["news"]
    collection = db["newsdata"]

    # Check if data for the query already exists
    existing_entry = collection.find_one({"query": query})
    if existing_entry:
        # Update existing entry
        collection.update_one(
            {"query": query},
            {"$set": {"data": data, "timestamp": datetime.now()}}
        )
        print(f"Data for query '{query}' updated in the database.")
    else:
        # Create new entry
        entry = {
            "query": query,
            "data": data,
            "timestamp": datetime.now()
        }
        collection.insert_one(entry)
        print(f"New entry created for query '{query}' in the database.")


def save_to_json(query, data):
    directory = "query_responses_test"
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, f"{query}.json")
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Data for query '{query}' saved to '{file_path}'")


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



def fetch_news_for_all_queries(queries):
    for query, ticker_symbol in queries.items():
        print(f"Fetching news for query: {query}")
        news = retrieve_all_articles(query)
        save_to_db(query, news)
        save_to_json(query, news)
        time.sleep(2)  # Add a delay to avoid hitting API rate limits



fetch_news_for_all_queries(queries)
# print(os.getenv("RAPID_API_KEY"))
# print(os.getenv("MONGO_DB_KEY"))

#query = "Askari Bank PSX"
#news2 = fetch_news(query, 1)
#news = retrieve_all_articles(query)
#print(len(news2))
#print(len(news))
#save_to_db("United Bank PSX", news)
#save_to_json(query, news)
