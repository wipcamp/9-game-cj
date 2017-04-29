var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: createGameplay , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/wip.png');
    game.load.image('enemy_ship','images/enemyship.png');
    game.load.image('background3','images/BG-galaxy.png');
    game.load.image('background1','images/firstState.png');
	game.load.image('background2','images/secondState.png');
	game.load.image('miss','images/miss.png');
    game.load.image('bad','images/bad.png');
    game.load.image('cool','images/cool.png');
    game.load.image('great','images/great.png');
    game.load.image('perfect','images/perfect.png');
    game.load.image('guage','images/guage.png');
    game.load.image('guageSeal','images/guageBlocker.png');
    game.load.image('buttonLineHead','images/buttonLineHead.png');
    game.load.image('buttonLineTail','images/buttonLineTail.png');
    game.load.image('buttonLineBody','images/buttonLineBody.png');

	game.load.spritesheet('mute','images/mute.png',450,447);
    game.load.spritesheet('up','images/up2.png',45,45,8);
    game.load.spritesheet('down','images/down2.png',45,45,8);
    game.load.spritesheet('right','images/right2.png',45,45,8);
    game.load.spritesheet('left','images/left2.png',45,45,8);
    game.load.spritesheet('laser','images/biglaser.png');
    game.load.spritesheet('sharkSeal','images/sharkalien.png');
    game.load.spritesheet('spacebarBlock','images/dontpush.png');
    game.load.spritesheet('numberText','images/numberText.png',744/11,78,11);
    /////metarial/////
    game.load.spritesheet('airship','images/airship2.png');
    game.load.spritesheet('balloon','images/balloon.png');
    game.load.spritesheet('airplane','images/airplane2.png');
    game.load.spritesheet('earth','images/earth.png');
    game.load.spritesheet('sattellite','images/sattellite.png');
    game.load.spritesheet('saturn','images/saturn.png');
    game.load.spritesheet('sharkAlien','images/sharkalien.png');
    game.load.spritesheet('shark','images/shark.png');

}

var isSound = true;
var checker;
var checkerSpeed=70;
var cursors;
var spaceButton;
var stopTimeButton;
var wave=[];
var buttonLine=[];
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
var stopTimePointText;
var isTimeStopped;
var perfectStack;
var stopTimePoint;
var stateHandle;
var bgChange;
var isfirstChange;
/////////sound variable//////////
var timeStopSound;
var BGM1;

/////////material variable///////
var airship;
var balloon;
var flatCloud;
var airplane;
var sharkM;
var sharkAlien;
var galaxy;
var saturn;
var earth;
var sattellite;


function createGameplay() {
    stateHandle = 1;
	isfirstChange = true;
	game.physics.startSystem(Phaser.Physics.ARCADE);
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    bg = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background1');
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
    //////////animation wippo
    // wippo.animations.add('perfectRush',[0],1,true);
    // wippo.animations.add('rush',[0],1,true);
    // wippo.animations.add('death',[0],1,true);

    floor = this.add.sprite(0,game.world.height*(4/5)+40,'laser');
    game.physics.arcade.enable(floor);
    floor.scale.setTo(20,0.6);
    floor.body.collideWorldBounds = false;
    floor.body.immovable = true;
    gamemode="begin";
    specialGuageIsSpawned=false;
    isSpacebarPressed=false;
    spacebarBlock = this.add.sprite(game.world.width*(3/5),game.world.height*(3/5)-20,'spacebarBlock');
    spacebarBlock.scale.setTo(0.7,0.7);
    spacebarBlock.kill();
    spacebarBlockIsSpawned=false;
    ///////////////////////////////////////////////////////////////
    game.time.events.add(Phaser.Timer.SECOND * 2, wippoLaunch, this);
    isSpacebarDown = false;
    maxGuage = 100;
    perfectStack=0;
    stopTimePoint=0;
    //gamemode = "feverTime";

    //wippo.events.onOutOfBounds.add(gameEnd(), this);

    score=0;
    /*this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })*/

	/////mute
	mute = game.add.button(750,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
}
var summonCooldown=0;
function update() {
	console.log(">>"+score);
    materialGenerator();
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
                    // wippo.animations.play("death");
                    gameEnd();
                }
            }else if (spaceButton.isDown&&game.time.now > spaceKeyDownTimer)
            {
                isSpacebarPressed=true;
                checkAccuracy();
                clearWave();
                spaceKeyDownTimer = game.time.now + 1500;
                if((score>=500&&score<1000)||(score>=2000&&score<2500)){
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
                        // wippo.animations.play("death");
                        gameEnd();
                    }

                    isSpacebarPressed=false;
                }
                checker.reset(game.world.width*(2.5/7),game.world.height*(3/5));
                summonCooldown = game.time.now + 1500;
            }
            if(stopTimeButton.isDown&&stopTimePoint>0){
                isTimeStopped=true;
                stopTimePoint--;
                console.log("activate stop time");
                stopTimeCounter = 3.0;
                stopTimeTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 31, countdownTimer, this, "timeStopped");
                checker.body.velocity.x=0;
                tempBgSpeed=bgSpeed;
                bgSpeed=0;
                stopTimePointText.destroy();
                stopTimePointText = game.add.sprite(game.world.width*(7/8),game.world.height*(1.5/5)-100 ,'numberText');
                stopTimePointText.frame = stopTimePoint;
                // wippo.animations.paused = true;
                ////sound
                // BGM1.pause();
                // timeStopSound.play();
            }
        }else{
            for(var i=waveCheckOrder;i<=wave.length-1;i++){
                wave[i].arrow.animations.stop();
                wave[i].arrow.animations.play('default');
            }
        }

    }else if(gamemode=="feverTime"){
        if(!specialGuageIsSpawned){
            specialGuage = this.add.sprite(game.world.width*(1/5),game.world.height*(1.5/5) ,'guage');
            specialGuageSeal = this.add.sprite(game.world.width*(1/5)+6,game.world.height*(1.5/5)+6 ,'guageSeal');
            specialGuageIsSpawned = true;
            checker.alpha=0;
        }
        if(!isSpacebarDown){
            if(spaceButton.isDown){
                maxGuage-=5;
                isSpacebarDown = true;
                specialGuageSeal.scale.setTo(1,maxGuage/100);
            }
        }
        if(!spaceButton.isDown)
            isSpacebarDown = false;
        if(!isTimeStopped){
            if(maxGuage<100){
                maxGuage+=0.35;
                specialGuageSeal.scale.setTo(1,maxGuage/100);
            }

            if(maxGuage<=0&&specialGuage!=null){
                score+=500;
                specialGuage.destroy();
                specialGuageSeal.destroy();
				gamemode="changingState";
                game.time.events.remove(guageAliveTimer);
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
					
                    checker.alpha=1;
                    cancelCountdownTimer("feverTime");
                    console.log("max");
                    maxGuage=100;
                    isSpacebarDown = false;
                    specialGuageIsSpawned = false;
                }, this);
            }
            if(stopTimeButton.isDown&&stopTimePoint>0){
                isTimeStopped=true;
                stopTimePoint--;
                console.log("activate stop time");
                stopTimeCounter = 3.0;
                stopTimeTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 31, countdownTimer, this, "timeStopped");
                checker.body.velocity.x=0;
                tempBgSpeed=bgSpeed;
                bgSpeed=0;
                stopTimePointText.destroy();
                stopTimePointText = game.add.sprite(game.world.width*(7/8),game.world.height*(1.5/5)-100 ,'numberText');
                stopTimePointText.frame = stopTimePoint;
                // wippo.animations.paused = true;
                ////sound
                // BGM1.pause();
                // timeStopSound.play();
            }
        }else{
            if(maxGuage<0){
                maxGuage=-1;
                specialGuageSeal.scale.setTo(1,maxGuage/100);
            }
        }

    }else if(gamemode=="changingState"){
		if(isfirstChange){
			isfirstChange = false;
			if(stateHandle == 1){
				bgChange = game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background2');
			}
			else if(stateHandle == 2){
				bgChange = game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background3');
			}
			bgChange.alpha = 0;
			bgChange.sendToBack();
			var loop = game.time.events.loop(Phaser.Timer.SECOND * 0.2, function(){
				bg.alpha-=0.05;
				bgChange.alpha+=0.05;
				if(bg.alpha<0.0000001){
					console.log("in destroy loop");
					isfirstChange = true;
					gamemode = "ingame";
					bg.destroy();
					bg = bgChange;
					bg.autoScroll(this.levelSpeed, 0);
					bg.fixedToCamera = true;
					game.time.events.remove(loop);
					stateHandle++;
				}
			}, this);
		}
		//bg.autoScroll(this.levelSpeed, 0);
		//bg.fixedToCamera = true;
		//gamemode = "ingame";
		//stateHandle++;
        ///////flatClound when start BG2-sky/////
        // if(flatCloud==null){
        //     console.log("spawning flatCloud");
        //     flatCloud = game.add.sprite(game.world.width,0 ,'flatCloud');
        //     flatCloud.scale.setTo(0.5,0.5);
        //     game.physics.arcade.enable(flatCloud);
        //     flatCloud.checkWorldBounds = true;
        //     flatCloud.events.onOutOfBounds.add(function(){
        //         flatCloud.destroy();
        //         flatCloud=null;
        //     }, this);
        //     flatCloud.body.velocity.y = bgSpeed;
        //     flatCloud.sendToBack();
        // }else{
        //     if(flatCloud.y>game.world.height-100){
        //         flatCloud.body.velocity.y = 0.1;
        //     }
        // }
		
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
////mute
function muteSounds() {
    isSound = !isSound;
    if (!isSound) {
        game.sound.mute = true;
        mute.frame = 1;
    } else {
        mute.frame = 0;
        game.sound.mute = false;
    }
}
////////
var tempBgSpeed;

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
        if(!isTimeStopped)
            guageTimeCounter-=0.1;

        if(guageTimeCounter<=0){
            // wippo.animations.play("death");
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
        bgSpeed=tempBgSpeed;
        // wippo.animations.paused = false;
        ////sound
        // BGM1.resume();
        // timeStopSound.stop();
    }
}
//////material function
var generatorCooldown=0;
function materialGenerator(){
    if(stateHandle==1){
        //BG1

    }else if(stateHandle==2){
        //BG2
        if(airship==null){
            console.log("spawning airship");
            airship = game.add.sprite(game.world.width,0 ,'airship');
            airship.scale.setTo(0.5,0.5);
            game.physics.arcade.enable(airship);
            airship.checkWorldBounds = true;
            airship.events.onOutOfBounds.add(function(){
                airship.destroy();
                airship=null;
            }, this);
            airship.body.velocity.y = bgSpeed*3;
            airship.body.velocity.x = -game.rnd.integerInRange(60,100);
            airship.sendToBack();
            generatorCooldown+=1*60;
        }else{
            airship.body.velocity.y = bgSpeed*3;
        }

        if(balloon==null){
            console.log("spawning balloon");
            balloon = game.add.sprite(0,0 ,'balloon');
            balloon.scale.setTo(0.2,0.2);
            game.physics.arcade.enable(balloon);
            balloon.checkWorldBounds = true;
            balloon.events.onOutOfBounds.add(function(){
                balloon.destroy();
                balloon=null;
            }, this);
            balloon.body.velocity.y = bgSpeed*4;
            balloon.body.velocity.x = game.rnd.integerInRange(40,70);
            balloon.sendToBack();
            generatorCooldown+=1*60;
        }else{
            balloon.body.velocity.y = bgSpeed*4;
        }

        if(airplane==null){
            console.log("spawning airplane");
            airplane = game.add.sprite(game.world.width,0 ,'airplane');
            airplane.scale.setTo(0.5,0.5);
            game.physics.arcade.enable(airplane);
            airplane.checkWorldBounds = true;
            airplane.events.onOutOfBounds.add(function(){
                airplane.destroy();
                airplane=null;
            }, this);
            airplane.body.velocity.y = bgSpeed*5;
            airplane.body.velocity.x = -game.rnd.integerInRange(200,250);
            airplane.sendToBack();
            generatorCooldown+=1*60;
        }else{
            airplane.body.velocity.y = bgSpeed*5;
        }

        



    // var sharkM;
    // var sharkAlien;
    // var earth;
        
    }else{
    
        if(sharkAlien==null){
            console.log("spawning sharkAlien");
            sharkAlien = game.add.sprite(0,0 ,'sharkAlien');
            sharkAlien.scale.setTo(0.7,0.7);
            game.physics.arcade.enable(sharkAlien);
            sharkAlien.checkWorldBounds = true;
            sharkAlien.events.onOutOfBounds.add(function(){
                sharkAlien.destroy();
                sharkAlien=null;
            }, this);
            sharkAlien.body.velocity.y = bgSpeed*5;
            sharkAlien.body.velocity.x = game.rnd.integerInRange(40,70);
            sharkAlien.sendToBack();
            generatorCooldown+=1*60;
        }else{
            sharkAlien.body.velocity.y = bgSpeed*5;
        }

        if(sattellite==null){
            console.log("spawning sattellite");
            sattellite = game.add.sprite(300,0 ,'sattellite');
            sattellite.scale.setTo(0.1,0.1);
            game.physics.arcade.enable(sattellite);
            sattellite.checkWorldBounds = true;
            sattellite.events.onOutOfBounds.add(function(){
                sattellite.destroy();
                sattellite=null;
            }, this);
            sattellite.body.velocity.y = bgSpeed*8;
            sattellite.body.velocity.x = game.rnd.integerInRange(-300,300);
            sattellite.sendToBack();
            generatorCooldown+=1*60;
        }else{
            sattellite.body.velocity.y = bgSpeed*8;
        }

        if(saturn==null){
            console.log("spawning saturn");
            saturn = game.add.sprite(300,0 ,'saturn');
            saturn.scale.setTo(0.5,0.5);
            game.physics.arcade.enable(saturn);
            saturn.checkWorldBounds = true;
            saturn.events.onOutOfBounds.add(function(){
                saturn.destroy();
                saturn=null;
            }, this);
            saturn.body.velocity.y = bgSpeed/2;
            saturn.body.velocity.x = game.rnd.integerInRange(3,7);
            saturn.sendToBack();
            generatorCooldown+=1*60;
        }else{
            saturn.body.velocity.y = bgSpeed/2;
        }

    }
    if(bg!=null)
        bg.sendToBack();
    if(generatorCooldown>0)
        generatorCooldown--;
}

function checkAccuracy(){
    var completeArrow = (waveCheckOrder==wave.length);
    if (completeArrow&&checkOverlap(checker, perfect))
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'perfect');

        console.log("Perfect!");
        perfectStack++;
        if(perfectStack>=3&&stopTimePoint<3){
            stopTimePoint++;
            perfectStack=0;
            stopTimePointText.destroy();
            stopTimePointText = game.add.sprite(game.world.width*(7/8),game.world.height*(1.5/5)-100 ,'numberText');
            stopTimePointText.frame = stopTimePoint;
        }
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        bgSpeed=40;
        difficulty++;
        score+=180;
        //////////animation wippo
        // wippo.animations.play("perfectRush");
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
        perfectStack=0;
        // wippo.animations.play("rush");
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
        perfectStack=0;
        // wippo.animations.play("rush");
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
        perfectStack=0;
        // wippo.animations.play("rush");
    }
    else
    {
        statusText = game.add.image(game.world.width*(1/4),game.world.height*(3/4),'miss');
        console.log("Miss!");
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            statusText.destroy();
        }, this);
        gameEnd();
        perfectStack=0;
        // wippo.animations.play("death");
    }
    statusText.scale.setTo(0.2,0.2);

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
                    if(waveCheckOrder+1<wave.length-1){
                        var pos = game.rnd.integerInRange(waveCheckOrder+1,wave.length-1);
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
      buttonLine[i].destroy();
      wave[wave.length-1].arrow.destroy();
      wave.pop();
      waveCheckOrder=0;
      //waveCheck.pop();
    }
    //wave = [];
}
function summonWave(length){
    // var l = wave.length;
    var randObstacle = game.rnd.integerInRange(1,6);
    if(randObstacle==1){
        sharkSeal = game.add.sprite(0,game.world.height*(3/5)-50,'sharkSeal');
        sharkSeal.scale.setTo(1,1);
        game.physics.arcade.enable(sharkSeal);
        sharkSeal.events.onOutOfBounds.add(destroyObj, this);
        sharkSeal.body.velocity.x=400;
        var travelTime = game.rnd.integerInRange(9,11);
        game.time.events.add(Phaser.Timer.SECOND * travelTime/10, function(){
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
        ////create button line
        if(i>0){
            if(i<length-1){
                buttonLine[i] = game.add.sprite(x,y,'buttonLineBody');
            }else{
                buttonLine[i] = game.add.sprite(x,y,'buttonLineTail');
            }
        }else{
            buttonLine[i] = game.add.sprite(x,y,'buttonLineHead');
        }
        buttonLine[i].anchor.set(0.5);
        buttonLine[i].scale.setTo(0.4, 0.6);
        //////

        var rand = game.rnd.integerInRange(0, 3/*difficulty*/);
        console.log("rand = "+rand);
        wave.push(new arrowCreate(x,y,rand,game.rnd.integerInRange(0,2)));
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
            this.arrow.scale.setTo(1, 1);
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
            this.arrow.scale.setTo(1, 1);
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
            this.arrow.scale.setTo(1, 1);
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
            this.arrow.scale.setTo(1, 1);
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
        this.arrow.scale.setTo(1, 1);
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
          this.arrow = game.add.sprite(x, y, 'left') ;
          this.name = "left";
          //this.left.name = index.toString();
        }
        // this.arrow.alpha = 0.8;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(1, 1);
        // this.arrow.animations.add('default',[0],1,true);
        // this.arrow.animations.add('out',[3],1,true);
        this.arrow.animations.add('default',[4,4,4,3],2,false);
        this.arrow.animations.add('correct',[1],1,true);
        this.arrow.animations.play('default');
        // game.time.events.add(Phaser.Timer.SECOND * 2, function(){
        //     console.log("in time");
        //     if(this.arrow.frame==0){
        //         console.log("shark kill");
        //         this.arrow.animations.play('out');
        //     }
        // }, this);
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
        this.arrow.scale.setTo(1, 1);
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
    perfect.scale.setTo(0.25,0.5);
    greatR = this.add.sprite(perfect.x+perfect.width,perfect.y,'laser');
    greatR.scale.setTo(0.25,0.5);
    greatL = this.add.sprite(perfect.x-perfect.width,perfect.y,'laser');
    greatL.scale.setTo(0.25,0.5);
    coolR = this.add.sprite(greatR.x+greatR.width,perfect.y,'laser');
    coolR.scale.setTo(0.25,0.5);
    coolL = this.add.sprite(greatL.x-greatL.width,perfect.y,'laser');
    coolL.scale.setTo(0.25,0.5);
    badR = this.add.sprite(coolR.x+coolR.width,perfect.y,'laser');
    badR.scale.setTo(0.25,0.5);
    badL = this.add.sprite(coolL.x-coolL.width,perfect.y,'laser');
    badL.scale.setTo(0.25,0.5);
    summonWave(3);
    checker.reset(game.world.width*(2.5/7),game.world.height*(3/5));
    gamemode = "ingame";
    ///////////////////////////////////////////////
    stopTimePointText = game.add.sprite(game.world.width*(7/8),game.world.height*(1.5/5)-100 ,'numberText');
    stopTimePointText.frame = 0;
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
