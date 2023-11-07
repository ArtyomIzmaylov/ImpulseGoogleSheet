"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusHandler = void 0;
class StatusHandler {
    generateMessage(managerWithStudent) {
        switch (managerWithStudent.student.status) {
            case "1-й недозвон":
                return `Здравствуйте! Только что вам звонил менеджер по поводу пробного экзамена. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${managerWithStudent.manager.name}\nНомер телефона: ${managerWithStudent.manager.phone}`;
            case "2-й недозвон":
                return `Здравствуйте! К сожалению, нам так и не удалось до вас дозвониться. Если вы хотите пройти пробный экзамен, то позвоните или напишите своему персональному менеджеру.\nИмя менеджера: ${managerWithStudent.manager.name}\nНомер телефона: ${managerWithStudent.manager.phone}`;
            case "Дозвон.НаУрок":
                return `Ещё раз привет! Это бот Импульса:)\nЛовите инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nВ течение дня вам позвонят по поводу бесплатного вводного занятия, будьте на связи)\nУдачи на пробнике и хорошего дня 😊`;
            case "Дозвон.БезУрока":
                return `Ещё раз привет! Это бот Импульса:)\nЛовите инструкцию по прохождению пробника: https://clck.ru/36JSkc\n\nЕсли вдруг решите пройти бесплатное занятие и разобрать любую тему из экзамена (по любому предмету) – переходите по ссылке и записывайтесь на занятие: https://impulsschool.ru/\nМы подберём вам эксперта!\nУдачи на пробнике и хорошего дня 😊`;
            case "Ожидаем ответа. 1 День":
                return `Здравствуйте! Только что вам звонил менеджер по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${managerWithStudent.manager.name}\nНомер телефона: ${managerWithStudent.manager.phone}`;
            case "Ожидаем ответа. 2 День":
                return `Здравствуйте! Вам снова не удалось дозвониться до менеджера по поводу вводного занятия. Перезвоните ему пожалуйста или напишите в ВА или ТГ.\nИмя менеджера: ${managerWithStudent.manager.name}\nНомер телефона: ${managerWithStudent.manager.phone}`;
            case "Проведено":
                return `Привет! Очень надеемся, что вам понравилось занятие. Будем очень рады, если вы в ответном сообщении оцените урок от 1 до 10, где 10 – это невероятно круто)`;
            default:
                return `Непонятный статус: ${managerWithStudent.student.status}`;
        }
    }
}
exports.StatusHandler = StatusHandler;
//# sourceMappingURL=handler.js.map