import express from "express";
import TeamController from "../controllers/teams.controller";
export default class TeamsRoutes {
    public path = "/teams"
    public router = express.Router();
    public controller = new TeamController;
    constructor() {
        this.router.get(`${this.path}`,this.controller.get);
        this.router.post(`${this.path}`,this.controller.post);
        this.router.put(`${this.path}`,this.controller.put);
        this.router.delete(`${this.path}`,this.controller.delete);

    }
}