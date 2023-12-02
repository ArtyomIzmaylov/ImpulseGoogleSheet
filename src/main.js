"use strict";
exports.__esModule = true;
exports.sendMessageToEge = exports.sendMessageToTilda = void 0;
var Messenger_1 = require("./modules/services/Messenger");
var Builders_1 = require("./modules/services/Builders");
var Extractors_1 = require("./modules/services/Extractors");
var Repositories_1 = require("./modules/services/Repositories");
function sendMessageToTilda(inputDataManager, inputDataStudent, inputStatus) {
    //GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
    /*    const inputDataManager = [
            ["Маргарита Голованова", '89141516', "Маргарита"],
            ["Дарья Дмитриева", 'DJSAJDASJDA', "Дарья Дмитриева"],
            ["Джульетта", '89141516', "Julietta"],
            ["Арина Смолякова", '89141516', "Арина Смолякова"],
            ["Тамара Соловьева", '89141516', "Тамара Соловьева"],
            ["", '89141516', "Arthur Arakelyan 🇦🇲"],
            ["", "", ""]
        ];
        */
    /*    const inputDataStudent= ["Соня Ученица", "П3 – Пробники", "", "926411775", "Маргарита", "Дозвон.НаУрок"]
    
        */
    var managersCollection = inputDataManager.map(function (item) {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        };
    });
    var studentData = {
        name: inputDataStudent[1],
        phone: '926411775',
        manager: inputDataStudent[5],
        status: inputStatus
    };
    var telegramRequestPayload = JSON.stringify(new Builders_1.TelegramRequestBuilder(new Extractors_1.MessageForEgeExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData)).build());
    new Messenger_1.Messenger().sendSync("https://1793-194-226-19-212.ngrok-free.app/api/sendMessage", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: telegramRequestPayload
    });
}
exports.sendMessageToTilda = sendMessageToTilda;
function sendMessageToEge(inputDataManager, inputDataStudent) {
    //GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
    var managersCollection = inputDataManager.map(function (item) {
        return {
            name: item[0],
            phone: item[4],
            tgNick: item[3]
        };
    });
    var studentData = {
        name: inputDataStudent[1],
        phone: inputDataStudent[2],
        manager: inputDataStudent[10],
        status: inputDataStudent[12]
    };
    var telegramRequestPayload = JSON.stringify(new Builders_1.TelegramRequestBuilder(new Extractors_1.MessageForEgeExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData)).build());
    new Messenger_1.Messenger().sendSync("https://1793-194-226-19-212.ngrok-free.app/api/sendMessage", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: telegramRequestPayload
    });
}
exports.sendMessageToEge = sendMessageToEge;
