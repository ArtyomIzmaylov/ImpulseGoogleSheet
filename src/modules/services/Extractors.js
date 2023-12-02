"use strict";
exports.__esModule = true;
exports.MessageForTildaExtractor = exports.MessageForEgeExtractor = exports.ManagerExtractor = exports.StudentExtractor = void 0;
var StudentExtractor = /** @class */ (function () {
    function StudentExtractor(student) {
        this.student = student;
    }
    StudentExtractor.prototype.extract = function () {
        return this.student;
    };
    return StudentExtractor;
}());
exports.StudentExtractor = StudentExtractor;
var ManagerExtractor = /** @class */ (function () {
    function ManagerExtractor(studentExtractor, manager) {
        this.studentExtractor = studentExtractor;
        this.manager = manager;
    }
    ManagerExtractor.prototype.extract = function () {
        return {
            student: this.studentExtractor.extract(),
            manager: this.manager
        };
    };
    return ManagerExtractor;
}());
exports.ManagerExtractor = ManagerExtractor;
var MessageForEgeExtractor = /** @class */ (function () {
    function MessageForEgeExtractor(managerExtractor) {
        this.managerExtractor = managerExtractor;
    }
    MessageForEgeExtractor.prototype.extract = function () {
        var studentStatus = this.managerExtractor.extract().student.status;
        var message = '';
        switch (studentStatus) {
            case "1-й недозвон":
                message = this.buildFirstNonAnsweredCallMessage();
                break;
            case "Дозвон.НаУрок":
                message = this.buildLessonCallMessage();
                break;
            case "Дозвон.БезУрока":
                message = this.buildNoLessonCallMessage();
                break;
            default:
                // handle other cases or set a default message
                break;
        }
        return { message: message };
    };
    MessageForEgeExtractor.prototype.buildFirstNonAnsweredCallMessage = function () {
        var _a = this.managerExtractor.extract(), student = _a.student, manager = _a.manager;
        return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(student.name, "! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u043F\u0440\u043E\u0431\u043D\u043E\u0433\u043E \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(manager.phone, "\n\u0425\u043E\u0440\u043E\u0448\u043E?)");
    };
    MessageForEgeExtractor.prototype.buildLessonCallMessage = function () {
        var student = this.managerExtractor.extract().student;
        return "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442, ".concat(student.name, "! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0412 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F \u0442\u0435\u0431\u0435 \u043F\u043E\u0437\u0432\u043E\u043D\u044F\u0442 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F, \u0431\u0443\u0434\u044C \u043D\u0430 \u0441\u0432\u044F\u0437\u0438)\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A\n\u041F\u043E\u0434\u0441\u043A\u0430\u0436\u0438, \u043C\u043E\u0436\u0435\u0442 \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u043A\u0430\u043A\u0438\u0435-\u0442\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u044B?");
    };
    MessageForEgeExtractor.prototype.buildNoLessonCallMessage = function () {
        return "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0415\u0441\u043B\u0438 \u0432\u0434\u0440\u0443\u0433 \u043D\u0430\u0434\u0443\u043C\u0430\u0435\u0448\u044C \u043F\u0440\u043E\u0439\u0442\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0438 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0442\u0435\u043C\u0443 \u0438\u0437 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430 (\u043F\u043E \u043B\u044E\u0431\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443) \u2013 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0438 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0441\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435:\n https://impulsschool.ru/\n\u041C\u044B \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0442\u0435\u0431\u0435 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0430!\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A\n\u041F\u043E\u0434\u0441\u043A\u0430\u0436\u0438, \u043C\u043E\u0436\u0435\u0442 \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u043A\u0430\u043A\u0438\u0435-\u0442\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u044B?";
    };
    return MessageForEgeExtractor;
}());
exports.MessageForEgeExtractor = MessageForEgeExtractor;
var MessageForTildaExtractor = /** @class */ (function () {
    function MessageForTildaExtractor(managerExtractor) {
        this.managerExtractor = managerExtractor;
    }
    MessageForTildaExtractor.prototype.extract = function () {
        var studentStatus = this.managerExtractor.extract().student.status;
        var message = '';
        switch (studentStatus) {
            case "Ожидаем отета. 1 День":
                message = this.buildWaitingForResponseMessage();
                break;
            case "Проведено":
                message = this.buildLessonDoneMessage();
                break;
            case "Запись":
                message = this.buildDefaultMessage();
                break;
            default:
                break;
        }
        return { message: message };
    };
    MessageForTildaExtractor.prototype.buildWaitingForResponseMessage = function () {
        var manager = this.managerExtractor.extract().manager;
        return "\u041F\u0440\u0438\u0432\u0435\u0442! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(manager.phone, "\n\u0425\u043E\u0440\u043E\u0448\u043E?)");
    };
    MessageForTildaExtractor.prototype.buildLessonDoneMessage = function () {
        return "\u041F\u0440\u0438\u0432\u0435\u0442! \u041E\u0447\u0435\u043D\u044C \u043D\u0430\u0434\u0435\u0435\u043C\u0441\u044F, \u0447\u0442\u043E \u0432\u0430\u043C \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C \u0437\u0430\u043D\u044F\u0442\u0438\u0435. \u0411\u0443\u0434\u0435\u043C \u043E\u0447\u0435\u043D\u044C \u0440\u0430\u0434\u044B, \u0435\u0441\u043B\u0438 \u0432\u044B \u0432 \u043E\u0442\u0432\u0435\u0442\u043D\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043E\u0446\u0435\u043D\u0438\u0442\u0435 \u0443\u0440\u043E\u043A \u043E\u0442 1 \u0434\u043E 10, \u0433\u0434\u0435 10 \u2013 \u044D\u0442\u043E \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u043A\u0440\u0443\u0442\u043E)";
    };
    MessageForTildaExtractor.prototype.buildDefaultMessage = function () {
        //const { student, manager } = this.managerExtractor.extract();
        var student = this.managerExtractor.extract().student;
        var manager = this.managerExtractor.extract().manager;
        return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(student.name, "! \u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0442\u0435\u0431\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u0442 ").concat(student.time, ". \u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0430 :)\n\u0418\u043C\u044F \u0442\u0432\u043E\u0435\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(manager.phone, "\n\u0414\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0448\u0438 \u043C\u043D\u0435 \u0447\u0442\u043E-\u0443\u0433\u043E\u0434\u043D\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u043D\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438)");
    };
    return MessageForTildaExtractor;
}());
exports.MessageForTildaExtractor = MessageForTildaExtractor;
