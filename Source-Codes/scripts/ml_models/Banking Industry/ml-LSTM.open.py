## Importing Libraries ##
import time
from psx import stocks, tickers
from datetime import datetime
import math
import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout
import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')

final_open_values = []

companies = ['ABL', 'AKBL', 'BAFL', 'BAHL', 'BIPL', 'BML', 'BOK', 'BOP', 'FABL', 'HBL', 'HMB', 'JSBL', 'MCB', 'MEBL', 'NBP', 'SCBPL', 'SILK', 'SNBL', 'UBL']


# for company in companies:
## Set the Date ##
# start_date = datetime.strptime("2014-01-01", "%Y-%m-%d")
# end_time = datetime.strptime("2024-01-01", "%Y-%m-%d")

start_date = datetime.strptime("2014-02-19", "%Y-%m-%d")
end_time = datetime.strptime("2024-02-19", "%Y-%m-%d")

# end_time = datetime.today()

## Get the Data ##
df = stocks("ABL", start=start_date, end=end_time)

## Create a new dataframe with only the Open column ##
data = df.filter(['Open'])

## Convert the dataframe to a numpy array ##
dataset = data.values

## Get the number of rows to train the model on ##
training_data_len = math.ceil(len(dataset) * .8)

## Scaling the data ##
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(dataset)

## Creating the training dataset ##

## Create the scaled training data set ##
train_data = scaled_data[0:training_data_len, :]

## Split the data into x_train and y_train data sets ##
x_train = []
y_train = []

for i in range(60, len(train_data)):
    x_train.append(train_data[i-60:i, 0])
    y_train.append(train_data[i, 0])
    
## Convert the x_train and y_train to numpy arrays ##
x_train, y_train = np.array(x_train), np.array(y_train)

## Reshape the data ##
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

## Build the LSTM model ##
model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(Dropout(0.2))
model.add(LSTM(50, return_sequences=False))
model.add(Dropout(0.2))
model.add(Dense(25))
model.add(Dropout(0.2))
model.add(Dense(10))

## Compile the model ##
model.compile(optimizer='adam', loss='mean_squared_error')

## Train the model ##
model.fit(x_train, y_train, batch_size=1, epochs=1)

## Create the testing data set ##

## Create a new array containing scaled values ##
test_data = scaled_data[training_data_len - 60: , :]

## Create the data sets x_test and y_test ##
x_test = []
y_test = dataset[training_data_len:, :]
for i in range(60, len(test_data)):
    x_test.append(test_data[i-60:i, 0])
    
## Convert the data to a numpy array ##
x_test = np.array(x_test)

## Reshape the data ##
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

## Get the models predicted price values ##
predictions = model.predict(x_test)
predictions = scaler.inverse_transform(predictions)

## Get the root mean squared error (RMSE) ##
rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))

## Get the Data ##
# start_date = datetime.strptime("2014-01-01", "%Y-%m-%d")
# end_time = datetime.strptime("2024-01-01", "%Y-%m-%d")

start_date = datetime.strptime("2014-02-19", "%Y-%m-%d")
end_time = datetime.strptime("2024-02-19", "%Y-%m-%d")

# end_time = datetime.today()

## Get the Data ##
stock_data = stocks("ABL", start=start_date, end=end_time)

## Create a new dataframe ##
new_df = stock_data.filter(['Open'])

## Get teh last 60 day closing price values and convert the dataframe to an array ##
last_60_days = new_df[-60:].values

## Scale the data to be values between 0 and 1 ##
last_60_days_scaled = scaler.transform(last_60_days)

## Create an empty list ##
X_test = []

## Append the past 60 days ##
X_test.append(last_60_days_scaled)

## Convert the X_test data set to a numpy array ##
X_test = np.array(X_test)

## Reshape the data ##
X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

## Get the predicted scaled price ##
pred_price = model.predict(X_test)

## undo the scaling ##
pred_price = scaler.inverse_transform(pred_price)
print(pred_price)

final_open_values.append(list(pred_price))
    
print(final_open_values)