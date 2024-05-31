import os
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pymongo
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

with open("JSONs/queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", {})

def calculate_sentiment_score_vader(text):
    analyzer = SentimentIntensityAnalyzer()
    compound_score = analyzer.polarity_scores(text)["compound"]
    return compound_score

def save_vader_scores_to_db(sentiment_scores):
    # Connect to MongoDB
    client = pymongo.MongoClient(os.getenv("MONGO_DB_KEY"))
    db = client["news"]
    collection = db["vader_sentiment"]

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

def analyze_sentiment_for_files_vader():
    sentiment_scores_vader = {}

    for query in queries.values():
        file_name = f"{query}.json"
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
                                sentiment_score = calculate_sentiment_score_vader(news_text)
                                query_sentiment_scores.append(sentiment_score)

                    if query_sentiment_scores:
                        average_score = sum(query_sentiment_scores) / len(query_sentiment_scores)
                        sentiment_scores_vader[query] = average_score


    print("Sentiment Scores using VADER:")
    print(len(sentiment_scores_vader))  
    for query, score in sentiment_scores_vader.items():
        print(f"{query}: {score:.2f}")
    save_vader_scores_to_db(sentiment_scores_vader)
    print("Sentiment scores saved to MongoDB.")
    if sentiment_score:
        return True
    else:
        return False



# sentiment_scores_vader = analyze_sentiment_for_files_vader(queries)

# print("Sentiment Scores using VADER:")
# print(sentiment_scores_vader)
# save_vader_scores_to_db(sentiment_scores_vader)
# print("Sentiment scores saved to MongoDB.")
