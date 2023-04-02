import express from "express";
import HeroesController from "../controllers/heroes/heroes.controller";
import { log } from "console-log-colors";
export default class HeroesRoutes {
    public path = "/heroes"
    public router = express.Router();
    public controller = new HeroesController;
    constructor() {
        
        this.router.get(`${this.path}`,this.controller.get);
        this.router.get(`${this.path}/test`,this.controller.get)

    }
}