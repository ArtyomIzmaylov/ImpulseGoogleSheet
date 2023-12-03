

declare var UrlFetchApp: {
    fetch(url:  any, param : any) : any
};

interface BuildPayloadInterface {
    build() : PayloadInterface
}

interface BuildStatusMessageInterface {
    build() : string
}

interface StudentInterface {
    name : string
    phone : string
    manager : string
    status : string
    time? : string
}

interface ManagerInterface {
    name : string
    phone : string
    tgNick : string
}

interface MessageInterface {
    message : string
}

interface ManagerWithStudentInterface {
    manager : ManagerInterface
    student : StudentInterface
}


interface StudentExtractorInterface {
    //init : ManagerInterface;
    extract() : StudentInterface
}

interface ManagerExtractorInterface {
    //init: {StudentInterface, ManageInterface}
    extract() : ManagerWithStudentInterface
}

interface MessageExtractorInterface {
    //init : {ManagerExtractorInterface}
    extract() : MessageInterface
}


interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send(url: string, request: RequestInterface): Promise<void>
    sendSync(url : string, request : RequestInterface) : void
}

interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send(url: string, request: RequestInterface): Promise<void>
    sendSync(url : string, request : RequestInterface) : void
}

interface ManagerRepositoryInterface {
    //init : GoogleTableObject
    getByNick(tgNick : string) : ManagerInterface
}



interface PayloadInterface {}

interface RequestInterface {
    method : string
    headers : {}
    body? : string
    payload? : string
}

interface WhatsAppPayloadInterface extends PayloadInterface{
    channelId: string;
    chatType: string;
    text: string;
    phone : string
    // Другие свойства, специфичные для WhatsApp
}
interface TelegramPayloadInterface extends PayloadInterface{
    message : string
    phone : string
    hmacMessage : string
    hmacPhone : string
}



const secretKet = '92Fhneh0Fhfrtkzy2Irjkf3Bvgekmc11'


declare var Utilities: any;


function calculateHMAC(data: string, key: string): string {
    const hmacKey = Utilities.newBlob(key).getBytes();
    const dataBytes = Utilities.newBlob(data, 'utf-8').getBytes();
    const hashedBytes = Utilities.computeHmacSha256Signature(dataBytes, hmacKey);
    const hexString = hashedBytes.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
    return hexString;
}


class TelegramRequestBuilder implements BuildPayloadInterface{
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





class WhatsAppRequestBuilder implements BuildPayloadInterface{
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
            chatType: "telegram",
            phone : this.studentExtractor.extract().phone,
            text: this.messageExtractor.extract().message,
        }
    }

}



class StudentExtractor implements StudentExtractorInterface{
    private readonly student: StudentInterface;

    constructor(student : StudentInterface) {
        this.student = student
    }
    extract(): StudentInterface {
        return this.student
    }

}

class ManagerExtractor implements ManagerExtractorInterface {
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



class MessageForEgeExtractor implements MessageExtractorInterface {
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
        return `Привет, ${student.name}! Только что тебе звонил менеджер по поводу пробного экзамена. Перезвони ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nХорошо?)`;
    }

    private buildLessonCallMessage(): string {
        const { student } = this.managerExtractor.extract();
        return `Ещё раз привет, ${student.name}! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня тебе позвонят по поводу бесплатного вводного занятия, будь на связи)\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }
    private buildNoLessonCallMessage(): string {
        return `Ещё раз привет! Это бот Импульса:)\nЛови инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг надумаешь пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходи по ссылке и записывайся на занятие:\n https://impulsschool.ru/\nМы подберём тебе эксперта!\nУдачи на пробнике и хорошего дня 😊\nПодскажи, может у тебя есть какие-то вопросы?`;
    }
}

class MessageForTildaExtractor implements MessageExtractorInterface {
    private managerExtractor: ManagerExtractor;

    constructor(managerExtractor: ManagerExtractor) {
        this.managerExtractor = managerExtractor;
    }

    extract(): MessageInterface {
        const studentStatus = this.managerExtractor.extract().student.status;
        let message = '';

        switch (studentStatus) {
            case "Ожидаем отета. 1 День":
                message = this.buildWaitingForResponseMessage();
                break;
            case "Проведено":
                message = this.buildLessonDoneMessage();
                break;
            case "Запись":
                message = this.buildDefaultMessage();
                break
            default:
                break;
        }

        return {message : message };
    }

    private buildWaitingForResponseMessage(): string {
        const manager = this.managerExtractor.extract().manager;
        return `Привет! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nХорошо?)`;
    }

    private buildLessonDoneMessage(): string {
        return `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
    }

    private buildDefaultMessage(): string {
        //const { student, manager } = this.managerExtractor.extract();
        const student = this.managerExtractor.extract().student
        const manager = this.managerExtractor.extract().manager
        return `Привет, ${student.name}! Мы записали тебя на занятие, которое пройдет ${student.time}. Хорошего урока :)\nИмя твоего менеджера: ${manager.name}\nНомер телефона: ${manager.phone}\nДля подтверждения напиши мне что-угодно в ответном сообщении)`;
    }
}



class Messenger implements MessengerInterface{

    async send(url : string, request : RequestInterface): Promise<void> {
        try {
            const response = await fetch(url, request);
            const data = await response.json();
            // Обработка ответа от Telegram API, если необходимо
            console.log(data);
        } catch (error) {
            // Обработка ошибок при отправке сообщения
            console.error('Произошла ошибка при отправке сообщения:', error);
        }
    }
    sendSync(url : string, request : RequestInterface) : void {
        UrlFetchApp.fetch(url, request);
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
            return {name: '', tgNick: '', phone:  ''}
        }
        return manager;
    }

}



function sendMessageToTilda(inputDataManager : string[][], inputDataStudent : string[], inputStatus : string) {
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
    /*    const inputDataManager = [
            ["Маргарита Голованова", '89141516', "Маргарита"],
            ["Дарья Дмитриева", 'DJSAJDASJDA', "Дарья Дмитриева"],
            ["Джульетта", '89141516', "Julietta"],
            ["Арина Смолякова", '89141516', "Арина Смолякова"],
            ["Тамара Соловьева", '89141516', "Тамара Соловьева"],
            ["", '89141516', "Arthur Arakelyan 🇦🇲"],
            ["", "", ""]
        ];
        */
    /*    const inputDataStudent= ["Соня Ученица", "П3 – Пробники", "", "926411775", "Маргарита", "Дозвон.НаУрок"]

        */
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
        time : inputDataStudent[31],
        status : inputStatus
    }

    const telegramRequestPayload = JSON.stringify(
        new TelegramRequestBuilder(
            new MessageForTildaExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(
                        new StudentExtractor(studentData).extract().manager
                    )
                )
            ),
            new StudentExtractor(studentData),
        ).build()
    )
    new Messenger().sendSync(
        `http://158.160.24.170:5000/api/sendMessage`,
        {
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            payload : telegramRequestPayload
        }
    )

}
function sendMessageToEge(inputDataManager : string[][], inputDataStudent: string[]) {
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ

    const managersCollection : ManagerInterface[] = inputDataManager.map((item)=> {
        return {
            name: item[0],
            phone: item[4],
            tgNick: item[3]
        }
    })

    const studentData : StudentInterface = {
        name : inputDataStudent[1],
        phone: inputDataStudent[2],
        manager : inputDataStudent[10],
        status : inputDataStudent[12]
    }
    console.log('Work')

    const telegramRequestPayload = JSON.stringify(
        new TelegramRequestBuilder(
            new MessageForEgeExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(
                        new StudentExtractor(studentData).extract().manager
                    )
                )
            ),
            new StudentExtractor(studentData),
        ).build()
    )
    new Messenger().sendSync(
        `http://158.160.24.170:5000/api/sendMessage`,
        {
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            payload : telegramRequestPayload
        }
    )


}

