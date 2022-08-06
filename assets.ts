import * as engine from './engine.js';

export var player: engine.Player = {
    name: 'player',
    inventory: [],
};

export var key: engine.Item = {
    name: 'key',
};

export var bed: engine.Item & engine.HasInventory = {
    name: 'bed',
    inventory: [key],
};

export var bedroom: engine.Scenario = {
    name: 'bedroom',
    reachableItems: [bed, key],
    actions: [
        [
            { verb: 'look', instrument: ['at', bed] },
            () => {
                engine.appendTextToStory(
                    'Your bed. Bedsheets are in complete disarray after a restless night full of nightmares',
                );
            },
        ],
        [
            { verb: 'look', instrument: ['at', key] },
            () => {
                engine.appendTextToStory('A simple and inconspicuous key');
            },
        ],
        [
            { verb: 'look', instrument: ['under', bed] },
            () => {
                const keyIdx = bed.inventory?.indexOf(key);
                if (keyIdx != -1) {
                    engine.appendTextToStory(
                        'Under the bed it is slightly darker but you manage to distinguish among disgusting specks of dust a shiny little object lying on the floor. As your eyes get used to the darkness the object revals itself as a key.',
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
                const keyIdx = bed.inventory?.indexOf(key);
                if (keyIdx != -1) {
                    engine.appendTextToStory(
                        'You pick the key and store it in your pocket.',
                    );
                    bed.inventory = bed.inventory?.splice(keyIdx);
                    player.inventory.push(key);
                } else {
                    engine.appendTextToStory(
                        'The key is already in your pocket',
                    );
                }
            },
        ],
    ],
};

export var game: engine.Game = {
    player: player,
    scenario: bedroom,
};
