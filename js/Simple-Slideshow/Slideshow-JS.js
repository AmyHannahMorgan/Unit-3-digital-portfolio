// a working example of the code can be found here: https://jsfiddle.net/AmyHannahMorgan/hgbo6eu0/174/

var slideshowObjs = []; // array for storing Slideshow objects
var slideTimer = 10000; // global timer for slide changes, 1000 = 1 second & 10000 = 10 seconds


function PausableTimer(func, time){ // creates a pausabletimer object
	this.time = time; // stores the time that the timer should wait for
	this.continue = 0; //stores the time left on the timer if paused
	this.func = func; // stores the function that should be executed when the timer reaches 0
	this.timer = setTimeout(this.func, this.time); // creates a timeout using the function and time provided
	this.start = Date.now(); // stores the date
	this.paused = false;
	
	this.pause = function(){
		if(!this.paused){
			clearTimeout(this.timer);
			this.continue = this.time - (Date.now() - this.start);
			this.paused = true;
		}
	};
	
	this.unpause = function(){
		if(this.paused){
			this.timer = setTimeout(this.func, this.continue);
			this.paused = false;
		}
	};
	
	this.restart = function(){
		this.timer = setTimeout(this.func, this.time);
		this.start = Date.now();
	};
	
	this.clear = function(){
		clearTimeout(this.timer);
	};
}

function SizeMaintainer(element, width, size, aspectRatio){
	this.element = element;
	this.size = size;
	this.parent = this.element.parentNode;
	this.lastSize = width === true ? this.parent.offsetWidth : this.parent.offsetHeight;
	this.width = width;
	this.aspectRatio = aspectRatio;
	this.time = 33;

	this.maintain = () => {
		if(this.width) {
			
			if(this.parent.offsetWidth !== this.lastSize && this.aspectRatio !== undefined) {
				this.lastSize = this.parent.offsetWidth;
				var aspects = this.aspectRatio.split(':'),
					width = parseInt(aspects[0]),
					height = parseInt(aspects[1]);
				this.element.style.height = (this.lastSize * this.size) / width * height;
			}
		}
		else {
			if(this.parent.offsetHeight !== this.lastSize && this.aspectRatio !== undefined) {
				this.lastSize = this.parent.offsetHeight;
				var aspects = this.aspectRatio.split(':'),
					width = parseInt(aspects[0]),
					height = parseInt(aspects[1]);
				this.element.style.width = (this.lastSize * this.size) / height * width;
			}
		}
		this.timer.restart();
	};
	
	this.timer = new PausableTimer(this.maintain, this.time);
}
	
function Slideshow(slideshowElem) { // function for creating slideshow objects

	/* 'this' refers to the object that is containing it, in this case 'this' is refering to the Slideshow 
	object that is being created. We create and set attributes and methods of objects by first calling
	'this.' followed by the name of the attribute or method and then the value */
	
	this.parent = slideshowElem; // saves the parent slideshow element as an attripute
	console.log(this.parent.style.width);
	console.log(this.parent.style.height);
	if (/\w%/.test(this.parent.style.width) || /\w%/.test(this.parent.style.height)) {
		var float = function(str){
			return parseInt(str) / 100;
		},
			aspect = this.parent.getAttribute('aspect-ratio') !== null ? this.parent.getAttribute('aspect-ratio') : undefined;
		this.sizeMaintainer = new SizeMaintainer(this.parent, true, float(this.parent.style.width.replace('%', '')));
	}
	
	this.images = buildImages(this.parent.querySelectorAll('img')); // creates an array for storeing image objects
	
	this.index = 0; // sets the slide index to 0, the first image/slide
	this.slide = this.parent.querySelector('img'); // sets the slide to the first img element for future use.
	
	this.inProg = false; // attribute to detect if the slideshow is changing slides
	
	// finds the first element with the class slideshow controls
	this.controls = this.parent.querySelector('.slideshowControls');
	var buttons = this.controls.querySelectorAll('button'); // finds all the buttons
	this.prevButt = buttons[0]; // sets the previous button to the first button element
	this.nextButt = buttons[buttons.length - 1]; // sets the next button to the last button element
	this.controlBar = this.controls.querySelector('.slideshowBar');
	this.dots = buildBarDots(this.controlBar, this.images.length, this);
	
	/* TODO add explenation of encapsulation and 'this' use*/
	
	var obj = this; // creates a variable referencing the object
	var timerEnable = this.parent.getAttribute('timer-enable');
	var timerTime = this.parent.getAttribute('slide-time');
	if(timerEnable === null || timerEnable === '' || timerEnable === '1'){
		this.time = !(timerTime === null || timerTime === '') ? timerTime : slideTimer;
		console.log(this.time);
		this.timer = new PausableTimer(function(){
			obj.changeSlide(false, obj.index + 1);
		}, this.time);
	}
	
	this.prevButt.addEventListener('click', function(){ // listens for a click on the button
	
	/* we cannot use 'this' inside of event functions as 'this' refers to the object calling the function,
	in this case the prevButt element, so we use the above obj variable to refer to the Slideshow object*/
	
		if(!obj.inProg){ // checks if the slide is being changed already
			obj.changeSlide(true, obj.index - 1); // calls a method from the Slideshow object
		}
	});
	
	this.nextButt.addEventListener('click', function(){
		if(!obj.inProg){ 
			obj.changeSlide(true, obj.index + 1);
		}
	});
	
	this.changeSlide = function(click, slide){
		this.inProg = true;
		if(click === true){
			this.timer.clear(); // clear slide timer if button was clicked
		}
		
		/* checks if selected slide is above greater than the length of the array and loops the slide if so*/
		if(slide >= this.images.length){ 
			slide = 0;
		}
		/*loops the slide to the last index if it is less than 0*/
		else if(slide < 0){
			slide = this.images.length - 1;
		}
		var obj = this;
		this.slide.addEventListener('animationend', function foo(){
			this.style.opacity = '0';
			this.classList.remove('ssFadeOut');
			this.src = obj.images[slide].src; // sets the source of the img to the new slide
			void this.offsetWidth; // forces the browser to recalculate, ensures animations play;
			this.removeEventListener('animationend', foo); // removes the first event listener
			this.addEventListener('animationend', function bar(){
				this.style.opacity = '';
				this.classList.remove('ssFadeIn');
				this.removeEventListener('animationend', bar);
				obj.index = slide; // sets the new index to the slide index;
				obj.inProg = false; // sets in progress to false to allow the slides to be changed again
				obj.timer.restart();
			});
			this.classList.add('ssFadeIn');
			obj.dots[slide].classList.add('active');
		});
		this.slide.classList.add('ssFadeOut');
		this.dots[this.index].classList.remove('active');
	};
}

function buildImages(imageElems){
	var images = [];
	for(var i = 0; i < imageElems.length; i++){ // goes through every img element provided
		var currImg = new Image(); // creates a new image object
		currImg.src = imageElems[i].src; // sets the source of the image object to the source of the img elem
		images.push(currImg);// stores the image object in the images attribute
		if(i > 0){
			imageElems[i].parentNode.removeChild(imageElems[i]); // removes the image element if it is not the first element
		}
	}
	return images;
}

function buildBarDots(parent, count, obj){
	var dots = [];
	for(var i = 0; i < count; i++){ // repeats the code for as many images (count) as are present
		var elem = document.createElement('slideshowDot'); // creates a new slideshowDot element
		parent.appendChild(elem); // adds the element within the parent element, slideshowControls
		elem.style.width = elem.offsetHeight + 'px'; // sets the width of the element to the same as its height
		elem.setAttribute('index', i); // sets an attribute with the current i value
		if(i === 0){elem.classList.add('active')}
		elem.addEventListener('click', function(){ // creates an event to fire when the element is clicked
			obj.changeSlide(true, this.getAttribute('index')); // changes the slide to the side with the corrisponding index
		});
		dots.push(elem);
	}
	return dots;
}

function buildSlideshowObjs(){
	var slideshows = document.querySelectorAll('slideshow'); // finds all slideshow elements
	for(var i = 0; i < slideshows.length; i++){ // goes through every slideshow element
		console.log(slideshowObjs[i]);
		var currObj = new Slideshow(slideshows[i]); // creates a slideshow object for each object
		console.log(currObj);
		slideshowObjs.push(currObj); // pushes the new object to the array for storage
	}
}

function checkOnScreen(element){
	var rect = element.getBoundingClientRect(); // get the total size of the rectangle and its position
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight); // get the height of the view port
	return (rect.bottom < 0 || rect.top - viewHeight >= 0); // if the bottom position is less than 0 or the top - the viewport height is greater than 0 then return true.
}

document.onLoad = buildSlideshowObjs();

window.onscroll = function(){ // detects when the window scrolls 
	for(var i = 0; i < slideshowObjs.length; i++){ // goes through each Slideshow object
		/*checks if the Slideshow object is on screen and if its timer has not been paused, if both are
		true then the objects timer is paused*/
		if(checkOnScreen(slideshowObjs[i].parent) && !slideshowObjs[i].timer.paused){
			slideshowObjs[i].timer.pause();
		}
		// if the slideshow is on screen and its timer is paused then it unpauses its timer
		else if(!checkOnScreen(slideshowObjs[i].parent) && slideshowObjs[i].timer.paused){
			slideshowObjs[i].timer.unpause();
		}
	}
};

window.onblur = function(){ // fires when the tab or browser is no longer active
	for(var i = 0; i < slideshowObjs.length; i++){ // goes through all slideshow objects
		if(!slideshowObjs[i].timer.paused){ // if the timer is not already paused
			slideshowObjs[i].timer.pause(); // pauses the timer of the slideshow
		}
	}
};

window.onfocus = function(){ // fires when the tab or browser becomes active
	for(var i = 0; i < slideshowObjs.length; i++){ // goes through every slideshow object
		if(!checkOnScreen(slideshowObjs[i].parent) && slideshowObjs[i].timer.paused){ // if the slideshow is on sceen and its timer is paused 
			slideshowObjs[i].timer.unpause(); // unpauses the slideshows timer timer
		}
	}
};
