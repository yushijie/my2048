var board = new Array();
var score = 0;
var gold = 0;
var has_conflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
var success_string = 'Success';
var gameover_string = 'GameOver';

$(document).ready(function() {
	prepare_for_mobile();
	new_game();
});

function new_game() {
	//初始化棋盘
	init();
	//在随机两个格子生成数字
	generate_one_number();
	generate_one_number();
	console.log("new game");
}

function init() {
	//init the cell position
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var grid_cell = $('#grid_cell_' + i + '_' + j);
			grid_cell.css('top', get_pos_top(i, j));
			grid_cell.css('left', get_pos_left(i, j));
		}
	}
	//init two array
	//the first one records nummbers
	//the second one records the conflict
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		has_conflicted[i] = new Array();
		for (var j =0; j < 4; j++) {
			board[i][j] = 0;
			has_conflicted[i][j] = false;
		}
	}
	update_board_view();
	score = 0;
	update_score(score);
	
	$('#over').text('fighting!');
}

//update the number and it's style
function update_board_view() {
	$('.number_cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
			var number_cell = $('#number_cell_' + i + '_' + j);
			if (board[i][j] == 0) {
				number_cell.css('width', '0px');
				number_cell.css('height', '0px');
				number_cell.css('top', get_pos_top(i, j) + cell_side_length / 2);
				number_cell.css('left', get_pos_left(i, j) + cell_side_length / 2);
			} else {	
				number_cell.css('width', cell_side_length);
				number_cell.css('height', cell_side_length);
				number_cell.css('top', get_pos_top(i, j));
				number_cell.css('left', get_pos_left(i, j));
				number_cell.css('background-color', get_number_background_color(board[i][j]));
				number_cell.css('color', get_number_color(board[i][j]));
				number_cell.css('font-size', get_number_fontsize(board[i][j]));
				number_cell.text(board[i][j]);
			}
			has_conflicted[i][j] = false;
		}
	}
	$('.number_cell').css('line-height', cell_side_length + 'px');
}

function generate_one_number() {
	if (nospace(board)) {
		return false;
	}
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	var time = 0;
	while (time < 50) {
		if (board[randx][randy] == 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		time++;
	}
	//if not find the empty position in 50 times,then set the last empty position's value
	if (time == 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
		}
	}
	//随机一个数字
	var rand_number = Math.random() < 0.66 ? 2 : 4;
	//在随机位置显示随机数字
	board[randx][randy] = rand_number;
	show_number_with_animation(randx, randy, rand_number);
	return true;
}

$(document).keydown(function(event) {
	if ($('#score').text() == success_string) {
		new_game();
		return;
	}
	switch (event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (move_left()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 38: //up
			event.preventDefault();
			if (move_up()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 39: //right
			event.preventDefault();
			if (move_right()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 40: //down
			event.preventDefault();
			if (move_down()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		default:
			break;
	}
});

var atFirstTime = false;

var container = document.getElementById("touch_cover");

container.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
	atFirstTime = true;
});

container.addEventListener('touchmove', function(event) {
	event.preventDefault();
	var deltax = event.touches[0].pageX - startx;
	var deltay = event.touches[0].pageY - starty;
//	$("#x").html("x:"+endx);
//	$("#y").html("y:"+endy);
	
	if(atFirstTime == true){
		if (Math.abs(deltax) < 0.05 * document_width && Math.abs(deltay) < 0.05 * document_width) {
			return;
		}
		else{
			if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax > 0) {
			//move right
			if (move_right()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
				atFirstTime = false;
			}
		} else {
			//move left
			if (move_left()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
				atFirstTime = false;
			}
		}
	} else {	//y
		if (deltay > 0) {
			//move down
			if (move_down()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
				atFirstTime = false;
			}
		} else {
			//move up
			if (move_up()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
				atFirstTime = false;
			}
		}
	}
		}
	}
});

// document.addEventListener('touchend', function(event) {
	// event.preventDefault();
	// if ($('#score').text() == success_string) {
		// new_game();
		// return;
	// }
// });

function move_left() {
	if (!can_move_left(board)) {
		return false;
	}
	//move left
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && no_block_horizontal(i, k, j, board)) {
						show_move_animation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && no_block_horizontal(i, k, j, board) && !has_conflicted[i][k]) {
						show_move_animation(i, j, i, k);
						board[i][k] += board[i][j]
						board[i][j] = 0;
						//add score
						score += board[i][k];
						
						has_conflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	
	update_score(score);
	
	setTimeout('update_board_view()', 100);
	return true;
}

function move_right() {
	if (!can_move_right(board)) {
		return false;
	}
	//move right
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && no_block_horizontal(i, j, k, board)) {
						show_move_animation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && no_block_horizontal(i, j, k, board) && !has_conflicted[i][k]) {
						show_move_animation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						
						has_conflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	
	update_score(score);
	
	setTimeout('update_board_view()', 100);
	return true;
}

function move_up() {
	if (!can_move_up(board)) {
		return false;
	}
	//move up
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && no_block_vertical(j, k, i, board)) {
						show_move_animation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && no_block_vertical(j, k, i, board) && !has_conflicted[k][j]) {
						show_move_animation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						
						has_conflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	
	update_score(score);
	
	setTimeout('update_board_view()', 100);
	return true;
}

function move_down() {
	if (!can_move_down(board)) {
		return false;
	}
	//move down
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && no_block_vertical(j, i, k, board)) {
						show_move_animation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && no_block_vertical(j, i, k, board) && !has_conflicted[k][j]) {
						show_move_animation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						
						has_conflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	
	update_score(score);
	
	setTimeout('update_board_view()', 100);
	return true;	
}

function is_gameover() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 2048) {
				//update_score(success_string);
				$('#over').text(success_string);
				return;
			}
		}
	}
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover() {
	//update_score(gameover_string);
	$('#over').text('Game Over!');
}

function prepare_for_mobile() {
	if (document_width > 500) {
		grid_container_width = 500;
		cell_side_length = 100;
		cell_space = 20;
	}
	
	$('#touch_cover').css('width', grid_container_width - 2 * cell_space);
	$('#touch_cover').css('height', grid_container_width - 2 * cell_space);
	$('#touch_cover').css('padding', cell_space);
	
	$('#grid_container').css('width', grid_container_width - 2 * cell_space);
	$('#grid_container').css('height', grid_container_width - 2 * cell_space);
	$('#grid_container').css('padding', cell_space);
	$('#grid_container').css('border-radius', 0.02 * grid_container_width);
	$('.grid_cell').css('width', cell_side_length);
	$('.grid_cell').css('height', cell_side_length);
	$('.grid_cell').css('border-radius', 0.02 * grid_container_width);
}