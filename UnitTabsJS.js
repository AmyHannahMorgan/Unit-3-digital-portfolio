// JavaScript Document

openPage();

function openPage(tabName, button) {
	
	"use strict";
	
	var i, tabContent, unitButtons;
	
	tabContent = document.getElementsByClassName("tabContent");
	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";
	}
	
	unitButtons = document.getElementsByClassName("unitButton");
	for (i = 0; i < unitButtons.length; i++) {
		unitButtons[i].style.backgroundColor = "";
	}
	
	document.getElementById(tabName).style.display = "block";
	
	button.style.backgroundColor = "#7f7f7f";
}

document.getElementById("defaultOpen").click();