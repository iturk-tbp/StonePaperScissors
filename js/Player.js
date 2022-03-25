class Player{
    constructor(){
        this.name = null,
        this.Score = 0,
        this.Choice = null
  }
    addPlayer(){
        var playerIndex  = "players/player" + this.index;
        database.ref(playerIndex).set({
            Name: this.name,
        })
    }
    getCount(){
        var countref = database.ref("playerCount")
        countref.on("value",data => {
          playerCount = data.val()
        })
      }
    updateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }

  static getPlayersInfo(){
    var playerInforef = database.ref("players")
    playerInforef.on("value",data =>{
      allPlayers = data.val();
    })
  }
}