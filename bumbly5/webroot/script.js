/*
 * Here's the javascript that does most of the work. It has event listeners for handling
 * button presses. If the check button is pressed, it checks if the message has square length
 * and meets other criteria. If the post button is pressed, info is sent to the server side.
 *
 *
 * I spent too much time trying not to put everything in one function. However,
 * I didn't succeed in breaking it up. I'll leave that for later.
 * See reference  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * OK... Be careful about what is a member variable and what is a local variable of the constructor.
 */


class App {
  constructor() {
    	//NOTE: THESE VARIABLES ARE LOCAL TO THE CONSTRUCTOR. They are not member variables.
	const output = document.querySelector('#messageOutput');
    	const checkButton = document.querySelector('#btn-check');
    	const postButton = document.querySelector('#btn-post');
    	const aboutButton = document.querySelector('#btn-about');
    	const messageLabel = document.querySelector('#squareQ');
    	const ribbonLabel = document.querySelector('#ribbons');
    	const myText=document.querySelector('#in-text');
    	const picE=document.querySelector('#picE');
	const picV=document.querySelector('#picV');
	const picDL=document.querySelector('#picDL');
	const picDR=document.querySelector('#picDR');
	const picI=document.querySelector('#picI');
	const output2 = document.querySelector('#commentOutput');

	
    	var messageString="x";
    	var isSquare=0;
	var isGibberish=0;
    	var columnFound=0;
	var columnTemp=0;
    	var columnLetter='8';
	var columnNumber=-1;
    	var diag1Found=0;
    	var diag1Letter='8';
    	var diag2Found=0;
    	var diag2Letter='8';
	var sideLength=0.0;
	var outRow="";
	var outMessage="";
	var spaceCount=0;
	var spacesPerChar=0.15;
    	// When the Devvit app sends a message with `context.ui.webView.postMessage`, this will be triggered
    	window.addEventListener('message', (ev) => {
      		const { type, data } = ev.data;

      		// Reserved type for messages sent via `context.ui.webView.postMessage`
      		if (type === 'devvit-message') {
        		const { message } = data;

        		// Always output full message
        		output.replaceChildren(JSON.stringify(message, undefined, 2));

        		// Load initial data
        		if (message.type === 'initialData') {
          			const { messagePost, currentCounter } = message.data;
          			messageLabel.innerText = messagePost;
          			ribbons.innerText = isSquare;
        		}

        		// Update counter
        		if (message.type === 'updateCounter') {
          		const { currentCounter } = message.data;
          		ribbons.innerText = isSquare;
        		}
      			}
    	});

  	//register button  listeners
	  
    	aboutButton.addEventListener('click', () => {
	    	output.innerText="Make a reddit post. Get bling if its length is square and a column or diagonal all has the same letter.";
//		this.myFunction();
	});

    	checkButton.addEventListener('click',  () => {

		
	
   	  	//check if square
		messageString=myText.value;
		messageString=messageString.replaceAll(" ","-");
		sideLength=Math.floor(Math.sqrt(messageString.length));
 	       	if((messageString.length-(sideLength*sideLength))<.001)
       			{
               	 	messageLabel.innerText="Yes";
			picE.hidden=false;
			isSquare=1;
			picE.height=(50+0.25*sideLength);
                        picE.width=(50+0.25*sideLength);


                	}
		else
			{
			sideLength=sideLength+1;
			picE.hidden=true;
			isSquare=0;
			messageLabel.innerText="No";
			}

		//Display nicely in output
		outRow="Here's your post in bumblybox form: \n \n";
		for(var ii=0;ii<messageString.length;ii=ii+sideLength)
		{
			outRow=outRow.concat(messageString.substring(ii, ii+sideLength));
			outRow=outRow.concat("\n");

		}
		
		output.innerText=outRow;

		//check if too  much gibberish or repetition
		if((isSquare>0)&&(sideLength>1))
			{
			  //Check that there is an adequate number of spaces in the message...
			 spaceCount=messageString.split("-").length-1;
			 if(messageString.length*spacesPerChar<spaceCount)
				{
					isGibberish=0;
					output2.innerText="No";
				}
			 else
			 	{
					isGibberish=1;
					output2.innerText="yes";
					outRow=outRow+"\n You only get bling for posts with actual text."
					output.innerText=outRow;
					picE.hidden=true;
					picV.hidden=true;
					picDL.hidden=true;
					picDR.hidden=true;
					picI.hidden=true;
				}
				
                        //Eventually, I could add more checks here... for example to make sure 
		        //at least most of the words found are in a dictionary. This is OK for now.

			//Also, I could put a check for uniqueness here too possibly.

			}


		
		//check if you find column matches
	        outMessage="";
		//columnNumber=0;
		columnFound=0;
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
			
			{
			 for (var col=0; col<sideLength;col++)
				{
				  columnTemp=0;
				  columnLetter=messageString[col];

				  for(var row=1;row<sideLength;row++)
					{
						if(messageString[row*sideLength+col]==columnLetter)
						{
							columnTemp=columnTemp+1;
						}
					}
				  if(columnTemp>sideLength-1.1)
					{
					//	columnNumber=col;
						columnFound=columnFound+1
					}
				 // else
				//	{
				//		columnNumber=-1;
				//	}
				}
			if(columnFound>0)
				{
				outMessage=outMessage+"Column ";
				picV.hidden=false;
				picV.height=(50+0.25*sideLength);
                        	picV.width=(50+0.25*sideLength);

				}
			else
				{
				picV.hidden=true;
				}
 				
			} 
		//check if you find diagonal matches
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
			{
			//check left diagonal
			diag1Found=0;
			diag1Letter=messageString[0];
			for (var ii=1;ii<sideLength;ii++)
				{
				  if(messageString[ii*sideLength+ii]==diag1Letter)
					{
						diag1Found=diag1Found+1;
					}
				}
			if(diag1Found>sideLength-1.1)
				{
				outMessage=outMessage+"  Left Diag";
				picDL.hidden=false;
				picDL.height=(50+0.25*sideLength);
                        	picDL.width=(50+0.25*sideLength);

				}
			else
				{
				picDL.hidden=true;
				}
			}
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
		{
			//check right diagonal
			diag2Found=0;
			diag2Letter=messageString[sideLength-1];
		        for(var ii=2;ii<sideLength+1;ii++)
				{

				if(messageString[(ii)*(sideLength)-ii]==diag2Letter)
					{
						diag2Found=diag2Found+1;
					}
				}
		        if((diag2Found>sideLength-1.1)&&(sideLength>0))
			{
				outMessage=outMessage+"  Right diag";
				picDR.hidden=false;
				picDR.height=(50+0.25*sideLength);
	                        picDR.width=(50+0.25*sideLength);

			}
			else
			{
				picDR.hidden=true;
			}
		}
			ribbonLabel.innerText=outMessage;

    	});

    	postButton.addEventListener('click', () => {
      	// Sends a message to the Devvit app
	// This needs to send to the server side: the message string, whether it is a square, 
	// how many columns found and how many diagonals found. 
	// It posts the messsage to reddit. If a square is found, it also sets flair appropriately.
      		window.parent?.postMessage(
        //	{ type: 'setCounter', data: { newCounter: Number(counter - 1) } },
       	//	 '*'
      	//	);
        //	{ type: 'simple', data: { squareness: Number(isSquare)  } },
        	{ type: 'simple', data: { messagePost: messageString, squareness: Number(isSquare)  } },
		'*'
              );
		ribbonLabel.innerText="Currently this goes to the back end. Eventually, it may be a separate subreddit post.";

    	});
  } //close the constructor

 // myFunction () 
//	{
//		document.querySelector('#messageLen').innerText="Win";
//	}
}  //close the class

new App();
