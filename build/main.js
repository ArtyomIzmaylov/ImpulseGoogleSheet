"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Messenger_1 = require("./modules/services/Messenger");
const Builders_1 = require("./modules/services/Builders");
const Extractors_1 = require("./modules/services/Extractors");
const Repositories_1 = require("./modules/services/Repositories");
function SendMessageToTilda(inputDataManager, inputDataStudent) {
    const managersCollection = inputDataManager.map((item) => {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        };
    });
    const studentData = {
        name: inputDataStudent[0],
        phone: inputDataStudent[3],
        manager: inputDataStudent[4],
        status: inputDataStudent[5]
    };
    const telegramRequestPayload = JSON.stringify(new Builders_1.TelegramRequestBuilder(new Extractors_1.MessageForTildaExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData)).build());
    const whatsAppRequestPayload = JSON.stringify(new Builders_1.WhatsAppRequestBuilder(new Extractors_1.MessageForTildaExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData), 'ce039a8e-1cc7-48e0-b29c-4d2c7953639e').build());
    new Messenger_1.Messenger().send(`https://api.telegram.org/bot6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: telegramRequestPayload
    });
    new Messenger_1.Messenger().send('https://api.wazzup24.com/v3/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer b7caf1e1a16f425bb56b2b7ba2cef5fc'
        },
        body: whatsAppRequestPayload
    });
}
function SendMessageToEge(inputDataManager, inputDataStudent) {
    const managersCollection = inputDataManager.map((item) => {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        };
    });
    const studentData = {
        name: inputDataStudent[0],
        phone: inputDataStudent[3],
        manager: inputDataStudent[4],
        status: inputDataStudent[5]
    };
    const telegramRequestPayload = JSON.stringify(new Builders_1.TelegramRequestBuilder(new Extractors_1.MessageForEgeExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData)).build());
    const whatsAppRequestPayload = JSON.stringify(new Builders_1.WhatsAppRequestBuilder(new Extractors_1.MessageForEgeExtractor(new Extractors_1.ManagerExtractor(new Extractors_1.StudentExtractor(studentData), new Repositories_1.ManagerRepository(managersCollection).getByNick(new Extractors_1.StudentExtractor(studentData).extract().manager))), new Extractors_1.StudentExtractor(studentData), 'ce039a8e-1cc7-48e0-b29c-4d2c7953639e').build());
    new Messenger_1.Messenger().send(`https://api.telegram.org/bot6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: telegramRequestPayload
    });
    new Messenger_1.Messenger().send('https://api.wazzup24.com/v3/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer b7caf1e1a16f425bb56b2b7ba2cef5fc'
        },
        body: whatsAppRequestPayload
    });
}
//# sourceMappingURL=main.js.map