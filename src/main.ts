import {ManagerRepository} from "./modules/managers";
import {ManagerExtractor, MessageExtractor, StudentExtractor} from "./modules/extractors";
import {TelegramMessengerConfig} from "./modules/telegramConfig";
import {TelegramMessenger} from "./modules/messenger";





new TelegramMessenger(
    new TelegramMessengerConfig(botToken,
        new MessageExtractor(
            new ManagerExtractor(
                new StudentExtractor(),
                    new ManagerRepository().getByNick(
                        new StudentExtractor().extract().manager))),
                            new StudentExtractor())).send().then(r =>console.log('The message has been successfully sent'))

