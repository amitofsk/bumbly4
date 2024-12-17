/*
 * Here's the javascript that does most of the work. It has event listeners for handling
 * button presses. If the check button is pressed, it checks if the message has square length
 * and meets other criteria. If the post button is pressed, info is sent to the server side.
 * See the readme for more information and additional features I'd like to add.
 *
 */


class App {
  constructor() {
    	//These variables are local to the constructor. They are not member variables.
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
//	var columnTemp=0;
  //  	var columnLetter='8';
	var columnNumber=-1;
    	var diag1Found=0;
    	var diag2Found=0;
	var sideLength=0.0;
	var outRow="";
	var outMessage="";
	var spaceCount=0;
	var spacesPerChar=0.15;
	var picStartSize=35;
	var picGrowSize=3;
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


  	//Register the button  listeners.
    	aboutButton.addEventListener('click', () => {
	    	output.innerText="Make a reddit post. Get bling if its length is square and a column or diagonal all has the same letter.";
	});



    	checkButton.addEventListener('click',  () => {

   	  	//Check if the message length is a pefect square. If so, display some bling.
		messageString=myText.value;
		messageString=messageString.replaceAll(" ","-");
		sideLength=Math.floor(Math.sqrt(messageString.length));
 	       	isSquare=isSquareFunction(messageString);
       		if(isSquare==1)
			{
               	 	messageLabel.innerText="Yes";
			picE.hidden=false;
			picE.height=(picStartSize+picGrowSize*sideLength);
                        picE.width=(picStartSize+picGrowSize*sideLength);
                	}
		else
			{
			sideLength=sideLength+1;
			picE.hidden=true;
			picV.hidden=true;
			picDL.hidden=true;
			picDR.hidden=true;
			picI.hidden=true;
			messageLabel.innerText="No";
			}

		//Display nicely in output
		outRow=displayPrettyFunction(messageString, sideLength);

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


		
		//Check if you find column matches, and if so show bling.
	        outMessage="";
		columnFound=0;
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
			
			{
			columnFound=checkColumns(messageString, sideLength);
			if(columnFound>0)
				{
				outMessage=outMessage+"Column ";
				picV.hidden=false;
				picV.height=(picStartSize+picGrowSize*sideLength);
                        	picV.width=(picStartSize+picGrowSize*sideLength);

				}
			else
				{
				picV.hidden=true;
				}
			}


		//Check if you find diagonal matches, and if so show bling.
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
			{
			//check left diagonal
			diag1Found=checkLeftDiagonal(messageString,sideLength)
			if(diag1Found>sideLength-1.1)
				{
				outMessage=outMessage+"  Left Diag";
				picDL.hidden=false;
				picDL.height=(picStartSize+picGrowSize*sideLength);
                        	picDL.width=(picStartSize+picGrowSize*sideLength);
				}
			else
				{
				picDL.hidden=true;
				}
			}
		if((isSquare>0)&&(sideLength>1)&&(isGibberish==0))
			{
			//check right diagonal
			diag2Found=checkRightDiagonal(messageString, sideLength);
		        if((diag2Found>sideLength-1.1)&&(sideLength>0))
			{
				outMessage=outMessage+"  Right diag";
				picDR.hidden=false;
				picDR.height=(picStartSize+picGrowSize*sideLength);
	                        picDR.width=(picStartSize+picGrowSize*sideLength);

			}
			else
			{
				picDR.hidden=true;
			}
			}
		ribbonLabel.innerText=outMessage;


		//In the future, maybe check for inner boxes, such as a two by two box of o's, in the message?

    	});

    	postButton.addEventListener('click', () => {
      	// Sends a message to the Devvit app
	// This needs to send to the server side: the message string, whether it is a square, 
	// how many columns found and how many diagonals found. 
	// It posts the messsage to reddit. If a square is found, it also sets flair appropriately.
      		window.parent?.postMessage(
        		{ type: 'simple', data: { messagePost: messageString, squareness: Number(isSquare)  } },
				'*');
				ribbonLabel.innerText="Currently this goes to the back end. Eventually, it may be a separate subreddit post.";
    	});
  } //close the constructor

}  //close the class



//This function checks if the message length is a perfect square. 
function isSquareFunction (inMsg)
        {
                var isSq=0;
		var sideLength2;
                sideLength2=Math.floor(Math.sqrt(inMsg.length));
                if((inMsg.length-(sideLength2*sideLength2))<.001)
                      {isSq=1;}
                return isSq;
        }



//This function displays the message in bumblybox form
function displayPrettyFunction(inMsg, sideLen)
{

 	var outRow="Here's your post in bumblybox form: \n \n";
        for(var ii=0;ii<inMsg.length;ii=ii+sideLen)
             {
               outRow=outRow.concat(inMsg.substring(ii, ii+sideLen));
               outRow=outRow.concat("\n");
                }

                document.querySelector('#messageOutput').innerText=outRow;
	return outRow;
}


//This function checks for left diagonals
function checkLeftDiagonal(inMsg, sideLen)
{
	var foundDiag=0;
        var diag1Letter=inMsg[0];
        for (var ii=1;ii<sideLen;ii++)
        {
        	if(inMsg[ii*sideLen+ii]==diag1Letter)
                {
                   	foundDiag=foundDiag+1;
                }
        }

	return foundDiag;
}


//This function checks for right diagonals
function checkRightDiagonal(inMsg, sideLen)
{
	var foundDiag=0;
        var diag2Letter=inMsg[sideLen-1];
        for(var ii=2;ii<sideLen+1;ii++)
        {
          if(inMsg[(ii)*(sideLen)-ii]==diag2Letter)
            {
               foundDiag=foundDiag+1;
             }
	}

	return foundDiag;
}



//This function checks for columns.
function checkColumns(inMsg, sideLen)
{
	var foundColumn=0;
	var columnTemp=0;
	var columnLetter='7';
	for (var col=0; col<sideLen;col++)
            {
            columnTemp=0;
            columnLetter=inMsg[col];
 	    for(var row=1;row<sideLen;row++)
              	{
                if(inMsg[row*sideLen+col]==columnLetter)
                    {
                    columnTemp=columnTemp+1;
                    }
                }
             if(columnTemp>sideLen-1.1)
                {
                foundColumn=foundColumn+1;
                }
             }
	return foundColumn;
}


new App();
