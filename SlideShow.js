// JavaScript Document

var images = ['../Assets/Images/Slideshow/clouds-countryside-dawn-1107717.jpg',
			   '../Assets/Images/Slideshow/ai-artificial-intelligence-blur-546819.jpg',
			 '../Assets/Images/Slideshow/background-board-card-825262.jpg',
			 '../Assets/Images/Slideshow/abstract-art-artistic-1279813.jpg'],
	slideshowImg = document.querySelector('#headerSlideshow').querySelector('.headerSlide').querySelector('img'),
	slideshowCont = document.querySelector('#headerSlideshow').querySelector('.headerSlide'),
	count = 0,
	nextImage = new Image();

window.onload = setTimeout(changeSlide, 10000);

function changeSlide() {
	if (count >= images.length) {
		count = 0;
	}
	
	if (slideshowCont.querySelectorAll('img') > 1) {
		while(slideshowCont.querySelectorAll('img') > 1) {
			var currElem = slideshowCont.querySelectorAll('img')[slideshowCont.querySelectorAll('img').length - 1];
			currElem.parentNode.removeChild(currElem);
		}
	}
	
	var imageElement = document.createElement('img');
	nextImage.onload = function () {
		imageElement.src = this.src;
		slideshowCont.appendChild(imageElement);
		slideshowCont.querySelectorAll('img')[0].addEventListener('animationend', function func() {
			this.style.opacity = '0';
			this.removeEventListener('animationend', func);
			this.parentNode.removeChild(this);
		});
		slideshowCont.querySelectorAll('img')[0].classList.add('fadeOut');
		setTimeout(changeSlide, 10000);
	};
	nextImage.src = images[count];
	count += 1;
}

function animate(step, element) {
	switch (step) {
		case 1:
			element.addEventListener('animationend', function func() {
				this.style.opacity = '0';
				this.removeEventListener('animationend', func);
				this.classList.remove('fadeOut');
				this.parentNode.removeChild(this);
				animate(2);
			});
			slideshowImg.classList.add('fadeOut');
			break;
		case 2:
			slideshowImg.addEventListener('animationend', function func() {
				this.style.opacity = '1';
				this.removeEventListener('animationend', func);
				this.classList.remove('fadeIn');
				animate(3);
			});
			slideshowImg.classList.add('fadeIn');
			break;
		case 3:
			setTimeout(changeSlide, 10000);
			break;
	}
}