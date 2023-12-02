

export interface PayloadInterface {}

export interface RequestInterface {
    method : string
    headers : {}
    body : string
    payload? : string
}

export interface WhatsAppPayloadInterface extends PayloadInterface{
    channelId: string;
    chatId: string;
    chatType: string;
    text: string;
    // Другие свойства, специфичные для WhatsApp
}
export interface TelegramPayloadInterface extends PayloadInterface{
    message : string
    phone : string
    hmacMessage : string
    hmacPhone : string
}



