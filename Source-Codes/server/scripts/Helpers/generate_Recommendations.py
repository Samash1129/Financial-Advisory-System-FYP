import pandas as pd
import numpy as np

# Load the Excel file into a DataFrame
file_path = 'Ratios/ratios.csv'  # Ensure the file is in the same directory as the script
df = pd.read_csv(file_path)

# List of columns to calculate the mean for
columns_to_mean = [
    'EPS', 'P/E Ratio', 'Equity to Asset Ratio', 'Price to Book Value Ratio', 'Return on Assets',
    'Return on Equity', 'Dividend', 'Dividend Yield', 'Payout Ratio', 'Cash per Share'
]

# Ensure the necessary columns are numeric
for column in columns_to_mean:
    df[column] = pd.to_numeric(df[column], errors='coerce')

# Group by 'Ticker Symbol' and calculate the mean for each group
mean_ratios = df.groupby('Ticker Symbol')[columns_to_mean].mean().reset_index()

# Min-Max Normalization
normalized_mean_ratios = mean_ratios.copy()

for column in columns_to_mean:
    min_value = mean_ratios[column].min()
    max_value = mean_ratios[column].max()
    normalized_mean_ratios[column] = (mean_ratios[column] - min_value) / (max_value - min_value)

# Define the weights for each parameter
risk_tolerance_weight = 0.2
stock_type_weight = 0.3
duration_weight = 0.5

# Define the rules for each parameter
def risk_tolerance_score(stock):
    if stock['risk_tolerance'] == 'low':
        return 0.8 * (stock['eps'] + stock['equity_to_asset_ratio'])
    elif stock['risk_tolerance'] == 'medium':
        return 0.5 * (stock['eps'] + stock['equity_to_asset_ratio'])
    else:
        return 0.2 * (stock['eps'] + stock['equity_to_asset_ratio'])

def stock_type_score(stock):
    if stock['stock_type'] == 'dividend':
        return 0.8 * (stock['dividend_yield'] - stock['payout_ratio'])
    elif stock['stock_type'] == 'non-dividend':
        return 0.5 * (stock['eps'] - stock['pe_ratio'])
    elif stock['stock_type'] == 'growth':
        return 0.8 * (stock['eps'] + stock['return_on_assets'])
    else:
        return 0.5 * (stock['pe_ratio'] + stock['equity_to_asset_ratio'])

def duration_score(stock):
    if stock['duration'] == 'short_term':
        return 0.8 * (stock['eps'] - stock['pe_ratio'])
    else:
        return 0.5 * (stock['return_on_equity'] + stock['cash_per_share'])

# Define the overall scoring function
def calculate_score(stock):
    risk_tolerance_score1 = risk_tolerance_score(stock)
    stock_type_score1 = stock_type_score(stock)
    duration_score1 = duration_score(stock)
    
    score = (risk_tolerance_weight * risk_tolerance_score1 + stock_type_weight * stock_type_score1 + duration_weight * duration_score1)
    return score

# Example usage:
# Using each row in the normalized data for demonstration
def genRec(risk_tolerance: str, stock_type: str, duration: str):
    scores = []
    for index, row in normalized_mean_ratios.iterrows():
        stock = {
            'eps': row['EPS'], 
            'pe_ratio': row['P/E Ratio'], 
            'equity_to_asset_ratio': row['Equity to Asset Ratio'], 
            'dividend_yield': row['Dividend Yield'], 
            'payout_ratio': row['Payout Ratio'], 
            'return_on_assets': row['Return on Assets'], 
            'return_on_equity': row['Return on Equity'], 
            'cash_per_share': row['Cash per Share'], 
            'risk_tolerance': risk_tolerance,  
            'stock_type': stock_type,  
            'duration': duration
        }
        score = calculate_score(stock)
        scores.append({'Ticker': row['Ticker Symbol'], 'Score': score})
        #print(f'Score for the stock {row["Ticker Symbol"]}:', score)

    scores.sort(key=lambda x: x['Score'], reverse=True)
    top_5_scores = scores[:5]
    
    return top_5_scores