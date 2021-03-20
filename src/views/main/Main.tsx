import React, { useEffect, useRef } from 'react';
import { DytePlugin, Events } from 'dyte-plugin-sdk';

const PLUGIN_ID = process.env.PLUGIN_ID;

export default function Main() {
    const plugin = useRef<DytePlugin>(new DytePlugin(PLUGIN_ID)).current;

    useEffect(() => {
        
        plugin.on(Events.initialized, async () => {
            console.log('Plugin initialized');
            // console.log('JoinedPeers:', await plugin.getJoinedPeers())

            console.log('Sending chat message');
            await plugin.sendChatMessage("Hello, this message is from a plugin!");
            await plugin.triggerEvent("test");

            const store = plugin.store("TST");

            // View the whole store
            console.log(store.getAll());

            // Get a single key from the store
            console.log(store.get("hello"));

            // set keys on a store
            store.set("hello", "test123")
            store.set("another", "value");

            // Subscribe for changes on a key in the store (the above set will also trigger a subscribe change here)
            store.subscribe("hello", (data) => {
                // data has the whole store
                console.log(data);
            });

            // You can make multiple stores to seperate different kinds of data!
            const anotherStore = plugin.store("Hello");
            anotherStore.set("anotherKey", "anotherValue");
            anotherStore.subscribe("anotherKey", (data) => {
                console.log(data);
            });
        });

        plugin.on(Events.peerJoined, (peer) => {
            console.log('Peer joined: ', peer);
        });

        plugin.on(Events.pluginEvent, (data) => {
            // The "test" event we triggered above should be caught here!
            console.log(data);
        })
        plugin.on(Events.peerClosed, (peer) => {
            console.log('Peer closed: ', peer);
        });
        plugin.on(Events.chatMessage, (message) => {
            console.log('Chat message received', message);
        });
    }, [plugin]);

    return (
        <div>

        </div>
    );
}
