import os
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pymongo
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

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

def analyze_sentiment_for_files_vader(queries):
    sentiment_scores_vader = {}

    # Iterate over each query in the list
    for query in queries:
        file_name = f"{query}.json"
        file_path = os.path.join("query_responses_test", file_name)

        # Check if the JSON file exists
        if os.path.exists(file_path):
            with open(file_path, "r") as file:
                data = json.load(file)

                # Ensure that data is a list containing a list of dictionaries
                if isinstance(data, list) and data and isinstance(data[0], list):
                    query_sentiment_scores = []

                    # Iterate over articles in the JSON file
                    for articles in data:
                        for article in articles:
                            if isinstance(article, dict):
                                news_text = article.get("title", "") + " " + article.get("short_description", "") + " " + article.get("text", "")
                                sentiment_score = calculate_sentiment_score_vader(news_text)
                                query_sentiment_scores.append(sentiment_score)

                    # Calculate average sentiment score for the query
                    if query_sentiment_scores:
                        average_score = sum(query_sentiment_scores) / len(query_sentiment_scores)
                        sentiment_scores_vader[query] = average_score

    return sentiment_scores_vader

# Load queries from JSON file
with open("queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", {})

# Analyze sentiment scores using VADER
sentiment_scores_vader = analyze_sentiment_for_files_vader(queries)

# Save sentiment scores to MongoDB and print them
print("Sentiment Scores using VADER:")
print(sentiment_scores_vader)
save_vader_scores_to_db(sentiment_scores_vader)
print("Sentiment scores saved to MongoDB.")
