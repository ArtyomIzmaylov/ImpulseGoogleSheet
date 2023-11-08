var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//EXTRACTORS
var StudentExtractor = /** @class */ (function () {
    function StudentExtractor(student) {
        this.student = student;
    }
    StudentExtractor.prototype.extract = function () {
        return this.student;
    };
    return StudentExtractor;
}());
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
var MessageExtractor = /** @class */ (function () {
    function MessageExtractor(managerExtractor) {
        this.managerExtractor = managerExtractor;
    }
    MessageExtractor.prototype.extract = function () {
        var message;
        switch (this.managerExtractor.extract().student.status) {
            case 'Запись на занятие':
                message = "\u041F\u0440\u0438\u0432\u0435\u0442! \u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0442\u0435\u0431\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u0442 ".concat(this.managerExtractor.extract().student.status, ". \u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0430 :)\n\u0418\u043C\u044F \u0442\u0432\u043E\u0435\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
                break;
            case "Новая заявка(тильда, без родителя)":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0438 \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u00AB\u0418\u043C\u043F\u0443\u043B\u044C\u0441\u00BB) \u0412\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043D\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0432\u0432\u043E\u0434\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0441 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043E\u043C. \n\u0412 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0412\u0430\u043C \u043D\u0430\u0431\u0435\u0440\u0435\u0442 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440, \u0431\u0443\u0434\u044C\u0442\u0435 \u043D\u0430 \u0441\u0432\u044F\u0437\u0438!\n\u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F\uD83D\uDE0A";
                break;
            case "Новая заявка(пробник)":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439! \u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u0448\u043A\u043E\u043B\u0443 \u00AB\u0418\u043C\u043F\u0443\u043B\u044C\u0441\u00BB. \u0412\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043D\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0431\u043D\u044B\u0439 \u044D\u043A\u0437\u0430\u043C\u0435\u043D \u043F\u043E \u0440\u0443\u0441\u0441\u043A\u043E\u043C\u0443 \u044F\u0437\u044B\u043A\u0443. \u0412 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 1-2 \u0434\u043D\u0435\u0439 \u0412\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0438 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u043F\u0440\u043E \u043D\u0435\u0433\u043E \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u0442.\n\u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A";
                break;
            case "1-й недозвон":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u043F\u0440\u043E\u0431\u043D\u043E\u0433\u043E \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
                break;
            case "2-й недозвон":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u0430\u043C \u0442\u0430\u043A \u0438 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E \u0432\u0430\u0441 \u0434\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C\u0441\u044F. \u0415\u0441\u043B\u0438 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0439\u0442\u0438 \u043F\u0440\u043E\u0431\u043D\u044B\u0439 \u044D\u043A\u0437\u0430\u043C\u0435\u043D, \u0442\u043E \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0432\u043E\u0435\u043C\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
                break;
            case "Дозвон.НаУрок":
                message = "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0412 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u044F\u0442 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F, \u0431\u0443\u0434\u044C\u0442\u0435 \u043D\u0430 \u0441\u0432\u044F\u0437\u0438)\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A";
                break;
            case "Дозвон.БезУрока":
                message = "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0415\u0441\u043B\u0438 \u0432\u0434\u0440\u0443\u0433 \u0440\u0435\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0439\u0442\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0438 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0442\u0435\u043C\u0443 \u0438\u0437 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430 (\u043F\u043E \u043B\u044E\u0431\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443) \u2013 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0438 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435: https://impulsschool.ru/\n\u041C\u044B \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0432\u0430\u043C \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0430!\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A";
                break;
            case "Ожидаем отета. 1 День":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
                break;
            case "Ожидаем отета. 2 День":
                message = "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0412\u0430\u043C \u0441\u043D\u043E\u0432\u0430 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C\u0441\u044F \u0434\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
                break;
            case "Проведено":
                message = "\u041F\u0440\u0438\u0432\u0435\u0442! \u041E\u0447\u0435\u043D\u044C \u043D\u0430\u0434\u0435\u0435\u043C\u0441\u044F, \u0447\u0442\u043E \u0432\u0430\u043C \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C \u0437\u0430\u043D\u044F\u0442\u0438\u0435. \u0411\u0443\u0434\u0435\u043C \u043E\u0447\u0435\u043D\u044C \u0440\u0430\u0434\u044B, \u0435\u0441\u043B\u0438 \u0432\u044B \u0432 \u043E\u0442\u0432\u0435\u0442\u043D\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043E\u0446\u0435\u043D\u0438\u0442\u0435 \u0443\u0440\u043E\u043A \u043E\u0442 1 \u0434\u043E 10, \u0433\u0434\u0435 10 \u2013 \u044D\u0442\u043E \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u043A\u0440\u0443\u0442\u043E)";
                break;
            default:
                message = "\u041F\u0440\u0438\u0432\u0435\u0442! \u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0442\u0435\u0431\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u0442 ".concat(this.managerExtractor.extract().student.status, ". \u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0430 :)\n\u0418\u043C\u044F \u0442\u0432\u043E\u0435\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(this.managerExtractor.extract().manager.name, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.managerExtractor.extract().manager.phone);
        }
        return { message: message };
    };
    return MessageExtractor;
}());
//MANAGERS
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
//CONFIG_TG
var TelegramMessengerConfig = /** @class */ (function () {
    function TelegramMessengerConfig(token, messageExtractor, studentExtractor) {
        this.apiUrl = "https://api.telegram.org/bot".concat(token, "/sendMessage");
        this.messageExtractor = messageExtractor;
        this.studentExtractor = studentExtractor;
    }
    TelegramMessengerConfig.prototype.getApiUrl = function () {
        return this.apiUrl;
    };
    TelegramMessengerConfig.prototype.createMessage = function () {
        var payload = {
            chat_id: this.studentExtractor.extract().phone,
            text: this.messageExtractor.extract().message
        };
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify(payload)
        };
    };
    return TelegramMessengerConfig;
}());
//MESSENGER
var TelegramMessenger = /** @class */ (function () {
    function TelegramMessenger(telegramMessengerConfig) {
        this.telegramMessengerConfig = telegramMessengerConfig;
    }
    TelegramMessenger.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var messageConfig, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageConfig = this.telegramMessengerConfig.createMessage();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.telegramMessengerConfig.getApiUrl(), messageConfig)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        // Обработка ответа от Telegram API, если необходимо
                        console.log(data);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        // Обработка ошибок при отправке сообщения
                        console.error('Произошла ошибка при отправке сообщения:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TelegramMessenger.prototype.sendSync = function () {
        var messageConfig = this.telegramMessengerConfig.createMessage();
        var response = UrlFetchApp.fetch(this.telegramMessengerConfig.getApiUrl(), messageConfig);
    };
    return TelegramMessenger;
}());
function mainTaskTilda(inputDataManagersFromTilda, inputDataStudentFromTilda, botToken, inputDataStudentFromTildaStatus) {
    //НАМ ПРИЛЕТАЕТ МАССИВ ДАННЫХ ТАКИХ
    /*    inputDataManagersFromTilda = [
            ["Маргарита Голованова", '89141516', "Маргарита"],
            ["Дарья Дмитриева", '89141516', "Дарья Дмитриева"],
            ["Джульетта", '89141516', "Julietta"],
            ["Арина Смолякова", '89141516', "Арина Смолякова"],
            ["Тамара Соловьева", '89141516', "Тамара Соловьева"],
            ["", '89141516', "Arthur Arakelyan 🇦🇲"],
            ["", "", ""]
        ];*/
    var managersFromTilda = inputDataManagersFromTilda.map(function (item) {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        };
    });
    //НАМ ПРИЛЕТАЮТ ДАННЫЕ СТУДЕНТА
    /*
        const inputDataStudentFromTilda = ["Соня Ученица", "П3 – Пробники", "", "926411775", "МЕНЕДЖЕР Асмик Гукасян", "Проведено"]
    */
    var studentFromTilda = {
        name: inputDataStudentFromTilda[1],
        phone: inputDataStudentFromTilda[4],
        manager: inputDataStudentFromTilda[5],
        status: inputDataStudentFromTildaStatus
    };
    new TelegramMessenger(new TelegramMessengerConfig(botToken, new MessageExtractor(new ManagerExtractor(new StudentExtractor(studentFromTilda), new ManagerRepository(managersFromTilda).getByNick(new StudentExtractor(studentFromTilda).extract().manager))), new StudentExtractor(studentFromTilda))).sendSync();
}
