var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: createGameplay , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/ship.png');
	game.load.image('bot','images/brids.png');
    game.load.image('enemy_ship','images/enemyship.png');
    game.load.image('background','images/sea.png'); 
    game.load.image('miss','images/miss.png');
    game.load.image('bad','images/bad.png');
    game.load.image('cool','images/cool.png');
    game.load.image('great','images/great.png');
    game.load.image('perfect','images/perfect.png');
    game.load.image('guage','images/guage.png');
    game.load.image('guageSeal','images/guageBlocker.png');

    game.load.spritesheet('up','images/up.png',320/2,155,4);
    game.load.spritesheet('down','images/down.png',320/2,155,4);
    game.load.spritesheet('right','images/right.png',320/2,154,4);
    game.load.spritesheet('left','images/left.png',315/2,154,4);
    game.load.spritesheet('laser','images/biglaser.png');
    game.load.spritesheet('sharkSeal','images/sharkSeal.png');
    game.load.spritesheet('spacebarBlock','images/spacebarBlock.png');
    game.load.spritesheet('numberText','images/numberText.png',744/11,78,11);
}


var checker;
var checkerSpeed=40;
var cursors;
var spaceButton;
var stopTimeButton;
var wave=[];
var waveCheckOrder=0;
var arrow=["up","down","right","left"];
var difficulty=1;
var arrowKeyDownTimer=0;
var spaceKeyDownTimer=0;
var perfect;
var greatR,greatL;
var coolL,coolR;
var badL,badR;
var wippo;
var floor;
var bg;
var bgSpeed=0;
var score;
var gamemode;
var specialGuageIsSpawned;
var specialGuage;
var specialGuageSeal;
var isSpacebarPressed;
var spacebarBlock;
var spacebarBlockIsSpawned;
var isSpacebarDown;
var maxGuage;
var guageAliveTimer;
var guageTimeCounter;
var guageTimerDigit2=null;
var guageTimerDigit1=null;
var guageTimerDecimal=null;
var stopTimerDigit1;
var stopTimerDecimal;
var stopTimeTimer;
var stopTimeCounter;
var isTimeStopped;

function createGameplay() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    bg = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    bg.autoScroll(this.levelSpeed, 0);
    bg.fixedToCamera = true;
    spaceButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    stopTimeButton = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
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
    floor = this.add.sprite(0,game.world.height*(4/5)+40,'laser');
    game.physics.arcade.enable(floor);
    floor.scale.setTo(20,0.6);
    floor.body.collideWorldBounds = false;
    floor.body.immovable = true;
    gamemode="begin";
    specialGuageIsSpawned=false;
    isSpacebarPressed=false;
    spacebarBlock = this.add.sprite(game.world.width*(3/5),game.world.height*(3/5)-20,'spacebarBlock');
    spacebarBlock.scale.setTo(0.2,0.2);
    spacebarBlock.kill();
    spacebarBlockIsSpawned=false;
    ///////////////////////////////////////////////////////////////
    game.time.events.add(Phaser.Timer.SECOND * 2, wippoLaunch, this);
    isSpacebarDown = false;
    maxGuage = 100;
    //gamemode = "feverTime";

    //wippo.events.onOutOfBounds.add(gameEnd(), this);

    score=0;
    /*this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })*/


}
var summonCooldown=0;
function update() {
    /*if(!this.game.world.bounds.intersects(wippo)){
        console.log(true);
        wippo.kill();
        checker.body.velocity.x = 0;
    }*/
    bg.tilePosition.y += bgSpeed;
    if(gamemode=="prepare"){
        
    }else if(gamemode=="ingame"){
        //this.scoreText.setText('Score : ' + this.score);
        collectArrow();
        
        if(!isTimeStopped){
            checker.body.velocity.x=checkerSpeed;
            if(spacebarBlock.alive){
                isSpacebarPressed=true;
                if(spaceButton.isDown){
                    gameEnd();
                }
            }else if (spaceButton.isDown&&game.time.now > spaceKeyDownTimer)
            {
                isSpacebarPressed=true;
                checkAccuracy();
                clearWave();
                spaceKeyDownTimer = game.time.now + 1500;
                if(score>=500&&score<1000){
                    gamemode="feverTime";
                    guageTimeCounter=15.0;
                    guageAliveTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 151, countdownTimer, this, "feverTime");
                }
            }
            if(checker.x>game.world.width*(5/7)){
                if(spacebarBlock.alive){
                        spacebarBlock.kill();
                }
                if(game.time.now > summonCooldown){
                    summonWave(6);
                    if(!isSpacebarPressed){
                        gameEnd();
                    }
                    
                    isSpacebarPressed=false;
                }
                checker.reset(game.world.width*(2.5/7),game.world.height*(3/5));
                summonCooldown = game.time.now + 1500;
            }
            if(stopTimeButton.isDown){
                isTimeStopped=true;
                console.log("activate stop time");
                stopTimeCounter = 3.0;
                stopTimeTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 31, countdownTimer, this, "timeStopped");
                checker.body.velocity.x=0;
                bgSpeed=0;
            }
        }else{

        }
        
    }else if(gamemode=="feverTime"){
        if(!specialGuageIsSpawned){
            specialGuage = this.add.sprite(game.world.width*(1/5),game.world.height*(1.5/5) ,'guage');
            specialGuageSeal = this.add.sprite(game.world.width*(1/5)+6,game.world.height*(1.5/5)+6 ,'guageSeal');
            specialGuageIsSpawned = true;
        }
        if(!isSpacebarDown){
            if(spaceButton.isDown){
                maxGuage-=5;
                isSpacebarDown = true;
                specialGuageSeal.scale.setTo(1,maxGuage/100);
            }
        }
        if(maxGuage<100){
            maxGuage+=0.35;
            specialGuageSeal.scale.setTo(1,maxGuage/100);
        }
        if(!spaceButton.isDown)
            isSpacebarDown = false;
        if(maxGuage<=0){
            score+=1000;
            specialGuage.destroy();
            specialGuageSeal.destroy();
            game.time.events.remove(guageAliveTimer);
            game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                cancelCountdownTimer("feverTime");
                console.log("max");
                gamemode="ingame";
                isSpacebarDown = false;
                specialGuageIsSpawned = false;
            }, this);
        }
        if(stopTimeButton.isDown){
            
        }

    }else if(gamemode=="changingState"){
        
    }else if(gamemode=="timeStopped"){
        
        if (spaceButton.isDown&&game.time.now > spaceKeyDownTimer)
        {
            isSpacebarPressed=true;
            checkAccuracy();
            clearWave();
            spaceKeyDownTimer = game.time.now + 1500;
            if(score>=500&&score<1000){
                gamemode="feverTime";
                guageTimeCounter=15.0;
                guageAliveTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 151, countdownTimer, this, "feverTime");
            }
        }
        
    }else if(gamemode=="gameover"){
        if(bgSpeed>0){
            bgSpeed-=0.35;
        }
    }
        
    //game.physics.arcade.collide(wippo,floor);

}
/*function changeFocus(){
    switch (gamemode) {
        case "prepare":
            checker.alpha=0.5;
            perfect.alpha=0.5;
            greatL.alpha=0.5;
            greatR.alpha=0.5;
            coolL.alpha=0.5;
            coolR.alpha=0.5;
            badR.alpha=0.5;
            badL.alpha=0.5;
            break;
    
        case "ingame":

            break;
    }
}*/

function countdownTimer(timerName){
    if(timerName=="feverTime"){
        if(guageTimerDigit2!=null){
            guageTimerDigit2.destroy(); 
            guageTimerDigit1.destroy(); 
            guageTimerDecimal.destroy(); 
        }
        guageTimerDigit2 = game.add.sprite(game.world.width*(1/5)-80,game.world.height*(1.5/5)-150 ,'numberText');
        guageTimerDigit2.frame = Math.floor(guageTimeCounter/10);
        guageTimerDigit1 = game.add.sprite(game.world.width*(1/5),game.world.height*(1.5/5)-150 ,'numberText');
        guageTimerDigit1.frame = Math.floor(guageTimeCounter%10);

        guageTimerDecimal = game.add.sprite(game.world.width*(1/5)+80,game.world.height*(1.5/5)-150 ,'numberText');
        guageTimerDecimal.frame = Math.floor(guageTimeCounter*10%10);
        guageTimeCounter-=0.1;
        
        if(guageTimeCounter<=0){
            gameEnd();
        }
    }else if(timerName=="timeStopped"){
        if(stopTimerDigit1!=null){
            stopTimerDigit1.destroy();
            stopTimerDecimal.destroy();
        }
        stopTimerDigit1 = game.add.sprite(game.world.width*(1/2)-40,game.world.height*(1/5)-100 ,'numberText');
        stopTimerDigit1.frame = Math.floor(stopTimeCounter%10);
        stopTimerDecimal = game.add.sprite(game.world.width*(1/2)+40,game.world.height*(1/5)-100 ,'numberText');
        stopTimerDecimal.frame = Math.floor(stopTimeCounter*10%10);

        stopTimeCounter-=0.1;
        if(stopTimeCounter<=0){
            isTimeStopped=false;
            cancelCountdownTimer("timeStopped");
            bgSpeed=40;
        }
    }
}
function cancelCountdownTimer(timerName) {
    if(timerName=="feverTime"){
        if(guageTimerDigit2!=null){
            guageTimerDigit2.destroy(); 
            guageTimerDigit1.destroy(); 
            guageTimerDecimal.destroy(); 
        }
    }else if(timerName=="timeStopped"){
        if(stopTimerDigit1!=null){
            stopTimerDigit1.destroy();
            stopTimerDecimal.destroy();
        }
    }
}
function checkAccuracy(){
    var completeArrow = (waveCheckOrder==wave.length);
    if (completeArrow&&checkOverlap(checker, perfect))
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'perfect');
        console.log("Perfect!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        bgSpeed=40;
        difficulty++;
        score+=180;
    }
    else if (completeArrow&&(checkOverlap(checker, greatR)||checkOverlap(checker, greatL)))
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'great');
        console.log("Great!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        bgSpeed=20;
        score+=90;
    }
    else if (completeArrow&&(checkOverlap(checker, coolR)||checkOverlap(checker, coolL)))
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'cool');
        console.log("Cool!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        bgSpeed=5;
        score+=60;
    }
    else if(completeArrow&&(checkOverlap(checker, badR)||checkOverlap(checker, badL)))
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'bad');
        console.log("Bad!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        bgSpeed=5;
        score+=30;
    }
    else
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'miss');
        console.log("Miss!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        gameEnd();
    }

}

var isHoldDown=false;
function collectArrow(){
    if(waveCheckOrder<wave.length&&!isHoldDown){
        if(cursors.up.isDown){
            isHoldDown=true;
            if(wave[waveCheckOrder].name=="up"){
                console.log("wave["+waveCheckOrder+"] is true");
                wave[waveCheckOrder].arrow.animations.play('correct');
                if(wave[waveCheckOrder].type == 2)
                    wave[waveCheckOrder].arrow.alpha = 0.8;
                else if(wave[waveCheckOrder].type == 1){
                    if(waveCheckOrder+3<wave.length-1){
                        var pos = game.rnd.integerInRange(waveCheckOrder+3,wave.length-1);
                        posx = wave[pos].x;
                        posy = wave[pos].y; 
                        console.log(posx+" "+posy);
                        wave[pos].arrow.kill();
                        wave[pos] = new arrowCreate(posx,posy,game.rnd.integerInRange(0, 3/*difficulty*/),3);
                    }
                }
                waveCheckOrder++;
                //animations
            }else{
                refreshWave();
            }
        }else if(cursors.down.isDown){
            isHoldDown=true;
            if(wave[waveCheckOrder].name=="down"){
            console.log("wave["+waveCheckOrder+"] is true");
            wave[waveCheckOrder].arrow.animations.play('correct');
            if(wave[waveCheckOrder].type == 2)
                wave[waveCheckOrder].arrow.alpha = 0.8;
            else if(wave[waveCheckOrder].type == 1){
                    if(waveCheckOrder+3<wave.length-1){
                        var pos = game.rnd.integerInRange(waveCheckOrder+3,wave.length-1);
                        posx = wave[pos].x;
                        posy = wave[pos].y; 
                        console.log(posx+" "+posy);
                        wave[pos].arrow.kill();
                        wave[pos] = new arrowCreate(posx,posy,game.rnd.integerInRange(0, 3/*difficulty*/),3);
                    }
                }
            waveCheckOrder++;
          //animations
            }else{
                refreshWave();
            }
        }
        else if(cursors.right.isDown){
            isHoldDown=true;
            if(wave[waveCheckOrder].name=="right"){
                console.log("wave["+waveCheckOrder+"] is true");
                wave[waveCheckOrder].arrow.animations.play('correct');
                if(wave[waveCheckOrder].type == 2)
                    wave[waveCheckOrder].arrow.alpha = 0.8;
                else if(wave[waveCheckOrder].type == 1){
                    if(waveCheckOrder+3<wave.length-1){
                        var pos = game.rnd.integerInRange(waveCheckOrder+3,wave.length-1);
                        posx = wave[pos].x;
                        posy = wave[pos].y; 
                        console.log(posx+" "+posy);
                        wave[pos].arrow.kill();
                        wave[pos] = new arrowCreate(posx,posy,game.rnd.integerInRange(0, 3/*difficulty*/),3);
                    }
                }
                waveCheckOrder++;
              //animations
            }else{
              refreshWave();
            }
        }else if(cursors.left.isDown){
            isHoldDown=true;
            if(wave[waveCheckOrder].name=="left"){
                console.log("wave["+waveCheckOrder+"] is true");
                wave[waveCheckOrder].arrow.animations.play('correct');
                if(wave[waveCheckOrder].type == 2)
                    wave[waveCheckOrder].arrow.alpha = 0.8;
                else if(wave[waveCheckOrder].type == 1){
                    if(waveCheckOrder+3<wave.length-1){
                        var pos = game.rnd.integerInRange(waveCheckOrder+3,wave.length-1);
                        posx = wave[pos].x;
                        posy = wave[pos].y; 
                        console.log(posx+" "+posy);
                        wave[pos].arrow.kill();
                        wave[pos] = new arrowCreate(posx,posy,game.rnd.integerInRange(0, 3/*difficulty*/),3);
                    }
                }
                waveCheckOrder++;
              //animations
            }else{
              refreshWave();
            }
        }
    }else if(cursors.down.isUp&&cursors.up.isUp&&cursors.left.isUp&&cursors.right.isUp){
      isHoldDown=false;
    }
}

function refreshWave(){
    for(;waveCheckOrder>=0;waveCheckOrder--){
      /*if(wave[waveCheckOrder].name=="up"){
        wave[waveCheckOrder].up.animations.play('default');
      }else if(wave[waveCheckOrder].name=="down"){
        wave[waveCheckOrder].down.animations.play('default');
      }else if(wave[waveCheckOrder].name=="right"){
        wave[waveCheckOrder].right.animations.play('default');
      }else if(wave[waveCheckOrder].name=="left"){
        wave[waveCheckOrder].left.animations.play('default');
      }*/
      wave[waveCheckOrder].arrow.animations.play('default');
      if(wave[waveCheckOrder].type == 2)
        wave[waveCheckOrder].arrow.alpha = 0.8;
    }
    waveCheckOrder=0;
}

function clearWave(){
    var waveLength=wave.length;
    for(var i=0;i<waveLength;i++){
      /*if(wave[wave.length-1].name=="up"){
        wave[wave.length-1].up.kill();
      }else if(wave[wave.length-1].name=="down"){
        wave[wave.length-1].down.kill();
      }else if(wave[wave.length-1].name=="right"){
        wave[wave.length-1].right.kill();
      }else if(wave[wave.length-1].name=="left"){
        wave[wave.length-1].left.kill();
      }*/
      wave[wave.length-1].arrow.destroy();
      wave.pop();
      waveCheckOrder=0;
      //waveCheck.pop();
    }
    //wave = [];
}
function summonWave(length){
    var l = wave.length;
    var randObstacle = game.rnd.integerInRange(1,6);
    if(randObstacle==1){
        sharkSeal = game.add.sprite(0,game.world.height*(3/5),'sharkSeal');
        sharkSeal.scale.setTo(0.5,0.5);
        game.physics.arcade.enable(sharkSeal);
        sharkSeal.events.onOutOfBounds.add(destroyObj, this);
        sharkSeal.body.velocity.x=400;
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            sharkSeal.body.velocity.x=0;
            game.time.events.add(Phaser.Timer.SECOND * 2.5, function(){
                sharkSeal.body.velocity.x=600;           
            }, this);
        
      }, this);
    }else if(randObstacle==2){
        spacebarBlock.revive();
        spacebarBlock.bringToTop();
    }
    
    //var startPositon;
    /*if(length==3){
        x=game.world.width/2-50;
        y=game.world.height*3/5;
    }*/
    if(length%2==0){
      x=length/2;
      x=game.world.width/2-(50*x-25);
      y=game.world.height*3.5/5;
    }else{
      x=(length-1)/2;
      x=game.world.width/2-(50*x);
      y=game.world.height*3.5/5;
    }
    clearWave();
    for (var i = 0; i < length; i++){
        var rand = game.rnd.integerInRange(0, 3/*difficulty*/);
        console.log("rand = "+rand);
        wave.push(new arrowCreate(x,y,rand,/*game.rnd.integerInRange(0,2)*/1));
        console.log(wave[i].name);
        //waveCheck.push(false);
        //wave[i]=new arrowCreate(x,y,rand);
        x+=50;
        console.log("create arrow.");
    }
}
arrowCreate = function (x,y,rand,type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.game = game;
    this.alive = true;
    if(this.type==0){
        var randomType = game.rnd.integerInRange(1,10);
        if(rand==0){
            this.arrow = game.add.sprite(x, y, 'up');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(0.3, 0.3);
            this.name = "up";
            if(randomType<=7){
                this.arrow.animations.add('default',[0],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }else if(randomType>7){
                this.arrow.animations.add('default',[2],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }
            //this.up.name = index.toString();
        }else if(rand==1){
            this.arrow = game.add.sprite(x, y, 'down');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(0.3, 0.3);
            this.name = "down";
            if(randomType<=7){
                this.arrow.animations.add('default',[0],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }else if(randomType>7){
                this.arrow.animations.add('default',[2],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }
            //this.down.name = index.toString();
        }else if(rand==2){
            this.arrow = game.add.sprite(x, y, 'right');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(0.3, 0.3);
            this.name = "right";
            if(randomType<=7){
                this.arrow.animations.add('default',[0],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }else if(randomType>7){
                this.arrow.animations.add('default',[2],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }
            //this.right.name = index.toString();
        }else{
            this.arrow = game.add.sprite(x, y, 'left');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(0.3, 0.3);
            this.name = "left";
            if(randomType<=7){
                this.arrow.animations.add('default',[0],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }else if(randomType>7){
                this.arrow.animations.add('default',[2],1,true);
                this.arrow.animations.add('correct',[1],1,true);
                this.arrow.animations.play('default');
            }
            //this.left.name = index.toString();
        }
    }
    else if(this.type==1){
        if(rand==0){
          this.arrow = game.add.sprite(x, y, 'up');
          this.name = "up";
          //this.up.name = index.toString();
        }else if(rand==1){
          this.arrow = game.add.sprite(x, y, 'down');
          this.name = "down";
          //this.down.name = index.toString();
        }else if(rand==2){
          this.arrow = game.add.sprite(x, y, 'right');
          this.name = "right";
          //this.right.name = index.toString();
        }else{
          this.arrow = game.add.sprite(x, y, 'left');
          this.name = "left";
          //this.left.name = index.toString();
        }
        this.arrow.alpha = 0.3;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(0.3, 0.3);
        this.arrow.animations.add('default',[0],1,true);
        this.arrow.animations.add('out',[3],1,true);
        this.arrow.animations.add('correct',[1],1,true);
        this.arrow.animations.play('default');

    }
    else if(this.type==2){
        if(rand==0){
          this.arrow = game.add.sprite(x, y, 'up');
          this.name = "up";
          //this.up.name = index.toString();
        }else if(rand==1){
          this.arrow = game.add.sprite(x, y, 'down');
          this.name = "down";
          //this.down.name = index.toString();
        }else if(rand==2){
          this.arrow = game.add.sprite(x, y, 'right');
          this.name = "right";
          //this.right.name = index.toString();
        }else{
          this.arrow = game.add.sprite(x, y, 'left');
          this.name = "left";
          //this.left.name = index.toString();
        }
        this.arrow.alpha = 0.8;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(0.3, 0.3);
        this.arrow.animations.add('default',[0],1,true);
        this.arrow.animations.add('out',[3],1,true);
        this.arrow.animations.add('correct',[1],1,true);
        this.arrow.animations.play('default');
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            console.log("in time");
            if(this.arrow.frame==0){
                console.log("shark kill");
                this.arrow.animations.play('out');
            }
        }, this);
    }
    else if(type==3){
        if(rand==0){
          this.arrow = game.add.sprite(x, y, 'up');
          this.name = "up";
          //this.up.name = index.toString();
        }else if(rand==1){
          this.arrow = game.add.sprite(x, y, 'down');
          this.name = "down";
          //this.down.name = index.toString();
        }else if(rand==2){
          this.arrow = game.add.sprite(x, y, 'right');
          this.name = "right";
          //this.right.name = index.toString();
        }else{
          this.arrow = game.add.sprite(x, y, 'left');
          this.name = "left";
          //this.left.name = index.toString();
        }
        this.arrow.alpha = 0.3;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(0.3, 0.3);
        this.arrow.animations.add('default',[0],1,true);
        this.arrow.animations.add('out',[3],1,true);
        this.arrow.animations.add('correct',[1],1,true);
        this.arrow.animations.play('default');
    }
}



function destroyObj(obj) {
    obj.destroy();
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
    bgSpeed=60;
    game.time.events.add(Phaser.Timer.SECOND * 2, gameBegin, this);
}
gameBegin = function (){
    wippo.body.velocity.y = 0;
    bgSpeed=20;
    perfect = this.add.sprite(game.world.width*(3/5),game.world.height*(3/5),'laser');
    perfect.scale.setTo(0.35,0.5);
    greatR = this.add.sprite(perfect.x+perfect.width,perfect.y,'laser');
    greatR.scale.setTo(0.35,0.5);
    greatL = this.add.sprite(perfect.x-perfect.width,perfect.y,'laser');
    greatL.scale.setTo(0.35,0.5);
    coolR = this.add.sprite(greatR.x+greatR.width,perfect.y,'laser');
    coolR.scale.setTo(0.35,0.5);
    coolL = this.add.sprite(greatL.x-greatL.width,perfect.y,'laser');
    coolL.scale.setTo(0.35,0.5);
    badR = this.add.sprite(coolR.x+coolR.width,perfect.y,'laser');
    badR.scale.setTo(0.35,0.5);
    badL = this.add.sprite(coolL.x-coolL.width,perfect.y,'laser');
    badL.scale.setTo(0.35,0.5);
    summonWave(3);
    checker.reset(game.world.width*(2.5/7),game.world.height*(3/5));
    gamemode = "ingame";
}
gameEnd = function (){
    //playDeathAnimation
    gamemode="gameover";
    wippo.body.velocity.y=200;
    perfect.destroy();
    greatR.destroy();
    greatL.destroy();
    coolR.destroy();
    coolL.destroy();
    badR.destroy();
    badL.destroy();
    checker.destroy();
    spacebarBlock.destroy();
    clearWave();
    //game.time.events.add(Phaser.Timer.SECOND * 3, toResultPage = function(){game.state.start(createResult)}, this);
}