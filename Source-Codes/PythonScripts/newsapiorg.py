# Failure
# Fetching news from newsapi.org
# This script fetches news using the newsapi.org API. The user is prompted to enter a news query and the script fetches the latest news articles related to the query. The script prints the title, source, and URL of the news articles.



import requests

def fetch_news(query):
    api_key = 'e5cc084b022641bca42a49cd43fd9ab6'
    url = f'https://newsapi.org/v2/everything?q={query}&searchIn=title,content,description&language=en&apiKey={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        
        data = response.json()
        articles = data['articles'][:10]  # Limiting to at most 3 news articles
        
        if articles:
            for article in articles:
                title = article['title']
                #description = article['description']
                source = article['source']['name']
                url = article['url']
                
                print(f"Title: {title}")
                #print(f"Description: {description}")
                print(f"Source: {source}")
                print(f"URL: {url}")
                print("\n")
        else:
            print("No news found for this query.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")

if __name__ == "__main__":
    query = input("Enter your news query: ")
    fetch_news(query)
