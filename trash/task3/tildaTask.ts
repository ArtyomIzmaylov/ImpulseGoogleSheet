declare var UrlFetchApp: {
    fetch(url:  string, param : any)
};



//INTERFACES


interface StudentInterface {
    name : string
    phone : string
    manager : string
    status : string
}
interface ManagerInterface {
    name : string
    phone : string
    tgNick : string
}
interface ManagerWithStudentInterface {
    manager : ManagerInterface
    student : StudentInterface
}
interface ManagerRepositoryInterface {
    //init : GoogleTableObject
    getByNick(tgNick : string) : ManagerInterface
}
interface StudentExtractorInterface {
    //init : ManagerInterface;
    extract() : StudentInterface
}
interface ManagerExtractorInterface {
    //init: {StudentInterface, ManageInterface}
    extract() : ManagerWithStudentInterface
}
interface MessageInterface {
    message : string
}
interface MessageExtractorInterface {
    //init : {ManagerExtractorInterface}
    extract() : MessageInterface
}
interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send() : void
}
interface ConfigInterface {
    get() : void
}



//EXTRACTORS

class StudentExtractor implements StudentExtractorInterface{
    private student: StudentInterface;
    constructor(student : StudentInterface) {
        this.student = student
    }
    extract(): StudentInterface {
        return this.student
    }
}

class ManagerExtractor implements ManagerExtractorInterface {
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

class MessageExtractor implements MessageExtractorInterface{
    private managerExtractor: ManagerExtractor;
    constructor(managerExtractor : ManagerExtractor) {
        this.managerExtractor = managerExtractor

    }
    extract(): MessageInterface {
        let message;
        switch (this.managerExtractor.extract().student.status) {
            case 'Запись на занятие':
                message = `Привет! Мы записали тебя на занятие, которое пройдет ${this.managerExtractor.extract().student.status}. Хорошего урока :)\nИмя твоего менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`
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
            case "Ожидаем отета. 1 День":
                message = `Здравствуйте! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "Ожидаем отета. 2 День":
                message = `Здравствуйте! Вам снова не удалось дозвониться до менеджера по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`;
                break;
            case "Проведено":
                message = `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
                break
            default:
                message = `Привет! Мы записали тебя на занятие, которое пройдет ${this.managerExtractor.extract().student.status}. Хорошего урока :)\nИмя твоего менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}`

        }
        return {message : message}
    }

}

//MANAGERS

class ManagerRepository implements ManagerRepositoryInterface{
    private managers : ManagerInterface[];
    constructor(managers : ManagerInterface[]) {
        this.managers = managers
    }
    getByNick(tgNick : string): ManagerInterface{
        let manager= this.managers.find(manager => manager.tgNick === tgNick)
        if (manager === undefined || manager === null) {
            return {name: 'UNDEFINED', tgNick: '@UNDEFINED', phone:  'UNDEFINED'}
        }
        return manager;
    }

}


//CONFIG_TG

class TelegramMessengerConfig {
    private readonly apiUrl: string;
    private messageExtractor: MessageExtractor;
    private studentExtractor: StudentExtractor;
    constructor(token : string, messageExtractor : MessageExtractor, studentExtractor: StudentExtractor) {
        this.apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
        this.messageExtractor = messageExtractor
        this.studentExtractor = studentExtractor
    }

    getApiUrl() {
        return this.apiUrl
    }
    createMessage() {
        const payload = {
            chat_id: this.studentExtractor.extract().phone,
            text: this.messageExtractor.extract().message,
        };
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            payload: JSON.stringify(payload),
        };
    }
}

//MESSENGER
class TelegramMessenger implements MessengerInterface {
    private telegramMessengerConfig: TelegramMessengerConfig;

    constructor(telegramMessengerConfig: TelegramMessengerConfig) {
        this.telegramMessengerConfig = telegramMessengerConfig
    }

    async send(): Promise<void> {
        const messageConfig = this.telegramMessengerConfig.createMessage();
        try {
            const response = await fetch(this.telegramMessengerConfig.getApiUrl(), messageConfig);
            const data = await response.json();
            // Обработка ответа от Telegram API, если необходимо
            console.log(data);
        } catch (error) {
            // Обработка ошибок при отправке сообщения
            console.error('Произошла ошибка при отправке сообщения:', error);
        }
    }

    sendSync() : void {
        const messageConfig = this.telegramMessengerConfig.createMessage();
        const response = UrlFetchApp.fetch(this.telegramMessengerConfig.getApiUrl(), messageConfig);

    }
}


function mainTaskTilda(inputDataManagersFromTilda: Array<any>,inputDataStudentFromTilda : Array<any>, botToken : string, inputDataStudentFromTildaStatus : string) {
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

    const managersFromTilda : ManagerInterface[] = inputDataManagersFromTilda.map((item)=> {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        }
    })
    //НАМ ПРИЛЕТАЮТ ДАННЫЕ СТУДЕНТА
/*
    const inputDataStudentFromTilda = ["Соня Ученица", "П3 – Пробники", "", "926411775", "МЕНЕДЖЕР Асмик Гукасян", "Проведено"]
*/

    const studentFromTilda : StudentInterface = {
        name : inputDataStudentFromTilda[1],
        phone: inputDataStudentFromTilda[4],
        manager : inputDataStudentFromTilda[5],
        status : inputDataStudentFromTildaStatus,
    }



    new TelegramMessenger(
        new TelegramMessengerConfig(botToken,
            new MessageExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentFromTilda),
                        new ManagerRepository(managersFromTilda).getByNick(
                            new StudentExtractor(studentFromTilda).extract().manager))),
                                new StudentExtractor(studentFromTilda))).sendSync()

}

