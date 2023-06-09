import MarvelBase from "./marvelBase.interface";

interface thumbnail {
    extension: string
    path: string;
}

interface Character {
    _id?;
    descripcion: string,
    id: number,
    modified: Date,
    name: string,
    resourceUri:string;
    thumbnail:thumbnail
}

export default interface Characters extends MarvelBase {
    results: Character[]
}

export { Character }