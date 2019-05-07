// JavaScript Document

window.onload = AddButtonEvents;

function AddButtonEvents() {
	"use strict";
	
	var buttons = document.getElementsByClassName("unitButton");
	var buttonArray = new Array;
	var consoleText = "";
	var i;
	
	/* for (i = 0; i < buttons.length; i++) {
		consoleText = consoleText + buttons[i].innerHTML + ", ";
		buttons[i].addEventListener("click", function() {} );
	}
	
	console.log(consoleText);*/
	
	/* buttons.forEach(function(arrayElement) {
		arrayElement.addEventListener("click", function() { TestFunc(arrayElement.innerHTML);});
	} ); */
	
	/* for (i = 0; i < buttons.length; i++) {
		buttonArray.push(buttons[i]);
	}
	
	buttonArray.forEach(function(button) { 
		
		button.addEventListener("click", function(buttonText) {console.log("I am " + buttonText);});
	}); */
	
}

function TestFunc(buttonName) {
	"use strict";
	console.log("Clicky!!! " + buttonName);
}

function ClickTestFunc() {
	console.log("i was clicked");
}
