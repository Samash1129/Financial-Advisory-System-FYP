from datetime import datetime, timedelta
import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import csv

url = "https://www.ksestocks.com/MarketSummary"

# Custom date value (replace with your desired date)
# current_date = datetime.today()
current_date = datetime.strptime("2004-01-17", "%Y-%m-%d")

num_executions = 17

# Configure Selenium options (headless mode)
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Run in headless mode (no browser window)

# Create a Chrome webdriver
driver = webdriver.Chrome(options=options)

# Loop through the number of executions
for _ in range(num_executions):

    # Format the current date to match the URL
    formatted_date = current_date.strftime('%Y-%m-%d')

    # Navigate to the URL
    driver.get(url)

    # Find the input element with id "sdate" using Selenium
    sdate_input = driver.find_element("css selector", '#sdate')

    # Set the custom date value using JavaScript
    driver.execute_script(
        f"arguments[0].value = '{formatted_date}';", sdate_input)

    # Find the submit button and click it
    submit_button = driver.find_element("css selector", '.pushbutton')
    if submit_button:
        submit_button.click()
        print("Form submitted.")
    else:
        print("Submit button not found.")

    # Wait for the page to load (you might need to adjust the wait conditions)
    driver.implicitly_wait(10)

    # Find the table containing the data
    table = driver.find_element("css selector", 'table')

    # Extract rows only between "COMMERCIAL BANKS" and "ENGINEERING"
    rows = []
    is_after_commercial_banks = False

    # Skip the header row
    for row in table.find_elements("tag name", 'tr')[1:]:
        sector = row.find_elements("tag name", 'td')[0].text.strip()

        if sector == "COMMERCIAL BANKS":
            is_after_commercial_banks = True
        elif sector == "ENGINEERING":
            break  # Stop adding rows after reaching "ENGINEERING"

        if is_after_commercial_banks and sector != "COMMERCIAL BANKS":  # Skip the row with COMMERCIAL BANKS
            row_data = [data.text.strip()
                        for data in row.find_elements("tag name", 'td')]
            rows.append(row_data)

    bank_data_file_path = os.path.join(os.path.dirname(
        os.path.realpath(__file__)), "bank_data.csv")

    # Append to CSV including the date
    with open(bank_data_file_path, 'a', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        if csvfile.tell() == 0:  # Check if the file is empty, write headers only if it's the first write
            # Include Date and Sector as the first columns
            csv_writer.writerow(['Date', 'Symbol', 'Company Name', 'Open', 'High', 'Low', 'Close', 'Change', 'Volume'])
        csv_writer.writerows(
            [[formatted_date, row[0]] + row[1:] for row in rows])

    print(f"Data Saved: {formatted_date}")
    result = f"Data Saved: {formatted_date}"

    # Update the current_date for the next iteration
    current_date -= timedelta(days=1)

    time.sleep(45)  # Wait 45 seconds before navigating to the next URL

url_file_path = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), "url_banks_results.csv")

# Close the Chrome webdriver
driver.quit()
