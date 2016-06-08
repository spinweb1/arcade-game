var Character = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* setting inheritance */
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Enemies our player must avoid (aka: the Enemy constructor)
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	var x = getRandomArbitrary(-100, 0);
	var y = getRandomArbitrary(50, 250);
	var speed = getRandomArbitrary(1, 100);
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + this.speed * dt;
	
	if (this.x > 505) {
    	this.reset();		
	}
};

Enemy.prototype.reset = function() {
	var x = getRandomArbitrary(-100, 0);
	var y = getRandomArbitrary(50, 250);
	this.x = x;
	this.y = y;
};

// Draw the enemy on the screen, required method for game
/*Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/



// Write winner class to add winning feedback
var Winner = function() {
	this.x = -205;
    this.y = -300;	
	this.sprite = 'images/you-win.png';	
};

// Draw the winner graphic on screen
Winner.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create new Winner object instance
var winner = new Winner();

// Create show method for Winner class
Winner.prototype.show = function() {
   var doneStatus = false;
	if (!doneStatus) {
	  setTimeout(function(){
		winner.x = 125;
		winner.y = 250;
	  }, 1000);
	  doneStatus = true;
	}
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 205;
    this.y = 420;	
	this.sprite = 'images/char-boy.png';	
};

// Need to check for collisions
Player.prototype.checkCollisions = function (allEnemies) {
	  var allEnemiesLength = allEnemies.length;
      for (var i = 0; i < allEnemiesLength; i++) {
		if ((allEnemies[i].x + 50 >= this.x) && (allEnemies[i].x <= this.x + 50) && (allEnemies[i].y + 50 >= this.y) && (allEnemies[i].y <= this.y + 50)) {
		  this.reset();	
	  	}
    }
};

Player.prototype.reset = function() {
	this.x = 205;
    this.y = 420;	
};
	
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	var self = this;
	
    // Run checkCollisions function
	this.checkCollisions(allEnemies);
	
	// If player hits ocean, pause and then reset position	
	if (this.y <= 87) {
	 setTimeout(function(){
	  self.reset();
	 }, 1500);
	 winner.show();
	 setTimeout(function(){
	    winner.x = -2005;
	    winner.y = -3000;
	 }, 2500);
   }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Advance player one square based on key
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
        if (this.x <= 50) {
            this.x = 5;
        }
        else {
            this.x -= 100;
        }
        break;

        case 'right':
        if (this.x >= 350) {
            this.x = 405;
        }
        else {
            this.x += 100;
        }
        break;

        case 'up':
		if (this.y <= 87) {
 			this.y = 5;
		}
        else {
            this.y -= 83;			
        }
        break;

        case 'down':
        if (this.y >= 420) {
            this.y = 420;
        }
        else {
            this.y += 83;
        }
        break;
    }
};


// Place the player object in a variable called player
var player = new Player();

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allEnemies = [];
for (var i = 0; i < 3; i++) {
	allEnemies.push(new Enemy());
	//console.log(allEnemies[i].x);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});