

/*--[ World object ]------------------------------------------------*/

World = function( id, x, y ){
	this.id = id;
	this.x = x;
	this.y = y;

	this.antList = [];
}


World.prototype.populate = function( antNumber ){
	var randX = 0;
	var randY = 0;
	var securite = 10000;
	var ant;

	while( antNumber ){
		randX = Math.floor( Math.random() * this.x );
		randY = Math.floor( Math.random() * this.y );

		if( this.getAntAt(randX,randY).length == 0 ){
			ant = new Ant( randX, randY, this );
			this.antList.push( ant );
			antNumber--;
		}

		if( securite-- <= 0) {
			console.log( 'Ca chie ! Un monde trop peuplé peut-être ?' );
			break;
		}
	}
}



/*
	Return the list of Ants at the given position
*/
World.prototype.getAntAt = function( x, y ){
	var result = [];
	var ant;

	for(var i=0 ; i<this.antList.length ; i++ ) {
		ant = this.antList[i];

		if( ant.x == x && ant.y == y ){
			result.push( ant );
		}
	}
	return result;
}



World.prototype.doLiving = function(){
	var ant;

	for( var i=0 ; i<this.antList.length ; i++ ){
		ant = this.antList[i];

		ant.moveRandomly();
	}
	console.log( this.antList[0] );
	this.generateHTML();
}


World.prototype.generateHTML = function(){
	var dom = $(this.id);
	var row = $('<tr>');
	var cell;
	var ant;

	dom.html('');

	for( var i=0 ; i<this.y ; i++ ) {
		for( var j=0 ; j<this.x ; j++ ) {

			ant = this.getAntAt( j, i );
			cell = $('<td></td>').appendTo(row);

			for( var k=0 ; k<ant.length ; k++ ){
				cell.append( (k>0?'<br/>':'') + ant[k].html );
			}
		}
		dom.append(row);
		row = $('<tr>');
	}


	$('td').css('background-color','white');
	$('br').parent('td').css('background-color','pink');
}




World.prototype.debug = function(){
	console.log( this.antList );
}





/*--[ Ant object ]--------------------------------------------------*/

Ant = function( x, y, world ){
	this.name = "fourmi";
	this.x = x;
	this.y = y;
	this.world = world;
	this.html = this.chooseAName();
}




/*
	Choose a name for the ant, randomly !
*/
Ant.prototype.chooseAName = function(){
	var names = ['Orel','Emilie','Rafael','Océane','Julien',
				'Florian','Maxime','Jordy','Elodie','Romain',
				'Gregory','Dimitri','Frank','Mouad','Morel'];

	return names[Math.floor(Math.random() * names.length)];
}




/*
	Define a random place to go. The allowed positions are TOP, RIGHT,
	BOTTOM and LEFT, if these positions don't go outside the matrix.
*/
Ant.prototype.moveRandomly = function(){
	var possible_places = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];

	if( this.y <= 0 ) possible_places.splice(0,1);					// remove TOP
	if( this.y >= this.world.x ) possible_places.splice(2,1);		// remove BOTTOM
	if( this.x <= 0 ) possible_places.splice(3,1);					// remove LEFT
	if( this.x >= this.world.y ) possible_places.splice(1,1);		// remove TOP

	var direction = possible_places[Math.floor(Math.random()*possible_places.length)];

	switch( direction ){
		case 'TOP':		this.y--; break;
		case 'RIGHT':	this.x++; break;
		case 'BOTTOM':	this.y++; break;
		case 'LEFT':	this.x--; break;
	}
}






/*--[ Program ]-----------------------------------------------------*/

$(document).ready(function(){ 

	var w = new World( '#monde', 20, 20 );

	w.populate( 15 );
//	w.debug();
	w.generateHTML();


	setInterval( function(){w.doLiving();}, 200 );
});



