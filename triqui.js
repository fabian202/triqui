var triqui = {
	init: function(){

		$(document).on("ready", triqui.play);


	},
	play: function(){
		$(".play-area").on("click", triqui.mark);
		
		triqui.restart();
	},
	mark: function(e){
		//$(this).html('lol');

		
		var play_area = $(this);
		if(play_area.hasClass('marked')) return;
		var class_player = 'play-' + triqui.turn;
		play_area.html(triqui.turn).addClass('marked ' + class_player);

		var rows = 0;
		var columns = 0;


		$("div#container div.play-area").each(function(index, value){
			
			triqui.matrix[rows][columns] = $(value).html();			
			columns++;

			//Validate if the row should increase
			if((index + 1) % 3 == 0){
				rows++;
				columns = 0;
			}
		});

		if(!triqui.check_winner()) {
			triqui.change_turn();
		} else {
			triqui.restart();
		}
	},
	check_winner: function(){
		//Check rows and columbns
		var counter_row = 0;
		var counter_col = 0;
		for (row = 0; row < 3; row++) {
			for (col = 0; col < 3; col++) {
				if(triqui.matrix[row][col] == triqui.turn){
					counter_row++;
				} else {
					counter_row = 0;
				}

				if(triqui.matrix[col][row] == triqui.turn){
					counter_col++;
				} else {
					counter_col = 0;
				}
			};
			if(counter_row == 3 || counter_col == 3){
				alert('Gano la ' +  triqui.turn);				
				return true;
			} else {
				counter_row = 0;
				counter_col = 0;
			}			
		};

		//Check diagonal
		var tam = 3;
		counter_row = 0;
		for(row = 0; row < 3; row++){			
			if(triqui.matrix[row][row] == triqui.turn){
				counter_row++;
			} else {
				counter_row = 0;
				break;
			}
		};

		if(counter_row == 3){
			alert('Gano la ' +  triqui.turn);				
			return true;
		} else {
			counter_row = 0;
		}
	
		//Check diagonal secundaria
		for(row = 0; row < 3; row++){
			if(triqui.matrix[row][tam - 1] == triqui.turn){
				counter_row++;
			} else {
				counter_row = 0;
				break;
			} 
			tam--;
		};

		if(counter_row == 3){
				alert('Gano la ' +  triqui.turn);				
				return true;
			} else {
			counter_row = 0;
		}			

		return false;

		//check columsn
	},
	turn:'X',
	change_turn: function(){
		triqui.turn = triqui.turn == 'X' ? 'O' : 'X';
		$("#turn").text(triqui.turn);
		//console.log(triqui.turn);
	},
	restart: function(){
		$(".play-area").html('').removeClass('marked').removeClass('play-X').removeClass('play-O');

		triqui.turn = 'X';
		$("#turn").text(triqui.turn);
		//Declare the matrix
		console.log(triqui.matrix);
		triqui.matrix =new Array(3);
		for (i = 0; i < 3; i++) triqui.matrix[i]=new Array(3);


	},
	matrix:null
}

triqui.init();

