

export interface StudentInterface {
    name : string
    phone : string
    manager : string
    status : string
    time : string;
}

export interface ManagerInterface {
    name : string
    phone : string
    tgNick : string
}

export interface ManagerWithStudentInterface {
    manager : ManagerInterface
    student : StudentInterface
}

export interface ManagerRepositoryInterface {
    //init : GoogleTableObject
    getByNick(tgNick : string) : ManagerInterface
}

export interface StudentExtractorInterface {
    //init : ManagerInterface;
    extract() : StudentInterface
}

export interface ManagerExtractorInterface {
    //init: {StudentInterface, ManageInterface}
    extract() : ManagerWithStudentInterface
}


export interface MessageInterface {
    message : string
}


export interface MessageExtractorInterface {
    //init : {ManagerExtractorInterface}
    extract() : MessageInterface
}


export interface MessengerInterface {
    //init: {ConfigInterface, MessageExtractorInterface}
    send() : void
}


export interface ConfigInterface {
    get() : void
}
