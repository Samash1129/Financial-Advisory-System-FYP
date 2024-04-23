import os
import json
from textblob import TextBlob
import pymongo
from dotenv import load_dotenv
from datetime import datetime
import pymongo
# import ntlk
# ntlk.download('punkt')

load_dotenv()

with open("JSONs/queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])
    
# with open("queries.json", "r") as queries_file:
#     queries_data = json.load(queries_file)
#     queries = queries_data.get("queries", [])


def save2db(sentiment_scores):
    # Connect to MongoDB
    client = pymongo.MongoClient(os.getenv("MONGO_DB_KEY"))
    db = client["news"]
    collection = db["textblob_sentiment2"]

    for query, score in sentiment_scores.items():
        stock_ticker = queries.get(query)
        if stock_ticker:
            query_filter = {"query": query}
            update_query = {
                "$set": {
                    "sentiment_score": score,
                    "stock_ticker": stock_ticker,
                    "updated_at": datetime.now()
                }
            }
            collection.update_one(query_filter, update_query, upsert=True)

    client.close()


def calculate_sentiment_score(text):
    # Perform sentiment analysis using TextBlob
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    return sentiment_score


def analyze_sentiment_for_files():
    sentiment_scores = {}

    for query in queries.values():
        file_name = f"{query}.json"
        # file_path = os.path.join("query_responses", file_name)
        file_path = os.path.join("JSONs/query_responses", file_name)

        if os.path.exists(file_path):
            with open(file_path, "r") as file:
                data = json.load(file)

                if isinstance(data, list) and data and isinstance(data[0], list):
                    query_sentiment_scores = []

                    for articles in data:
                        for article in articles:
                            if isinstance(article, dict):
                                news_text = article.get("title", "") + " " + article.get("short_description", "") + " " + article.get("text", "")
                                sentiment_score = calculate_sentiment_score(news_text)
                                query_sentiment_scores.append(sentiment_score)

                    if query_sentiment_scores:
                        average_score = sum(query_sentiment_scores) / len(query_sentiment_scores)
                        sentiment_scores[query] = average_score

    print("Sentiment Scores:")
    print(len(sentiment_scores))  
    for query, score in sentiment_scores.items():
        print(f"{query}: {score:.2f}")

    save2db(sentiment_scores)
    print("Sentiment scores saved to MongoDB.")
    
    if sentiment_scores:
        return True
    else:
        return False

# sentiment_scores = analyze_sentiment_for_files()
# print("Sentiment Scores:")
# print(len(sentiment_scores))  
# for query, score in sentiment_scores.items():
#     print(f"{query}: {score:.2f}")

# save2db(sentiment_scores)
# print("Sentiment scores saved to MongoDB.")



# print(os.getenv("MONGO_DB_KEY"))