import { DataTypes, INTEGER, NUMBER, STRING } from "sequelize";
import { sequelize } from "../database.js";
import { User } from "./User.js";

export const Role = sequelize.define("Role", {

    name : {
        type : STRING(100),
        validate : {
            notNull : true
        }
    },
    description : STRING(255)
});

User.hasOne(Role);
Role.hasMany(User)