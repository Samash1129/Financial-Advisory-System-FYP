import os
import json
import pandas as pd

def findAllPrices():
    
    file_path = 'Ratios/ratios.csv'  
    df = pd.read_csv(file_path)

    unique_pairs = df[['Ticker Symbol', 'Security Name']].drop_duplicates()
    unique_pairs_list = unique_pairs.to_dict('records')

    price_data = []

    folder_path = 'JSONs/Close_Values'

    # Iterate through the unique pairs
    for pair in unique_pairs_list:
        ticker_symbol = pair['Ticker Symbol']
        security_name = pair['Security Name']
        file_name = f"{ticker_symbol}_close_values.json"
        file_path = os.path.join(folder_path, file_name)

        # Check if the JSON file exists
        if os.path.exists(file_path):
            # Load the JSON file
            with open(file_path, 'r') as file:
                data = json.load(file)
                historical_values = data.get('HistoricalVal', [])
                
                # Check if 'HistoricalVal' array is not empty
                if historical_values:
                    # Get the "Value" from the last object in the "HistoricalVal" array
                    last_value = historical_values[-1].get('Value', None)
                    
                    # Store the extracted data in the price_data array
                    price_data.append({
                        'Ticker': ticker_symbol,
                        'Name': security_name,
                        'Price': last_value
                    })

    return price_data