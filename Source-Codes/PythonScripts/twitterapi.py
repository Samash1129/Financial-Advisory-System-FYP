import tweepy

# Authenticate with Twitter API
consumer_key = 'XKPUCJsjcjPvojcE9K9wFB50i'
consumer_secret = 'PvruwnVeUsZhjSPdwnWrJ6XvEelUISpLE4KMTievlR8pNdq4I5'
access_token = '1757362376788115457-d5SuAhB3cT7OxyAfLPjyglfDuafVrl'
access_token_secret = 'EEO11SSqOKeBNrVuv1k3ZNxTXXYP0ryuUkEmdPAWBlfh0'

auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret, access_token, access_token_secret)
api = tweepy.API(auth)

# Search for tweets containing a specific keyword
keyword = 'PSX'  # Replace with the desired keyword
tweets = api.tweets(q=keyword, count=10)  # Adjust count as needed

# Process and analyze the tweets
for tweet in tweets:
    print(f"User: {tweet.user.screen_name}")
    print(f"Text: {tweet.text}")
    print("\n")
