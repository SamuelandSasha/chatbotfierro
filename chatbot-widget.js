document.querySelector('#chat-form').addEventListener('submit', async function(event) {  
  event.preventDefault();
  var question = document.querySelector('#chat-input').value;
  document.querySelector('#chat-input').value = "";

  var chatbox = document.querySelector('#chatbox');
  var userMessage = document.createElement('div');  
  userMessage.classList.add('chat-user');  
  userMessage.textContent = question;  
  chatbox.appendChild(userMessage);  

  var loadingMessage = document.createElement('div');
  loadingMessage.classList.add('chat-assistant');
  loadingMessage.textContent = "Loading.";
  var loadingId = setInterval(function() {
    loadingMessage.textContent += '.';
    if (loadingMessage.textContent === "Loading....") {
      loadingMessage.textContent = "Loading.";
    }
  }, 500);
  chatbox.appendChild(loadingMessage);

  let response = await fetch('http://sashasicking.pythonanywhere.com//answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: question }),
  })
  let data = await response.json();  
  var answer = data.answer;
// Log the first bot's response to the console
  console.log("First bot response:", answer);
  clearInterval(loadingId);
  chatbox.removeChild(loadingMessage);

  var newMessage = document.createElement('div');
  newMessage.classList.add('chat-assistant');

  var image = document.createElement('img');
  image.src = '3240374.png';  
  image.style.width = '20px';  
  image.style.height = '20px';  
  image.style.marginRight = '5px';

  let phrases = ["I'm sorry", "N/A", "I don't know", "This is not a relevant question", "SOURCES:", "The given portion of the document does not", "unclear", "experiencing suicidal thoughts.", "This question is inappropriate", "This portion of the document does not contain any relevant", "There is no relevant text", "There is no direct answer to the question.", "There is no direct answer", "It is not clear whether", "The website does not specify", "There is no clear answer", "The website does not have a clear answer", "It is not explicitly stated", "There is not enough information", "There is no relevant information", "It is not specified if", "The text does not provide information", "Yes, the website sells shoes without gender specificity mentioned.", "Fierro shoes offers women's sizes", "there is no specific mention","I'm really sorry to hear that you're feeling this way", "There is no information available", "is not mentioned in the provided sources.","There is no information provided about ","No, you do not pay for return postage.","There is no specific information provided","is not mentioned in the given portions of the document","The information provided is not sufficient","There is no specific information about whether", "there is no specific information about the color","there is no information about the available colors","Yes, Fierro Shoes sells women's shoes." ,"is not specified in the provided sources", "The document does not provide information", "not provided in the given information.", "is not provided.", "not mentioned in the given portion of the document","not mentioned in the given document","The information provided does not specify","There is no information provided", "diabetes","green","yellow","red","white","pink","turqoise"];
  let match = phrases.some(phrase => answer.includes(phrase));

  async function typeWriter(answer) {
    newMessage.appendChild(image);
    let i = 0;
    function addCharacter() {
      if (i < answer.length) {
        newMessage.appendChild(document.createTextNode(answer.charAt(i)));
        i++;
        setTimeout(addCharacter, 50);
      }
    }
    addCharacter();
  }

  if (match) {
    let simpleBotResponse = await fetch('https://simplechatbot-535615bf0009.herokuapp.com//simple_bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });
    let simpleBotData = await simpleBotResponse.json();
    answer = simpleBotData.answer;
  }

  await typeWriter(answer);

  chatbox.appendChild(newMessage);
  chatbox.scrollTop = chatbox.scrollHeight;
});

// The rest of your code remains the same


let count3 = 0;

function toggleChatbot() {
  count3 +1
  var chatWidget = document.getElementById("chat-widget");
  chatWidget.style.display = chatWidget.style.display === "none" ? "flex" : "none";
   if(count3 % 2 ){
     chatWidget.style.display !== "none"
  } else {
   
    chatWidget.style.display == "none"
  }
}

// Add event listener to the chatbot toggle button
document.getElementById("chatbot-toggle").addEventListener("click", toggleChatbot);
// Get the close button element
const closeButton = document.getElementById('chatbot-close');
  // Get the chat widget element
const chatWidget = document.getElementById('chat-widget');

// Add a click event listener to the close button
closeButton.addEventListener('click', () => {
  // Hide the chat widget
  chatWidget.style.display = 'none';
});


// Retrieve the stored count from local storage or initialize to 0
let count = localStorage.getItem('buttonPressCount') || 0;
const countDisplay = document.getElementById('count');
countDisplay.textContent = count;

document.getElementById("btn").addEventListener("click", btnClicked);

function btnClicked() {
  document.getElementById("buttontext").innerHTML = "Thanks for your response!";

  // Increment the click counter and update the display
  count++;
  localStorage.setItem('buttonPressCount', count);
  countDisplay.textContent = count;
}
// Retrieve the stored count from local storage or initialize to 0
let count2 = localStorage.getItem('buttonPressCount2') || 0;
const count2Display = document.getElementById('count2');
countDisplay.textContent = count;

document.getElementById("btn2").addEventListener("click", btn2Clicked);

function btn2Clicked() {
  document.getElementById("buttontext").innerHTML = "Thanks for your response!";

  // Increment the click counter and update the display
  count2++;
  localStorage.setItem('buttonPressCount2', count2);
  count2Display.textContent = count2;
}