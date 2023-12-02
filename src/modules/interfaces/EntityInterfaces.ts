export interface StudentInterface {
    name : string
    phone : string
    manager : string
    status : string
    time? : string
}

export interface ManagerInterface {
    name : string
    phone : string
    tgNick : string
}

export interface MessageInterface {
    message : string
}

export interface ManagerWithStudentInterface {
    manager : ManagerInterface
    student : StudentInterface
}
