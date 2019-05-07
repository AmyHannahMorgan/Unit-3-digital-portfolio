// JavaScript Document
var dob = new Date("1999-01-31");
var today = new Date();

var birthYear = dob.getFullYear();
var thisYear = today.getFullYear();

window.onload = DisplayAge();

function DisplayAge() {
	document.getElementById("age").innerHTML = (thisYear - birthYear);
}
