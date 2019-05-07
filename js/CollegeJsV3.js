// JavaScript Document

//global vars
var activeButton;
var activeTab;

// runs the function maintainence once the page has loaded
window.onload = Maintainence();

//maintainence func. loads the default tabs and confirms that the page has loaded
function Maintainence() { 
	"use strict";
	//gets the unit 1 tab and makes it appear with the fade in anim.
	activeTab = document.getElementById('unit 1');
	activeTab.classList.add("fadeIn");
	activeTab.style.display = "block";
	//gets the unit 1 button and sets its background to a dark grey to signify that is is the active tab
	document.getElementById("defaultOpen").style.backgroundColor = "#7f7f7f";
	
	//logs that the page has loaded
	console.log("the page has loaded!!!!");
}

//gets all the unit tabs and organises them in an array-like object
var tabs = document.getElementsByClassName("tabContent");
//gets all the unit buttons and organises them in an array-like object;
var buttons = document.getElementsByClassName("unitButton");

//function hides all the tabs and sets all the buttons to the inactive background colour before setting the specified tab to display and it's corrisponding button to the active bg colour
function DisplayTabs(unit, button) {
	//logs which button was clicked for debuging
	console.log(button.innerHTML + " button was clicked. now displaying " + unit);
	
	/* //sets each tab to be hidden
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].style.display = "none";
	}
	
	//sets each button to the inactive bg colour
	for (i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = "#dddddd";
	}
	
	//gets the unit tab and makes it visible
	document.getElementById(unit).style.display = "block";
	//sets the clicked button to the active bg colour
	button.style.backgroundColor = "#7f7f7f"; */
	
	activeTab.classList.remove("fadeIn");
	activeTab.addEventListener("animationend", ChangeActives(unit, button));
	activeTab.classList.add("fadeOut");
}

function ChangeActives(unit, button) {
	
	activeTab.style.display = "none";
	activeTab.removeEventListener("animationend", ChangeActives(unit, button));
	activeButton.style.background = "#dddddd";
	
	activeTab = document.getElementById(unit);
	activeButton = button;
	
	activeTab.classList.add("fadeIn");
	activeTab.style.display = "block";
	activeButton.style.background = "#7f7f7f";
}
