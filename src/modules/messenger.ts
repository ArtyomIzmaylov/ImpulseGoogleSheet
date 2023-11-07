import {MessengerInterface} from "./interface";
import {MessageExtractor} from "./extractors";
import {TelegramMessengerConfig} from "./telegramConfig";

export class TelegramMessenger implements MessengerInterface{
    private telegramMessengerConfig: TelegramMessengerConfig;

    constructor(telegramMessengerConfig : TelegramMessengerConfig) {
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

}
