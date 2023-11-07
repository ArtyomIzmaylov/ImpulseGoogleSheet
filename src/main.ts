import {ManagerRepository} from "./modules/managers";
import {ManagerExtractor, MessageExtractor, StudentExtractor} from "./modules/extractors";
import {TelegramMessengerConfig} from "./modules/telegramConfig";
import {TelegramMessengerClass} from "./modules/messenger";



const managerRepository = new ManagerRepository()
const studentExtractor = new StudentExtractor()

const managerAsmik = managerRepository.getByNick('@asmikguak')


const managerExtractor = new ManagerExtractor(studentExtractor, managerAsmik)

const messageExtractor = new MessageExtractor(managerExtractor)

const botToken = '6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA';
const configTelegramMessenger = new TelegramMessengerConfig(botToken, messageExtractor, studentExtractor);

const telegramMessengerConfig = configTelegramMessenger

const telegramMessengerClass = new TelegramMessengerClass(telegramMessengerConfig).send()

