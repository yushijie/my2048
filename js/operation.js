//show the highest score
$('#highestScore').text(window.localStorage.highestScore);

//
var loginBtn = document.getElementById("login");
loginBtn.addEventListener('touchend', function(event) {
	event.preventDefault();
	
	$('#dialog_login').hide();
	$('#cover').hide();
	
});

//
var toregBtn = document.getElementById("to_reg");
toregBtn.addEventListener('touchend', function(event) {
	event.preventDefault();
	
	$('#dialog_login').hide();
	$('#dialog_reg').show();
	
});

//
var regBtn = document.getElementById("reg");
regBtn.addEventListener('touchend', function(event) {
	event.preventDefault();
	
	$('#dialog_reg').hide();
	$('#cover').hide();
	
});

//
var beginBtn = document.getElementById("new_game_button");
beginBtn.addEventListener('touchend',function(event) {
	event.preventDefault();
	
	new_game();
  	
});






























