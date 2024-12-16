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
    	const messageLabel = document.querySelector('#messageLen');
    	const counterLabel = document.querySelector('#counter');
    	const myText=document.querySelector('#in-text');
    	const myPic=document.querySelector('#pic1');
	const output2 = document.querySelector('#commentOutput');

	
    	var counter = 0;
    	var messageString="x";
    	var isSquare=0;
    	var columnFound=0;
    	var columnLetter='8';
	var columnNumber=-1;
    	var diag1Found=0;
    	var diag1Letter='8';
    	var diag2Found=0;
    	var diag2Letter='8';
	var sideLength=0.0;
	var outRow="";
	var outMessage="";
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
          			const { username, currentCounter } = message.data;
          			messageLabel.innerText = username;
          			counterLabel.innerText = counter = currentCounter;
        		}

        		// Update counter
        		if (message.type === 'updateCounter') {
          		const { currentCounter } = message.data;
          		counterLabel.innerText = counter = currentCounter;
        		}
      			}
    	});

  	//register button  listeners
	  
    	aboutButton.addEventListener('click', () => {
	    	output.innerText="Make a reddit post. Get bling or flair if its length is square and a column or diagonal all has the same letter.";
//		this.myFunction();
	});

    	checkButton.addEventListener('click',  () => {

      		output.innerText="Yo";
		
	
   	  	//check if square
		messageString=myText.value;
       		messageLabel.innerText=messageString.length;
		sideLength=Math.floor(Math.sqrt(messageString.length));
 	       	if((messageString.length-(sideLength*sideLength))<.001)
       			{
               	 	output2.innerText="FOUND A SQUARE";
			//output2.innerText=sideLength.toString();
			myPic.src="./assets/box2.png";
			isSquare=1;
                	}
		else
			{
			sideLength=sideLength+1;
			output2.innerText=sideLength.toString();
			myPic.src="./assets.box1.png";
			isSquare=0;
			}
      	         output2.innerText=isSquare.toString(); 

		//Display nicely in output
		outRow="";
		for(var ii=0;ii<messageString.length;ii=ii+sideLength)
		{
			outRow=outRow.concat(messageString.substring(ii, ii+sideLength));
			outRow=outRow.concat("\n");

		}
		
		output.innerText=outRow;

		//check if too  much gibberish or repetition
		if(messageString=="bbb")
			{
			output2.innerText="Too much gibberish";

			//calculate min words I expect...

			//pick off individual words of the message and strip ending punctuation

			//Open the files

			//go through short file to find matches

			//go through long file to find matches

			//close the files
			}



		//check if you find column matches
		columnNumber=-1;
		if(isSquare>0)
			
			{
			 output2.innerText="HERE";
			
			 for (var col=0; col<sideLength;col++)
				{
				  columnFound=0;
				  columnLetter=messageString[col];

			//	  for(row=1;row<sideLength-1;row++)
			//		{
			//			if(messageString[0]==columnLetter)
			//			{
			//				columnFound=columnFound+1;
			//			}
			//		}
				 // if(columnFound==sideLength-1)
				//	{
				//		columnNumber=col;
			//		}
				 
				}
		        
			columnNumber=20;
			if(columnNumber>-10)
				{output2.innerText="Found a Column";}
			}
        
		//check if you find diagonal matches
		if(isSquare>0)
			{
			//check left diagonal
			diag1Found=0;
			diag1Letter=messageString[0];
			for (var ii=0;ii<sideLength;ii++)
				{
				  if(messageString[ii*sideLength+ii]==diag1Letter)
					{
						diag1Found=diag1Found+1;
					}
				}
			if(diag1Found>sideLength-1)
				{output2.innerText="Found left diagonal.";}
			}
			//check right diagonal
			diag2Found=0;
			diag2Letter=messageString[sideLength-1];
		        for(var ii=0;ii<sideLength;ii++)
			{	
			//UNFINISHED
			}
		        if(diag2Found>sideLength-1)
			{
				output2.innerText="Found right diagonal.";
			}

    	});

    	postButton.addEventListener('click', () => {
      	// Sends a message to the Devvit app
	// This needs to send to the server side: the message string, whether it is a square, 
	// how many columns found and how many diagonals found. 
	// It posts the messsage to reddit. If a square is found, it also sets flair appropriately.
      		window.parent?.postMessage(
        	{ type: 'setCounter', data: { newCounter: Number(counter - 1) } },
       		 '*'
      		);
    	});
  } //close the constructor

 // myFunction () 
//	{
//		document.querySelector('#messageLen').innerText="Win";
//	}
}  //close the class

new App();
