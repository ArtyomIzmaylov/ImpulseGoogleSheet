import {
    ManagerExtractorInterface,
    MessageExtractorInterface,
    StudentExtractorInterface
} from "../interfaces/ExtractorInterfaces";
import {
    ManagerInterface,
    ManagerWithStudentInterface,
    MessageInterface,
    StudentInterface
} from "../interfaces/EntityInterfaces";


export class StudentExtractor implements StudentExtractorInterface{
    private readonly student: StudentInterface;

    constructor(student : StudentInterface) {
        this.student = student
    }
    extract(): StudentInterface {
        return this.student
    }

}

export class ManagerExtractor implements ManagerExtractorInterface {
    private studentExtractor: StudentExtractorInterface;
    private readonly manager: ManagerInterface;

    constructor(studentExtractor : StudentExtractorInterface, manager : ManagerInterface ) {
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


export class MessageForEgeExtractor implements MessageExtractorInterface {
    private managerExtractor: ManagerExtractor;

    constructor(managerExtractor: ManagerExtractor) {
        this.managerExtractor = managerExtractor;
    }

    extract(): MessageInterface {
        const studentStatus = this.managerExtractor.extract().student.status;
        let message = '';

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

        return { message };
    }

    private buildFirstNonAnsweredCallMessage(): string {
        const { student, manager } = this.managerExtractor.extract();
        return `Привет, ${student.name}! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nХорошо?)`;
    }

    private buildLessonCallMessage(): string {
        const { student } = this.managerExtractor.extract();
        return `Ещё раз привет, ${student.name}! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня тебе позвонят по поводу бесплатного вводного занятия, будь на связи)\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }
    private buildNoLessonCallMessage(): string {
        return `Ещё раз привет! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг надумаешь пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходи по ссылке и записывайся на занятие:\n https://impulsschool.ru/\nМы подберём тебе эксперта!\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }
}

export class MessageForTildaExtractor implements MessageExtractorInterface {
    private managerExtractor: ManagerExtractor;

    constructor(managerExtractor: ManagerExtractor) {
        this.managerExtractor = managerExtractor;
    }

    extract(): MessageInterface {
        const studentStatus = this.managerExtractor.extract().student.status;
        let message = '';

        switch (studentStatus) {
            case "1-й недозвон":
                message = this.buildFirstNonAnsweredCallMessage();
                break;
            case "Ожидаем отета. 1 День":
                message = this.buildWaitingForResponseMessage();
                break;
            case "Проведено":
                message = this.buildLessonDoneMessage();
                break;
            default:
                message = this.buildDefaultMessage();
                break;
        }

        return { message };
    }

    private buildFirstNonAnsweredCallMessage(): string {
        const { student, manager } = this.managerExtractor.extract();
        return `Привет, ${student.name}! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nХорошо?)`;
    }

    private buildWaitingForResponseMessage(): string {
        const { manager } = this.managerExtractor.extract();
        return `Привет! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nХорошо?)`;
    }

    private buildLessonDoneMessage(): string {
        return `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
    }

    private buildDefaultMessage(): string {
        const { student, manager } = this.managerExtractor.extract();
        return `Привет, ${student.name}! Мы записали тебя на занятие, которое пройдет ${student.status}. Хорошего урока :)\nИмя твоего менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nДля подтверждения напиши мне что-угодно в ответном сообщении)`;
    }
}
