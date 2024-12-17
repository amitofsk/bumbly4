# bumblybox
Here's my entry for the 2024 [Reddit Games and Puzzles hackathon.](https://redditgamesandpuzzles.devpost.com/) 

## What is bumbly box
Bumblybox is a reddit webviews game. You can view it on the [zyxw7_sandbox2 subreddit](https://www.reddit.com/r/zyxw7_sandbox2/). The app can also be viewed at its [developer page on reddit](https://developers.reddit.com/apps/bumbly5). 

Write the text of a post in the box. Press the check button to view your post in a grid.  Get bling (a present icon) if the length of your post is a perfect square. Get additional bling if all the letters in a column or diagonal are the same. Longer posts get larger bling.

## If I had more time ...
I wanted to add more features, but I ran out of time to figure them out. Here are the features on my wish list:
- As of now, when you press the Post button, the message as well as whether or not its length is square is sent to the back end. I think it would be cool for this webapp to actually generate a post that could be sent to a subreddit, possible with the bling attached. I didn't get very far with the reddit APIs. I know the back end, inside main.tsx, can call reddit APIs. I don't know if posting to a subreddit is allowed, if it requires an authentication step, or if I need to request separate access to use the reddit API's.
- This webapp shows up in a reddit post. It would be cool getting bling would also change the reddit post's flair. I think this is possible through reddit's API's. I set up flair for the subreddit I was practicing with. I also tried using automoderators to help with turning on the flair, but I didn't get it.
- This webapp is intended to be used with text of message board posts, not random text. For that reason, I have a function to check if the message is just gibberish. As of now, this function is quite simple. It just checks to make sure there are a sufficient number of spaces, and it rejects text with a letter to space ratio that is too big. Additional checks could, and probably should, be included. For example, a check might be to make sure at least some words show up in a dictionary. However, the checks shouldn't be too strong. Including words from other languages or creative terminology should be allowed. 
  

## References
- Reddit developers quickstart guide: [https://developers.reddit.com/apps/bumbly5](https://developers.reddit.com/apps/bumbly5)
- To get the bee icon, I started with a public domain clipart bee [https://www.pdclipart.org/displayimage.php?album=search&cat=0&pos=94](https://www.pdclipart.org/displayimage.php?album=search&cat=0&pos=94), and I modified it to be more boxy.
- I used reddit's webview timer example, [https://developers.reddit.com/docs/webviews](https://developers.reddit.com/docs/webviews) extensively.
- Reference on javascript event listeners: [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- Reference on reddit APIs: [https://developers.reddit.com/docs/0.9/api](https://developers.reddit.com/docs/0.9/api)
- Reference on reddit APIs: [https://www.reddit.com/r/Devvit/comments/1hepamy/using_devvit_with_the_reddit_api_to_get_subreddit/](https://www.reddit.com/r/Devvit/comments/1hepamy/using_devvit_with_the_reddit_api_to_get_subreddit/)
 


