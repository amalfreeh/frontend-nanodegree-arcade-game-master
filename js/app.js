// Enemies our player must avoid
var Enemy = function (x, y, speed) {

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        score.updateMiss();
    };

};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
var Player = function (x, y) {

    // Variables for the player to move along x and y axis
    this.x = x;
    this.y = y;

    //The image of the player of horn-girl is added to the playing field
    this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 50);
        score.updateSuccess();
    };
};

var Score = function() {
  this.success = 0;
  this.miss = 0;
};

Score.prototype.updateSuccess = function() {
  this.success += 1;
  document.getElementById('score-success').innerHTML = this.success;
};

Score.prototype.updateMiss = function() {
  this.miss += 1;
  document.getElementById('score-miss').innerHTML = this.miss;
};


//  enemies in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);
var score = new Score();
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
