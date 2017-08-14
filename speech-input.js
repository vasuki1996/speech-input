/*global webkitSpeechRecognition */

(function() {
	'use strict';

	// check for support (webkit only)
	if (! ('webkitSpeechRecognition' in window) ) return;

	var talkMsg = 'start talking';

	// seconds to wait for more input after last
	var patience = 6;

	function capitalize(str) {
		return str.length ? str[0].toUpperCase() + str.slice(1) : str;
	}

function speechOutput(str1) {	
            var msg = new SpeechSynthesisUtterance();
            msg.lang = 'en-US';
            msg.rate = 10 / 10;
            msg.pitch = 1;
            if(str1=='What\'s your name' || str1=='What is your name') {
		msg.text = 'Did i forget to introduce myself. Hi, i\'m xtron';
	} else if(str1=='Get me the logo') {
		msg.text = 'here is the logo';
		window.open('../assets/img/logo.png','popUpWindow','height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no');
	} else if(str1=='Fuck you' || str1=='Fuck you extron' || str1=='Fuck you babe') {
		msg.text('dude, what\'s wrong with you, i\'m a robot');
	} else if(str1=='Hello') {
		//var audio = new Audio('audio_file.mp3');
		//audio.play();
		msg.text = 'Hello How do you do?';
	}
	else {
		msg.text = str1;
	}
            msg.onend = function (e) {
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };
		console.log(speechSynthesis);
            speechSynthesis.speak(msg);
	    window.location.href = '#modal-one';
        };

/*function cmdRecognize(string) {
	if(string=='What\'s your name' || string=='What is your name') {
		return 'Did i forget to introduce myself. Hi, i'm xtron';
	} else {
		return string;
	}
};*/

	var inputEls = document.getElementsByClassName('speech-input');

	[].forEach.call(inputEls, function(inputEl) {
		// create wrapper
		var wrapper = document.createElement('div');
		wrapper.classList.add('si-wrapper');

		// create mic button
		var micBtn = document.createElement('button');
		micBtn.classList.add('si-btn');
		micBtn.textContent = 'speech input';
		var micIcon = document.createElement('span');
		var holderIcon = document.createElement('span');
		micIcon.classList.add('si-mic');
		holderIcon.classList.add('si-holder');
		micBtn.appendChild(micIcon);
		micBtn.appendChild(holderIcon);

		// gather inputEl data
		var nextNode = inputEl.nextSibling;
		var parent = inputEl.parentNode;
		var inputHeight = inputEl.offsetHeight;
		var inputRightBorder = parseInt(getComputedStyle(inputEl).borderRightWidth, 10);
		var buttonSize = 0.8 * inputHeight;
		// Size bounds (useful for textareas).
		if (buttonSize > 26) buttonSize = 26;

		// append mic and input to wrapper
		wrapper.appendChild(parent.removeChild(inputEl));
		wrapper.appendChild(micBtn);

		// size and position mic and input
		micBtn.style.top = 0.1 * inputHeight + 'px';
		micBtn.style.height = micBtn.style.width = buttonSize + 'px';
		inputEl.style.paddingRight = buttonSize - inputRightBorder + 'px';

		// append wrapper where input was
		parent.insertBefore(wrapper, nextNode);

		// setup recognition
		var finalTranscript = '';
		var recognizing = false;
		var timeout;
		var oldPlaceholder = null;
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;

		function restartTimer() {
			timeout = setTimeout(function() {
				recognition.stop();
			}, patience * 1000);
		}

		recognition.onstart = function() {
			oldPlaceholder = inputEl.placeholder;
			inputEl.placeholder = talkMsg;
			recognizing = true;
			micBtn.classList.add('listening');
			restartTimer();
		};

		recognition.onend = function() {
			recognizing = false;
			clearTimeout(timeout);
			micBtn.classList.remove('listening');
			if (oldPlaceholder !== null) inputEl.placeholder = oldPlaceholder;
		};

		recognition.onresult = function(event) {
			clearTimeout(timeout);
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					finalTranscript += event.results[i][0].transcript;
				}
			}
			finalTranscript = capitalize(finalTranscript);
			inputEl.value = finalTranscript;
			speechOutput(finalTranscript);
			restartTimer();
		};

		micBtn.addEventListener('click', function(event) {
			event.preventDefault();
			if (recognizing) {
				recognition.stop();
				return;
			}
			inputEl.value = finalTranscript = '';
			recognition.start();
		}, false);
	});
})();
