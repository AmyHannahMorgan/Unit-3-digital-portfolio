// JavaScript Document

var activeTab;
var activeButt;

var buttonsCont;
var tabsCont;

window.onload = start_up();

window.onpopstate = function (e) {
	activeTab.addEventListener('animationend', function func() {
		maintainence(this);
		this.removeEventListener('animationend', func);
	});
	activeTab.classList.add('fadeOut');
	activeTab = document.getElementById(history.state.id);
};
	
function maintainence(elem){
	var classes = elem.classList
	
	if (classes.contains('fadeIn')) {
		classes.remove('fadeIn');
	}
	else if (classes.contains('fadeOut')){
		classes.remove('fadeOut');
		elem.style.display = 'none';
		display_active();
	}
}

function display_active(){
	activeTab.classList.add('fadeIn');
	activeTab.addEventListener('animationend', function func(){
		maintainence(this);
		this.removeEventListener('animationend', func);
	});
	activeTab.style.display = 'block';
	
	activeButt.style.backgroundColor = '#7f7f7f';
}

function change_active(tabId, butt){
	if(butt === undefined){
		var butts = document.getElementsByClassName('unitButton');
		var unit = tabId.replace('-', ' ').toLowerCase();
		for(var i = 0; i < butts.length; i++){
			if(butts[i].innerHTML.toLowerCase() === unit){
				butt = butts[i];
				break;
			}
		}
	}
	
	if (activeTab === undefined){
		activeTab = tabsCont.querySelector('#' + tabId);
		activeButt = butt;
		
		activeTab.addEventListener('animationend', function func(){
			maintainence(this);
			this.removeEventListener('animationend', func);
		});
		activeTab.classList.add('fadeIn');
		activeTab.style.display = 'block';
		
		activeButt.style.backgroundColor = '#7f7f7f';
		push_history(tabId);
	}
	else{
		activeTab.addEventListener('animationend', function func(){
			maintainence(this);
			this.removeEventListener('animationend', func);
		});
		activeTab.classList.add('fadeOut');
		activeButt.style.backgroundColor = '#dddddd';
		
		push_history(tabId);
		
		activeTab = tabsCont.querySelector('#' + tabId);
		activeButt = butt;
	}
}

function start_up(){
	tabsCont = document.querySelector('#tabContentDiv');
	var url = window.location.href;
	console.log(url);
	if (url.includes('?')){
		var params = url.split('?')[1];
		activeTab = tabsCont.querySelector('#' + params);
		activeButt = getButt(params);
		display_active();
	}
	else{
		var butt = document.getElementById('defaultOpen');
		butt.click();
	}
}

function getButt(params){
	var butts = document.getElementsByClassName('unitButton');
	var unit = params.replace('-', ' ').toLowerCase();
	for(var i = 0; i < butts.length; i++){
		if(butts[i].innerHTML.toLowerCase() === unit){
			console.log(butts[i]);
			return butts[i];
		}
	}
}

function push_history(id){
	if (window.location.href.includes('?') && window.location.href.split('?'[1] !== id)){
			history.pushState({id: id}, document.title, window.location.href.split('?')[0] + '?' + id);
		}
		else{
			history.pushState({id: id}, document.title, window.location.href + '?' + id);
		}
}