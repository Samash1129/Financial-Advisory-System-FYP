import requests

def fetch_news(company_name):
    api_key = 'pub_275849064c402282a9722d79eb2e3865931e1'
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={company_name}&country=pk&category=business"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        
        data = response.json()
        articles = data['results']
        
        if articles:
            for article in articles:
                title = article['title']
                description = article['description']
                #date_pub : article['pubDate']
                link = article['link']
                
                print(f"Title: {title}")
                #print(f"Description: {description}")
                #print(f"Date Published: {date_pub}")
                print(f"URL: {link}")
                print("\n")
        else:
            print("No news found for this company.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")

if __name__ == "__main__":
    company_name = input("Enter the name of the PSX listed company: ")
    fetch_news(company_name)
