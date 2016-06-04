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

Enemy.prototype.reset = function() {
	var x = getRandomArbitrary(-100, 0);
	var y = getRandomArbitrary(50, 250);
	this.x = x;
	this.y = y;
	console.log(this.x + " " + this.y);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
Player.prototype.checkCollisions = function (allEnemies, player) {
	  console.log(this.x + " " + this.y);
      for (i = 0; allEnemies[i] <= 3; i++) {
		if ((allEnemies[i].x + 100 >= this.x) && (allEnemies[i].x <= this.x + 100) && (allEnemies[i].y + 100 >= this.y) && (allEnemies[i].y <= this.y + 100))
          alert("You got me!");
      }
};

//player.checkCollisions(allEnemies, player);
	
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
    // Run checkCollisions function
	this.checkCollisions(allEnemies, player);
	
	//console.log(allEnemies, player);
};

	
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Advance player one square based on key
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
		//console.log(this.x + ", " + this.y);
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
        if (this.y <= 10) {
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


// This is what started initial rendering.  Removed that 'Uncaught ReferenceError: player is not defined'
var player = new Player();

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

allEnemies.forEach(function() {}); // define a function to operate on each enemy



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
