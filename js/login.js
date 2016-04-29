function showDialog(){

	var dialog = document.querySelector('dialog');
	var showDialogButton = document.querySelector('#signup');
	if (! dialog.showModal){
		dialogPolyfill.registerDialog(dialog);
	}

	dialog.showModal();
}

function hideDialog(){
	var dialog = document.querySelector('dialog');
	dialog.close();
}

$(document).ready(function(){
		var bg_imgs = ["login1.jpg", "login2.jpg", "login3.jpg", "login4.jpg"];
		var imgCount = 4;
		var dir = 'img/';
		var randomCount = Math.floor(Math.random() * (imgCount - 1))+1;
		document.body.style.backgroundImage = "url(" + dir + bg_imgs[randomCount] + ")";
});