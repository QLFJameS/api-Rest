import { STRING, TEXT } from "sequelize";
import { sequelize } from "../database.js";
import { Game } from "./Game.js";
export const Status = sequelize.define("Status", {
    name: {
        type: STRING(100),
        validate: {
            notNull: false
        }
    },
    description: TEXT('tiny')
});
Status.hasMany(Game);
Game.hasOne(Status);
