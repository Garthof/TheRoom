import * as engine from './engine.js';

export var player: engine.Player = {
    name: 'player',
    inventory: [],
};

export const key: engine.Item = {
    name: 'key',
};

export const bed: engine.Item = {
    name: 'bed',
};

export const intro: engine.Scenario = {
    name: 'intro',
    reachableItems: [],
    onExit: function () {
        engine.appendTextToStory(
            'After a restless night you wake up suddenly without remembering who or where are you. You sit for a while on your bed trying to recall anything from your past, still trembling and sweaty from what seemed to be unending nightmares. The echo of a voice still resonates in your head as it dims out. A voice telling you, no, begging you, to leave the room.',
        );
    },
    actions: [],
};

export var bedroom: engine.Scenario = {
    name: 'bedroom',
    reachableItems: [bed, key],
    actions: [
        [
            { verb: 'look', instrument: ['at', bed] },
            () => {
                engine.appendTextToStory(
                    'A bed. Bedsheets are in complete disarray after a restless night full of nightmares.',
                );
            },
        ],
        [
            { verb: 'look', instrument: ['at', key] },
            () => {
                engine.appendTextToStory('A simple and inconspicuous key.');
            },
        ],
        [
            { verb: 'look', instrument: ['under', bed] },
            () => {
                const keyIdx = bedroom.reachableItems.indexOf(key);
                if (keyIdx != -1) {
                    engine.appendTextToStory(
                        'Under the bed it is slightly darker but you manage to locate among disgusting specks of dust a shiny little object lying on the floor. As your eyes get used to the darkness the object revals itself as a key.',
                    );
                } else {
                    engine.appendTextToStory(
                        'You see nothing but specks of dust under the bed.',
                    );
                }
            },
        ],
        [
            { verb: 'pick', item: key },
            () => {
                const keyIdx = bedroom.reachableItems.indexOf(key);
                if (keyIdx != -1) {
                    engine.appendTextToStory(
                        'You pick the key and store it in your pocket.',
                    );
                    bedroom.reachableItems.splice(keyIdx, 1);
                    player.inventory.push(key);
                } else {
                    engine.appendTextToStory(
                        'The key is already in your pocket.',
                    );
                }
            },
        ],
    ],
};

export var game: engine.Game = {
    player: player,
    scenario: intro,
};
