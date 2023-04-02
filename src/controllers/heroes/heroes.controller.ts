import { Request, Response, NextFunction } from "express";
import MarvelService from "../../services/marvel.service";
import HeroeDataSource from "../../datasource/heroe.datasource";
import { Character } from "../../interfaces/Characters.interface";

export default class HeroesController {
    private readonly marvelService: MarvelService;
    private readonly heroeDataSource:HeroeDataSource
    constructor() {
        this.marvelService= new MarvelService();
        this.heroeDataSource = new HeroeDataSource();
    }
    public get = async (request: Request, response: Response,next: NextFunction) => {
        try {
            const heroesCollection:Character[] = [];
            const data = await this.marvelService.getCharacters();
            for (let character of data.results) {
                heroesCollection.push(this.heroeDataSource.CreateOrUpdate(character))
            }

        } catch (error) {
            return  response.status(500).send('Error');

        }
    }

    // 


}