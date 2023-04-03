import app from "./config/app";
import { config } from "dotenv";
config();
import "reflect-metadata"
import HeroesRoutes from "./routes/heroes.routes";
import { PORT } from "./config/config";
import Database from "./config/database";
import TeamsRoutes from "./routes/teams.routes";

if (typeof Number(PORT) !== "number") throw new Error('PORT NOT NUMBER')


async function init() {
    const mongoDB = new Database();
    // APP
    await mongoDB.mongooseDB()
        .then(() => {
            const application = new app([new HeroesRoutes,new TeamsRoutes],Number(PORT));
            application.init()        
        }).catch((error) => {
            console.warn(error)
        })
    // 
}

init();
