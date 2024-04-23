#Successfull
# Fetching news from gnews.io
# This script fetches news using the gnews.io API. The user is prompted to enter a news query and the script fetches the latest news articles related to the query. The script prints the title, description, source, URL, and published date of the news articles.
# The script uses the requests library to make an HTTP GET request to the gnews.io API. The API key is passed as a query parameter in the URL. The response is then parsed as JSON and the relevant information is extracted and printed.

import requests


def fetch_news(Query):
    apikey = "917d0e72e80f05f18f29ab18d13a6f40"
    url = f"https://gnews.io/api/v4/search?q={Query}&lang=en&in=title,description,content&country=pk&max=5&apikey={apikey}"

    try:
        data = requests.get(url)
        data= data.json()
        articles=data["articles"]

        print(f"Total articles found: {len(articles)}")

        for i in articles:
            # print(i)
            # break
            print(f"Title: {i['title']}")
            print(f"Description: {i['description']}")
            print (f"Source: {i['source']['name']}")
            print(f"URL: {i['url']}")
            print(f"Published at: {i['publishedAt']}")
            print("\n")
            

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
            

if __name__ == "__main__":
    query = input("Enter your news query: ")
    fetch_news(query)