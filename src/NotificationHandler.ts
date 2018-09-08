//  Created by Tyler Herbert on 9/8/18.
//  Copyright © 2018 Tyler. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { NotificationInfo } from './NotificationInfo';
import { Listener } from './Listener';

/// Class that handles passing along notifications
export class NotificationHandler {

    /// Dictionary of listeners
    private static listeners: {
        [identifier: string]: Listener[];
    } = { };

    /**
     *  Adds a listener method that will be called whenever the notification identifier is broadcasted
     *
     * @param identifier - ID of the notification to listen for
     * @param listener
     * @param object
     */
    public static addListener(identifier: string, listener: (NotificationInfo) => void, object?: any): Listener {

        // Create an array if no notifications exist for the given identifier
        if (!this.listeners[identifier]) this.listeners[identifier] = [];

        // Add the notification to the list
        const notifications = this.listeners[identifier];
        const listenerObject = new Listener(listener, identifier, object);
        notifications.push(listenerObject);

        // Return the object in case we want to remove it later
        return listenerObject;
    }

    public static removeListener(listener: Listener) {
        const listeners = this.listeners[listener.identifier];

        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
            }
        }
    }

    /**
     * Notifies all listeners of the given identifier
     *
     * @param identifier - ID of the notification to trigger
     * @param object
     */
    public static broadcast(identifier: string, object?: any) {
        const listeners = this.listeners[identifier];

        // Validate we have any notifications
        if (!listeners) return;

        // Create notification info to pass in
        const notificationInfo = new NotificationInfo(identifier, object);

        // Trigger any notifications matching the given object
        for (const listener of listeners) {
            if (!listener.object || object === listener.object) {
                const _ = async function() {
                    listener.listener(notificationInfo);
                }();
            }
        }
    }
}
