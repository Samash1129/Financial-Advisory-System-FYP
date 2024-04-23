import requests
from bs4 import BeautifulSoup

def scrape_dawn_articles():
    url = 'https://www.dawn.com/'
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for any HTTP error
        soup = BeautifulSoup(response.content, 'html.parser')
        
        articles = []
        for article in soup.find_all('article'):
            title_elem = article.find(class_='story__title')
            link_elem = article.find(class_='story__link')
            summary_elem = article.find(class_='story__excerpt')
            if title_elem and link_elem and summary_elem:
                title = title_elem.get_text().strip()
                link = link_elem['href']
                summary = summary_elem.get_text().strip()
                articles.append({'title': title, 'link': link, 'summary': summary})
        
        return articles
    except Exception as e:
        print('Error scraping Dawn articles:', e)
        return []

def filter_articles_by_keyword(articles, keyword):
    filtered_articles = []
    for article in articles:
        if keyword.lower() in article['title'].lower() or keyword.lower() in article['summary'].lower():
            filtered_articles.append(article)
    return filtered_articles

# Example usage
# print("Enter keyword")
# keyword = input()
# print(keyword)
# dawn_articles = scrape_dawn_articles()
# filtered_articles = filter_articles_by_keyword(dawn_articles, keyword)
# print(filtered_articles)



import requests
from bs4 import BeautifulSoup

def scrape_business_recorder_articles():
    try:
        # Send a GET request to the Business Recorder website
        url = 'https://www.brecorder.com/trends/psx'
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for any HTTP error

        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find article elements
        articles = soup.find_all('div', class_='grid-item')

        # Extract article information
        scraped_articles = []
        for article in articles:
            title_elem = article.find('h4')
            link_elem = article.find('a')
            summary_elem = article.find(class_='news-brief')
            
            title = title_elem.text.strip()
            link = link_elem['href']
            summary = summary_elem.text.strip()

            scraped_articles.append({'title': title, 'link': link, 'summary': summary})

        return scraped_articles

    except requests.RequestException as e:
        print('Error making request:', e)
    except Exception as e:
        print('Error scraping Business Recorder articles:', e)
        # Print the traceback to help diagnose the issue
        import traceback
        traceback.print_exc()

    # Return an empty list in case of any errors
    return []

# Example usage
print("Scraped articles:")
business_recorder_articles = scrape_business_recorder_articles()
if business_recorder_articles:
    for article in business_recorder_articles:
        print(article)
else:
    print("Failed to scrape articles.")
