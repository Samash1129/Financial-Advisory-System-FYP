import os
import requests
from datetime import datetime, timedelta
import csv
import PyPDF2
import re
import pandas as pd

# Function to extract section from PDF
def extract_section(pdf_file_path, start_marker, end_marker):
    with open(pdf_file_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        num_pages = len(pdf_reader.pages)

        start_page = None
        end_page = None
        found_start_marker = False

        # Find the start and end pages
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()

            if not found_start_marker and start_marker in text:
                start_page = page_num
                found_start_marker = True

            if found_start_marker and end_marker in text:
                end_page = page_num
                break

        print(start_page, end_page)


        # Extract text from the specified section on each page
        extracted_text = ''
        if start_page is not None and end_page is not None:
            for page_num in range(start_page, end_page + 1):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()

                # Find the start and end positions within the text
                start_pos = text.find(start_marker) + len(start_marker)
                end_pos = text.find(end_marker)

                print(f"Start Pos: {start_pos}, End Pos: {end_pos}")

                # Extract the content between start and end markers
                extracted_text += text[start_pos:end_pos].strip() + '\n'

        return extracted_text

# Initial date
current_date = datetime.strptime('2024-01-06', '%Y-%m-%d')

# Number of times to execute the URL
days = 365
years = 15
num_executions = days * years

# List to store results
results = []

previous_line = ""

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

        # Extract data from the downloaded PDF
        pdf_file_path = f'{formatted_date}.pdf'
        start_marker = '***COMMERCIAL BANKS***'
        end_marker = '***INSURANCE***'

        extracted_data = extract_section(pdf_file_path, start_marker, end_marker)
        print(extracted_data)

        lines = extracted_data.strip().split("\n")

        csv_file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "bank_data.csv")

        # Open the existing CSV file in append mode ("a")
        with open(csv_file_path, "a", newline='') as csvfile:
            writer = csv.writer(csvfile)

            # If the file is empty, write the header row
            if csvfile.tell() == 0:
                writer.writerow(["Date", "Ticker Symbol", "Security Name", "Volume Count", "Opening Price",
                                "Highest Price", "Lowest Price", "Closing Price", "Net Change"])

            # Write the data
            for i in range(len(lines)):
                parts = lines[i].split()

                # If the line has fewer parts, merge it with the next line
                if len(parts) < 8 and i < len(lines) - 1:
                    next_line_parts = lines[i + 1].split()
                    parts += next_line_parts
                    i += 1

                # Replace "LtdXD" with the number after XD
                for j in range(len(parts)):
                    if "XD" in parts[j] and parts[j].__contains__("XD"):
                        xd_number_match = re.search(r'XD(\d+)', parts[j])
                        if xd_number_match:
                            xd_number = xd_number_match.group(1)
                            parts[j] = xd_number
                    
                if len(parts) < 8:
                    continue

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

save_file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "download_results.csv")

# Save results to CSV
with open(save_file_path, 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Date', 'Result'])
    csv_writer.writerows(results)

bank_data_file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "bank_data.csv")

# Read bank_data.csv into a DataFrame
bank_data = pd.read_csv(bank_data_file_path)

bank_data_sheets_file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "bank_data_sheets.xlsx")

# Create an Excel file with multiple sheets
with pd.ExcelWriter(bank_data_sheets_file_path) as writer:
    # Count occurrences of each Ticker Symbol
    ticker_symbol_counts = bank_data['Ticker Symbol'].value_counts()

    # Group data by security name and iterate over groups
    for group_name, group_data in bank_data.groupby('Ticker Symbol'):
        # Check if the ticker symbol count is greater than 5
        if ticker_symbol_counts.get(group_name, 0) >= 1:
            # Truncate long names to fit within the Excel limit (31 characters)
            truncated_name = "".join(char for char in group_name[:31] if char.isalnum() or char in ['_', '-'])

            # Check if the ticker symbol contains any numbers
            if not any(char.isdigit() for char in group_data['Ticker Symbol'].iloc[0]):
                group_data.to_excel(writer, sheet_name=truncated_name, index=False)


print(f"Data extracted for {num_executions} days.")