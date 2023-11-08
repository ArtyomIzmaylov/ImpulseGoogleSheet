import {ManagerRepository} from "./modules/managers";
import {ManagerExtractor, MessageExtractor, StudentExtractor} from "./modules/extractors";
import {TelegramMessengerConfig} from "./modules/telegramConfig";
import {TelegramMessenger} from "./modules/messenger";
import {ManagerInterface, StudentInterface} from "./modules/interface";



const botToken = '6169349504:AAFKvAVRcmW1kDukQ4fUyc8kmrhAfocLKDA';
//GOOGLE ДАННЫЕ-МЕНЕДЖЕРЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ
const inputDataManagerFromTilda = [
    ["Маргарита Голованова", '89141516', "Маргарита"],
    ["Дарья Дмитриева", '89141516', "Дарья Дмитриева"],
    ["Джульетта", '89141516', "Julietta"],
    ["Арина Смолякова", '89141516', "Арина Смолякова"],
    ["Тамара Соловьева", '89141516', "Тамара Соловьева"],
    ["", '89141516', "Arthur Arakelyan 🇦🇲"],
    ["", "", ""]
];
const inputDataManagerFromEge = [
    ["Андрей Миролюбов", "П3 – Пробники", "", "Асмик Гукасян", "Асмик Гукасян", ""],
    ["Вячеслав Попов", "П3 – Пробники", "", "Светлана Гукасян", "+7 (914) 459-71-47", ""],
    ["Александра Осецкая", "П3 – Пробники", "", "Татьяна Грачёва", "+7 (914) 459-71-47", ""],
    ["Калина Мельникова", "П3 – Пробники", "", "Andres", "+7 (914) 459-71-47", ""]
];

const managersFromTilda : ManagerInterface[] = inputDataManagerFromTilda.map((item)=> {
    return {
        name: item[0],
        phone: item[1],
        tgNick: item[2]
    }
})
const managersFromEge : ManagerInterface[] = inputDataManagerFromEge.map((item)=> {
    return {
        name: item[0],
        phone: item[4],
        tgNick: item[3]
    }
})

//GOOGLE ДАННЫЕ-СТУДЕНТЫ ИЗ ТИЛЬДЫ И ЕГЭ ЛИСТОВ


const inputDataStudentFromTilda = ["Соня Ученица", "П3 – Пробники", "", "926411775", "МЕНЕДЖЕР Асмик Гукасян", "Проведено"]
const inputDataStudentFromEge = ["Соня Ученица", "П3 – Пробники", "", "8914459714", "МЕНЕДЖЕР1 Асмик Гукасян", "СТАТУС ПРОВЕДЕНО"]



const studentFromTilda : StudentInterface = {
    name : inputDataStudentFromTilda[0],
    phone: inputDataStudentFromTilda[3],
    manager : inputDataStudentFromTilda[4],
    status : inputDataStudentFromTilda[5],
    time : 'default'


}

const studentFromEge : StudentInterface = {
    name : inputDataStudentFromEge[0],
    phone: inputDataStudentFromEge[3],
    manager : inputDataStudentFromEge[4],
    status : inputDataStudentFromEge[5]
}




new TelegramMessenger(
    new TelegramMessengerConfig(botToken,
        new MessageExtractor(
            new ManagerExtractor(
                new StudentExtractor(studentFromTilda),
                    new ManagerRepository(managersFromTilda).getByNick(
                        new StudentExtractor(studentFromTilda).extract().manager))),
                            new StudentExtractor(studentFromTilda))).send().then(r =>console.log('The message has been successfully sent'))


