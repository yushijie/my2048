function show_number_with_animation(i, j, rand_number) {
	var number_cell = $('#number_cell_' + i + '_' + j);
	number_cell.css('background-color', get_number_background_color(rand_number));
	number_cell.css('color', get_number_color(rand_number));
	number_cell.css('font-size', get_number_fontsize(rand_number));
	number_cell.text(rand_number);
	number_cell.animate({
		width: cell_side_length,
		height: cell_side_length,
		top: get_pos_top(i, j),
		left: get_pos_left(i, j)
	}, 50);
}

function show_move_animation(fromx, fromy, tox, toy) {
	var number_cell = $('#number_cell_' + fromx + '_' + fromy);
	number_cell.animate({
		top: get_pos_top(tox, toy),
		left: get_pos_left(tox, toy)
	}, 100);
}

function update_score(score) {
	var score0 = parseInt($('#score').text());
	$('#score').text(score);
	
	var difference = score - score0;
	if (difference > 0) {
		$('#score').append('<div class="score-addition">+'+difference+'</div>');
	}
	
	if(!window.localStorage.highestScore || score > window.localStorage.highestScore){
		window.localStorage.highestScore = score;
		$('#highestScore').text(score);
	}
	
	update_gold(score);
}

function update_gold(score) {
	if(score > 100){
		gold = parseInt(score/100);
		
		var gold0 = parseInt($('#gold').text());
		$('#gold').text(gold);
		
		var difference = gold - gold0;
		if (difference > 0) {
			$('#gold').append('<div class="score-addition">+'+difference+'</div>');
		}
	}
}











