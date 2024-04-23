import json
import os
from datetime import datetime, timedelta
from psx import stocks
import highVal_Banking
import openVal_Banking
import lowVal_Banking
import closeVal_Banking
import fundVal_Banking
import time
from dotenv import load_dotenv
load_dotenv()

async def fundValDriver():
    while True:
        try:
            CompaniesJsonFileLocation = os.getenv("companies_path")
            # CompaniesJsonFileLocation = 'companies.json'

            # Load companies from the JSON file
            with open(CompaniesJsonFileLocation, 'r') as f:
                companies_data = json.load(f)

            # Extract company names and symbols from the loaded data
            companies = [symbol for _, symbol in companies_data['Banking'].items()]

            # Set start_date to 10 years prior to the current date
            starting_date = (datetime.now() - timedelta(days=1)) - timedelta(days=365 * 10)
            # Set end_date to the day before the current date
            ending_date = datetime.today() - timedelta(days=1)

            # Convert datetime objects to strings without time
            start_date_str = starting_date.strftime('%Y-%m-%d')
            end_date_str = ending_date.strftime('%Y-%m-%d')

            startdate = datetime.strptime(f'{start_date_str}', "%Y-%m-%d")
            enddate = datetime.strptime(f'{end_date_str}', "%Y-%m-%d")

            print("Companies: ", companies)

            for company in companies:
                df = stocks(company, start=startdate, end=enddate)
                
                # Executing openVal_Banking.py
                print(f"Executing openVal_Banking.py for {company}")
                openVal_Banking.main(company, df, startdate, enddate)
                
                # Executing closeVal_Banking.py
                print(f"Executing closeVal_Banking.py for {company}")
                closeVal_Banking.main(company, df, startdate, enddate)
                
                # Executing highVal_Banking.py
                print(f"Executing highVal_Banking.py for {company}")
                highVal_Banking.main(company, df, startdate, enddate)
                
                # Executing lowVal_Banking.py
                print(f"Executing lowVal_Banking.py for {company}")
                lowVal_Banking.main(company, df, startdate, enddate)
                
                # Extracting Fundamental Values from the above executions
                print(f"Extracting Fundamental Values from the above executions for {company}")
                fundVal_Banking.main(company)
        
        except Exception as e:
            print(f"Exception occurred: {e}")
            print("Restarting...")
            time.sleep(5)  # Wait for 5 seconds before restarting
        else:
            print("All companies processed. Exiting...")
            break  # Exit the while loop after processing all companies

# if __name__ == "__main__":
#     main()
