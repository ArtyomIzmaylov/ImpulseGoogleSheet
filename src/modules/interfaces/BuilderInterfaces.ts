import {PayloadInterface} from "./RequestInterfaces";

export interface BuildPayloadInterface {
    build() : PayloadInterface
}

export interface BuildStatusMessageInterface {
    build() : string
}
