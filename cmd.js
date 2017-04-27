function speechOutput(str1) {
	    var str2 = cmdRecognize(str1);	
            var msg = new SpeechSynthesisUtterance();
            msg.lang = 'en-US';
            msg.rate = 10 / 10;
            msg.pitch = 1;
            msg.text = str2;
            msg.onend = function (e) {
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };
		console.log(speechSynthesis);
            speechSynthesis.speak(msg);
	    window.location.href = '#modal-one';
        };

function cmdRecognize(string) {
	if(string=='What\'s your name' || string=='What is your name') {
		return 'Did i forget to introduce myself. Hi, i'm xtron';
	} else {
		return string;
	}
};
