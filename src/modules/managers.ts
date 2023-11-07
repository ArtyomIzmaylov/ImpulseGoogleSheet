import {ManagerInterface, ManagerRepositoryInterface} from "./interface";

export class ManagerRepository implements ManagerRepositoryInterface{
    private managers : ManagerInterface[];
    constructor() {
        //ЭТО MOCK MANAGERS
        this.managers = [
            {name : 'ManagerAsmik', tgNick: '@asmikguak', phone: '89144597147'},
            {name : 'ManagerAndrey', tgNick: '@andruha', phone: '89143141592'},
            {name: 'ManagerDmitriy', tgNick: '@dimas', phone:  '31415926535'},
        ]
    }
    getByNick(tgNick : string): ManagerInterface{
        let manager= this.managers.find(manager => manager.tgNick === tgNick)
        if (manager === undefined || manager === null) {
            return {name: 'UNDEFINED', tgNick: '@UNDEFINED', phone:  'UNDEFINED'}
        }
        return manager;
    }

}


