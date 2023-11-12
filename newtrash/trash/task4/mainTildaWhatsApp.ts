
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
            case "Ожидаем отета. 1 День":
                message = `Привет! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}\nХорошо?)`;
                break;
            case "Проведено":
                message = `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
                break
            default:
                message = `Привет, ${this.managerExtractor.extract().student.name}! Мы записали тебя на занятие, которое пройдет ${this.managerExtractor.extract().student.status}. Хорошего урока :)\nИмя твоего менеджера: ${this.managerExtractor.extract().manager.name}\nНомер телефона: ${this.managerExtractor.extract().manager.phone}\nДля подтверждения напиши мне что-угодно в ответном сообщении)`

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



class WhatsAppMessenger implements MessengerInterface{
    private whatsAppMessengerConfig: WhatsAppMessengerConfig;

    constructor(whatsAppMessengerConfig : WhatsAppMessengerConfig) {
        this.whatsAppMessengerConfig = whatsAppMessengerConfig
    }

    async send(): Promise<void> {
        const messageConfig = this.whatsAppMessengerConfig.createMessage();
        try {
            const response = await fetch(this.whatsAppMessengerConfig.getApiUrl(), messageConfig);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            // Обработка ошибок при отправке сообщения
            console.error('Произошла ошибка при отправке сообщения:', error);
        }
    }
    sendSync() : void {
        const messageConfig = this.whatsAppMessengerConfig.createMessage();
        const response = UrlFetchApp.fetch(this.whatsAppMessengerConfig.getApiUrl(), messageConfig);

    }

}

class WhatsAppMessengerConfig {
    private readonly apiUrl: string;
    private messageExtractor: MessageExtractor;
    private studentExtractor: StudentExtractor;
    private readonly token: string;
    private readonly channelId: string;
    constructor(channelId : string, token : string, messageExtractor : MessageExtractor, studentExtractor: StudentExtractor) {
        this.token = token
        this.channelId = channelId
        this.apiUrl = `https://api.wazzup24.com/v3/message`;
        this.messageExtractor = messageExtractor
        this.studentExtractor = studentExtractor
    }

    getApiUrl() {
        return this.apiUrl
    }
    createMessage() {
        const payload = {
            channelId: this.channelId,
            chatId: this.studentExtractor.extract().phone,
            chatType: "whatsapp",
            text: this.messageExtractor.extract().message,
        };
        return {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
            payload: JSON.stringify(payload)
        };
    }
}



function sendMessageToWhatsApp(inputDataManager : string[][], inputDataStudent : string[], channelId : string, token : string, inputDataStudentFromTildaStatus : string)  : void{
    const managersCollection : ManagerInterface[] = inputDataManager.map((item)=> {
        return {
            name: item[0],
            phone: item[1],
            tgNick: item[2]
        }
    })
    const studentData : StudentInterface = {
        name : inputDataStudent[1],
        phone: inputDataStudent[4],
        manager : inputDataStudent[5],
        status : inputDataStudentFromTildaStatus
    }
    new WhatsAppMessenger(
        new WhatsAppMessengerConfig(channelId,token,
            new MessageExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(
                        new StudentExtractor(studentData).extract().manager))),
            new StudentExtractor(studentData))).sendSync()



}

/*
const botToken = '6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA';
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
const inputDataManager = [
    ["Маргарита Голованова", '89141516', "Маргарита"],
    ["Дарья Дмитриева", '89141516', "Дарья Дмитриева"],
    ["Джульетта", '89141516', "Julietta"],
    ["Арина Смолякова", '89141516', "Арина Смолякова"],
    ["Тамара Соловьева", '89141516', "Тамара Соловьева"],
    ["", '89141516', "Arthur Arakelyan 🇦🇲"],
    ["", "", ""]
];

const inputDataStudent= ["Соня Ученица", "П3 – Пробники", "", "926411775", "Маргарита", "11"]

mainTaskTilda(inputDataManager, inputDataStudent, botToken, '1')

*/
