"use strict";
exports.__esModule = true;
exports.ManagerRepository = void 0;
var ManagerRepository = /** @class */ (function () {
    function ManagerRepository(managers) {
        this.managers = managers;
    }
    ManagerRepository.prototype.getByNick = function (tgNick) {
        var manager = this.managers.find(function (manager) { return manager.tgNick === tgNick; });
        if (manager === undefined || manager === null) {
            return { name: 'UNDEFINED', tgNick: '@UNDEFINED', phone: 'UNDEFINED' };
        }
        return manager;
    };
    return ManagerRepository;
}());
exports.ManagerRepository = ManagerRepository;
