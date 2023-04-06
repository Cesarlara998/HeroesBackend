import express from "express";
import FavoritesController from "../controllers/favorites.controller";

export default class FavoritesRoutes {
    public path = "/favorites"
    public router = express.Router();
    public controller = new FavoritesController;
    constructor() {
        
        this.router.post(`${this.path}`,this.controller.addFavorite);
        this.router.get(`${this.path}`,this.controller.getFavorite);
        this.router.delete(`${this.path}`,this.controller.deleteFavorite);

    }
}