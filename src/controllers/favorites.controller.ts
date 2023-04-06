import FavoritesDataSource from "../datasource/favorites.datasource";
import HeroeDataSource from "../datasource/heroe.datasource";
import { Request, Response, NextFunction } from "express";
import Paginator from "../interfaces/paginator.interface";
import MarvelService from "../services/marvel.service";
import { Character } from "../interfaces/characters.interface";

export default class FavoritesController {
    private readonly heroeDatasource: HeroeDataSource;
    private readonly favoritesDataSource:FavoritesDataSource;
    private readonly marvelService: MarvelService;

    constructor() {
        this.heroeDatasource = new HeroeDataSource();
        this.favoritesDataSource = new FavoritesDataSource();
        this.marvelService = new MarvelService();

    }

    public addFavorite = async (request: Request, response: Response, next: NextFunction): Promise<Response<any> | Response<any, Record<string, any>>> => {
        try {
            if (!request.body.character)  return response.status(500).send('Character is required');
            let heroe = await this.heroeDatasource.FindById(request.body.character);
            if (!heroe) {
                const petition = await this.marvelService.findCharacter(request.body.character)
                for (let character of petition.results) {
                    heroe = await this.heroeDatasource.CreateOrUpdate(character);
                }
            }
            const favorite = await this.favoritesDataSource.InsertFavorite(heroe._id,request.socket.remoteAddress);
            return response.send(favorite);
        } catch (error) {
            if (error === "Heroe ya existente como favorito") return response.status(500).send('Heroe ya existente como favorito');
            if (error.response?.data?.code === "ResourceNotFound") return response.status(500).send('Heroe no existente');
            
            return response.status(500).send('Error');
        }
    }

    public getFavorite = async (request: Request, response: Response, next: NextFunction): Promise<Response<any> | Response<any, Record<string, any>>> => {
        try {
            return response.send( await this.favoritesDataSource.GetFavorite(request.socket.remoteAddress));

        } catch (error) {
            return response.status(500).send('Error');

        }
    }

    public deleteFavorite = async (request: Request, response: Response, next: NextFunction): Promise<Response<any> | Response<any, Record<string, any>>> => {
        try {
            if (!request.query.id) {
                return response.status(500).send('Hero is required');
            }
            let heroe = await this.heroeDatasource.FindById(String(request.query.id));
            if (!heroe) {
                const petition = await this.marvelService.findCharacter(Number(request.query.id))
                for (let character of petition.results) {
                    heroe = await this.heroeDatasource.CreateOrUpdate(character);
                }
            }
            return response.send( await this.favoritesDataSource.DeleteFavorite(heroe._id,request.socket.remoteAddress));

        } catch (error) {
            
            return response.status(500).send('Error');

        }
    }
}