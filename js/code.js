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
var arrow=["up","down","left","right"];
var difficulty=1;
var arrowKeyDownTimer=0;
//var up,down,left,right;
var spaceKeyDownTimer=0;
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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    bg = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    bg.autoScroll(this.levelSpeed, 0);
    bg.fixedToCamera = true;
    spaceButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    cursors = this.input.keyboard.createCursorKeys();
    //////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    checker = this.add.sprite(0,game.world.height*(4/5)+120, 'laser');
    game.physics.arcade.enable(checker);
    checker.anchor.set(0.5);
    checker.scale.setTo(0.05,0.6);
    checker.body.maxVelocity.set(1500);
    checker.body.collideWorldBounds = false;
    wippo = this.add.sprite(game.world.width/2,game.world.height*(4/5)+15 ,'ship');
    game.physics.arcade.enable(wippo);
    wippo.anchor.set(0.5);
    floor = this.add.sprite(0,game.world.height*(4/5)+50,'laser');
    game.physics.arcade.enable(floor);
    floor.scale.setTo(10,0.6);
    floor.body.collideWorldBounds = false;
    floor.body.immovable = true;
    ///////////////////////////////////////////////////////////////
    game.time.events.add(Phaser.Timer.SECOND * 2, wippoLaunch, this);


    //wippo.events.onOutOfBounds.add(gameEnd(), this);

    /*this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })*/


}

function update() {
    /*if(!this.game.world.bounds.intersects(wippo)){
        console.log(true);
        wippo.kill();
        checker.body.velocity.x = 0;
    }*/
    if(inGame)
    {
        //this.scoreText.setText('Score : ' + this.score);
        bg.tilePosition.y += bgSpeed;
        collectArrow();
        if (spaceButton.isDown&&game.time.now > spaceKeyDownTimer)
        {

            checkAccuracy();
            spaceKeyDownTimer = game.time.now + 1000;
            //pointSpeed+=10;
        }
        game.world.wrap(checker, 16);
        checker.body.velocity.y=0;
    	  checker.body.velocity.x=checkerSpeed;
    }
    game.physics.arcade.collide(wippo,floor);

}
function checkAccuracy(){
    if (checkOverlap(checker, perfect))
    {
      console.log("Perfect!");
      bgSpeed=40;
    }
    else if (checkOverlap(checker, goodR))
    {
      console.log("Good!");
      bgSpeed=20;
    }
    else if (checkOverlap(checker, goodL))
    {
      console.log("Good!");
      bgSpeed=20;
    }
    else if (checkOverlap(checker, fairR))
    {
      console.log("fair!");
      bgSpeed=0;
    }
    else if (checkOverlap(checker, fairL))
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
function collectArrow(){
    for (var i = 0; i < wave.length; i++){
      if(waveCheck[i]==true){
        continue;
      }else if(cursors.up.isDown&&game.time.now > arrowKeyDownTimer){
        console.log("cursor up is down\nwave[i].name = "+wave[i].name);
        if(wave[i].name=="up"){
          waveCheck[i]=true;
          console.log("wave["+i+"] is true");
          //animations
        }else{
          resetWave();
        }
        arrowKeyDownTimer = game.time.now + 500;
      }else if(cursors.down.isDown&&game.time.now > arrowKeyDownTimer){
        if(wave[i].name=="down"){
          waveCheck[i]=true;
          console.log("wave["+i+"] is true");
          //animations
        }else{
          resetWave();
        }
        arrowKeyDownTimer = game.time.now + 500;
      }
    }
}
function resetWave(){

}
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
wippoLaunch = function (){
    floor.body.velocity.y = 400;
    console.log("launch");
    wippo.body.velocity.y = -150;
    bgSpeed=30;
    game.time.events.add(Phaser.Timer.SECOND * 2, gameBegin, this);
}
gameBegin = function (){
    wippo.body.velocity.y = 0;
    bgSpeed=20;
    perfect = this.add.sprite(game.world.width/2,game.world.height*(4/5)+90,'laser');
    perfect.scale.setTo(0.4,0.6);
    goodR = this.add.sprite(perfect.x+perfect.width,game.world.height*(4/5)+90,'laser');
    goodR.scale.setTo(0.4,0.6);
    goodL = this.add.sprite(perfect.x-goodR.width,game.world.height*(4/5)+90,'laser');
    goodL.scale.setTo(0.4,0.6);
    fairR = this.add.sprite(goodR.x+goodR.width,game.world.height*(4/5)+90,'laser');
    fairR.scale.setTo(0.4,0.6);
    fairL = this.add.sprite(goodL.x-fairR.width,game.world.height*(4/5)+90,'laser');
    fairL.scale.setTo(0.4,0.6);
    summonWave(3);
    checker.reset(0,game.world.height*(4/5)+120);
    inGame = true;
}
function summonWave(length){
    var l = wave.length;
    //var startPositon;
    if(length==3){
        x=game.world.width/2-50;
        y=game.world.height*3/5;
    }
    for(var i=0;i<l;i++){
    	 wave.pop();
       waveCheck.pop();
    }
    for (var i = 0; i < length; i++){
        var rand = game.rnd.integerInRange(0, difficulty);
        console.log("rand = "+rand);
        wave.push(new arrowCreate(x,y,rand));
        waveCheck.push(false);
        x+=50;
        wave[i].name=arrow[rand];
        console.log("create arrow.");
    }
}
arrowCreate = function (x,y,rand) {
    this.game = game;
    this.alive = true;
    if(rand==0){
        this.up = game.add.sprite(x, y, 'up');
        this.up.anchor.set(0.5);
        this.up.scale.setTo(0.3, 0.3);
        this.up.name = "up";
        //this.up.name = index.toString();
    }else if(rand==1){
        this.down = game.add.sprite(x, y, 'down');
        this.down.anchor.set(0.5);
        this.down.scale.setTo(0.3, 0.3);
        this.down.name = "down";
        //this.down.name = index.toString();
    }else if(rand==2){
        this.right = game.add.sprite(x, y, 'right');
        this.right.anchor.set(0.5);
        this.right.scale.setTo(0.3, 0.3);
        this.right.name = "right";
        //this.right.name = index.toString();
    }else{
        this.left = game.add.sprite(x, y, 'left');
        this.left.anchor.set(0.5);
        this.left.scale.setTo(0.3, 0.3);
        this.left.name = "left";
        //this.left.name = index.toString();
    }
    /*up = this.add.sprite(x,y,'up');
    up.scale.setTo(0.3,0.3);
    left = this.add.sprite(x,y,'left');
    left.scale.setTo(0.3,0.3);
    right = this.add.sprite(x,y,'right');
    right.scale.setTo(0.3,0.3);
    down = this.add.sprite(x,y,'down');
    down.scale.setTo(0.3,0.3);*/
}
