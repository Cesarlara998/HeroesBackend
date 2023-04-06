import express from "express";
import HeroesController from "../controllers/heroes.controller";
export default class HeroesRoutes {
    public path = "/heroes"
    public router = express.Router();
    public controller = new HeroesController;
    constructor() {
        
        this.router.get(`${this.path}`,this.controller.get);

    }
}