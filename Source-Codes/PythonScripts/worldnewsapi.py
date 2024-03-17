#Successful
#This script fetches world news using the worldnewsapi.com API. The user is prompted to enter a news query and the script fetches the latest news articles related to the query. The script prints the title, description, source, URL, and sentiment of the news articles. The sentiment is a measure of the sentiment of the news article, which can be positive, negative, or neutral.
#The script uses the requests library to make an HTTP GET request to the worldnewsapi.com API. The API key is passed as a query parameter in the URL. The response is then parsed as JSON and the relevant information is extracted and printed.
#The script also handles exceptions that may occur during the request, such as network errors or invalid API responses.
#The script can be run from the command line, and the user is prompted to enter a news query. The script then fetches the latest news articles related to the query and prints the relevant information.
#The script can be used to fetch world news articles related to a specific topic or keyword, and can be easily modified to fetch news from different sources or with different parameters.
#The script can be used to stay updated with the latest news and developments around the world, and can be integrated into other applications or scripts to provide real-time news updates.

import requests

def fetch_world_news(api_key, query):

    sourcepage = "https://www.dawn.com,https://www.brecorder.com,https://www.thenews.com.pk,https://www.ft.com,https://profit.pakistantoday.com.pk"

    url = f'https://api.worldnewsapi.com/search-news?text={query}&language=en&number=3&api-key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        
        data = response.json()
        articles = data['news'] # Limiting to at most 3 news articles
        
        if articles:
            for article in articles:
                title = article['title']
                description = article['text']
                source = article['authors']
                url = article['url']
                sentiment = article['sentiment']
                
                print(f"Title: {title}")
                #print(f"Description: {description}")
                print(f"Source: {source}")
                print(f"URL: {url}")
                print(f"Sentiment: {sentiment}")
                print("\n")
        else:
            print("No news found.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")

if __name__ == "__main__":
    api_key = '5ba2f5698ec84a30b5a8a6a0e51c90f6'
    query = input("Enter your news query: ")
    fetch_world_news(api_key, query)
