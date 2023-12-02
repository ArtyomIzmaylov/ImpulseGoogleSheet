"use strict";
exports.__esModule = true;
exports.StatusMessageBuilderTilda = exports.TelegramRequestBuilder = exports.WhatsAppRequestBuilder = void 0;
var CryptoService_1 = require("./CryptoService");
var WhatsAppRequestBuilder = /** @class */ (function () {
    function WhatsAppRequestBuilder(messageExtractor, studentExtractor, channelId) {
        this.messageExtractor = messageExtractor;
        this.studentExtractor = studentExtractor;
        this.channelId = channelId;
    }
    WhatsAppRequestBuilder.prototype.build = function () {
        return {
            channelId: this.channelId,
            chatId: this.studentExtractor.extract().phone,
            chatType: "whatsapp",
            text: this.messageExtractor.extract().message
        };
    };
    return WhatsAppRequestBuilder;
}());
exports.WhatsAppRequestBuilder = WhatsAppRequestBuilder;
var TelegramRequestBuilder = /** @class */ (function () {
    function TelegramRequestBuilder(messageExtractor, studentExtractor) {
        this.messageExtractor = messageExtractor;
        this.studentExtractor = studentExtractor;
    }
    TelegramRequestBuilder.prototype.build = function () {
        return {
            message: this.messageExtractor.extract().message,
            phone: this.studentExtractor.extract().phone,
            hmacMessage: (0, CryptoService_1.calculateHMAC)(this.messageExtractor.extract().message, CryptoService_1.secretKet),
            hmacPhone: (0, CryptoService_1.calculateHMAC)(this.studentExtractor.extract().phone, CryptoService_1.secretKet)
        };
    };
    return TelegramRequestBuilder;
}());
exports.TelegramRequestBuilder = TelegramRequestBuilder;
var StatusMessageBuilderTilda = /** @class */ (function () {
    function StatusMessageBuilderTilda(managerExtractor) {
        this.managerExtractor = managerExtractor;
    }
    StatusMessageBuilderTilda.prototype.build = function () {
        var status = this.managerExtractor.extract().student.status;
        switch (status) {
            case "1-й недозвон":
                return this.buildFirstNonAnsweredCallMessage();
            case "Дозвон.НаУрок":
                return this.buildLessonCallMessage();
            case "Дозвон.БезУрока":
                return this.buildNoLessonCallMessage();
            case "Ожидаем отета. 1 День":
                return this.buildWaitingForResponseMessage();
            case "Проведено":
                return this.buildLessonDoneMessage();
            default:
                return this.buildDefaultMessage();
        }
    };
    StatusMessageBuilderTilda.prototype.buildFirstNonAnsweredCallMessage = function () {
        var studentName = this.managerExtractor.extract().student.name;
        var managerName = this.managerExtractor.extract().manager.name;
        var managerPhone = this.managerExtractor.extract().manager.phone;
        return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(studentName, "! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u043F\u0440\u043E\u0431\u043D\u043E\u0433\u043E \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(managerName, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(managerPhone, "\n\u0425\u043E\u0440\u043E\u0448\u043E?)");
    };
    StatusMessageBuilderTilda.prototype.buildLessonCallMessage = function () {
        var studentName = this.managerExtractor.extract().student.name;
        return "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442, ".concat(studentName, "! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0412 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F \u0442\u0435\u0431\u0435 \u043F\u043E\u0437\u0432\u043E\u043D\u044F\u0442 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F, \u0431\u0443\u0434\u044C \u043D\u0430 \u0441\u0432\u044F\u0437\u0438)\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A\n\u041F\u043E\u0434\u0441\u043A\u0430\u0436\u0438, \u043C\u043E\u0436\u0435\u0442 \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u043A\u0430\u043A\u0438\u0435-\u0442\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u044B?");
    };
    StatusMessageBuilderTilda.prototype.buildNoLessonCallMessage = function () {
        return "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u0438\u0432\u0435\u0442! \u042D\u0442\u043E \u0431\u043E\u0442 \u0418\u043C\u043F\u0443\u043B\u044C\u0441\u0430:)\n\u041B\u043E\u0432\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044E \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0430: https://clck.ru/36JSkc\n\n\u0415\u0441\u043B\u0438 \u0432\u0434\u0440\u0443\u0433 \u043D\u0430\u0434\u0443\u043C\u0430\u0435\u0448\u044C \u043F\u0440\u043E\u0439\u0442\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0438 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0442\u0435\u043C\u0443 \u0438\u0437 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430 (\u043F\u043E \u043B\u044E\u0431\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443) \u2013 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0438 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0441\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435:\n https://impulsschool.ru/\n\u041C\u044B \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0442\u0435\u0431\u0435 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0430!\n\u0423\u0434\u0430\u0447\u0438 \u043D\u0430 \u043F\u0440\u043E\u0431\u043D\u0438\u043A\u0435 \u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F \uD83D\uDE0A\n\u041F\u043E\u0434\u0441\u043A\u0430\u0436\u0438, \u043C\u043E\u0436\u0435\u0442 \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u043A\u0430\u043A\u0438\u0435-\u0442\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u044B?";
    };
    StatusMessageBuilderTilda.prototype.buildWaitingForResponseMessage = function () {
        var managerName = this.managerExtractor.extract().manager.name;
        var managerPhone = this.managerExtractor.extract().manager.phone;
        return "\u041F\u0440\u0438\u0432\u0435\u0442! \u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0432\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u043B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0432\u0432\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F. \u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0435\u043C\u0443 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0412\u0410 \u0438\u043B\u0438 \u0422\u0413.\n\u0418\u043C\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ".concat(managerName, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(managerPhone, "\n\u0425\u043E\u0440\u043E\u0448\u043E?)");
    };
    StatusMessageBuilderTilda.prototype.buildLessonDoneMessage = function () {
        return "\u041F\u0440\u0438\u0432\u0435\u0442! \u041E\u0447\u0435\u043D\u044C \u043D\u0430\u0434\u0435\u0435\u043C\u0441\u044F, \u0447\u0442\u043E \u0432\u0430\u043C \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C \u0437\u0430\u043D\u044F\u0442\u0438\u0435. \u0411\u0443\u0434\u0435\u043C \u043E\u0447\u0435\u043D\u044C \u0440\u0430\u0434\u044B, \u0435\u0441\u043B\u0438 \u0432\u044B \u0432 \u043E\u0442\u0432\u0435\u0442\u043D\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043E\u0446\u0435\u043D\u0438\u0442\u0435 \u0443\u0440\u043E\u043A \u043E\u0442 1 \u0434\u043E 10, \u0433\u0434\u0435 10 \u2013 \u044D\u0442\u043E \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u043A\u0440\u0443\u0442\u043E)";
    };
    StatusMessageBuilderTilda.prototype.buildDefaultMessage = function () {
        var studentName = this.managerExtractor.extract().student.name;
        var managerName = this.managerExtractor.extract().manager.name;
        var managerPhone = this.managerExtractor.extract().manager.phone;
        var status = this.managerExtractor.extract().student.status;
        return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(studentName, "! \u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0442\u0435\u0431\u044F \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u0442 ").concat(status, ". \u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0430 :)\n\u0418\u043C\u044F \u0442\u0432\u043E\u0435\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430: ").concat(managerName, "\n\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(managerPhone, "\n\u0414\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0448\u0438 \u043C\u043D\u0435 \u0447\u0442\u043E-\u0443\u0433\u043E\u0434\u043D\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u043D\u043E\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438)");
    };
    return StatusMessageBuilderTilda;
}());
exports.StatusMessageBuilderTilda = StatusMessageBuilderTilda;
