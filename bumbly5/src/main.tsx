import './createPost.js';


import { Devvit, useState } from '@devvit/public-api';
import { FlairListResponse } from '@devvit/protos';

// Defines the messages that are exchanged between Devvit and Web View
type WebViewMessage =
  { 
	type: 'simple';
	data: { messagePost: string; squareness: number};
   } 
;

Devvit.configure({
  redditAPI: true,
  redis: true,
});

//const flair = Devvit.use(Devvit.Types.RedditAPI.Flair);

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'bumblybox',
  flair: "flairBlue",
  height: 'tall',
  render: (context) => {
    // Load username with `useAsync` hook
    //const [messagePost] = useState(async () => {
    //  const currUser = await context.reddit.getCurrentUser();
    //  return currUser?.messagePost ?? 'anon';
    //});

    // Load latest counter from redis with `useAsync` hook
    const [counter, setCounter] = useState(async () => {
      const redisCount = await context.redis.get(`counter_${context.postId}`);
      return Number(redisCount ?? 0);
    });

    // Create a reactive state for web view visibility
    const [webviewVisible, setWebviewVisible] = useState(false);

    // When the web view invokes `window.parent.postMessage` this function is called
    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
	case 'simple':
           await context.redis.set(`counter_${context.postId}`, msg.data.squareness.toString());
       
           context.ui.webView.postMessage('myWebView', {
            type: 'simple',
            data: {
              messagePost: msg.data.messagePost,
              squareness: msg.data.squareness
            },
          });
          setCounter(msg.data.squareness);
           //Next... post the message contained in username to reddit.
	   //See ref: https://www.reddit.com/r/Devvit/comments/1hepamy/using_devvit_with_the_reddit_api_to_get_subreddit/          
	   //see also: https://developers.reddit.com/docs/0.9/api   
	break;

        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    };


    // Render the custom post type
    return (
     

      <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '100%'}>
          <vstack border="thick" borderColor="black" height={webviewVisible ? '100%' : '100%'}>
            <webview
              id="myWebView"
              url="page.html"
              onMessage={(msg) => onMessage(msg as WebViewMessage)}
              grow
              height={webviewVisible ? '100%' : '0%'}
            />
          </vstack>



      </vstack>



   );
  },
});

export default Devvit;
