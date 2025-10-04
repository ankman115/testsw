import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

    maxClients = 8;

    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("updatePosition", (client, data) => {
            console.log("update received -> ");
            console.debug(JSON.stringify(data));
            const player = this.state.players.get(client.sessionId);
            player.x = data["x"];
            player.y = data['y'];
            player.z = data["z"];

            player.xchar = data["xchar"];
            player.ychar = data['ychar'];
            player.zchar = data["zchar"];

   
        });
    }

    onJoin(client: Client, options: any) {
        // Randomize player position on initializing.
        const newPlayer = new Player();

        this.state.players.set(client.sessionId, newPlayer);
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
