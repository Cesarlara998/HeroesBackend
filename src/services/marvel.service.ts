import axios from "axios";
import { URL_MARVEL,PUBLIC_KEY,PRIVATE_KEY } from "../config/config";
import Characters from "../interfaces/characters.interface";
const crypto = require('crypto');

export default class MarvelService {
    constructor(){}
    public async findCharacter(id:number): Promise<Characters> {
        return (await axios(`${URL_MARVEL}/v1/public/characters/${id}?${this.GenerateHash()}`)).data.data
    }

    public async getCharacters(offset):Promise<Characters> {
        offset = offset-20;
        return (await axios(`${URL_MARVEL}/v1/public/characters?${this.GenerateHash()}&offset=${offset}`)).data.data
    }

    public async SearchCharacters(search,offset):Promise<Characters> {
        offset = offset -20;        
        return (await axios(`${URL_MARVEL}/v1/public/characters?${this.GenerateHash()}&nameStartsWith=${search}&offset=${offset}`)).data.data
    }

    private GenerateHash()  {
        const timestamp = Date.now().toString();
        const hash = crypto.createHash('md5').update(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).digest('hex');
        return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`
    }
    
}