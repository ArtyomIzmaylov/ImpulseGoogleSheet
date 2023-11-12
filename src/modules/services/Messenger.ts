import {MessengerInterface} from "../interfaces/MessengerInterfaces";
import {RequestInterface} from "../interfaces/RequestInterfaces";

declare var UrlFetchApp: {
    fetch(url:  any, param : any) : any
};



export class Messenger implements MessengerInterface{

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

