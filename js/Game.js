class Game{
    constructor(){
        this.resetButton = createButton("");
        this.rockButton = createButton("Rock");
        this.paperButton = createButton("Paper");
        this.scissorButton = createButton("Scissor");
    }
    getState(){
        var gamestateref = database.ref("gameState")
        gamestateref.on("value", function(data){
            gameState = data.val();
        })
    }
    updateState(state){
        database.ref("/").update({
            gameState: state
        })
    }
    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();

        score1 = 0;
        score2 = 0;
        scores = [score1,score2]

        choice = 0
        
    }
    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayersInfo();
        this.handleRockButton();
        this.handlePaperButton();
        this.handleScissorsButton();
        Game.getA();
        this.result();
    }
    handleElements(){
        form.hide();
        this.resetButton.position(width/2+500,15);
        this.resetButton.class("resetButton");
        this.rockButton.position(200,600);
        this.rockButton.class("customButton2");
        this.paperButton.position(600,600);
        this.paperButton.class("customButton2");
        this.scissorButton.position(1000,600);
        this.scissorButton.class("customButton2");

    }
    handleResetButton(){
        this.resetButton.mousePressed(() =>{
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {},
                a1: 0,
                a2: 0
            })
        window.location.reload();
        })
    }

    handleRockButton(){
        this.rockButton.mousePressed(() =>{
            if(player.index == 1){
                database.ref("players/player1").update({
                    Choice: "Rock"
                })
                database.ref("/").update({
                    a1: 1
                })
            }
            else{
                database.ref("players/player2").update({
                    Choice: "Rock"
                })
                database.ref("/").update({
                    a2: 1
                })       
                 }
            this.hide();
            
 
        })
    }
    handlePaperButton(){
        this.paperButton.mousePressed(() =>{
            if(player.index == 1){
                database.ref("players/player1").update({
                    Choice: "Paper"
                })
                database.ref("/").update({
                    a1: 2
                })
            }
            else{
                database.ref("players/player2").update({
                    Choice: "Paper"
                })
                database.ref("/").update({
                    a2: 2
                })
            }
            this.hide();
           
            
        })
    }
    handleScissorsButton(){
        this.scissorButton.mousePressed(() =>{
            if(player.index == 1){
                database.ref("players/player1").update({
                    Choice: "Scissor"
                })
                database.ref("/").update({
                    a1: 3
                })
            }
            else{
                database.ref("players/player2").update({
                    Choice: "Scissor"
                })
                database.ref("/").update({
                    a2: 3
                })
            }
            this.hide();
            
        })
    }

     result(){

        if(a1 === 1 && a2 === 2){
            Game.updateTheDamnScore(0,1);
            Game.showResult();
        }
        if(a1 === 2 && a2 === 1){
            Game.updateTheDamnScore(1,0)
            Game.showResult();
        }
        if(a1 === 1 && a2 === 1){
            Game.updateTheDamnScore(0,0)
            Game.showResult();
        }
        if(a1 === 2 && a2 === 2){
            Game.updateTheDamnScore(0,0)
            Game.showResult();
        }
        if(a1 === 1 && a2 === 3){
            Game.updateTheDamnScore(1,0)
            Game.showResult();
        }
        if(a1 === 3 && a2 === 1){
            Game.updateTheDamnScore(0,1)
            Game.showResult();
        }
        if(a1 === 3 && a2 === 2){
            Game.updateTheDamnScore(1,0)
            Game.showResult();
        }
        if(a1 === 2 && a2 === 3){
            Game.updateTheDamnScore(0,1)
            Game.showResult();
        }
        if(a1 === 3 && a2 === 3){
            Game.updateTheDamnScore(0,0)
            Game.showResult();
        }
    }
   static updateTheDamnScore(x,y){
        if(player.index === 1){
           database.ref('players/player1').update({
               Score: x
           })
        }
        if(player.index === 2){
            database.ref('players/player2').update({
                Score: y
            })
        }
    }
    hide(){
        this.paperButton.hide();
        this.rockButton.hide();
        this.scissorButton.hide();
    }

    static getA(){
        var a1ref = database.ref("a1")
        a1ref.on("value", function(data){
        a1 = data.val();
        })
        var a2ref = database.ref("a2")
        a2ref.on("value",function(data){
        a2 = data.val();
        })
        
    }

    static showResult(){
        var score1ref = database.ref("players/player1/Score")
        score1ref.on("value",function(data){
            score1 = data.val();
        })
        var score2ref = database.ref("players/player2/Score")
        score2ref.on("value",function(data){
            score2 = data.val();
        })
        fill("white");
            textSize(30);
            text("Score Player 1:"+score1,100,500);
            text("Score Player 2:"+score2,700,500);
            text("Score of 0 means you lost, and that of 1 means you won.",600,600)
    }
   
}