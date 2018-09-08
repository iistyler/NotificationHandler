import { Listener } from './Listener';
export declare class NotificationHandler {
    private static listeners;
    /**
     *  Adds a listener method that will be called whenever the notification identifier is broadcasted
     *
     * @param identifier - ID of the notification to listen for
     * @param listener
     * @param object
     */
    static addListener(identifier: string, listener: (NotificationInfo: any) => void, object?: any): Listener;
    static removeListener(listener: Listener): void;
    /**
     * Notifies all listeners of the given identifier
     *
     * @param identifier - ID of the notification to trigger
     * @param object
     */
    static broadcast(identifier: string, object?: any): void;
}
