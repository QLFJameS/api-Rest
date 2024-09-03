import { STRING, TEXT } from "sequelize";
import { sequelize } from "../database.js";
import { Game } from "./Game.js";
import { Router } from "express";

export const ControllerRoute = Router();
export const Controller = sequelize.define("Controller", {

    name : {
        type : STRING(100),
        validate : {
            notEmpty : true
        }
    },
    description : {
        type : TEXT('tiny'),
    } 
});

Game.belongsToMany(Controller, { through: "GameController" });
Controller.belongsToMany(Game, { through: "GameController" });



ControllerRoute.post('/new', async (req, res) => {
try {
const controllers = [
    {
        name: "Xbox",
        description: "The game is compatible with Xbox controllers."
      },
      {
        name: "Kinect",
        description: "The game supports Kinect motion sensing technology."
      },
      {
        name: "PlayStation",
        description: "The game is compatible with PlayStation controllers."
      },
      {
        name: "Wiimote",
        description: "The game supports the Wiimote motion controller from the Wii console."
      },
      {
        name: "Smartphone",
        description: "The game can be controlled via a smartphone."
      },
      {
        name: "Touchscreen",
        description: "The game is designed to be played using touchscreen controls."
      },
      {
        name: "Voice Control",
        description: "The game supports voice commands for control."
      },
      {
        name: "Joy-Con",
        description: "The game is compatible with Nintendo Switch Joy-Con controllers."
      },
      {
        name: "VR",
        description: "The game is designed for Virtual Reality (VR) headsets and controllers."
      }
];

 // Insérer les genres en utilisant bulkCreate
 await Controller.bulkCreate(controllers);
 res.status(201).json({ message: 'Controllers créés avec succès !' });

} catch (error) {
 console.error('Erreur lors de l\'insertion des Controllers :', error);
 res.status(500).json({ error: 'Erreur lors de l\'insertion des Controllers' });
}

});