// JavaScript Document

//find all slideshow elements
var slideshows = document.querySelectorAll('.slideshow');
//array to store Slideshow objects once they are created
var slideshowObjs = [];

function SlideshowObj(DOMobj) {
	//references to all the HTML elements that will be used
	this.parent = DOMobj;
	console.log(DOMobj);
	this.imgElems = this.parent.querySelectorAll('img');
	this.controls = DOMobj.querySelector('.slideshowControls');
	this.prevButt = this.controls.querySelectorAll('button')[0];
	this.nextButt = this.controls.querySelectorAll('button')[this.controls.querySelectorAll('button').length - 1];
	this.controlBar = this.controls.querySelector('.controlBar');
	// array of image objects to 
	this.images = [];
	// attribute fot the indvidual timer for each slideshow element
	this.timer = undefined;
	// if a slide is being changed this will be true
	this.inProg = false
	// what slide (image) the slideshow is currently on
	this.currentIndex = 0;
	
	// takes the src from each img child and turns it into and image object to be stored
	while(this.imgElems.length > 0){
		var currImg = new Image();
		currImg.src = this.imgElems[0].src;
		this.images.push(currImg);
		DOMobj.removeChild(this.imgElems[0]);
	}
	
	// creates a var reference to this object to help event functions
	var obj = this;
	// creates click events for both buttons
	this.nextButt.addEventListener('click', function(){
		obj.nextSlide(true);
	});
	this.prevButt.addEventListener('click', function(){
		obj.prevSlide(true);
	});
}

SlideshowObj.prototype.changeSlide = function(click, slide) {
	// sets the inProg attribute to true while the slide is being changed
	this.inProg = true;
	// checks if the slide stated is within the arrays length and loops it if not
	if(slide >= this.images.length){
		slide = 0;
	}
	else if(slide > 0){
		slide = this.images.length - 1;
	}
	// creates a new image element
	var nextImgElem = document.createElement('img');
	// assigns the next slide's src to the new element
	nextImgElem.scr = this.images[slide].src;
	// appendes the element to the slideshow element
	this.parent.appendChild(nextImgElem);
	// adds an event listener to remove the previous slide element once it has faded out.
	var obj = this;
	this.imgElems[0].addEventListener('animationend', function func(obj){
		this.classList.remove('fadeOut');
		obj.inProg = false;
		this.parentNode.removeChild(this);
	});
	// sets the previous slide to fade out
	this.imgElems[0].classList.add('fadeOut');
	// sets the currentIndex to the new slide's index
	this.currentIndex = slide;
	this.timer = setTimeout(function(){this.nextSlide(false);}, 10000);
};

SlideshowObj.prototype.nextSlide = function(click) {
	// checks if the function is being called from an element or a timeout and if the slideshow is currently changing slides
	if (click === true && this.inProg === false) {
		clearTimeout(this.timer);
	}
	else if(click === false && this.inProg === false) {
		
	}
};

SlideshowObj.prototype.prevSlide = function(click) {
	if (click === true && this.inProg === false) {
		clearTimeout(this.timer);
	}
	else if (click === false && this.inProg === false){
		
	}
};

SlideshowObj.prototype.startShow = function(){
	this.timer = setTimeout(function(){this.nextSlide(false);}, 10000);
};

