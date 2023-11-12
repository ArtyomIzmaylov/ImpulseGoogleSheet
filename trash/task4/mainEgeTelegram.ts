
declare var UrlFetchApp: {
    fetch(url:  string, param : any)
};


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
    sendSync() : void
}
interface ConfigInterface {
    get() : void
}




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
            case "1-й недозвон":
                message = `Привет, ${this.managerExtractor.extract().student.name}! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}\nХорошо?)`;
                break;
            case "Дозвон.НаУрок":
                message = `Ещё раз привет! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня тебе позвонят по поводу бесплатного вводного занятия, будь на связи)\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
                break;
            case "Дозвон.БезУрока":
                message = `Ещё раз привет! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг надумаешь пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходи по ссылке и записывайся на занятие:\n https://impulsschool.ru/\nМы подберём тебе эксперта!\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
                break;
            default:
                message = ''
        }
        return {message : message}
    }

}


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




function sendMessageToTelegram(inputDataManager : string[][], inputDataStudent : string[], botToken : string, inputDataStudentFromTildaStatus : string)  : void{

    const managersCollection : ManagerInterface[] = inputDataManager.map((item)=> {
        return {
            name: item[0],
            phone: item[4],
            tgNick: item[3]
        }
    })
    const studentData : StudentInterface = {
        name : inputDataStudent[1],
        phone: '926411775',
        manager : inputDataStudent[10],
        status : inputDataStudentFromTildaStatus
    }




    new TelegramMessenger(
        new TelegramMessengerConfig(
            botToken,
            new MessageExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(new StudentExtractor(studentData).extract().manager)
                )
            ),
            new StudentExtractor(studentData)
        )
    ).sendSync()



}
