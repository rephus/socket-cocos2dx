var Layer = cc.Layer.extend({

    player:null,

    ctor:function () {
        this._super();

        Global.layer = this; //Used in player to addChild 
        player = new Player();
        player.control(this);
        Global.player = player;

        this.schedule(this.update,0.2);
        Websocket.connect();

        return true;
    },
    
    update: function(){

     }
});
