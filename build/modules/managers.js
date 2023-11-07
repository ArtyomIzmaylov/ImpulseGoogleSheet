"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRepository = void 0;
class ManagerRepository {
    constructor() {
        this.managers = [
            { name: 'ManagerAsmik', tgNick: '@asmikguak', phone: '89144597147' },
            { name: 'ManagerAndrey', tgNick: '@andruha', phone: '89143141592' },
            { name: 'ManagerDmitriy', tgNick: '@dimas', phone: '31415926535' },
        ];
    }
    getByNick(tgNick) {
        let manager = this.managers.find(manager => manager.tgNick === tgNick);
        if (manager === undefined || manager === null) {
            return { name: 'UNDEFINED', tgNick: '@UNDEFINED', phone: 'UNDEFINED' };
        }
        return manager;
    }
}
exports.ManagerRepository = ManagerRepository;
//# sourceMappingURL=managers.js.map