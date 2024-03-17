import os
import json
from textblob import TextBlob
import pymongo

with open("queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])


def save2db(sentiment_scores):
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb+srv://dev:CITsI6uEkchPWJmV@elev8.rzawmjq.mongodb.net/")
    db = client["news"]
    collection = db["sentiment"]

    for query, score in sentiment_scores.items():
        query_filter = {"query": query}
        update_query = {"$set": {"sentiment_score": score}}
        collection.update_one(query_filter, update_query, upsert=True)

    client.close()


def calculate_sentiment_score(text):
    # Perform sentiment analysis using TextBlob
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    return sentiment_score


def analyze_sentiment_for_files(queries):
    sentiment_scores = {}

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
                                sentiment_score = calculate_sentiment_score(news_text)
                                query_sentiment_scores.append(sentiment_score)

                    # Calculate average sentiment score for the query
                    if query_sentiment_scores:
                        average_score = sum(query_sentiment_scores) / len(query_sentiment_scores)
                        sentiment_scores[query] = average_score

    return sentiment_scores


# Example usage:
sentiment_scores = analyze_sentiment_for_files(queries)
print("Sentiment Scores:")
print(len(sentiment_scores))  # Add this line for debugging
for query, score in sentiment_scores.items():
    print(f"{query}: {score:.2f}")

#save2db(sentiment_scores)
print("Sentiment scores saved to MongoDB.")

