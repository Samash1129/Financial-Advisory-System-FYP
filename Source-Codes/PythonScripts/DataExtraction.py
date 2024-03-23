import os
import csv
import PyPDF2
import requests
from datetime import datetime, timedelta
import csv
import pandas as pd

# Initial date
current_date = datetime.strptime('2024-01-01', '%Y-%m-%d')

# Number of times to execute the URL
days = 365
years = 10
num_executions = years * days

# List to store results
results = []

for _ in range(num_executions):
    # Format the current date to match the URL
    formatted_date = current_date.strftime('%Y-%m-%d')

    # Construct the URL
    url = f'https://dps.psx.com.pk/download/closing_rates/{formatted_date}.pdf'

    # Make a request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        print(f'Successfully downloaded: {url}')
        result = f'Successfully downloaded: {url}'

        # Save the PDF file to your local machine
        with open(f'{formatted_date}.pdf', 'wb') as pdf_file:
            pdf_file.write(response.content)

        def extract_section(pdf_file_path, start_marker, end_marker):
            with open(pdf_file_path, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                num_pages = len(pdf_reader.pages)

                start_page = None
                end_page = None

                # Find the start and end pages
                for page_num in range(num_pages):
                    page = pdf_reader.pages[page_num]
                    text = page.extract_text()

                    if start_marker in text:
                        start_page = page_num
                    if end_marker in text:
                        end_page = page_num
                        break

                # Extract text from the specified section on each page
                extracted_text = ''
                if start_page is not None and end_page is not None:
                    for page_num in range(start_page, end_page + 1):
                        page = pdf_reader.pages[page_num]
                        text = page.extract_text()

                        # Find the start and end positions within the text
                        start_pos = text.find(start_marker) + len(start_marker)
                        end_pos = text.find(end_marker)

                        # Extract the content between start and end markers
                        extracted_text += text[start_pos:end_pos].strip() + \
                            '\n'
            return extracted_text

        # Example usage
        pdf_file_path = f'{formatted_date}.pdf'
        start_marker = '***COMMERCIAL BANKS***'
        end_marker = '***INSURANCE***'

        extracted_data = extract_section(
            pdf_file_path, start_marker, end_marker)
        # print(extracted_data)

        lines = extracted_data.strip().split("\n")

        # Open the existing CSV file in append mode ("a")
        with open("bank_data.csv", "a", newline='') as csvfile:
            writer = csv.writer(csvfile)

            # If the file is empty, write the header row
            if csvfile.tell() == 0:
                writer.writerow(["Date", "Ticker Symbol", "Security Name", "Volume Count", "Opening Price",
                                "Highest Price", "Lowest Price", "Closing Price", "Net Change"])

            # Write the data
            for line in lines:
                parts = line.split()

                date = formatted_date
                ticker_symbol = parts[0]
                volume_count = parts[-7]
                opening_price = parts[-6]
                highest_price = parts[-5]
                lowest_price = parts[-4]
                closing_price = parts[-3]
                net_change = parts[-2]

                security_name = " ".join(parts[1:-7])

                writer.writerow([date, ticker_symbol, security_name, volume_count, opening_price,
                                highest_price, lowest_price, closing_price, net_change])

        print("CSV file updated successfully.")

        # Delete the PDF file
        os.remove(pdf_file_path)

        # Update the current date for the next iteration
        current_date -= timedelta(days=1)
    else:
        print(f'Failed to download: {url}')
        result = f'Failed to download: {url}'

        # Update the current date for the next iteration
        current_date -= timedelta(days=1)

    # Append result to the list
    results.append([formatted_date, result])

# Save results to CSV
with open('download_results.csv', 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Date', 'Result'])
    csv_writer.writerows(results)

# Assuming you have the data in a CSV file named 'bank_data.csv'
csv_file = 'bank_data.csv'

# Read the CSV file into a DataFrame
df = pd.read_csv(csv_file, parse_dates=['Date'])

# Get unique security names
unique_security_names = df['Security Name'].unique()

# Create a Pandas Excel writer using ExcelWriter
with pd.ExcelWriter('output_file_with_sheets.xlsx', engine='xlsxwriter') as writer:
    # Loop through each unique security name
    for security_name in unique_security_names:
        # Create a DataFrame for the current security name
        security_df = df[df['Security Name'] == security_name]

        # Write the DataFrame to a sheet with the security name
        security_df.to_excel(writer, sheet_name=security_name, index=False)

print("Excel file with multiple sheets created successfully.")
print("Data Extraction Completed.")