from fastapi import FastAPI
from fastapi.responses import JSONResponse
from newsapi import fetch_news_for_all_queries
from summary import process_data
from analyze import analyze_sentiment_for_files
from analyze2 import analyze_sentiment_for_files_vader
from llama_api import main
import json
from fastapi import HTTPException

app = FastAPI()


with open("queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])
print(queries)

@app.get('/fetch-news')
async def fetch_news_endpoint():
    try:
        success = fetch_news_for_all_queries()
        if success:  # Check if fetch_news_for_all_queries was successful
            status_code = 200
            return {"status_code": status_code, "content": "Successfully Loaded"}
        else:
            status_code = 404
            # Handle the case when fetch_news_for_all_queries was not successful
            return {"status_code": status_code, "content": "Could not be Loaded"}
    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}



@app.get('/analyze-sentiment')
async def analyze():
    try:
        success = analyze_sentiment_for_files()
        if success:  # Check if fetch_news_for_all_queries was successful
            status_code = 200
            return {"status_code": status_code, "content": "Successfully Loaded"}
        else:
            status_code = 404
            # Handle the case when fetch_news_for_all_queries was not successful
            return {"status_code": status_code, "content": "Could not be Loaded"}
    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}

@app.get('/analyze-sentiment-vader')
async def analyze_with_vader():
    try:
        success = analyze_sentiment_for_files_vader()
        if success:  # Check if fetch_news_for_all_queries was successful
            status_code = 200
            return {"status_code": status_code, "content": "Successfully Loaded"}
        else:
            status_code = 404
            # Handle the case when fetch_news_for_all_queries was not successful
            return {"status_code": status_code, "content": "Could not be Loaded"}
    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}


@app.get('/generate-summary')
async def summary():
    try:
        success = process_data()
        if success:  # Check if fetch_news_for_all_queries was successful
            status_code = 200
            return {"status_code": status_code, "content": "Successfully Loaded"}
        else:
            status_code = 404
            # Handle the case when fetch_news_for_all_queries was not successful
            return {"status_code": status_code, "content": "Could not be Loaded"}
    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}





@app.post("/start-conversation")
async def start_conversation(user_input: str, conversation_id: int = None, ticker: str = None):
    print(conversation_id, user_input, ticker)
    
    if conversation_id is None and ticker is None:
        raise HTTPException(status_code=400, detail="Either 'conversation_id' or 'ticker' must be provided.")
    
    conversation_id, conversation_history = main(conversation_id=conversation_id, user_input=user_input, ticker=ticker)
    return {"conversation_id": conversation_id, "conversation_history": conversation_history}
