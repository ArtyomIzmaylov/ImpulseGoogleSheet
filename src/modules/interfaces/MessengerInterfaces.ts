import {RequestInterface} from "./RequestInterfaces";

export interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send(url: string, request: RequestInterface): Promise<void>
    sendSync(url : string, request : RequestInterface) : void
}
