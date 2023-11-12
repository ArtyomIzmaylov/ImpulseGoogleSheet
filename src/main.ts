import {ManagerInterface, StudentInterface} from "./modules/interfaces/EntityInterfaces";
import {Messenger} from "./modules/services/Messenger";
import {TelegramRequestBuilder, WhatsAppRequestBuilder} from "./modules/services/Builders";
import {
    ManagerExtractor,
    MessageForEgeExtractor, MessageForTildaExtractor,
    StudentExtractor
} from "./modules/services/Extractors";
import {ManagerRepository} from "./modules/services/Repositories";


function SendMessageToTilda(inputDataManager : string[], inputDataStudent : string[]) {
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
/*    const inputDataManager = [
        ["Маргарита Голованова", '89141516', "Маргарита"],
        ["Дарья Дмитриева", '89141516', "Дарья Дмитриева"],
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
        name : inputDataStudent[0],
        phone: inputDataStudent[3],
        manager : inputDataStudent[4],
        status : inputDataStudent[5]
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
            new StudentExtractor(studentData)
        ).build()

    )

    const whatsAppRequestPayload = JSON.stringify(
        new WhatsAppRequestBuilder(
            new MessageForTildaExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(
                        new StudentExtractor(studentData).extract().manager
                    )
                )
            ),
            new StudentExtractor(studentData),
            'ce039a8e-1cc7-48e0-b29c-4d2c7953639e'
        ).build()
    )



    new Messenger().send(
        `https://api.telegram.org/bot6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA/sendMessage`,
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : telegramRequestPayload
        }

    )
    new Messenger().send(
        'https://api.wazzup24.com/v3/message',
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer b7caf1e1a16f425bb56b2b7ba2cef5fc'
            },
            body : whatsAppRequestPayload
        }
    )

}
function SendMessageToEge(inputDataManager : string[], inputDataStudent: string[]) {
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
    /*    const inputDataManager = [
            ["Маргарита Голованова", '89141516', "Маргарита"],
            ["Дарья Дмитриева", '89141516', "Дарья Дмитриева"],
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
        name : inputDataStudent[0],
        phone: inputDataStudent[3],
        manager : inputDataStudent[4],
        status : inputDataStudent[5]
    }
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
            new StudentExtractor(studentData)
        ).build()

    )

    const whatsAppRequestPayload = JSON.stringify(
        new WhatsAppRequestBuilder(
            new MessageForEgeExtractor(
                new ManagerExtractor(
                    new StudentExtractor(studentData),
                    new ManagerRepository(managersCollection).getByNick(
                        new StudentExtractor(studentData).extract().manager
                    )
                )
            ),
            new StudentExtractor(studentData),
            'ce039a8e-1cc7-48e0-b29c-4d2c7953639e'
        ).build()
    )



    new Messenger().send(
        `https://api.telegram.org/bot6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA/sendMessage`,
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : telegramRequestPayload
        }

    )
    new Messenger().send(
        'https://api.wazzup24.com/v3/message',
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer b7caf1e1a16f425bb56b2b7ba2cef5fc'
            },
            body : whatsAppRequestPayload
        }
    )

}

