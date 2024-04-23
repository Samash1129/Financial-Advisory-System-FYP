from fastapi import FastAPI
from fastapi.responses import JSONResponse
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/api_server.py
from newsapi import fetch_news_for_all_queries
from summary import process_data
from analyze import analyze_sentiment_for_files
from analyze2 import analyze_sentiment_for_files_vader
from llama_api import main
=======
from newsapi2 import fetch_news_for_all_queries
from summary import process_data
from analyze_textblob import analyze_sentiment_for_files
from analyze_vader import analyze_sentiment_for_files_vader
from summary import llama_process
from llama_api import start_conversation_helper
from dotenv import load_dotenv
load_dotenv()
# from ml_models.BankingIndustry.highLow_Banking import main_hl_banking
import driver

>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/api_server.py
import json
from fastapi import HTTPException

app = FastAPI()


<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/api_server.py
with open("queries.json", "r") as queries_file:
=======
# with open("queries.json", "r") as queries_file:
with open("JSONs/queries.json", "r") as queries_file:
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/api_server.py
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

<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/api_server.py

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
=======
    

@app.get('/process-summary')
async def summary():
    try:
        success = process_data()
        print(success)
        if success:  
            status_code = 200
            content = "Successfully Loaded"
        else:
            status_code = 404
            content = "Could not be Loaded"
        
        print("status_code" + status_code + "content"+ content)
        return {"status_code": status_code, "content": content}
    
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/api_server.py
    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}



<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/api_server.py


@app.post("/start-conversation")
async def start_conversation(user_input: str, conversation_id: int = None, ticker: str = None):
=======
@app.post("/start-conversation")
async def start_conversation(user_input: str, conversation_id: str = None, ticker: str = None):
>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/api_server.py
    print(conversation_id, user_input, ticker)
    
    if conversation_id is None and ticker is None:
        raise HTTPException(status_code=400, detail="Either 'conversation_id' or 'ticker' must be provided.")
<<<<<<< HEAD:Source-Codes/scripts/NewsAPI/api_server.py
    
    conversation_id, conversation_history = main(conversation_id=conversation_id, user_input=user_input, ticker=ticker)
    return {"conversation_id": conversation_id, "conversation_history": conversation_history}
=======
    try:
        # Await the execution of the start_conversation function
        conversation_id, conversation_history = await start_conversation_helper(conversation_id, user_input, ticker)
        # Return the conversation_id and conversation_history as a dictionary
        return {"conversation_id": conversation_id, "conversation_history": conversation_history}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")



@app.post("/generate-summary-llama")
async def generate_summary_llama():

    try:
        result = llama_process()
        
        if result:
            return JSONResponse(content={"status_code": 200, "content": "Successfully generated summaries"})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Could not generate summaries"})

    except Exception as e:
        print(f"Error occured : {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.get("/generate-fundementals")
async def generate_fundementals():
    try:
        result = await driver.fundValDriver()
        if result==True:
            return JSONResponse(content={"status_code": 200, "content": "Successful"})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Invalid Request"})

    except Exception as e:
        print(f"Error occured : {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

>>>>>>> AliMashoud:Source-Codes/server/scripts/Helpers/api_server.py
