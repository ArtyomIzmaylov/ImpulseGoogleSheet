import {MessageExtractor, StudentExtractor} from "./extractors";


export class TelegramMessengerConfig {
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
            body: JSON.stringify(payload),
        };
    }
}



