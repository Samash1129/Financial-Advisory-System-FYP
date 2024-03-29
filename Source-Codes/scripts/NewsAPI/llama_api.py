import math
from openai import OpenAI
import json
import os
from dotenv import load_dotenv
import re
import random

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.llama-api.com"
)


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
    # Define the model name and create a conversation object
    model_name = "llama-7b-chat"
    
    print("Conversation:", conversation)
    #Make the API call
    response = client.chat.completions.create(
        model=model_name,
        messages=conversation,
    )

    #response ="Success"
    # Extract and return the assistant's reply
    #print(response)
    reply = response.choices[0].message.content
    #reply = "Success"
    return reply


def load_conversation_history(conversation_id):
    conversation_file_path = f"./conversations/{conversation_id}.json"
    try:
        with open(conversation_file_path, "r") as conversation_file:
            conversation_history = json.load(conversation_file)
    except (FileNotFoundError, json.JSONDecodeError):
        conversation_history = []
    return conversation_history

def save_conversation_history(conversation_id, conversation_history):
    conversation_directory = "./conversations/"
    os.makedirs(conversation_directory, exist_ok=True)  # Create the directory if it doesn't exist
    conversation_file_path = os.path.join(conversation_directory, f"{conversation_id}.json")
    
    try:
        with open(conversation_file_path, "r") as conversation_file:
            # File exists, no need to create it
            pass
    except FileNotFoundError:
        # File doesn't exist, create it
        with open(conversation_file_path, "w") as conversation_file:
            json.dump([], conversation_file)  # Initialize with an empty list
    
    # Now open the file for writing and save the conversation history
    with open(conversation_file_path, "w") as conversation_file:
        json.dump(conversation_history, conversation_file, indent=2)


def main(conversation_id=None, user_input=None, ticker=None):
    conversation = []
    # Load conversation history if conversation ID is provided
    if conversation_id:
        print(conversation_id)
        conversation_file_path = f"./conversations/{conversation_id}.json"
        with open(conversation_file_path, "r") as conversation_id_file:
            conversation = json.load(conversation_id_file)

        conversation_history = load_conversation_history(conversation_id)
        conversation_history.append({"role": "user", "content": user_input})
        conversation.append({"role": "user", "content": user_input})
        assistant_reply = openai_chat(conversation_history)
        conversation_history.append({"role": "system", "content": assistant_reply})
        conversation.append({"role": "system", "content": assistant_reply})
        print("elevy :", assistant_reply)
        # Save the updated conversation history to the JSON file
        save_conversation_history(conversation_id, conversation_history)
    else:
        conversation_id = str(random.randrange(100000000, 999999999))
        print("Conversation ID:", conversation_id)
        conversation_history = []
        company_name = parse_company_name(ticker)
        if company_name:
            print("Company Name:", company_name)
        summaries = load_news_summaries(ticker)
        conversation_content = f"You are elevy by elev8.ai that helps naive investors in investing in the Pakistan Stock Exchange, your job is to help based on facts given with the user about {company_name}. Latest Relevant news :{summaries}"
        conversation = [{"role": "system", "content": conversation_content}]
        conversation_history.append({"role": "system", "content": conversation_content})
        conversation.append({"role": "user", "content": user_input})
        assistant_reply = openai_chat(conversation_history)
        conversation_history.append({"role": "system", "content": assistant_reply})
        conversation.append({"role": "system", "content": assistant_reply})
        print("elevy :", assistant_reply)
        save_conversation_history(conversation_id, conversation_history)

    return conversation_id, conversation



