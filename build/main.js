"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const managers_1 = require("./modules/managers");
const extractors_1 = require("./modules/extractors");
const telegramConfig_1 = require("./modules/telegramConfig");
const messenger_1 = require("./modules/messenger");
const botToken = '6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA';
new messenger_1.TelegramMessengerClass(new telegramConfig_1.TelegramMessengerConfig(botToken, new extractors_1.MessageExtractor(new extractors_1.ManagerExtractor(new extractors_1.StudentExtractor(), new managers_1.ManagerRepository().getByNick(new extractors_1.StudentExtractor().extract().manager))), new extractors_1.StudentExtractor())).send().then(r => console.log('The message has been successfully sent'));
//# sourceMappingURL=main.js.map