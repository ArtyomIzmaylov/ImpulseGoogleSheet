import {ManagerInterface, StudentInterface} from "./modules/interfaces/EntityInterfaces";
import {Messenger} from "./modules/services/Messenger";
import {TelegramRequestBuilder, WhatsAppRequestBuilder} from "./modules/services/Builders";
import {
    ManagerExtractor,
    MessageForEgeExtractor, MessageForTildaExtractor,
    StudentExtractor
} from "./modules/services/Extractors";
import {ManagerRepository} from "./modules/services/Repositories";


export function sendMessageToTilda(inputDataManager : string[][], inputDataStudent : string[], inputStatus : string) {
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
        phone: '926411775', //inputDataStudent[4]
        manager : inputDataStudent[5],
        status : inputStatus
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
            new StudentExtractor(studentData),
        ).build()
    )
    new Messenger().sendSync(
        `https://1793-194-226-19-212.ngrok-free.app/api/sendMessage`,
        {
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            body : telegramRequestPayload
        }
    )

}
export function sendMessageToEge(inputDataManager : string[][], inputDataStudent: string[]) {
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
        `https://1793-194-226-19-212.ngrok-free.app/api/sendMessage`,
        {
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            body : telegramRequestPayload
        }
    )


}

