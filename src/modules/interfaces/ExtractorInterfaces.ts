import {ManagerWithStudentInterface, MessageInterface, StudentInterface} from "./EntityInterfaces";

export interface StudentExtractorInterface {
    //init : ManagerInterface;
    extract() : StudentInterface
}

export interface ManagerExtractorInterface {
    //init: {StudentInterface, ManageInterface}
    extract() : ManagerWithStudentInterface
}

export interface MessageExtractorInterface {
    //init : {ManagerExtractorInterface}
    extract() : MessageInterface
}

import {RequestInterface} from "./RequestInterfaces";

export interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send(url: string, request: RequestInterface): Promise<void>
    sendSync(url : string, request : RequestInterface) : void
}
