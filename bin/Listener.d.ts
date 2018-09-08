export declare class Listener {
    listener: (NotificationInfo: any) => void;
    identifier: string;
    object?: any;
    constructor(listener: (NotificationInfo: any) => void, identifier: string, object?: any);
}
