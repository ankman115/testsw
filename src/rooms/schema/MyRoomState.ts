import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {

  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;


  @type("number") xchar: number;
  @type("number") ychar: number;
  @type("number") zchar: number;
}

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
