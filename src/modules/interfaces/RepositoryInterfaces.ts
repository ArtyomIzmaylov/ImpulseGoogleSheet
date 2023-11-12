import {ManagerInterface} from "./EntityInterfaces";

export interface ManagerRepositoryInterface {
    //init : GoogleTableObject
    getByNick(tgNick : string) : ManagerInterface
}
