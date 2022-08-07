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

export const door: engine.Item = {
    name: 'door',
};

export const intro: engine.Scenario = {
    name: 'intro',
    inventory: [],
    onExit: function () {
        engine.appendTextToStory(
            'After a restless night you wake up suddenly without remembering who or where are you. You sit for a while on your bed trying to recall anything from your past, still trembling and sweaty from what seemed to be unending nightmares. The echo of a voice still resonates in your head as it fades out. A voice telling you, no, begging you, to leave the room.',
        );
    },
    actions: [],
};

export var bedroom: engine.Scenario & engine.HasInventory = {
    name: 'bedroom',
    inventory: [bed, door],
    onEnter: function () {
        engine.appendTextToStory(
            'You decide to get up and look around. You are surrounded by for walls. Except for the bed and a closed door, there is nothing remarkable in the room. You carefully think about what your next action will be.',
        );
    },
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
            { verb: 'look', instrument: ['at', door] },
            () => {
                engine.appendTextToStory(
                    'A wooden shut door blocks the way out. You turn the handle, but the door is locked. You try to force it, but it will not budge. If only you had the key!',
                );
            },
        ],
        [
            { verb: 'look', instrument: ['under', bed] },
            () => {
                if (!engine.hasItem(player, key)) {
                    engine.appendTextToStory(
                        'Under the bed it is slightly darker but you manage to locate among disgusting specks of dust a shiny little object lying on the floor. As your eyes get used to the darkness the object revals itself as a key.',
                    );
                    engine.addItem(bedroom, key);
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
                if (engine.hasItem(bedroom, key)) {
                    engine.appendTextToStory(
                        'You pick the key and store it in your pocket.',
                    );
                    engine.moveItem(bedroom, player, key);
                } else if (engine.hasItem(player, key)) {
                    engine.appendTextToStory(
                        'The key is already safely stored in your pocket.',
                    );
                }
            },
        ],
        [
            { verb: 'use', item: key, instrument: ['with', door] },
            () => {
                engine.appendTextToStory(
                    'With a trembling hand you place the key in the keyhole and start turning it. The lock mechanism is released. You pick the handle and open the door. You see an uninviting corridor that goes into the darkness. As you prepare yourself to cross the threshold, a faint voice echoes again in your head: "Hurry up!" You think you have become crazy, but have you any other choice? You look back in the room, before steping in the poorly lit corridor. Your adventure is just starting...',
                );
                engine.moveToScenario(game, ending);
            },
        ],
    ],
};

export const ending: engine.Scenario = {
    name: 'ending',
    inventory: [],
    onEnter: function () {
        engine.appendTextToStory(
            '\n\nThe game is over. Thanks for playing!\n\nAuthor: Julián Lamas-Rodríguez',
        );
        command.disabled = true;
        enter.disabled = true;
    },
    actions: [],
};

export var game: engine.Game = {
    player: player,
    scenario: intro,
};
