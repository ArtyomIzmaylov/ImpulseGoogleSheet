
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

class MessageExtractorEge implements MessageExtractorInterface{
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
            phone: item[1],
            tgNick: item[2]
        }
    })
    const studentData : StudentInterface = {
        name : inputDataStudent[1],
        phone: '926411775',
        manager : inputDataStudent[5],
        status : inputDataStudentFromTildaStatus
    }




    new TelegramMessenger(
        new TelegramMessengerConfig(botToken,
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
