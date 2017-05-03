var Websocket = new WebsocketManager();

function WebsocketManager() {

    console.log("Loading websocket");
    var socket; 
    var lastPlayerUpdate;

    this.connect = function () {
         socket = io('http://localhost:3000');

         // Done on broadcast, it won't be received by the person who 
        // updated the user on the first place
        socket.on('update player', function (data) {

            if (!Global.players[data.id]) {
                var remotePlayer = new Player();
                remotePlayer.set(data.id,  cc.color(125, 0, 0, 255) ) ;
                Global.players[data.id] = remotePlayer;
            }
            //console.log("Updating remote player ", data);
            Global.players[data.id].update(data.x, data.y);

        });

        //After being connected, receive a connected message with the socket.id
        socket.on('connected', function (data) {
            console.log("Connected player " , data);
            Global.layer.schedule(update,0.2);
            Global.player.set(data.id);
        });

        // When other players disconnect, we remove them from our list
        socket.on('disconnect player', function (data) {
            if (Global.players[data.id]) {
                Global.players[data.id].destroy();

                console.log("Total players ", Object.keys(Global.players).length);
            } // else nothing to remove 
        });

    }

    function update() {
        // Only send position when it's updated
        var playerUpdate = JSON.stringify(Global.player.properties());
        if (playerUpdate !== lastPlayerUpdate) {
            lastPlayerUpdate = playerUpdate;
            socket.emit('update player', Global.player.properties());
        }
    }
};
