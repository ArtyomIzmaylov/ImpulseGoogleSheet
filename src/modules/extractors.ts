import {
    ManagerExtractorInterface,
    ManagerInterface,
    ManagerWithStudentInterface, MessageExtractorInterface, MessageInterface,
    StudentExtractorInterface, StudentInterface
} from "./interface";


export class StudentExtractor implements StudentExtractorInterface{
    private student: StudentInterface;
    constructor(student : StudentInterface) {
        this.student = student
    }
    extract(): StudentInterface {
        return this.student
    }

}

export class ManagerExtractor implements ManagerExtractorInterface {
    private studentExtractor: StudentExtractor;
    private readonly manager: ManagerInterface;

    constructor(studentExtractor : StudentExtractor, manager : ManagerInterface ) {
        this.studentExtractor = studentExtractor
        this.manager = manager

    }
    extract(): ManagerWithStudentInterface {
        return {
            student: this.studentExtractor.extract(),
            manager: this.manager
        }
    }

}

export class MessageExtractor implements MessageExtractorInterface{
    private managerExtractor: ManagerExtractor;
    constructor(managerExtractor : ManagerExtractor) {
        this.managerExtractor = managerExtractor

    }
    extract(): MessageInterface {
        let message;
        switch (this.managerExtractor.extract().student.status) {
            case 'Запись на занятие':
                message = `Привет! Мы записали тебя на занятие, которое пройдет ${this.managerExtractor.extract().student.time}. Хорошего урока :)\nИмя твоего менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`
                break;
            case "Новая заявка(тильда, без родителя)":
                message = `Здравствуйте и добро пожаловать в «Импульс») Вы записались на бесплатное вводное занятие с экспертом. \nВ ближайшее время Вам наберет менеджер, будьте на связи!\nХорошего дня😊`
                break;
            case "Новая заявка(пробник)":
                message = `Здравствуй! Добро пожаловать в школу «Импульс». Вы записались на бесплатный пробный экзамен по русскому языку. В течение 1-2 дней Вам позвонит менеджер и подробнее про него расскажет.\nХорошего дня 😊`
                break;
            case "1-й недозвон":
                message = `Здравствуйте! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "2-й недозвон":
                message =  `Здравствуйте! К сожалению, нам так и не удалось до вас дозвониться. Если вы хотите пройти пробный экзамен, то позвоните или напишите своему персональному менеджеру.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "Дозвон.НаУрок":
                message = `Ещё раз привет! Это бот Импульса:)\nЛовите инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня вам позвонят по поводу бесплатного вводного занятия, будьте на связи)\nУдачи на пробнике и хорошего дня 😊`;
                break;
            case "Дозвон.БезУрока":
                message = `Ещё раз привет! Это бот Импульса:)\nЛовите инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг решите пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходите по ссылке и записывайтесь на занятие: https://impulsschool.ru/\nМы подберём вам эксперта!\nУдачи на пробнике и хорошего дня 😊`;
                break;
            case "Ожидаем ответа. 1 День":
                message = `Здравствуйте! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "Ожидаем ответа. 2 День":
                message = `Здравствуйте! Вам снова не удалось дозвониться до менеджера по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "Проведено":
                message = `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
                break
            default:
                message =`Непонятный статус: ${this.managerExtractor.extract().student.status}`;
        }
        return {message : message}
    }

}
