import { Character } from "./characters.interface";

export default interface team {
    name: string,
    description: string,
    ip_owner?: string,
    _id? : string,
    members?: Character[]
}