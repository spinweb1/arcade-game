// Enemies our player must avoid (aka: the Enemy constructor)
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
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



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.x = 210;
    this.y = 420;	
	this.sprite = 'images/char-boy.png';	
};
	
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 40;
    } else if (this.ctlKey === 'right' && this.x <= 400) {
        this.x = this.x + 40;
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 40;
    } else if (this.ctlKey === 'down' && this.y <= 400) {
        this.y = this.y + 40;
    }
	//console.log(this.x + ", " + this.y);
};
	
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
Player.prototype.handleInput = function(event) {
	this.ctlKey = event;
};

// Need to check for collisions
Player.prototype.checkCollisions = function (allEnemies, player) {
    console.log("checkCollisions!");
    // code omitted for brevity reasons
}

player.checkCollisions(allEnemies, player);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var x = getRandomArbitrary(-100, 0);
var y = getRandomArbitrary(50, 250);
var speed = getRandomArbitrary(1, 100);
var enemy1 = new Enemy(x,y,speed);
console.log(enemy1);


var x = getRandomArbitrary(-100, 0);
var y = getRandomArbitrary(50, 250);
var speed = getRandomArbitrary(1, 100);	
var enemy2 = new Enemy(x,y,speed);
console.log(enemy2);


var x = getRandomArbitrary(-100, 0);
var y = getRandomArbitrary(50, 250);
var speed = getRandomArbitrary(1, 100);
var enemy3 = new Enemy(x,y,speed);
console.log(enemy3);

var allEnemies = [enemy1, enemy2, enemy3];

// This is what started initial rendering.  Removed that 'Uncaught ReferenceError: player is not defined'
var player = new Player();

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
