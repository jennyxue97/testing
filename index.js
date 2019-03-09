var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var SpeechGrammar = SpeechGrammar || webkitSpeechGrammar

var filler_words = ["um", "uh", "uhm"];
var grammar = '#JSGF V1.0; grammar filler; public <filler> = ' + filler_words.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 3);
console.log(speechRecognitionList.length);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var count = 0;
// var colorHTML= '';
// colors.forEach(function(v, i, a){
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';

function startRecording() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

function stopRecording() {
  recognition.stop();
}

recognition.onresult = function(event) {
  console.log(event.results);
  count += 1;
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  // var last = event.results.length - 1;
  // var color = event.results[last][0].transcript;

  // diagnostic.textContent = 'Result received: ' + color + '.';
  // bg.style.backgroundColor = color;
  // console.log('Confidence: ' + event.results[0][0].confidence);
}


recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function trackGlaze() {
  webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
    console.log(xprediction, yprediction);
    console.log(elapsedTime); //elapsed time is based on time since begin was called
}).begin();
}