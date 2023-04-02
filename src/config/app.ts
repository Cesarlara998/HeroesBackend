import { Application } from 'express';
import express from "express"
import HeroesRoutes from "../routes/heroes.routes";
import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';
var cors = require('cors')
export default class app {
  public app: Application;
  public port: number;
  public prefix: string;
  constructor(routers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.prefix = "/api";
    this.app.use(cors());
    if (routers) this.initRouter(routers);
  }

  private initRouter(routers: any[]) {

    routers.forEach((route) => {
      this.app.use("/api", route.router);      
      route.router.stack.forEach((layer) => {
        if (layer.route) {    
          const methods = Object.keys(layer.route.methods).map((method) => {
            return method.toUpperCase();
          });
          console.log(`[${red(methods.join(", "))}] - ${layer.route.path}`);
        }
      });

    });
  }

  public init() {
    try {

      this.app.listen(this.port, () => {
        console.log(`Server Ready on port ${cyanBright(this.port)}`);
      })
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

  }

}


