import { Request, Response, NextFunction } from "express";
import MarvelService from "../../services/marvel.service";
import HeroeDataSource from "../../datasource/heroe.datasource";
import { Character } from "../../interfaces/characters.interface";
import Petition from "../../schemas/MarvelService.schema";
import Paginator from "../../interfaces/paginator.interface";

interface ContextPaginator extends Paginator {
    data: Character[];
}

export default class HeroesController {
    private readonly marvelService: MarvelService;
    private readonly heroeDataSource: HeroeDataSource;
    constructor() {
        this.marvelService = new MarvelService();
        this.heroeDataSource = new HeroeDataSource();

    }
    public get = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {
            const actualPage = Number(request.query.page) || 0
            const search = request.query.busqueda;
            const heroesCollection: Character[] = [];
            if (search) {
                const data = await this.marvelService.SearchCharacters(search,actualPage * 20);
                for (let character of data.results) {
                    heroesCollection.push(await this.heroeDataSource.CreateOrUpdate(character))
                }
                await this.heroeDataSource.CollectionCreate(heroesCollection.map(obj => obj._id), 'search');
                const paginator: ContextPaginator = { data: data.results, totalPages: Math.ceil(data.total / 20), page: actualPage }

                return response.json(paginator)
            }



            const data = await this.marvelService.getCharacters(actualPage * 20);
            for (let character of data.results) {
                heroesCollection.push(await this.heroeDataSource.CreateOrUpdate(character))
            }
            await this.heroeDataSource.CollectionCreate(heroesCollection.map(obj => obj._id), 'get');
            const paginator: ContextPaginator = { data: data.results, totalPages: Math.ceil(data.total / 20), page: actualPage }

            return response.json(paginator)
        } catch (error) {
            console.log(error);

            return response.status(500).send('Error');

        }
    }


}