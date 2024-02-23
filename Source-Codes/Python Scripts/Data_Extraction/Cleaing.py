import pandas as pd

dataset = pd.read_csv("bank_data.csv")

print(dataset['Symbol'].unique())

dataset = dataset[dataset['Symbol'] != 'Symbol']

print(dataset['Symbol'].unique())

# overwrite the csv
dataset.to_csv("bank_data.csv", index=False)