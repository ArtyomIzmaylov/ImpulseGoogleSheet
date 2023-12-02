import {
    TelegramPayloadInterface,
    WhatsAppPayloadInterface
} from "../interfaces/RequestInterfaces";
import {
    ManagerExtractorInterface,
    MessageExtractorInterface,
    StudentExtractorInterface
} from "../interfaces/ExtractorInterfaces";
import {BuildPayloadInterface, BuildStatusMessageInterface} from "../interfaces/BuilderInterfaces";
import {calculateHMAC, secretKet} from "./CryptoService";



export class WhatsAppRequestBuilder implements BuildPayloadInterface{
    private messageExtractor: MessageExtractorInterface;
    private studentExtractor: StudentExtractorInterface;
    private readonly channelId: string;
    constructor(messageExtractor : MessageExtractorInterface, studentExtractor : StudentExtractorInterface, channelId : string) {
        this.messageExtractor = messageExtractor
        this.studentExtractor = studentExtractor
        this.channelId = channelId
    }
    build() : WhatsAppPayloadInterface{
        return  {
            channelId: this.channelId,
            chatId: this.studentExtractor.extract().phone,
            chatType: "whatsapp",
            text: this.messageExtractor.extract().message,
        }
    }

}

export class TelegramRequestBuilder implements BuildPayloadInterface{
    private messageExtractor: MessageExtractorInterface;
    private studentExtractor: StudentExtractorInterface;
    constructor(messageExtractor : MessageExtractorInterface, studentExtractor : StudentExtractorInterface) {
        this.messageExtractor = messageExtractor
        this.studentExtractor = studentExtractor
    }
    build() : TelegramPayloadInterface{
        return  {
            message: this.messageExtractor.extract().message,
            phone: this.studentExtractor.extract().phone,
            hmacMessage : calculateHMAC(this.messageExtractor.extract().message, secretKet),
            hmacPhone : calculateHMAC(this.studentExtractor.extract().phone, secretKet),


        }
    }

}




export class StatusMessageBuilderTilda implements BuildStatusMessageInterface{
    private managerExtractor: ManagerExtractorInterface;

    constructor(managerExtractor: ManagerExtractorInterface) {
        this.managerExtractor = managerExtractor;
    }

    public build(): string {
        const status = this.managerExtractor.extract().student.status;
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

    }
    private buildFirstNonAnsweredCallMessage(): string {
        const studentName = this.managerExtractor.extract().student.name;
        const managerName = this.managerExtractor.extract().manager.name;
        const managerPhone = this.managerExtractor.extract().manager.phone;
        return `Привет, ${studentName}! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${managerName}\nНомер телефона: ${managerPhone}\nХорошо?)`;
    }

    private buildLessonCallMessage(): string {
        const studentName = this.managerExtractor.extract().student.name;
        return `Ещё раз привет, ${studentName}! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня тебе позвонят по поводу бесплатного вводного занятия, будь на связи)\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }

    private buildNoLessonCallMessage(): string {
        return `Ещё раз привет! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг надумаешь пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходи по ссылке и записывайся на занятие:\n https://impulsschool.ru/\nМы подберём тебе эксперта!\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }

    private buildWaitingForResponseMessage(): string {
        const managerName = this.managerExtractor.extract().manager.name;
        const managerPhone = this.managerExtractor.extract().manager.phone;
        return `Привет! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${managerName}\nНомер телефона: ${managerPhone}\nХорошо?)`;
    }

    private buildLessonDoneMessage(): string {
        return `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
    }

    private buildDefaultMessage(): string {
        const studentName = this.managerExtractor.extract().student.name;
        const managerName = this.managerExtractor.extract().manager.name;
        const managerPhone = this.managerExtractor.extract().manager.phone;
        const status = this.managerExtractor.extract().student.status;
        return `Привет, ${studentName}! Мы записали тебя на занятие, которое пройдет ${status}. Хорошего урока :)\nИмя твоего менеджера: ${managerName}\nНомер телефона: ${managerPhone}\nДля подтверждения напиши мне что-угодно в ответном сообщении)`;
    }


}
