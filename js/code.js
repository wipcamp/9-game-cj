var game = new Phaser.Game(337.5, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/ship.png');
	  game.load.image('bot','images/brids.png');
    game.load.image('enemy_ship','images/enemyship.png');
    game.load.image('background','images/sea.png');
    game.load.image('laser','images/biglaser.png');
}
var point;
var pointSpeed=150;
var cursors;
var spaceButton;
var spaceTimer=0;
var perfect;
var good1,good2;
var fair1,fair2;
var wippo;
var floor;
var bg;
var begin=false;
function create() {
    //game.world.setBounds(0, 0, 800, 1000);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    //game.add.sprite(0,0,'background');
    bg = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    bg.autoScroll(this.levelSpeed, 0);
    //bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;
    //point.body.drag.set(70);
    //cursors = this.input.keyboard.createCursorKeys();
    spaceButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    perfect = this.add.sprite(game.world.width/2,game.world.height*(4/5)+90,'lasers');
    perfect.scale.setTo(0.4,0.6);
    //perfect.fixedToCamera = true;
    good1 = this.add.sprite(perfect.x+perfect.width,game.world.height*(4/5)+90,'lasers');
    good1.scale.setTo(0.8,0.6);
    good2 = this.add.sprite(perfect.x-good1.width,game.world.height*(4/5)+90,'lasers');
    good2.scale.setTo(0.8,0.6);
    fair1 = this.add.sprite(good1.x+good1.width,game.world.height*(4/5)+90,'lasers');
    fair1.scale.setTo(1,0.6);
    fair2 = this.add.sprite(good2.x-fair1.width,game.world.height*(4/5)+90,'lasers');
    fair2.scale.setTo(1,0.6);

    /*perfect.fixedToCamera = true;
    perfect.cameraOffset.setTo(400, 500);
    good1.fixedToCamera = true;
    good1.cameraOffset.setTo(400+perfect.width,500);
    good2.fixedToCamera = true;
    good2.cameraOffset.setTo(400-good1.width,500);
    fair1.fixedToCamera = true;
    fair1.cameraOffset.setTo(400+perfect.width+good1.width,500);
    fair2.fixedToCamera = true;
    fair2.cameraOffset.setTo(400-perfect.width-fair1.width,500);*/

    /*game.physics.arcade.enable(perfect);
    game.physics.arcade.enable(good1);
    game.physics.arcade.enable(good2);
    game.physics.arcade.enable(fair1);
    game.physics.arcade.enable(fair2);*/

    point = this.add.sprite(0,game.world.height*(4/5)+120, 'laser');
    point.anchor.set(0.5);
    point.scale.setTo(0.05,0.6);
    //point.fixedToCamera = true;
    // point.cameraOffset.setTo(200, 500);
    game.physics.arcade.enable(point);
    point.body.maxVelocity.set(1500);
    point.body.collideWorldBounds = false;
    wippo = this.add.sprite(game.world.width/2,game.world.height*(4/5)-80 ,'ship');
    game.physics.arcade.enable(wippo);
    floor = this.add.sprite(0,game.world.height*(4/5)+50,'laser');
    floor.scale.setTo(10,0.6);
    game.physics.arcade.enable(floor);
    floor.body.collideWorldBounds = false;
    floor.body.immovable = true;
    game.time.events.add(Phaser.Timer.SECOND * 3, gameBegin, this);
    //floor.body.immovable = true;
    wippo.body.bounce.y = 0;
    wippo.body.gravity.y = 200;
    //wippo.events.onOutOfBounds.add(gameEnd(), this);
    //game.camera.follow(perfect);

    this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })


}

function update() {
    if(!this.game.world.bounds.intersects(wippo)){
        console.log(true);
        gameEnd();
    }
    if(begin)
    {
        this.scoreText.setText('Score : ' + this.score);
        if(wippo.body.velocity.y<0)
        {
            bg.tilePosition.y -= (wippo.body.velocity.y-7)/2.5;
            this.score+=bg.tilePosition.y/5000;
        }else {
            bg.tilePosition.y -= (wippo.body.velocity.y-7)/50;
        }
        if (spaceButton.isDown&&game.time.now > spaceTimer)
        {
            //wippo.body.velocity.y+=-300;
            check();

            point.reset(0,game.world.height*(4/5)+120);
            spaceTimer = game.time.now + 200;
            //pointSpeed+=10;
        }
        game.world.wrap(point, 16);
        point.body.velocity.y=0;
    	  point.body.velocity.x=pointSpeed;
    }
    game.physics.arcade.collide(wippo,floor);
}
function check(){
    if (checkOverlap(point, perfect))
    {
      console.log("Perfect!");
      wippo.body.velocity.y=-150;
    }
    else if (checkOverlap(point, good1))
    {
      console.log("Good!");
      wippo.body.velocity.y=-75;
    }
    else if (checkOverlap(point, good2))
    {
      console.log("Good!");
      wippo.body.velocity.y=-75;
    }
    else if (checkOverlap(point, fair1))
    {
      console.log("fair!");
      wippo.body.velocity.y=-33;
    }
    else if (checkOverlap(point, fair2))
    {
      console.log("fair!");
      wippo.body.velocity.y=-25;
    }
    else
    {
      console.log("Bad");
    }


}
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
gameBegin = function (){
    floor.body.velocity.y = 400;
    wippo.body.velocity.y= -300;
    point.reset(0,game.world.height*(4/5)+120);
    begin = true;
}
gameEnd = function (){
    wippo.kill();
    bg.tilePosition.y -= bg.tilePosition.y;
}
