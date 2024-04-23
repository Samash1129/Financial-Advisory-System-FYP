import json
import os


def main(company):
    openRates = f"JSONs/Open_Values/{company}_open_values.json"
    closeRates = f"JSONs/Close_Values/{company}_close_values.json"
    highRates = f"JSONs/High_Values/{company}_high_values.json"
    lowRates = f"JSONs/Low_Values/{company}_low_values.json"

    # Read Open Rates
    with open(openRates, 'r') as OR:
        companyOpenRate = json.load(OR)

    # Read Close Rates
    with open(closeRates, 'r') as CR:
        companyCloseRate = json.load(CR)

    # Read Close Rates
    with open(highRates, 'r') as HR:
        companyHighRate = json.load(HR)

    # Read Close Rates
    with open(lowRates, 'r') as LR:
        companyLowRate = json.load(LR)

    # Extracting the Historical (last 10 days) High & Low Values
    hist_high_vals = companyHighRate['HistoricalVal'][-10:]

    historical_max_high = float('-inf')
    historical_max_high_date = None

    for val in hist_high_vals:
        high = val['Value']
        date = val['Date']
        if high > historical_max_high:
            historical_max_high = high
            historical_max_high_date = date

    hist_low_vals = companyLowRate['HistoricalVal'][-10:]

    historical_min_low = float('inf')
    historical_min_low_date = None

    for val in hist_low_vals:
        low = val['Value']
        date = val['Date']
        if low < historical_min_low:
            historical_min_low = low
            historical_min_low_date = date

    # Extracting the Predicted (next 10 days) High & Low Values
    pred_high_vals = companyHighRate['PredictedVal'][-10:]

    predicted_max_high = float('-inf')
    predicted_max_high_date = None

    for val in pred_high_vals:
        high = val['Value']
        date = val['Date']
        if high > predicted_max_high:
            predicted_max_high = high
            predicted_max_high_date = date

    pred_low_vals = companyLowRate['PredictedVal'][-10:]

    predicted_min_low = float('inf')
    predicted_min_low_date = None

    for val in pred_low_vals:
        low = val['Value']
        date = val['Date']
        if low < predicted_min_low:
            predicted_min_low = low
            predicted_min_low_date = date

    # Extracting the Predicted open & close values (next day)
    pred_open_val = companyOpenRate['PredictedVal'][:1]
    for val in pred_open_val:
        openVal = val['Value']
        openDate = val['Date']
        break

    pred_close_val = companyCloseRate['PredictedVal'][:1]
    for val in pred_close_val:
        closeVal = val['Value']
        closeDate = val['Date']
        break

    fundamentalValues = {
        'HistoricalHighLow': {'High': {'Date': historical_max_high_date, 'Value': historical_max_high}, 'Low': {'Date': historical_min_low_date, 'Value': historical_min_low}},
        'PredictedHighLow': {'High': {'Date': predicted_max_high_date, 'Value': predicted_max_high}, 'Low': {'Date': predicted_min_low_date, 'Value': predicted_min_low}},
        'PredictedOpenClose': {'Open': {'Date': openDate, 'Value': openVal}, 'Close': {'Date': closeDate, 'Value': closeVal}}
    }

    # # Save the data to a JSON file
    # output_parent_folder = 'JSONs'
    # if not os.path.exists(output_parent_folder):
    #     os.makedirs(output_parent_folder)
    # output_folder = 'Fundamental_Values'
    # if not os.path.exists(output_folder):
    #     os.makedirs(output_folder)
    # output_path = os.path.join(
    #     output_parent_folder, output_folder, f"{company}_fundamental_values.json")
    # with open(output_path, "w") as f:
    #     json.dump(fundamentalValues, f)
    
    # Save the data to a JSON file
    output_parent_folder = 'JSONs'
    output_folder = 'Fundamental_Values'
    output_path = os.path.join(output_parent_folder, output_folder, f"{company}_fundamental_values.json")

    # Ensure that the directory structure exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(fundamentalValues, f)

    return None