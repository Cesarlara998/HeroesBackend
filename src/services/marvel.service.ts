import axios from "axios";
import { URL_MARVEL,PUBLIC_KEY,PRIVATE_KEY } from "../config/config";
import Characters from "../interfaces/Characters.interface";
const crypto = require('crypto');

export default class MarvelService {
    constructor(){}

    public async getCharacters():Promise<Characters> {
        return (await axios(`${URL_MARVEL}/v1/public/characters?${this.GenerateHash()}`)).data.data
    }

    private GenerateHash()  {
        const timestamp = Date.now().toString();
        const hash = crypto.createHash('md5').update(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).digest('hex');
        return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`
    }
    
}