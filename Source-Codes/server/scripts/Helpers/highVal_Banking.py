import json
import os
import math
import numpy as np
from datetime import timedelta
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout

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
    model.add(Dense(10))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model


def train_model(model, x_train, y_train, epochs):
    model.fit(x_train, y_train, batch_size=1, epochs=epochs)
    return model


def predict_prices(model, last_60_days_scaled, scaler):
    pred_price = model.predict(np.reshape(
        last_60_days_scaled, (1, last_60_days_scaled.shape[0], 1)))
    pred_price = scaler.inverse_transform(pred_price)
    return pred_price.flatten().tolist()


def main(company, df, startdate, enddate):    
    # Get the list of dates
    dates_list = get_dates_list(startdate, enddate)

    # Get the stock data for the company
    # df = stocks(company, start=startdate, end=enddate)
    data = df.filter(['High'])
    dataset = data.values

    # Preprocess the data
    scaled_data, scaler = preprocess_data(dataset)

    # Creating the training dataset
    training_data_len = math.ceil(len(dataset) * .8)
    x_train, y_train = [], []
    for i in range(60, len(scaled_data)):
        x_train.append(scaled_data[i-60:i, 0])
        y_train.append(scaled_data[i, 0])
    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # Build and train the LSTM model
    model = build_lstm_model((x_train.shape[1], 1))
    model = train_model(model, x_train, y_train, epochs=1)

    # Create the testing data set
    test_data = scaled_data[training_data_len - 60:, :]
    x_test = np.array([test_data[i-60:i, 0]
                        for i in range(60, len(test_data))])
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    # Get the models predicted price values
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)

    # Get the last 60 days data for prediction
    last_60_days = scaled_data[-60:]
    pred_price_list = predict_prices(model, last_60_days, scaler)

    # Store the data in the final dictionary
    final_high_values = {'HistoricalVal': [{'Date': date, 'Value': value} for date, value in
                                            zip(df.index.strftime("%Y-%m-%d").tolist(), dataset.flatten().tolist())],
                            'PredictedVal': [{'Date': date, 'Value': value} for date, value in
                                            zip(dates_list[-10:], pred_price_list)]}

    # # Save the data to a JSON file
    # output_folder = 'High_Rates'
    # if not os.path.exists(output_folder):
    #     os.makedirs(output_folder)
    # output_path = os.path.join(
    #     output_folder, f"{company}_high_values.json")
    # with open(output_path, "w") as f:
    #     json.dump(final_high_values, f)
    
    # Save the data to a JSON file
    output_parent_folder = 'JSONs'
    output_folder = 'High_Values'
    output_path = os.path.join(output_parent_folder, output_folder, f"{company}_high_values.json")

    # Ensure that the directory structure exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w") as f:
        json.dump(final_high_values, f)
        
    return None