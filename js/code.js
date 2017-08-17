var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var main = { preload: preload, create: createGameplay, update: update };
var menu = { preload: preloadMenu, create: createMenu};
game.state.add('menu', menu);
game.state.add('main', main);
game.state.start('menu');
function preloadMenu(){
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);
    game.stage.backgroundColor = '#182d3b';
    game.load.image('backgroundMenu', 'images/BGmenu.png');
    game.load.spritesheet('startButton', 'images/startButton.png', 205, 48);
    game.load.spritesheet('howtoplayButton', 'images/howtoplay.png', 206, 50);
    game.load.image('logoGame', 'images/logoGame.png');
    game.load.image('creditButton', 'images/creditButton.png');
    game.load.spritesheet('reportButton', 'images/reportButton.png', 207, 48);
    game.load.spritesheet('scoreBoardButton', 'images/scoreBoardButton.png', 205, 49);

    game.load.spritesheet('mute', 'images/mute.png', 450, 447);

    ////sound////
    game.load.audio('BGMMenu','sound/BGMMenu.mp3');
}
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/wip.png');
    game.load.image('enemy_ship', 'images/enemyship.png');
    game.load.image('background3', 'images/BgState3.png');
    game.load.image('background1', 'images/BgState1.png');
    game.load.image('background2', 'images/BgState2.png');
    game.load.image('miss', 'images/miss.png');
    game.load.image('bad', 'images/bad.png');
    game.load.image('cool', 'images/cool.png');
    game.load.image('great', 'images/great.png');
    game.load.image('perfect', 'images/perfect.png');
    game.load.image('guage', 'images/guage.png');
    game.load.image('guageSeal', 'images/guageBlocker.png');
    game.load.image('buttonLineHead', 'images/buttonLineHead.png');
    game.load.image('buttonLineTail', 'images/buttonLineTail.png');
    game.load.image('buttonLineBody', 'images/buttonLineBody.png');
    game.load.image('checkerPic', 'images/pointer.png');
    game.load.image('beam', 'images/beam.png');
    game.load.image('checkbar', 'images/checkbar.png');

    game.load.spritesheet('up', 'images/up2.png', 45, 45, 8);
    game.load.spritesheet('down', 'images/down2.png', 45, 45, 8);
    game.load.spritesheet('right', 'images/right2.png', 45, 45, 8);
    game.load.spritesheet('left', 'images/left2.png', 45, 45, 8);
    game.load.spritesheet('laser', 'images/biglaser.png');
    game.load.spritesheet('spacebarBlock', 'images/dontpush.png');
    game.load.spritesheet('numberText', 'images/numberText.png', 495 / 11, 60, 11);
    game.load.spritesheet('restartBtn', 'images/restartBtn.png');
    game.load.spritesheet('smoke', 'images/smoke.png',800,600,10);

    /////metarial/////
    game.load.spritesheet('earth', 'images/earth.png');
    game.load.spritesheet('sattellite', 'images/sattellite.png');
    game.load.spritesheet('saturn', 'images/saturn.png');
    game.load.spritesheet('shark', 'images/shark2.png', 50, 50);
    game.load.spritesheet('shipAndCannon', 'images/cannon.png',800,240,2);
    game.load.spritesheet('clound1', 'images/clound.png');
    game.load.spritesheet('cloudStartStage2', 'images/cloudStartStage2.png');

    ////sound////
    game.load.audio('BGMStage1','sound/BGMStage1.mp3');
    game.load.audio('BGMStage2','sound/BGMStage2.mp3');
    game.load.audio('BGMStage3','sound/BGMStage3.mp3');
    game.load.audio('timestop','sound/timeStop.mp3');
    game.load.audio('fall','sound/PlayerFall.mp3');
    game.load.audio('death','sound/Death.mp3');
    game.load.audio('wrongButton','sound/WrongButton.mp3');
    game.load.audio('perfect','sound/perfect.mp3');
    game.load.audio('great','sound/Great.mp3');
    game.load.audio('cool','sound/Fair.mp3');
    game.load.audio('bad','sound/bad.mp3');

}

var isSound = true;
var loadingText;
//////// ingame variable /////
var checker;
var checkerSpeed;
var checkerPic;
var cursors;
var progressBar;
var checkbar;
var spaceButton;
var stopTimeButton;
var wave;
var buttonLine;
var waveCheckOrder = 0;
var arrow = ["up", "down", "right", "left"];
var difficulty;
var arrowKeyDownTimer = 0;
var spaceKeyDownTimer = 0;
var perfect;
var greatR, greatL;
var coolL, coolR;
var badL, badR;
var wippo;
var floorFront;
var floorBack;
var bg;
var bgSpeed;
var perfectSpeed = 0.5;
var score;
var scoreShow;
var scoreDigit1;
var scoreDigit2;
var scoreDigit3;
var scoreDigit4;
var scoreDigit5;
var scoreDigit6;
var gamemode;
var specialGuageIsSpawned;
var specialGuage;
var specialGuageSeal;
var isSpacebarPressed;
var spacebarBlock;
var isSpacebarDown;
var maxGuage;
var guageAliveTimer;
var guageTimeCounter;
var guageTimerDigit2;
var guageTimerDigit1;
var guageTimerDecimal;
var guageTimerDecPoint;
var stopTimerDigit1;
var stopTimerDecimal;
var stopTimerDecPoint;
var stopTimeTimer;
var stopTimeCounter;
var stopTimePointText;
var isTimeStopped;
var perfectStack;
var stopTimePoint;
var stateHandle;
var bgChange;
var isfirstChange;
var isfirstOver;
var buttonRestart;
var smoke;
/////////sound variable//////////
var timeStopSound;
var BGMStage1;
var BGMStage2;
var BGMStage3;
var fallSound;
var BGMMenu;
var BGMResult;
var wrongButtonSound;
var perfectSound;
var greatSound;
var coolSound;
var badSound;

/////////material variable///////
var flatCloud;
var sharkGroup;
var sharkM;
var galaxy;
var saturn;
var earth;
var sattellite;
var clound1Group;
var cloudStartStage2;
var startButton;
var howtoplayButton;
var creditButton;
var scoreBoardButton;
var reportButton;
var logoGame;

function createMenu() {
    game.stage.disableVisibilityChange = true;
    
    game.add.image(0, 0, 'backgroundMenu');
    logoGame = game.add.image(game.world.width*(3.5/5), game.world.height*(1.4/5), 'logoGame');
    logoGame.anchor.set(0.5);
    startButton = game.add.button(game.world.width*(3.5/5), game.world.height*(2.5/5), 'startButton', toGameplay, this, 2, 1, 0);
    startButton.anchor.set(0.5);
    howtoplayButton = game.add.button(game.world.width*(3.5/5), game.world.height*(3/5), 'howtoplayButton', toGameplay, this, 2, 1, 0);
    howtoplayButton.anchor.set(0.5);
    scoreBoardButton = game.add.button(game.world.width*(3.5/5), game.world.height*(3.5/5), 'scoreBoardButton', toGameplay, this, 2, 1, 0);
    scoreBoardButton.anchor.set(0.5);
    creditButton = game.add.button(game.world.width*(3.5/5), game.world.height*(4/5), 'creditButton', toGameplay, this, 2, 1, 0);
    creditButton.anchor.set(0.5);
    reportButton = game.add.button(game.world.width*(3.5/5), game.world.height*(4.5/5), 'reportButton', toGameplay, this, 2, 1, 0);
    reportButton.anchor.set(0.5);
    BGMMenu = game.add.audio('BGMMenu');
    BGMMenu.volume = 0.4;
    BGMMenu.loopFull();
    mute = game.add.button(750, 20, 'mute', muteSounds, this);
    mute.scale.setTo(0.08, 0.08);
}
function loadStart() {  
    loadingText = game.add.text(game.world.width/2, game.world.height/2, 'Loading 0%', { fill: '#ffffff' });
    loadingText.anchor.set(0.5);
}
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    loadingText.setText("Loading " + progress + "%");
}
function loadComplete() {  
    loadingText.destroy();
}

function createGameplay() {
    game.stage.disableVisibilityChange = true;
    
    stateHandle = 1;
    // stateHandle = 2;
    isfirstChange = true;
    isfirstOver = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    bg = this.add.tileSprite(0, 0, 800, 600, 'background1');
    // bg.autoScroll(this.levelSpeed, 0);
    bg.fixedToCamera = true;
    bg.tilePosition.y += 600;
    bgSpeed = 0;
    spaceButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    stopTimeButton = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    cursors = this.input.keyboard.createCursorKeys();
    //////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    checker = this.add.sprite(0, game.world.height * (4 / 5) + 120, 'laser');
    game.physics.arcade.enable(checker);
    checker.anchor.set(0.5);
    checker.scale.setTo(0.05, 0.3);
    checker.body.maxVelocity.set(1500);
    checker.body.collideWorldBounds = false;
    checkerSpeed = 70;
    wave = [];
    buttonLine = [];
    difficulty = 1;

    //////////animation wippo
    // wippo.animations.add('perfectRush',[0],1,true);
    // wippo.animations.add('rush',[0],1,true);
    // wippo.animations.add('death',[0],1,true);

    gamemode = "prepare";
    // gamemode="changingState";
    specialGuageIsSpawned = false;
    isSpacebarPressed = false;
    spacebarBlock = this.add.sprite(game.world.width * (3 / 5) - 40, game.world.height * (3 / 5) - 20, 'spacebarBlock');
    spacebarBlock.scale.setTo(0.7, 0.7);
    spacebarBlock.kill();
    guageTimerDigit2 = game.add.sprite(game.world.width * (1 / 5) - 40 , game.world.height * (1 / 5) , 'numberText');
    guageTimerDigit1 = game.add.sprite(guageTimerDigit2.x + guageTimerDigit2.width, guageTimerDigit2.y, 'numberText');
    guageTimerDecPoint = game.add.sprite(
        (guageTimerDigit2.x + guageTimerDigit2.width + guageTimerDigit1.x + guageTimerDigit1.width)/2,  guageTimerDigit2.y, 'numberText');
    guageTimerDecimal = game.add.sprite(guageTimerDigit1.x + guageTimerDigit1.width,  guageTimerDigit2.y, 'numberText');
    guageTimerDecPoint.frame = 10;
    guageTimerDigit2.alpha = 0;
    guageTimerDigit1.alpha = 0;
    guageTimerDecimal.alpha = 0;
    guageTimerDecPoint.alpha = 0;
    stopTimerDigit1 = game.add.sprite(game.world.width * (1 / 2) - 40, game.world.height * (1 / 5) - 100, 'numberText');
    stopTimerDecimal = game.add.sprite(stopTimerDigit1.x + stopTimerDigit1.width, stopTimerDigit1.y, 'numberText');
    stopTimerDecPoint = game.add.sprite(
        stopTimerDigit1.x + stopTimerDigit1.width, stopTimerDigit1.y, 'numberText');
    stopTimerDecPoint.anchor.set(0.5,0);
    stopTimerDecPoint.frame = 10;
    stopTimerDigit1.alpha = 0;
    stopTimerDecimal.alpha = 0;
    stopTimerDecPoint.alpha = 0;

    //// material ///////////////////////////////////////////////////////////
    flatCloud = null;
    sharkM = null;
    galaxy = null;
    saturn = null;
    earth = null;
    sattellite = null;
    cloudStartStage2 = null;

    sharkGroup = game.add.group();
    sharkGroup.enableBody = true;
    sharkGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++) {
        var shark = sharkGroup.create(0, 0, 'shark');
        shark.exists = false;
        shark.visible = false;
        shark.scale.setTo(1.25, 1.25);
        shark.anchor.set(0.5);
        shark.checkWorldBounds = true;
        shark.body.gravity.y = 380;
        shark.events.onOutOfBounds.add(killObj, this);
    }
    sharkGroup.callAll('animations.add', 'animations', 'moveFromLeft', [26, 27, 28], 100, true);
    sharkGroup.callAll('animations.add', 'animations', 'moveFromRight', [26, 27, 28], 100, true);


    clound1Group = game.add.group();
    clound1Group.enableBody = true;
    clound1Group.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++) {
        var clound = clound1Group.create(0, 0, 'clound1');
        clound.exists = false;
        clound.visible = false;
        //clound.scale.setTo(0.5, 0.5);
        clound.anchor.set(0.5,0.6);
        clound.checkWorldBounds = true;
        clound.events.onOutOfBounds.add(killObj, this);
    }
    
    smoke = this.add.sprite(0,0, 'smoke');
    game.physics.arcade.enable(smoke);
    smoke.anchor.set(0.5);
    smoke.animations.add('great',[0,1,2,3,4,5,6,7,8,9],40,true);
    smoke.kill();
    smoke.animations.play('great');

    floorBack = this.add.sprite(game.world.width/2, game.world.height * (4.7 / 5), 'shipAndCannon');
    game.physics.arcade.enable(floorBack);
    floorBack.scale.setTo(1, 1);
    floorBack.body.collideWorldBounds = false;
    floorBack.body.immovable = true;
    floorBack.anchor.set(0.5);
    floorBack.animations.add('back',[0],1,false);
    floorBack.play('back');

    wippo = this.add.sprite(game.world.width / 2, game.world.height * (4 / 5) + 15, 'ship');
    game.physics.arcade.enable(wippo);
    wippo.anchor.set(0.5);
    wippo.checkWorldBounds = true;
    wippo.events.onOutOfBounds.add(killObj, this);

    floorFront = this.add.sprite(game.world.width/2, game.world.height * (4.7 / 5), 'shipAndCannon');
    game.physics.arcade.enable(floorFront);
    floorFront.scale.setTo(1, 1);
    floorFront.body.collideWorldBounds = false;
    floorFront.body.immovable = true;
    floorFront.anchor.set(0.5);
    floorFront.animations.add('front',[1],1,false);
    floorFront.play('front');

    game.time.events.add(Phaser.Timer.SECOND * 2, wippoLaunch, this);
    isSpacebarDown = false;
    maxGuage = 100;
    perfectStack = 0;
    stopTimePoint = 10;
    //gamemode = "feverTime";

    ////sound////
    BGMMenu.stop();
    timeStopSound = game.add.audio('timestop');
    BGMStage1 = game.add.audio('BGMStage1');
    BGMStage2 = game.add.audio('BGMStage2');
    BGMStage3 = game.add.audio('BGMStage3');
    fallSound = game.add.audio('fall');
    BGMMenu = game.add.audio('BGMMenu');
    BGMResult = game.add.audio('death');
    wrongButtonSound = game.add.audio('wrongButton');
    wrongButtonSound.volume = 0.6;
    perfectSound = game.add.audio('perfect');
    greatSound = game.add.audio('great');
    coolSound = game.add.audio('cool');
    badSound = game.add.audio('bad');
    BGMStage1.play();
    //wippo.events.onOutOfBounds.add(gameEnd(), this);

    scoreShow = score = 0;
    scoreDigit6 = game.add.sprite(0, 0, 'numberText');
    scoreDigit5 = game.add.sprite(scoreDigit6.x + scoreDigit6.width, 0, 'numberText');
    scoreDigit4 = game.add.sprite(scoreDigit5.x + scoreDigit5.width, 0, 'numberText');
    scoreDigit3 = game.add.sprite(scoreDigit4.x + scoreDigit4.width, 0, 'numberText');
    scoreDigit2 = game.add.sprite(scoreDigit3.x + scoreDigit3.width, 0, 'numberText');
    scoreDigit1 = game.add.sprite(scoreDigit2.x + scoreDigit2.width, 0, 'numberText');
    /*this.score = 0;
    this.scoreText;
    this.scoreText = game.add.text(perfect.x, perfect.y-400, 'Score : ' + this.score, {
        fontSize: '20px',
        fill: '#ed3465'
    })*/

    /////mute
    mute = game.add.button(750, 20, 'mute', muteSounds, this);
    mute.scale.setTo(0.08, 0.08);
    if (isSound)
        mute.frame = 0;
    else
        mute.frame = 1;
}


var summonCooldown = 0;
function update() {

    /*if(!this.game.world.bounds.intersects(wippo)){
        wippo.kill();
        checker.body.velocity.x = 0;
    }*/
    bg.tilePosition.y += bgSpeed;
    updateScore();
    if (gamemode == "prepare") {
        // materialGenerator();
        if(wippo.y <= 200){
            // gameBegin(); << error with this , don't know WHYYYYY!?
            game.time.events.add(Phaser.Timer.SECOND * 0, gameBegin, this); //and it's work with this.
        }

    } else if (gamemode == "ingame") {

        if (!isTimeStopped) {
            materialGenerator();
        }
        //this.scoreText.setText('Score : ' + this.score);
        collectArrow();
        if (!isTimeStopped) {
            checker.body.velocity.x = checkerSpeed;
            checkerPic.x = checker.x;
            checkerPic.y = checker.y;
            if (spacebarBlock.alive) {
                if (spaceButton.isDown && game.time.now > spaceKeyDownTimer) {
                    // wippo.animations.play("death");
                    console.log("death reason : spacebarBlock.")
                    gameEnd();
                }
            } else if (spaceButton.isDown && game.time.now > spaceKeyDownTimer) {
                isSpacebarPressed = true;
                checkAccuracy();
                clearWave();

                spaceKeyDownTimer = game.time.now + 1400;
                if (bg.tilePosition.y >= 1400) {
                    bgSpeed=perfectSpeed*30/100;
                    gamemode = "feverTime";
                    checker.alpha = 0;
                    checkerPic.alpha = 0;
                    checkbar.alpha = 0;
                    progressBar.alpha = 0;
                    guageTimeCounter = 15.0;
                    guageAliveTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 151, countdownTimer, this, "feverTime");
                }
            }
            if (!checkOverlap(checker, progressBar)/*checker.x > game.world.width * (5 / 7)*/) {
                if (game.time.now > summonCooldown) {
                    summonWave();
                    if (!isSpacebarPressed && !spacebarBlock.alive) {
                        // wippo.animations.play("death");
                        console.log("death reason : isSpacebarPressed = false.")
                        //gameEnd();//====== comment ทิ้งเพื่อไม่ต้องกด spacebar
                    }

                    isSpacebarPressed = false;
                }
                if (spacebarBlock.alive) {
                    spacebarBlock.kill();
                }
                //checker.reset(game.world.width * (2.5 / 7), game.world.height * (3 / 5)+10);
                checker.reset(progressBar.x, progressBar.y);
                summonCooldown = game.time.now + 1500;
            }
            if (stopTimeButton.isDown && stopTimePoint > 0) {
                stoptime();
            }
        } else {
            for (var i = waveCheckOrder; i <= wave.length - 1; i++) {
                wave[i].arrow.animations.stop();
                wave[i].arrow.animations.play('default');
            }
        }

    } else if (gamemode == "feverTime") {
        if (!isTimeStopped) {
            materialGenerator();
        }
        if (!specialGuageIsSpawned) {
            specialGuage = this.add.sprite(game.world.width * (1 / 5), game.world.height * (1.5 / 5), 'guage');
            specialGuageSeal = this.add.sprite(game.world.width * (1 / 5) + 6, game.world.height * (1.5 / 5) + 6, 'guageSeal');
            specialGuageIsSpawned = true;
            checker.alpha = 0;
        }
        if (!isSpacebarDown) {
            if (spaceButton.isDown) {
                maxGuage -= 5;
                isSpacebarDown = true;
                specialGuageSeal.scale.setTo(1, maxGuage / 100);
            }
        }
        if (!spaceButton.isDown)
            isSpacebarDown = false;
        if (!isTimeStopped) {
            if (maxGuage < 100) {
                maxGuage += 0.35;
                specialGuageSeal.scale.setTo(1, maxGuage / 100);
            }

            if (maxGuage <= 0 && specialGuage != null) {
                score += 500;
                specialGuage.destroy();
                specialGuageSeal.destroy();
                gamemode = "changingState";
                game.time.events.remove(guageAliveTimer);
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                    cancelCountdownTimer("feverTime");
                    maxGuage = 100;
                    isSpacebarDown = false;
                    specialGuageIsSpawned = false;
                }, this);
            }
            if (stopTimeButton.isDown && stopTimePoint > 0) {
                stoptime();

            }
        } else {
            if (maxGuage < 0) {
                maxGuage = -1;
                specialGuageSeal.scale.setTo(1, maxGuage / 100);
            }
        }

    } else if (gamemode == "changingState") {
        if(bgChange!=null){
            bgChange.tilePosition.y += bgSpeed;
        }
        if(cloudStartStage2 != null){
            if(cloudStartStage2.y>500&&cloudStartStage2.body.velocity.y>10){
                cloudStartStage2.body.velocity.y-=5;
            }
        }
        if (isfirstChange) {
            isfirstChange = false;
            if (stateHandle == 1) {
                bgChange = game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background2');
                bgChange.tilePosition.y += 600;
                BGMStage1.fadeOut(3000);
                cloudStartStage2 = game.add.sprite(0, 0, 'cloudStartStage2');
                cloudStartStage2.anchor.setTo(0,0.5);
                game.physics.arcade.enable(cloudStartStage2);
                cloudStartStage2.checkWorldBounds = true;
                cloudStartStage2.events.onOutOfBounds.add(function () {
                    cloudStartStage2.destroy();
                    cloudStartStage2 = null;
                }, this);
                cloudStartStage2.body.velocity.y = 150;
                cloudStartStage2.sendToBack();
                wippo.sendToBack();
                smoke.sendToBack();
                bg.sendToBack();

            }
            else if (stateHandle == 2) {
                bgChange = game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background3');
                bgChange.tilePosition.y += 600;
                earth = game.add.sprite(game.world.width / 2, game.world.height / 1.5, 'earth');
                earth.scale.setTo(0.5, 0.5);
                earth.anchor.setTo(0.5);
                game.physics.arcade.enable(earth);
                earth.checkWorldBounds = true;
                earth.events.onOutOfBounds.add(function () {
                    earth.destroy();
                    earth = null;
                }, this);
                earth.body.velocity.y = 3;
                earth.sendToBack();
                earth.alpha = 0;
                BGMStage2.fadeOut(3000);
            }
            bgChange.alpha = 0;
            bgChange.sendToBack();
            var loop = game.time.events.loop(Phaser.Timer.SECOND * 0.2, function () {
                bg.alpha -= 0.05;
                bgChange.alpha += 0.05;
                if (earth != null)
                    earth.alpha += 0.05;
                if (bg.alpha < 0.0000001) {
                    isfirstChange = true;
                    gamemode = "ingame";
                    checker.alpha = 1;
                    checkerPic.alpha = 1;
                    checkbar.alpha = 1;
                    progressBar.alpha = 1;
                    if (stateHandle == 1) {
                        BGMStage2.play();
                    }else if (stateHandle == 2) {
                        BGMStage3.play();
                    }


                    bg.destroy();
                    bg = bgChange;
                    bgChange = null;
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

    } else if (gamemode == "gameover") {
        if (wippo.alive) {
            bgSpeed = -perfectSpeed*90/100;
        }else{
            bgSpeed = 0;
        }
        if(isfirstOver){
            isfirstOver = false;
            buttonRestart = game.add.button(game.world.width * (1 / 2) - 40, game.world.height * (1 / 5) - 100, 'restartBtn', function(){
                game.state.restart(true,false);
                BGMResult.stop();
                BGMStage1.stop();
                BGMStage2.stop();
                BGMStage3.stop();
            }, this);
            buttonRestart.scale.setTo(0.5, 0.5);
            buttonRestart.alpha = 0;
        }
        if(buttonRestart.alpha<1){
            buttonRestart.alpha += 0.001;
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


function countdownTimer(timerName) {
    if (timerName == "feverTime") {
        if (guageTimerDigit2.alpha == 0) {
            guageTimerDigit2.alpha = 1;
            guageTimerDigit1.alpha = 1;
            guageTimerDecimal.alpha = 1;
            guageTimerDecPoint.alpha = 1;
        }
        guageTimerDigit2.bringToTop();
        guageTimerDigit1.bringToTop();
        guageTimerDecimal.bringToTop();
        guageTimerDecPoint.bringToTop();
        guageTimerDigit2.frame = Math.floor(guageTimeCounter / 10);
        guageTimerDigit1.frame = Math.floor(guageTimeCounter % 10);
        guageTimerDecimal.frame = Math.floor(guageTimeCounter * 10 % 10);
        
        if (!isTimeStopped)
            guageTimeCounter -= 0.1;

        if (guageTimeCounter <= 0) {
            // wippo.animations.play("death");
            cancelCountdownTimer("feverTime");
            console.log("death reason : guage time's up.")
            gameEnd();
        }
    } else if (timerName == "timeStopped") {
        if (stopTimerDigit1.alpha == 0) {
            stopTimerDigit1.alpha = 1;
            stopTimerDecimal.alpha = 1;
            stopTimerDecPoint.alpha = 1;
            stopTimerDigit1.bringToTop();
            stopTimerDecimal.bringToTop();
            stopTimerDecPoint.bringToTop();
        }
        stopTimerDigit1.frame = Math.floor(stopTimeCounter % 10);
        stopTimerDecimal.frame = Math.floor(stopTimeCounter * 10 % 10);

        stopTimeCounter -= 0.1;
        if (stopTimeCounter <= 0) {
            isTimeStopped = false;
            cancelCountdownTimer("timeStopped");

        }
    }
}
function stoptime() {
    isTimeStopped = true;
    stopTimePoint--;
    stopTimeCounter = 3.0;
    stopTimeTimer = game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 31, countdownTimer, this, "timeStopped");
    if(guageAliveTimer!=null){
        guageAliveTimer.repeatCount+=30;
    }
    checker.body.velocity.x = 0;
    tempBgSpeed = bgSpeed;
    bgSpeed = 0;
    stopTimePointText.destroy();
    stopTimePointText = game.add.sprite(game.world.width * (7 / 8), game.world.height * (1.5 / 5) - 100, 'numberText');
    stopTimePointText.frame = stopTimePoint;
    smoke.animations.paused = true;
    // wippo.animations.paused = true;

    var cloud1=clound1Group.getFirstExists(true);
    if(cloud1!=null){
        cloud1.body.velocity.y = 0;
    }
    if (sattellite != null) {
        // sattellite.body.velocity.y = bgSpeed*8;
        // sattellite.body.velocity.x = game.rnd.integerInRange(-300,300);
        sattellite.body.velocity.y = 0;
        sattellite.body.velocity.x = 0;
    }
    if (saturn != null) {
        // saturn.body.velocity.y = bgSpeed/2;
        // saturn.body.velocity.x = game.rnd.integerInRange(3,7);
        saturn.body.velocity.y = 0;
        saturn.body.velocity.x = 0;
    }
    sharkGroup.setAll('body.velocity.x', 0, false, false);
    sharkGroup.setAll('body.velocity.y', 0, false, false);
    sharkGroup.setAll('body.gravity.y', 0, false, false);
    sharkGroup.setAll('animations.paused', true, false);

    BGMStage1.pause();
    BGMStage2.pause();
    BGMStage3.pause();
    timeStopSound.play();
}
var tempBgSpeed;
function cancelCountdownTimer(timerName) {
    if (timerName == "feverTime") {
        if (guageTimerDigit2.alpha == 1) {
            guageTimerDigit2.alpha = 0;
            guageTimerDigit1.alpha = 0;
            guageTimerDecimal.alpha = 0;
            guageTimerDecPoint.alpha = 0;
        }
        if (specialGuage != null) {
            specialGuage.destroy();
        }
        if (specialGuageSeal != null) {
            specialGuageSeal.destroy();
        }
    } else if (timerName == "timeStopped") {
        if (stopTimerDigit1.alpha == 1) {
            stopTimerDigit1.alpha = 0;
            stopTimerDecimal.alpha = 0;
            stopTimerDecPoint.alpha = 0;
        }
        bgSpeed = tempBgSpeed;

        smoke.animations.paused = false;
        // wippo.animations.paused = false;

        ///material

        var cloud1=clound1Group.getFirstExists(true);
        if(cloud1!=null){
            cloud1.body.velocity.y = 70;
        }
        if (sattellite != null) {
            sattellite.body.velocity.y = bgSpeed * 8;
            sattellite.body.velocity.x = game.rnd.integerInRange(-300, 300);

        }
        if (saturn != null) {
            saturn.body.velocity.y = bgSpeed / 2;
            saturn.body.velocity.x = game.rnd.integerInRange(3, 7);

        }
        sharkGroup.setAll('body.gravity.y', 380, false, false);
        sharkGroup.setAll('animations.paused', false, false);
        sharkGroup.setAll('body.velocity.y', 500, false, false);

        ////sound
        if(stateHandle==1){
            BGMStage1.resume();
            BGMStage1.volume = 0.2;
            BGMStage1.fadeTo(800,1);
        }else if(stateHandle==2){
            BGMStage2.resume();
            BGMStage2.volume = 0.2;
            BGMStage2.fadeTo(800,1);
        }else{
            BGMStage3.resume();
            BGMStage3.volume = 0.2;
            BGMStage3.fadeTo(800,1);
        }

    }
}
//////material function
var generatorCooldown = 0;
var sharkMCooldown = 60;
var clound1Cooldown = 120;
function materialGenerator() {
    if (stateHandle == 1) {
        //BG1
        if (sharkMCooldown <= 0) {
            sharkMCooldown = 60;
            var shark = sharkGroup.getFirstExists(false);
            // shark.reset(300,300);
            var sharkLaunchAt = game.rnd.integerInRange(game.world.height / 2, game.world.height);
            var spawnSide = game.rnd.integerInRange(0, 1);
            var sharkSpeed = game.rnd.integerInRange(400, 900);
            if (spawnSide == 0) {
                shark.reset(0, game.world.height);
                shark.animations.frame = 26;
                shark.animations.play('moveFromLeft');
                shark.body.velocity.x = 300;
                shark.body.velocity.y = -sharkSpeed;
            } else {
                shark.reset(game.world.width, game.world.height);
                shark.animations.frame = 25;
                shark.animations.play('moveFromRight');
                shark.body.velocity.x = -300;
                shark.body.velocity.y = -sharkSpeed;
            }
        }
        if (clound1Cooldown <= 0) {
            clound1Cooldown = game.rnd.integerInRange(660,720);
            var clound = clound1Group.getFirstExists(false);
            var cloundLaunchAt = game.rnd.integerInRange(20, game.world.width-20);
            // var cloundSpeed = game.rnd.integerInRange(1200, 1400);
            clound.reset(cloundLaunchAt,0);
            //clound.body.velocity.y = cloundSpeed;
            clound.body.velocity.y = 70;
        }

        clound1Cooldown--;
        sharkMCooldown--;
    } else if (stateHandle == 2) {
        //BG2
        if (clound1Cooldown <= 0) {
            clound1Cooldown = game.rnd.integerInRange(660,720);
            var clound = clound1Group.getFirstExists(false);
            var cloundLaunchAt = game.rnd.integerInRange(20, game.world.width-20);
            // var cloundSpeed = game.rnd.integerInRange(1200, 1400);
            clound.reset(cloundLaunchAt,0);
            clound.body.velocity.y = 70;

        }

        clound1Cooldown--;

    } else {

        if (sattellite == null) {
            sattellite = game.add.sprite(300, 0, 'sattellite');
            sattellite.scale.setTo(0.1, 0.1);
            game.physics.arcade.enable(sattellite);
            sattellite.checkWorldBounds = true;
            sattellite.events.onOutOfBounds.add(function () {
                sattellite.destroy();
                sattellite = null;
            }, this);
            sattellite.body.velocity.y = bgSpeed * 8;
            sattellite.body.velocity.x = game.rnd.integerInRange(-300, 300);
            sattellite.sendToBack();
            generatorCooldown += 1 * 60;
        } else {
            sattellite.body.velocity.y = bgSpeed * 8;
        }

        if (saturn == null) {
            saturn = game.add.sprite(300, 0, 'saturn');
            saturn.scale.setTo(0.5, 0.5);
            game.physics.arcade.enable(saturn);
            saturn.checkWorldBounds = true;
            saturn.events.onOutOfBounds.add(function () {
                saturn.destroy();
                saturn = null;
            }, this);
            saturn.body.velocity.y = bgSpeed / 2;
            saturn.body.velocity.x = game.rnd.integerInRange(3, 7);
            saturn.sendToBack();
            generatorCooldown += 1 * 60;
        } else {
            saturn.body.velocity.y = bgSpeed / 2;
        }

    }
    if (bg != null)
        bg.sendToBack();
    if (generatorCooldown > 0)
        generatorCooldown--;
}

function checkAccuracy() {
    var completeArrow = (waveCheckOrder == wave.length);
    var result = false;
    if (completeArrow && checkOverlap(checker, perfect)) {
        statusText = game.add.image(game.world.width * (1 / 2), game.world.height * (4 / 5), 'perfect');

        perfectStack++;
        if (perfectStack >= 4 && stopTimePoint < 3) {
            stopTimePoint++;
            perfectStack = 0;
            stopTimePointText.destroy();
            stopTimePointText = game.add.sprite(game.world.width * (7 / 8), game.world.height * (1.5 / 5) - 100, 'numberText');
            stopTimePointText.frame = stopTimePoint;
        }
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
            statusText.destroy();
        }, this);
        bgSpeed = perfectSpeed;
        difficulty++;
        score += 200;
        perfectSound.play();
        result = true;
        //////////animation wippo
        // wippo.animations.play("perfectRush");
    }
    else if (completeArrow && (checkOverlap(checker, greatR) || checkOverlap(checker, greatL))) {
        statusText = game.add.image(game.world.width * (1 / 2), game.world.height * (4 / 5), 'great');
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
            statusText.destroy();
        }, this);
        bgSpeed = perfectSpeed*90/100;
        score += 175;
        perfectStack = 0;
        greatSound.play();
        result = true;
        // wippo.animations.play("rush");
    }
    else if (completeArrow && (checkOverlap(checker, coolR) || checkOverlap(checker, coolL))) {
        statusText = game.add.image(game.world.width * (1 / 2), game.world.height * (4 / 5), 'cool');
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
            statusText.destroy();
        }, this);
        bgSpeed = perfectSpeed*80/100;
        score += 150;
        difficulty-=2;
        perfectStack = 0;
        coolSound.play();
        result = true;
        // wippo.animations.play("rush");
    }
    else if (completeArrow && (checkOverlap(checker, badR) || checkOverlap(checker, badL))) {
        statusText = game.add.image(game.world.width * (1 / 2), game.world.height * (4 / 5), 'bad');
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
            statusText.destroy();
        }, this);
        bgSpeed = perfectSpeed*70/100;
        score += 125;
        difficulty = 1;
        perfectStack = 0;
        badSound.play();
        result = true;
        // wippo.animations.play("rush");
    }
    else {
        statusText = game.add.image(game.world.width * (1 / 2), game.world.height * (4 / 5), 'miss');
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
            statusText.destroy();
        }, this);
        console.log("death reason : miss.")
        gameEnd();
        perfectStack = 0;
        result = false;
        // wippo.animations.play("death");
    }
    statusText.anchor.set(0.5);
    statusText.scale.setTo(0.1, 0.1);
    return result;

}

function updateScore(){
    scoreDigit1.frame = scoreShow%10;
    scoreDigit2.frame = Math.floor(scoreShow / 10)%10;
    scoreDigit3.frame = Math.floor(scoreShow / 100)%10;
    scoreDigit4.frame = Math.floor(scoreShow / 1000)%10;
    scoreDigit5.frame = Math.floor(scoreShow / 10000)%10;
    scoreDigit6.frame = Math.floor(scoreShow / 100000)%10;
    if(score>scoreShow+2){
        scoreShow+=2;
    }else if(score>scoreShow){
        scoreShow++;
    }

}

var isHoldDown = false;
function collectArrow() {
    if (waveCheckOrder < wave.length && !isHoldDown) {
        if (cursors.up.isDown) {
            isHoldDown = true;
            if (wave[waveCheckOrder].name == "up") {
                wave[waveCheckOrder].arrow.animations.play('correct');
                if (wave[waveCheckOrder].type == 1) {
                    if (waveCheckOrder + 1 < wave.length - 1) {
                        var pos = game.rnd.integerInRange(waveCheckOrder + 1, wave.length - 1);
                        posx = wave[pos].x;
                        posy = wave[pos].y;
                        wave[pos].arrow.destroy();
                        wave[pos] = new arrowCreate(posx, posy, game.rnd.integerInRange(0, 3/*difficulty*/), 3);
                    }
                }
                waveCheckOrder++;
                //animations
            } else {
                refreshWave();
                wrongButtonSound.play();
            }
        } else if (cursors.down.isDown) {
            isHoldDown = true;
            if (wave[waveCheckOrder].name == "down") {
                wave[waveCheckOrder].arrow.animations.play('correct');
                if (wave[waveCheckOrder].type == 1) {
                    if (waveCheckOrder + 1 < wave.length - 1) {
                        var pos = game.rnd.integerInRange(waveCheckOrder + 1, wave.length - 1);
                        posx = wave[pos].x;
                        posy = wave[pos].y;
                        wave[pos].arrow.destroy();
                        wave[pos] = new arrowCreate(posx, posy, game.rnd.integerInRange(0, 3/*difficulty*/), 3);
                    }
                }
                waveCheckOrder++;
                //animations
            } else {
                refreshWave();
                wrongButtonSound.play();
            }
        }
        else if (cursors.right.isDown) {
            isHoldDown = true;
            if (wave[waveCheckOrder].name == "right") {
                wave[waveCheckOrder].arrow.animations.play('correct');
                if (wave[waveCheckOrder].type == 1) {
                    if (waveCheckOrder + 1 < wave.length - 1) {
                        var pos = game.rnd.integerInRange(waveCheckOrder + 1, wave.length - 1);
                        posx = wave[pos].x;
                        posy = wave[pos].y;
                        wave[pos].arrow.destroy();
                        wave[pos] = new arrowCreate(posx, posy, game.rnd.integerInRange(0, 3/*difficulty*/), 3);
                    }
                }
                waveCheckOrder++;
                //animations
            } else {
                refreshWave();
                wrongButtonSound.play();
            }
        } else if (cursors.left.isDown) {
            isHoldDown = true;
            if (wave[waveCheckOrder].name == "left") {
                wave[waveCheckOrder].arrow.animations.play('correct');
                if (wave[waveCheckOrder].type == 1) {
                    if (waveCheckOrder + 1 < wave.length - 1) {
                        var pos = game.rnd.integerInRange(waveCheckOrder + 1, wave.length - 1);
                        posx = wave[pos].x;
                        posy = wave[pos].y;
                        wave[pos].arrow.destroy();
                        wave[pos] = new arrowCreate(posx, posy, game.rnd.integerInRange(0, 3/*difficulty*/), 3);
                    }
                }
                waveCheckOrder++;
                //animations
            } else {
                refreshWave();
                wrongButtonSound.play();
            }
        }
    } else if (cursors.down.isUp && cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
        isHoldDown = false;
    }
}

function refreshWave() {
    for (; waveCheckOrder >= 0; waveCheckOrder--) {
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
    }
    waveCheckOrder = 0;
}

function clearWave() {
    var waveLength = wave.length;
    for (var i = 0; i < waveLength; i++) {
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
        wave[wave.length - 1].arrow.destroy();
        wave.pop();
        waveCheckOrder = 0;
        //waveCheck.pop();
    }
    //wave = [];
}
function summonWave() {
    var length;
    if(difficulty<=2){
        length = 3;
    }else if(difficulty>=9){
        length = 8;
    }else{
        length = difficulty;
    }
    // var l = wave.length;
    var randObstacle = game.rnd.integerInRange(1, 6);
    if (randObstacle == 2) {
        spacebarBlock.revive();
        spacebarBlock.bringToTop();
    }


    //var startPositon;
    /*if(length==3){
        x=game.world.width/2-50;
        y=game.world.height*3/5;
    }*/
    if (length % 2 == 0) {
        x = length / 2;
        x = game.world.width / 2 - (50 * x - 25);
        y = game.world.height * 3.5 / 5;
    } else {
        x = (length - 1) / 2;
        x = game.world.width / 2 - (50 * x);
        y = game.world.height * 3.5 / 5;
    }
    clearWave();
    for (var i = 0; i < length; i++) {
        ////create button line
        if (i > 0) {
            if (i < length - 1) {
                buttonLine[i] = game.add.sprite(x, y, 'buttonLineBody');
            } else {
                buttonLine[i] = game.add.sprite(x, y, 'buttonLineTail');
            }
        } else {
            buttonLine[i] = game.add.sprite(x, y, 'buttonLineHead');
        }
        buttonLine[i].anchor.set(0.5);
        buttonLine[i].scale.setTo(0.4, 0.6);
        //////

        var rand = game.rnd.integerInRange(0, 3/*difficulty*/);
        wave.push(new arrowCreate(x, y, rand, game.rnd.integerInRange(0, 2)));
        //waveCheck.push(false);
        //wave[i]=new arrowCreate(x,y,rand);
        x += 50;
    }
}
arrowCreate = function (x, y, rand, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.game = game;
    this.alive = true;
    if (this.type == 0) {
        var randomType = game.rnd.integerInRange(1, 10);
        if (rand == 0) {
            this.arrow = game.add.sprite(x, y, 'up');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(1, 1);
            this.name = "up";
            if (randomType <= 7) {
                this.arrow.animations.add('default', [0], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            } else if (randomType > 7) {
                this.arrow.animations.add('default', [2], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            }
            //this.up.name = index.toString();
        } else if (rand == 1) {
            this.arrow = game.add.sprite(x, y, 'down');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(1, 1);
            this.name = "down";
            if (randomType <= 7) {
                this.arrow.animations.add('default', [0], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            } else if (randomType > 7) {
                this.arrow.animations.add('default', [2], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            }
            //this.down.name = index.toString();
        } else if (rand == 2) {
            this.arrow = game.add.sprite(x, y, 'right');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(1, 1);
            this.name = "right";
            if (randomType <= 7) {
                this.arrow.animations.add('default', [0], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            } else if (randomType > 7) {
                this.arrow.animations.add('default', [2], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            }
            //this.right.name = index.toString();
        } else {
            this.arrow = game.add.sprite(x, y, 'left');
            this.arrow.anchor.set(0.5);
            this.arrow.scale.setTo(1, 1);
            this.name = "left";
            if (randomType <= 7) {
                this.arrow.animations.add('default', [0], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            } else if (randomType > 7) {
                this.arrow.animations.add('default', [2], 1, true);
                this.arrow.animations.add('correct', [1], 1, true);
                this.arrow.animations.play('default');
            }
            //this.left.name = index.toString();
        }
    }
    else if (this.type == 1) {
        //Type changer Arrow
        if (rand == 0) {
            this.arrow = game.add.sprite(x, y, 'up');
            this.name = "up";
            //this.up.name = index.toString();
        } else if (rand == 1) {
            this.arrow = game.add.sprite(x, y, 'down');
            this.name = "down";
            //this.down.name = index.toString();
        } else if (rand == 2) {
            this.arrow = game.add.sprite(x, y, 'right');
            this.name = "right";
            //this.right.name = index.toString();
        } else {
            this.arrow = game.add.sprite(x, y, 'left');
            this.name = "left";
            //this.left.name = index.toString();
        }
        // this.arrow.alpha=0.6;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(1, 1);
        this.arrow.animations.add('default', [5], 1, true);
        this.arrow.animations.add('out', [3], 1, true);
        this.arrow.animations.add('correct', [1], 1, true);
        this.arrow.animations.play('default');

    }
    else if (this.type == 2) {
        //Type fading Arrow
        if (rand == 0) {
            this.arrow = game.add.sprite(x, y, 'up');
            this.name = "up";
            //this.up.name = index.toString();
        } else if (rand == 1) {
            this.arrow = game.add.sprite(x, y, 'down');
            this.name = "down";
            //this.down.name = index.toString();
        } else if (rand == 2) {
            this.arrow = game.add.sprite(x, y, 'right');
            this.name = "right";
            //this.right.name = index.toString();
        } else {
            this.arrow = game.add.sprite(x, y, 'left');
            this.name = "left";
            //this.left.name = index.toString();
        }
        // this.arrow.alpha = 0.8;
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(1, 1);
        // this.arrow.animations.add('default',[0],1,true);
        // this.arrow.animations.add('out',[3],1,true);
        this.arrow.animations.add('default', [4, 4, 4, 3], 2, false);
        this.arrow.animations.add('correct', [1], 1, true);
        this.arrow.animations.play('default');
        // game.time.events.add(Phaser.Timer.SECOND * 2, function(){
        //     if(this.arrow.frame==0){
        //         this.arrow.animations.play('out');
        //     }
        // }, this);
    }
    else if (type == 3) {
        //Type changing arrow
        if (rand == 0) {
            this.arrow = game.add.sprite(x, y, 'up');
            this.name = "up";
            //this.up.name = index.toString();
        } else if (rand == 1) {
            this.arrow = game.add.sprite(x, y, 'down');
            this.name = "down";
            //this.down.name = index.toString();
        } else if (rand == 2) {
            this.arrow = game.add.sprite(x, y, 'right');
            this.name = "right";
            //this.right.name = index.toString();
        } else {
            this.arrow = game.add.sprite(x, y, 'left');
            this.name = "left";
            //this.left.name = index.toString();
        }
        this.arrow.anchor.set(0.5);
        this.arrow.scale.setTo(1, 1);
        this.arrow.animations.add('default', [0], 1, true);
        this.arrow.animations.add('correct', [1], 1, true);
        this.arrow.animations.play('default');
    }
}



function destroyObj(obj) {
    obj.destroy();
}
function killObj(obj) {
    obj.kill();
}
function checkOverlap(spriteA, spriteB) {
    try {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    } catch (error) {
        //when error occur returning true to avoid unexpect arrow wave that summon when is not(!) overlapping.
        return true;
    }

}
wippoLaunch = function () {
    floorFront.body.velocity.y = 400;
    floorBack.body.velocity.y = 400;
    wippo.body.velocity.y = -150;
    smoke.reset(wippo.x+20, wippo.y+110);
    smoke.body.velocity.y = -150;
    bgSpeed = perfectSpeed;
    // game.time.events.add(Phaser.Timer.SECOND * 2, gameBegin, this);
}
gameBegin = function () {
    wippo.body.velocity.y = 0;
    bgSpeed = perfectSpeed*80/100;
    smoke.reset(wippo.x+20, wippo.y+110);
    smoke.animations.play('great');
    progressBar = this.add.sprite(game.world.width * (2 / 5), game.world.height * (3 / 5)+10, 'beam');
    progressBar.scale.setTo(0.08, 0.07);
    progressBar.anchor.setTo(0,0.5);
    perfect = this.add.sprite(game.world.width * (3 / 5)+1, progressBar.y-7, 'laser');
    perfect.scale.setTo(0.25, 0.3);
    greatR = this.add.sprite(perfect.x + perfect.width, perfect.y, 'laser');
    greatR.scale.setTo(0.25, 0.3);
    greatL = this.add.sprite(perfect.x - perfect.width, perfect.y, 'laser');
    greatL.scale.setTo(0.25, 0.3);
    coolR = this.add.sprite(greatR.x + greatR.width, perfect.y, 'laser');
    coolR.scale.setTo(0.25, 0.3);
    coolL = this.add.sprite(greatL.x - greatL.width, perfect.y, 'laser');
    coolL.scale.setTo(0.25, 0.3);
    badR = this.add.sprite(coolR.x + coolR.width, perfect.y, 'laser');
    badR.scale.setTo(0.25, 0.3);
    badL = this.add.sprite(coolL.x - coolL.width, perfect.y, 'laser');
    badL.scale.setTo(0.25, 0.3);
    perfect.alpha = 0;
    greatL.alpha = 0;
    greatR.alpha = 0;
    coolL.alpha = 0;
    coolR.alpha = 0;
    badL.alpha = 0;
    badR.alpha = 0;
    checkbar = this.add.sprite(game.world.width * (3 / 5)+5, game.world.height * (3 / 5)+10, 'checkbar');
    checkbar.scale.setTo(0.035, 0.07);
    checkbar.anchor.setTo(0.5);
    summonWave();
    //checker.reset(game.world.width * (2.5 / 7), game.world.height * (3 / 5)+10);
    checker.reset(progressBar.x, progressBar.y);
    gamemode = "ingame";
    checkerPic = this.add.sprite(0, game.world.height * (4 / 5) + 120, 'checkerPic');
    game.physics.arcade.enable(checkerPic);
    checkerPic.anchor.set(0.5);
    checkerPic.scale.setTo(0.01, 0.01);
    checkerPic.body.maxVelocity.set(1500);
    checkerPic.body.collideWorldBounds = false;


    ///////////////////////////////////////////////
    stopTimePointText = game.add.sprite(game.world.width * (7 / 8), game.world.height * (1.5 / 5) - 100, 'numberText');
    stopTimePointText.frame = 1;
}
gameEnd = function () {
    //playDeathAnimation
    fallSound.play();
    if(stateHandle==1){
        BGMStage1.fadeOut(1500);
    }else if(stateHandle==2){
        BGMStage2.fadeOut(1500);
    }else{
        BGMStage3.fadeOut(1500);
    }
    BGMResult.loopFull();

    gamemode = "gameover";
    wippo.body.velocity.y = 200;
    perfect.alpha = 0;
    greatR.alpha = 0;
    greatL.alpha = 0;
    coolR.alpha = 0;
    coolL.alpha = 0;
    badR.alpha = 0;
    badL.alpha = 0;
    checker.alpha = 0;
    progressBar.alpha = 0;
    checkbar.alpha = 0;
    spacebarBlock.alpha = 0;
    checkerPic.alpha = 0;
    smoke.alpha = 0;
    clearWave();
    //game.time.events.add(Phaser.Timer.SECOND * 3, toResultPage = function(){game.state.start(createResult)}, this);
}
function toGameplay() {
    game.state.start('main');
}
