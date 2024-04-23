import json
import os
import math
import numpy as np
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout
from psx import stocks
import closeVal_Banking
import openVal_Banking
from dotenv import load_dotenv
load_dotenv()


def get_dates_list(start_date, end_date):
    dates_list = []
    current_date = start_date
    while current_date <= end_date:
        dates_list.append(current_date.strftime("%Y-%m-%d"))
        current_date += timedelta(days=1)
    for i in range(1, 11):
        dates_list.append((end_date + timedelta(days=i)).strftime("%Y-%m-%d"))
    return dates_list


def preprocess_data(dataset):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    return scaled_data, scaler


def build_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(50, return_sequences=False))
    model.add(Dropout(0.2))
    model.add(Dense(25))
    model.add(Dropout(0.2))
    model.add(Dense(2))  # Output layer for High and Low
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model


def train_model(model, x_train, y_train, epochs):
    model.fit(x_train, y_train, batch_size=1, epochs=epochs)
    return model


def predict_prices(model, last_60_days_scaled, scaler):
    pred_price = model.predict(np.reshape(
        last_60_days_scaled, (1, last_60_days_scaled.shape[0], last_60_days_scaled.shape[1])))
    pred_price = scaler.inverse_transform(pred_price)
    return pred_price.flatten().tolist()

def fundamental_values(final_fundamental_values, company, df):
    
    print(f"Executing closeVal_Banking.py for {company}")
    final_close_values = closeVal_Banking.main(company, df)
    
    print(f"Executing openVal_Banking.py for {company}")
    final_open_values = openVal_Banking.main(company, df)

    vals = final_fundamental_values['HistoricalVal']
        # Initialize variables to store the maximum high value and its corresponding date
    historical_max_high = float('-inf')
    historical_max_high_date = None

    # Iterate over the historical values
    for val in vals:
        high = val['High']
        date = val['Date']
        if high > historical_max_high:
            historical_max_high = high
            historical_max_high_date = date

    # Print the maximum high value and its corresponding date
    # print("Maximum High Value:", historical_max_high)
    # print("Date of Maximum High Value:", historical_max_high_date)

    # Initialize variables to store the minimum low value and its corresponding date
    historical_min_low = float('inf')
    historical_min_low_date = None

    # Iterate over the historical values
    for val in vals:
        low = val['Low']
        date = val['Date']
        if low < historical_min_low:
            historical_min_low = low
            historical_min_low_date = date

    # Print the maximum high value and its corresponding date
    # print("Minimum Low Value:", historical_min_low)
    # print("Date of Minimum Low Value:", historical_min_low_date)
    
    vals = final_fundamental_values['PredictedVal']
    
    predicted_max_high = float('-inf')
    predicted_max_high_date = None

    # Iterate over the historical values
    for val in vals:
        high = val['High']
        date = val['Date']
        if high > predicted_max_high:
            predicted_max_high = high
            predicted_max_high_date = date

    # Print the maximum high value and its corresponding date
    # print("Maximum High Value:", predicted_max_high)
    # print("Date of Maximum High Value:", predicted_max_high_date)

    # Initialize variables to store the minimum low value and its corresponding date
    predicted_min_low = float('inf')
    predicted_min_low_date = None

    # Iterate over the historical values
    for val in vals:
        low = val['Low']
        date = val['Date']
        if low < predicted_min_low:
            predicted_min_low = low
            predicted_min_low_date = date

    # Print the maximum high value and its corresponding date
    # print("Minimum Low Value:", predicted_min_low)
    # print("Date of Minimum Low Value:", predicted_min_low_date)
        
    # print(final_close_values)
    # print(final_open_values)

    fundamental_values = {'Historical_High_Low': {'High': {"Date": historical_max_high_date, 'Value': historical_max_high}, 'Low': {"Date": historical_min_low_date, 'Value': historical_min_low}},
                            'Predicted_High_Low': {'High': {"Date": predicted_max_high_date, 'Value': predicted_max_high}, 'Low': {"Date": predicted_min_low_date, 'Value': predicted_min_low}},
                            'Predicted_Close_Value': {'Date': final_close_values['PredictedVal'][0]['Date'], 'Value': final_close_values['PredictedVal'][0]['Value']},
                            'Predicted_Open_Value': {'Date': final_open_values['PredictedVal'][0]['Date'], 'Value': final_open_values['PredictedVal'][0]['Value']}}

    # Save the data to a JSON file
    output_folder = 'Fundamental_Values'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    output_path = os.path.join(
        output_folder, f"{company}_fundamental_values.json")
    with open(output_path, "w") as f:
        json.dump(fundamental_values, f)

    return None

def main():   
    try:
        
        # CompaniesJsonFileLocation = os.getenv("companies_path")
        CompaniesJsonFileLocation = 'companies.json'

        # Load companies from the JSON file
        with open(CompaniesJsonFileLocation, 'r') as f:
            companies_data = json.load(f)

        # Extract company names and symbols from the loaded data
        companies = [symbol for _, symbol in companies_data['Banking'].items()]

        # Set start_date to 10 years prior to the current date
        starting_date = (datetime.now() - timedelta(days=1)) - \
            timedelta(days=365 * 10)
        # Set end_date to the day before the current date
        ending_date = datetime.today() - timedelta(days=1)

        # Convert datetime objects to strings without time
        start_date_str = starting_date.strftime('%Y-%m-%d')
        end_date_str = ending_date.strftime('%Y-%m-%d')

        startdate = datetime.strptime(f'{start_date_str}', "%Y-%m-%d")
        enddate = datetime.strptime(f'{end_date_str}', "%Y-%m-%d")

        print("Companies: ", companies)

        for company in companies:
            print(f"Executing highLow_Banking.py for {company}")
            
            # Get the list of dates
            dates_list = get_dates_list(startdate, enddate)

            # Get the stock data for the company
            df = stocks(company, start=startdate, end=enddate)

            # temp10.main(company, df)

            data = df.filter(['High', 'Low'])  # Select both High and Low columns
            dataset = data.values

            # Preprocess the data
            scaled_data, scaler = preprocess_data(dataset)

            # Creating the training dataset
            training_data_len = math.ceil(len(dataset) * .8)
            x_train, y_train = [], []
            for i in range(60, len(scaled_data)):
                # Use all features for prediction
                x_train.append(scaled_data[i-60:i, :])
                y_train.append(scaled_data[i, :])  # Predict both High and Low
            x_train, y_train = np.array(x_train), np.array(y_train)

            # Build and train the LSTM model
            model = build_lstm_model((x_train.shape[1], x_train.shape[2]))
            model = train_model(model, x_train, y_train, epochs=1)

            # Create the testing data set
            test_data = scaled_data[training_data_len - 60:, :]
            x_test = np.array([test_data[i-60:i, :]
                            for i in range(60, len(test_data))])

            # Get the models predicted price values
            predictions = model.predict(x_test)
            predictions = scaler.inverse_transform(predictions)

            # Get the last 60 days data for prediction
            last_60_days = scaled_data[-60:]
            pred_price_list = predict_prices(model, last_60_days, scaler)

            # print(pred_price_list)

            # Store the data in the final dictionary
            final_fundamental_values = {'HistoricalVal': [{'Date': date, 'High': high, 'Low': low} for date, high, low in
                                                        zip(dates_list[-20:-10], dataset[:, 0].flatten().tolist(), dataset[:, 1].flatten().tolist())],
                                        'PredictedVal': [{'Date': date, 'High': high, 'Low': low} for date, high, low in
                                                        zip(dates_list[-10:], predictions[:, 0].flatten().tolist(), predictions[:, 1].flatten().tolist())]}

            fundamental_values(final_fundamental_values, company, df)

            # Save the data to a JSON file
            output_folder = 'High_Low_Values'
            if not os.path.exists(output_folder):
                os.makedirs(output_folder)
            output_path = os.path.join(
                output_folder, f"{company}_high_low_values.json")
            with open(output_path, "w") as f:
                json.dump(final_fundamental_values, f)

        return True
        
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    
if __name__ == "__main__":
    main()


