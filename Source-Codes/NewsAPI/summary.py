import os
import json
import re
import codecs
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import pymongo
from dotenv import load_dotenv
from datetime import datetime

MONGO_DB_KEY = os.getenv("MONGO_DB_KEY")
client = pymongo.MongoClient(MONGO_DB_KEY)
db = client["news"]
collection = db["article_summaries"]


with open("queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", {})


def generate_summary(text, language='english'):

    parser = PlaintextParser.from_string(text, Tokenizer(language))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, 5)
    return ' '.join(str(sentence) for sentence in summary)

def save_summaries_to_db(articles_info, ticker):
    for article_info in articles_info:
        article_info["stock_ticker"] = ticker
        filter_query = {
            "stock_ticker": ticker,
            "article_info.title": article_info["title"]
        }
        update_query = {
            "$addToSet": {
                "article_info": article_info
            },
            "$set": {
                "updated_at": datetime.now(),
                "stock_ticker": ticker
            }
        }
        collection.update_one(filter_query, update_query, upsert=True)


def process_data(directory, summary_directory):

    for query, ticker in queries.items():
        file_name = f"{ticker}.json"
        file_path = os.path.join(directory, file_name)
        summary_file_path = os.path.join(summary_directory, f"{ticker}.json")

        if os.path.exists(file_path):
            with open(file_path, "r") as json_file:
                data = json.load(json_file)

            print(f"Processing data from '{file_name}'...")
            articles_info = []
            summaries = ""  # Initialize a list to store individual summaries
            for articles in data:
                for article in articles:
                    title = article.get("title", "")
                    date = article.get("date", "")
                    text = article.get("text", "")

                    processed_text = text.replace("\n", " ")

                    company_name = query.replace("Share Stock", "")
                    company_name = company_name.replace("Ltd", "")
                    company_name = company_name.replace("Limited", "")

                    company_name = company_name.strip().lower()
                    processed_text = processed_text.strip().lower()
                    company_name = re.sub(r'[^\w\s]', '', company_name)
                    processed_text = re.sub(r'[^\w\s]', '', processed_text)
                    

                    to_summarize = company_name in processed_text

                    
                    summary = ""

                    

                    if to_summarize:
                        summaries+=text
                        summary=generate_summary(text)

                    summary = summary.replace("\n", " ")
                    summary = summary.replace('\\', "")
                    summary = re.sub(r'[^\w\s]', '', summary)
                    decoded_text = codecs.decode(summary, 'unicode_escape')
                    encoded_text = decoded_text.encode('utf-8')
                    summary = encoded_text.decode('utf-8')

                    
                    article_info = {
                        "title": title,
                        "date": date,
                        "summary": summary,
                    }
                    to_print = {
                        "title": title,
                        "date": date,
                        "to_summarize": to_summarize,
                        #"text": text,
                        "summary": summary,
                    }

                    if to_summarize:
                        articles_info.append(article_info)

                        #print(to_print)        
                        #print()              


            if articles_info:
                #print(article_info)
                #save_summaries_to_db(articles_info, ticker)
                with open(summary_file_path, "w") as summary_file:
                    json.dump(articles_info, summary_file, indent=4)

            #print("Complete Summary for", ticker, ":", summaries)
            #print("Summary for", ticker, generate_summary(summaries))
            print()

    print()
    print("Processing complete. Total files processed:", len(os.listdir(directory)))

# Paths
queries_file_path = "queries.json"
directory = "query_responses_test"
summary_directory = "summary"

process_data(directory, summary_directory)

