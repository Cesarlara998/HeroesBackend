import { MONGO_URI } from "./config";
import { connect } from "mongoose";

export default class Database {
  public db: any;

  async mongooseDB() {
    console.log("Connecting to mongodb...");
    console.log(MONGO_URI);
    
    return await connect(MONGO_URI)
      .then(() => {
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connect to MongoDB");
        throw new Error(err);
      });
  }
}