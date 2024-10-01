import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { Router } from "express";
import { Game } from "./Game.js";

export const StatusRoute = Router();
export const Status = sequelize.define("Status", {
  name: {
    type: DataTypes.STRING(100),
    validate: {
      notNull: false
    }
  },
  description: {
    type : DataTypes.STRING(500),
    validate: {
      notNull: false
    }
  }
});

StatusRoute.post('/new', async (req, res) => {
  try {
    const status = [
      {
        name: "In Development",
        description: "The game is currently in development, and new features are being implemented."
      },
      {
        name: "Alpha",
        description: "The game is in the Alpha stage, where core features are being tested and bugs are being fixed."
      },
      {
        name: "Beta",
        description: "The game is in the Beta stage, where it is feature-complete and undergoing final testing."
      },
      {
        name: "Demo",
        description: "A demo version of the game is available, showcasing a limited part of the full game."
      },
      {
        name: "Released",
        description: "The game has been officially released and is available to the public."
      }
    ];

    // Insérer les genres en utilisant bulkCreate
    await Status.bulkCreate(status);
    res.status(201).json({ message: 'Status créés avec succès !' });

  } catch (error) {
    console.error('Erreur lors de l\'insertion des status :', error);
    res.status(500).json({ error: 'Erreur lors de l\'insertion des status' });
  }
});

StatusRoute.get('/games/:StatusId', async (req, res) => {
  const { StatusId } = req.params;

  try {
      // Vérifier si le langage existe
      const status = await Status.findByPk(StatusId);

      if (!status) {
          return res.status(404).json({ error: 'Langue non trouvée' });
      }

      // Récupérer les jeux associés au langage
      const games = await Game.findAll({
          where: { StatusId: StatusId }
      });

      if (games.length === 0) {
          return res.status(404).json({ message: 'Aucun jeu trouvé pour ce Status' });
      }

      res.status(200).json(games);
  } catch (error) {
      console.error('Erreur lors de la récupération des jeux selon le status :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
});