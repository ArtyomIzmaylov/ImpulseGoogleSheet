import {ManagerInterface, ManagerRepositoryInterface} from "./interface";
import {ManagerExtractor} from "./extractors";

export class ManagerRepository implements ManagerRepositoryInterface{
    private managers : ManagerInterface[];
    constructor(managers : ManagerInterface[]) {
        this.managers = managers
    }
    getByNick(tgNick : string): ManagerInterface{
        let manager= this.managers.find(manager => manager.tgNick === tgNick)
        if (manager === undefined || manager === null) {
            return {name: 'UNDEFINED', tgNick: '@UNDEFINED', phone:  'UNDEFINED'}
        }
        return manager;
    }

}


