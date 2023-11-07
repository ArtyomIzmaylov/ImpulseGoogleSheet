"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageExtractor = exports.ManagerExtractor = exports.StudentExtractor = void 0;
class StudentExtractor {
    extract() {
        let studentObj = {
            name: 'Egorka',
            phone: '8914459714',
            manager: 'Manager1',
            status: '1-й недозвон'
        };
        return studentObj;
    }
}
exports.StudentExtractor = StudentExtractor;
class ManagerExtractor {
    constructor(studentExtractor, manager) {
        this.studentExtractor = studentExtractor;
        this.manager = manager;
    }
    extract() {
        return {
            student: this.studentExtractor.extract(),
            manager: this.manager
        };
    }
}
exports.ManagerExtractor = ManagerExtractor;
class MessageExtractor {
    constructor(managerExtractor, statusHandler) {
        this.managerExtractor = managerExtractor;
        this.statusHandler = statusHandler;
    }
    extract() {
        return { message: this.statusHandler.generateMessage(this.managerExtractor.extract()) };
    }
}
exports.MessageExtractor = MessageExtractor;
//# sourceMappingURL=extractors.js.map