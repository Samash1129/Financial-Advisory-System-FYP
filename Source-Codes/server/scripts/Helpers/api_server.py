from fastapi import HTTPException
import json
from pydantic import BaseModel
from generate_Recommendations import genRec
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from newsapi2 import fetch_news_for_all_queries
from summary import process_data
from analyze_textblob import analyze_sentiment_for_files
from analyze_vader import analyze_sentiment_for_files_vader
from summary import llama_process
from llama_api import start_conversation_helper, load_conversation_history
import driver
from stock_prices import findAllPrices

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

class CompanyName(BaseModel):
    company: str

class ConversationData(BaseModel):
    user_input: str
    conversation_id: str
    ticker: str


class ConversationID(BaseModel):
    conversation_id: str


class RecommendationRequest(BaseModel):
    risk_tolerance: str
    stock_type: str
    duration: str


with open("JSONs/queries.json", "r") as queries_file:
    queries_data = json.load(queries_file)
    queries = queries_data.get("queries", [])
print(queries)


@app.get("/hello-python")
async def hello_python():
    return {"message": "Hello! Python is running!"}


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

        print("status_code" + status_code + "content" + content)
        return {"status_code": status_code, "content": content}

    except Exception as e:
        status_code = 500
        # Handle the exception
        return {"status_code": status_code, "content": "Something went wrong"}


@app.post("/start-conversation")
async def start_conversation(data: ConversationData):
    user_input = data.user_input
    conversation_id = data.conversation_id
    ticker = data.ticker
    print(conversation_id, user_input, ticker)

    if conversation_id is None and ticker is None:
        raise HTTPException(
            status_code=400, detail="Either 'conversation_id' or 'ticker' must be provided.")
    try:
        # Await the execution of the start_conversation function
        conversation_id, conversation_history = await start_conversation_helper(conversation_id, user_input, ticker)
        # Return the conversation_id and conversation_history as a dictionary
        return {"conversation_id": conversation_id, "conversation_history": conversation_history}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.post("/load-conversation")
async def load_conversation(data: ConversationID):
    conversation_id = data.conversation_id
    return load_conversation_history(conversation_id)


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
        if result:
            return JSONResponse(content={"status_code": 200, "content": "Successful"})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Invalid Request"})

    except Exception as e:
        print(f"Error occured : {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.post("/generate-recommendations")
async def generate_recommendations(data: RecommendationRequest):
    try:
        risk_tolerance = data.risk_tolerance
        stock_type = data.stock_type
        duration = data.duration

        result = genRec(risk_tolerance, stock_type, duration)
        print(result)
        if result:
            return JSONResponse(content={"status_code": 200, "content": result})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Invalid Request"}) 
        
    except Exception as e:
        print(f"Error occured : {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.get("/generate-prices")
async def generate_prices():
    try:
        result = findAllPrices()
        return result

    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/getCloseVals")
async def get_close_values(data: CompanyName):
    company = data.company
    try:
        with open(f"JSONs/Close_Values/{company}_close_values.json", "r") as queries_file:
            queries_data = json.load(queries_file)
        if queries_data:
            return JSONResponse(content={"status_code": 200, "content": "Successful", "result": queries_data})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Invalid Request"})
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    
@app.post("/getFundVals")
async def get_fund_vals(data: CompanyName):
    company = data.company
    try:
        with open(f"JSONs/Fundamental_Values/{company}_fundamental_values.json", "r") as queries_file:
            queries_data = json.load(queries_file)
        if queries_data:
            return JSONResponse(content={"status_code": 200, "content": "Successful", "result": queries_data})
        else:
            return JSONResponse(content={"status_code": 404, "content": "Invalid Request"})
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
