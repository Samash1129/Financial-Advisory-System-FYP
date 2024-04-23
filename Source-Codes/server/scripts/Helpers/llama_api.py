import math
from openai import OpenAI
import json
import os
from dotenv import load_dotenv
import re
import random
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
=======
import asyncio
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.llama-api.com"
)

<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py

def load_news_summaries(ticker):
    # Define the directory containing the JSON files
    summary_directory = "summary"
=======
def load_news_summaries(ticker):
    # Define the directory containing the JSON files
    # summary_directory = "summary_processed"
    summary_directory = "JSONs/summary_processed"
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py

    # Construct the file path for the JSON file based on the security ticker
    file_path = os.path.join(summary_directory, f"{ticker}.json")

    # Check if the file exists
    if not os.path.exists(file_path):
        print(f"No news summaries found for '{ticker}'.")
        return []

    # Load the JSON file
    with open(file_path, "r") as json_file:
        data = json.load(json_file)

<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
    # Extract only the text from each article
    summaries = [article_info["summary"] for article_info in data]

    return summaries
=======
    data = data.replace('\n', '')

    return data

>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py



def parse_company_name(ticker):
    with open("queries.json", "r") as queries_file:
        queries_data = json.load(queries_file)
        queries = queries_data.get("queries", {})
    
    for query, company_ticker in queries.items():
        if company_ticker.lower() == ticker.lower():
            company_name = re.sub(r'Share Stock$', '', query)
            return company_name.strip()
    return None



<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
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
=======
async def openai_chat(conversation):
    # Define the model name and create a conversation object
    model_name = "llama-7b-chat"
    #Make the API call
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=conversation,
        )
    except Exception as e:
        print(f"Error occurred: {e}")
        return {"message": "Error occurred"}

    reply = response.choices[0].message.content
    #print("Assistant Reply: ", reply)
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py
    return reply


def load_conversation_history(conversation_id):
    conversation_file_path = f"./conversations/{conversation_id}.json"
    try:
        with open(conversation_file_path, "r") as conversation_file:
            conversation_history = json.load(conversation_file)
    except (FileNotFoundError, json.JSONDecodeError):
        conversation_history = []
    return conversation_history

<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
=======

>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py
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


<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
def main(conversation_id=None, user_input=None, ticker=None):
    conversation = []
    # Load conversation history if conversation ID is provided
    if conversation_id:
=======


async def start_conversation_helper(conversation_id: str, user_input: str, ticker: str):
    # Your start_conversation logic here
    conversation = []
    if conversation_id:
        # Load conversation history if conversation ID is provided
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py
        print(conversation_id)
        conversation_file_path = f"./conversations/{conversation_id}.json"
        with open(conversation_file_path, "r") as conversation_id_file:
            conversation = json.load(conversation_id_file)
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py

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
=======
        conversation = load_conversation_history(conversation_id)

        conversation.append({"role": "user", "content": user_input})
        assistant_reply = await openai_chat(conversation)
        conversation.append({"role": "assistant", "content": assistant_reply})
        print("elevy :", assistant_reply)

        save_conversation_history(conversation_id, conversation)
    else:
        # Generate a new conversation ID if not provided
        conversation_id = str(random.randrange(100000000, 999999999))
        print("Conversation ID:", conversation_id)
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py
        company_name = parse_company_name(ticker)
        if company_name:
            print("Company Name:", company_name)
        summaries = load_news_summaries(ticker)
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py
        conversation_content = f"You are elevy by elev8.ai that helps naive investors in investing in the Pakistan Stock Exchange, your job is to help based on facts given with the user about {company_name}. Latest Relevant news :{summaries}"
        conversation = [{"role": "system", "content": conversation_content}]
        conversation_history.append({"role": "system", "content": conversation_content})
        conversation.append({"role": "user", "content": user_input})
        assistant_reply = openai_chat(conversation_history)
        conversation_history.append({"role": "system", "content": assistant_reply})
        conversation.append({"role": "system", "content": assistant_reply})
        print("elevy :", assistant_reply)
        save_conversation_history(conversation_id, conversation_history)
=======
        system_content = f"You are elevy by elev8, a PSX investor help app. Identify as elevy only. Generate concise and informative responses for investors seeking insights on stocks listed on the Pakistan Stock Exchange particularly {company_name}. Some Relevant news :{summaries}. Your goal is to provide clear and factual information about companies, their fundamentals, and the latest news. Ensure that responses are brief, ideally less than 100 words, and aim for a target length of around 50 words to maintain clarity and relevance."
        conversation = [{"role": "system", "content": system_content}]
        conversation.append({"role": "user", "content": user_input})
        assistant_reply = await openai_chat(conversation)
        conversation.append({"role": "assistant", "content": assistant_reply})
        print("elevy :", assistant_reply)
        save_conversation_history(conversation_id, conversation)
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py

    return conversation_id, conversation


<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/llama_api.py

=======
async def test():
    while True:
        user_input = input("Enter user input: ")
        if user_input == "exit":
            break
        conversation_id = input("Enter conversation ID: ")
        ticker = input("Enter ticker: ")

        conversation_id, conversation_history = await start_conversation_helper(conversation_id, user_input, ticker)
        print("Conversation ID:", conversation_id)
        # print("Conversation History:", conversation_history)
        print("\n")
        

# asyncio.run(test())
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/llama_api.py
