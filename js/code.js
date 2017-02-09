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
    game.load.spritesheet('up','images/up.png',180,180);
    game.load.spritesheet('left','images/left.png',180,180);
    game.load.spritesheet('right','images/right.png',180,180);
    game.load.spritesheet('down','images/down.png',180,180);
}


var checker;
var checkerSpeed=80;
var cursors;
var spaceButton;
var wave=[];
var waveCheck=[];
var arrow=[];
//var up,down,left,right;
var spaceTimer=0;
var perfect;
var goodR,goodL;
var fairL,fairR;
//var upIn,downIn,leftIn,rightIn;
var wippo;
var floor;
var bg;
var bgSpeed=0;
var inGame=false;
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
    cursors = this.input.keyboard.createCursorKeys();
    //////////////////////////////////////////////////////////////
    perfect = this.add.sprite(game.world.width/2,game.world.height*(4/5)+90,'lasers');
    perfect.scale.setTo(0.4,0.6);
    goodR = this.add.sprite(perfect.x+perfect.width,game.world.height*(4/5)+90,'lasers');
    goodR.scale.setTo(0.4,0.6);
    goodL = this.add.sprite(perfect.x-good1.width,game.world.height*(4/5)+90,'lasers');
    goodL.scale.setTo(0.4,0.6);
    fairR = this.add.sprite(good1.x+good1.width,game.world.height*(4/5)+90,'lasers');
    fairR.scale.setTo(0.4,0.6);
    fairL = this.add.sprite(good2.x-fair1.width,game.world.height*(4/5)+90,'lasers');
    fairL.scale.setTo(0.4,0.6);
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    checker = this.add.sprite(0,game.world.height*(4/5)+120, 'laser');
    checker.anchor.set(0.5);
    checker.scale.setTo(0.05,0.6);
    game.physics.arcade.enable(checker);
    checker.body.maxVelocity.set(1500);
    checker.body.collideWorldBounds = false;
    wippo = this.add.sprite(game.world.width/2,game.world.height*(4/5)+15 ,'ship');
    game.physics.arcade.enable(wippo);
    wippo.body.bounce.y = 0;
    floor = this.add.sprite(0,game.world.height*(4/5)+50,'laser');
    floor.scale.setTo(10,0.6);
    game.physics.arcade.enable(floor);
    floor.body.collideWorldBounds = false;
    floor.body.immovable = true;
    ///////////////////////////////////////////////////////////////
    game.time.events.add(Phaser.Timer.SECOND * 2, gameBegin, this);

    //wippo.events.onOutOfBounds.add(gameEnd(), this);

    /*this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })*/


}

function update() {
    if(!this.game.world.bounds.intersects(wippo)){
        console.log(true);
        wippo.kill();
        point.body.velocity.x = 0;
    }
    if(inGame)
    {
        //this.scoreText.setText('Score : ' + this.score);
        bg.tilePosition.y += bgSpeed;
        if (spaceButton.isDown&&game.time.now > spaceTimer)
        {
            checkAccuracy();
            spaceTimer = game.time.now + 1000;
            //pointSpeed+=10;
        }
        game.world.wrap(checker, 16);
        checker.body.velocity.y=0;
    	  checker.body.velocity.x=checkerSpeed;
        if(wippo.body.y-game.height/3<20){
            wippo.body.velocity.y = 0;
            bg.tilePosition.y += 18;
            //console.log("kaw");
        }else{
            bg.tilePosition.y += 30;
        }
    }
    //console.log(wippo.body.velocity.y);
    game.physics.arcade.collide(wippo,floor);

}
function checkAccuracy(){
    if (checkOverlap(checker, perfect))
    {
      console.log("Perfect!");
      bgSpeed=40;
    }
    else if (checkOverlap(checker, good1))
    {
      console.log("Good!");
      bgSpeed=20;
    }
    else if (checkOverlap(checker, good2))
    {
      console.log("Good!");
      bgSpeed=20;
    }
    else if (checkOverlap(checker, fair1))
    {
      console.log("fair!");
      bgSpeed=0;
    }
    else if (checkOverlap(checker, fair2))
    {
      console.log("fair!");
      bgSpeed=0;
    }
    else
    {
      console.log("Bad");
      bgSpeed=-30
    }


}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
gameBegin = function (){
    floor.body.velocity.y = 400;
    console.log("gameBegin");
    //wippo.body.velocity.y = -360;
    wippo.body.velocity.y = -100;
    checker.reset(0,game.world.height*(4/5)+120);
    inGame = true;
    summonWave(3);
}
function summonWave(numberWave){
    var l = wave.length;
    var startPositon;
    if(numberWave==3){
        x=game.world.width/2-50;
        y=game.world.height*3/5;
    }
    for(var i=0;i<l;i++)
    	 wave.pop();
    destroyedCount=numberWave;
    for (var i = 0; i < numberWave; i++){
        wave.push(new arrowRandom(x,y));
        x+=50;
        console.log("looping");
    }
}
arrowRandom = function (x,y) {
    var rand = game.rnd.integerInRange(0, 3);
    this.game = game;
    this.alive = true;
    if(rand==0){
        this.up = game.add.sprite(x, y, 'up');
        this.up.anchor.set(0.5);
        this.up.scale.setTo(0.3, 0.3);
        //this.up.name = index.toString();
    }else if(rand==1){
        this.left = game.add.sprite(x, y, 'left');
        this.left.anchor.set(0.5);
        this.left.scale.setTo(0.3, 0.3);
        //this.left.name = index.toString();
    }else if(rand==2){
        this.right = game.add.sprite(x, y, 'right');
        this.right.anchor.set(0.5);
        this.right.scale.setTo(0.3, 0.3);
        //this.right.name = index.toString();
    }else{
        this.down = game.add.sprite(x, y, 'down');
        this.down.anchor.set(0.5);
        this.down.scale.setTo(0.3, 0.3);
        //this.down.name = index.toString();
    }
    /*up = this.add.sprite(x,y,'up');
    up.scale.setTo(0.3,0.3);
    left = this.add.sprite(x,y,'left');
    left.scale.setTo(0.3,0.3);
    right = this.add.sprite(x,y,'right');
    right.scale.setTo(0.3,0.3);
    down = this.add.sprite(x,y,'down');
    down.scale.setTo(0.3,0.3);*/
};
