import express from "express";
import HeroesController from "../controllers/teams.controller";
import { log } from "console-log-colors";
export default class TeamsRoutes {
    public path = "/teams"
    public router = express.Router();
    public controller = new HeroesController;
    constructor() {
        this.router.get(`${this.path}`,this.controller.get);
        this.router.post(`${this.path}`,this.controller.post);

    }
}