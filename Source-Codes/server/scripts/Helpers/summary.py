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
import asyncio
from openai import OpenAI


load_dotenv()
import nltk
from nltk.tokenize import word_tokenize

LLAMA = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.llama-api.com"
)


queries_file_path = "queries.json"
directory = "JSONs/query_responses"
summary_directory = "summary"

MONGO_DB_KEY = os.getenv("MONGO_DB_KEY")
client = pymongo.MongoClient(MONGO_DB_KEY)
db = client["news"]
collection = db["article_summaries"]

processed_collection = db["processed_news"] 


# with open("queries.json", "r") as queries_file:
with open("JSONs/queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", {})


def generate_summary(text, language='english'):
    parser = PlaintextParser.from_string(text, Tokenizer(language))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, 2)
    return ' '.join(str(sentence) for sentence in summary)

def save_summaries_to_db(articles_info, ticker, collection):
    for article_info in articles_info:
        article_info["stock_ticker"] = ticker
        filter_query = {
            "stock_ticker": ticker,
            "article_info.title": article_info["title"],
        }
        update_query = {
            "$set": {
                "updated_at": datetime.now(),
                "stock_ticker": ticker
            }
        }
        # Check if the field 'article_info' exists and is an array
        if collection.find_one(filter_query) and isinstance(collection.find_one(filter_query).get("article_info"), list):
            update_query["$addToSet"] = {
                "article_info": article_info
            }
        else:
            # If 'article_info' doesn't exist or is not an array, create a new array
            update_query["$set"]["article_info"] = [article_info]

        collection.update_one(filter_query, update_query, upsert=True)
        

def process_data():
    for query, ticker in queries.items():
        file_name = f"{ticker}.json"
        file_path = os.path.join(directory, file_name)
        summary_file_path = os.path.join(summary_directory, f"{ticker}.json")

        if os.path.exists(file_path):
            with open(file_path, "r") as json_file:
                try:
                    data = json.load(json_file)  # Load JSON data from the file
                except json.JSONDecodeError as e:
                    print(f"Error loading JSON from {file_name}: {e}")
                    continue  # Skip processing this file if JSON is invalid

            print(f"Processing data from '{file_name}'...")
            articles_info = []
            summaries = ""  # Initialize a list to store individual summaries

            for article_list in data:  # Iterate over each inner list
                for article in article_list:  # Iterate over articles in the inner list
                    title = article.get("title", "")
                    date = article.get("date", "")
                    text = article.get("text", "")
                    short_description = article.get("short_description", "")

                    # Your processing logic goes here...


def process_data():
        for query, ticker in queries.items():
            file_name = f"{ticker}.json"
            file_path = os.path.join(directory, file_name)
            summary_file_path = os.path.join(summary_directory, f"{ticker}.json")

            if os.path.exists(file_path):
                with open(file_path, "r") as json_file:
                    try:
                        data = json.load(json_file)  # Load JSON data from the file
                    except json.JSONDecodeError as e:
                        print(f"Error loading JSON from {file_name}: {e}")
                        continue  # Skip processing this file if JSON is invalid

                print(f"Processing data from '{file_name}'...")
                articles_info = []
                summaries = ""  # Initialize a list to store individual summaries
                
                for article_list in data:  # Iterate over each inner list
                    for article in article_list: 
                        title = article.get("title", "")
                        date = article.get("date", "")
                        text = article.get("text", "")
                        short_description = article.get("short_description", "")


                        processed_title = title.replace("\n", " ")

                        processed_desc = short_description.replace("\n", " ")

                        company_name = query.replace("Share Stock", "")
                        company_name = company_name.replace("Ltd", "")
                        company_name = company_name.replace("Limited", "")
                        company_name = company_name.replace("Pakistan", "")

                        company_name = company_name.strip().lower()
                        processed_title = processed_title.strip().lower()
                        processed_desc = processed_desc.strip().lower()

                        company_name = re.sub(r'[^\w\s.]', '', company_name)
                        processed_title = re.sub(r'[^\w\s.]', '', processed_title)

                        # Split text into tokens (words or numbers)
                        tokens = re.findall(r'\b(?:\d+(?:\.\d*)?|\.\d+)\b|\b\w+\b', processed_desc)

                        # Process each token individually
                        processed_tokens = []
                        for token in tokens:
                            # Check if the token is a numerical value
                            if token.replace('.', '').isdigit():
                                processed_token = token  # Preserve numerical value with dots
                            else:
                                processed_token = re.sub(r'[^\w\s.]', '', token)  # Process non-numeric tokens
                            processed_tokens.append(processed_token)

                        # Join processed tokens back into a single string
                        processed_desc = ' '.join(processed_tokens)

                        to_summarize1 = company_name in text.lower()
                        to_summarize2 = company_name in processed_title
                        to_summarize3 = "india" in text.lower()

                        to_summarize = (to_summarize1 or to_summarize2) and not(to_summarize3)

                        summary = ""

                        if to_summarize:
                            summaries += text
                            summary = generate_summary(text)
                        print("Title:", title, "\nDate:", date, "\nTo Summarize:", to_summarize)

                        summary = summary.replace("\n", " ")
                        summary = summary.replace('\\', "")
                        summary = re.sub(r'[^\w\s.]', '', summary)  # Preserving '.' in the summary to ensure values are correctly summarized
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
                            "text" : text,
                            "to_summarize": to_summarize,
                            "summary": summary,
                        }

                        if to_summarize:
                            articles_info.append(article_info)
                            #print(article_info)

            print("\n")

            if articles_info:
                save_summaries_to_db(articles_info, ticker, collection)
                with open(summary_file_path, "w") as summary_file:
                    json.dump(articles_info, summary_file, indent=4)

        print("Processing complete. Total files processed:", len(os.listdir(directory)))
        return "Processing complete. Total files processed:", len(os.listdir(directory))



def load_news_summaries(ticker):
    # Define the directory containing the JSON files
    summary_directory = "summary"

    # Construct the file path for the JSON file based on the security ticker
    file_path = os.path.join(summary_directory, f"{ticker}.json")

    # Check if the file exists
    if not os.path.exists(file_path):
        print(f"No news summaries found for '{ticker}'.")
        return []

    # Load the JSON file
    with open(file_path, "r") as json_file:
        data = json.load(json_file)

    # Extract only the text from each article
    summaries = [article_info["summary"] for article_info in data]

    return summaries


def parse_company_name(ticker):
    with open("queries.json", "r") as queries_file:
        queries_data = json.load(queries_file)
        queries = queries_data.get("queries", {})
    
    for query, company_ticker in queries.items():
        if company_ticker.lower() == ticker.lower():
            company_name = re.sub(r'Share Stock$', '', query)
            return company_name.strip()
    return None



def openai_chat(conversation):
    model_name = "llama-7b-chat"
    #Make the API call
    try:
        response = LLAMA.chat.completions.create(
            model=model_name,
            messages=conversation,
        )
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return {"message": "Error occurred"}
    
    reply = response.choices[0].message.content
    print("Assistant Reply: ", reply)
    return reply

def saveprocessedsummary2db():
    processed_directory = "summary_processed"
    for query, ticker in queries.items():
        summary_file_path = os.path.join(summary_directory, f"{ticker}.json")

        if os.path.exists(processed_directory):
            with open(processed_directory, "r") as summary_file:
                articles_info = json.load(summary_file)

            if articles_info:
                save_summaries_to_db(articles_info, ticker, processed_collection)               
                print(f"Summaries for '{ticker}' saved to the database.")

    print("All summaries processed and saved to the database.")


async def llama_process():
    conversations = []
    summary_processed_directory = "summary_processed"
    count=0
    
    for query, ticker in queries.items():
        count+=1
        conversations = []
        # Load news summary into a string
        summary = load_news_summaries(ticker)
        #print("Summary for", ticker, ":", summary)
        company = parse_company_name(ticker)
        conversation_content=""

        conversation_content = f"Summarize the following news articles about {company} {ticker} listed on the PSX. Only respond with summary once news is provided"
        conversation = [{"role": "system", "content": conversation_content}]
        
        # print("\n")
        # print(conversation)
        # print("\n")
        
        model_name = "llama-7b-chat"

        response = LLAMA.chat.completions.create(
            model=model_name,
            messages=conversation,
            max_tokens=50,
        )

        #print(response)
        
        reply = response.choices[0].message.content

        #reply = "This is a test reply."
        print("Assistant Reply: ", reply)
        
        conversation.append({"role": "assistant", "content": reply}) 
        print(summary)

        summary_text = "Please summarize (Only respond with summary, no other text so that your summary can be processed straight away by sentiment engine): ".join(summary)  # Convert the list of strings to a single string
        conversation.append({"role": "user", "content": summary_text})  # Append the summary as a user message

        #print(conversation)

        response = LLAMA.chat.completions.create(
            model=model_name,
            messages=conversation,
            max_tokens=300,
        )

        reply = response.choices[0].message.content
        print(f"Assistant Reply after being provided summary for {ticker}: ", reply)

        conversation.append({"role": "assistant", "content": reply}) 

        print("\n")

        #print("Conversation for", ticker, ":", conversation)

        # Save the conversation to a JSON file
        output_file_path = os.path.join(summary_processed_directory, f"{ticker}.json")
        with open(output_file_path, "w") as output_file:
            json.dump(reply, output_file, indent=4)
        print(f"Conversation for '{ticker}' saved to '{output_file_path}'")

        

    if conversations:
        return True
    else:
        return False



#process_data()

#asyncio.run(llama_process())


