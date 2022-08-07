import { deepEqual } from './utils.js';

export type Item = {
    name: string;
};

export type HasInventory = {
    inventory: Item[];
};

export type HasStatus = {
    status: object;
};

export type Verb = string;
export const validVerbs: Verb[] = ['use', 'look', 'pick'];

export type Preposition = string;
export const validPrepositions: Preposition[] = ['at', 'under', 'with'];

export type Action = {
    verb: Verb;
    item?: Item;
    instrument?: [Preposition, object];
};

export type Scenario = {
    name: string;
    reachableItems: Item[];
    onEnter?(): void;
    onExit?(): void;
    actions: [Action, () => void][];
};

export type Player = Item & HasInventory;

export type Game = {
    player: Player;
    scenario: Scenario;
};

export function handleUserInput(userInput: string, game: Game) {
    // Append command to story
    const commandText = '>'.concat(' ', command.value);
    appendTextToStory(commandText);

    // Process command
    const reachableItems = game.scenario.reachableItems.concat(
        game.player.inventory,
    );

    function isValidAction(action: Action | ParseError) {
        return (action as Action).verb !== undefined;
    }

    const action = parseCommand(userInput, reachableItems);
    if (isValidAction(action)) {
        for (const allowedAction of game.scenario.actions) {
            if (deepEqual(allowedAction[0], action)) {
                allowedAction[1]();
                return;
            }
        }
        appendTextToStory('I am afraid I cannot do that');
    } else {
        switch (action as ParseError) {
            case ParseError.INVALID_COMMAND:
                appendTextToStory('What you say sounds like gibberish to me');
                break;
            case ParseError.INVALID_VERB:
                appendTextToStory('I cannot understand what you want me to do');
                break;
            case ParseError.INVALID_ITEM:
                appendTextToStory('I am not aware that such a thing exists');
                break;
            case ParseError.INVALID_PREPOSITION:
                appendTextToStory('Are you sure you know how to English?');
                break;
        }
    }
}

export enum ParseError {
    INVALID_COMMAND,
    INVALID_VERB,
    INVALID_ITEM,
    INVALID_PREPOSITION,
}

export function parseCommand(text: string, items: Item[]): Action | ParseError {
    const tokens = text.trim().toLowerCase().split(/\s+/);
    switch (tokens.length) {
        case 2:
            return parseVerbItem(tokens, items);
        case 3:
            return parseVerbInstrument(tokens, items);
        case 4:
            return parseVerbItemInstrument(tokens, items);
        default:
            return ParseError.INVALID_COMMAND;
    }
}

function parseVerbItem(tokens: string[], items: Item[]): Action | ParseError {
    let idx = 0;

    const verb = parseVerb(tokens[idx++] as string);
    if (!verb) {
        return ParseError.INVALID_VERB;
    }

    const item = parseItem(tokens[idx++] as string, items);
    if (!item) {
        return ParseError.INVALID_ITEM;
    }

    return { verb: verb, item: item };
}

function parseVerbInstrument(
    tokens: string[],
    items: Item[],
): Action | ParseError {
    let idx = 0;

    const verb = parseVerb(tokens[idx++] as string);
    if (!verb) {
        return ParseError.INVALID_VERB;
    }

    const preposition = parsePreposition(tokens[idx++] as string);
    if (!preposition) {
        return ParseError.INVALID_PREPOSITION;
    }

    const item = parseItem(tokens[idx++] as string, items);
    if (!item) {
        return ParseError.INVALID_ITEM;
    }

    return { verb: verb, instrument: [preposition, item] };
}

function parseVerbItemInstrument(
    tokens: string[],
    items: Item[],
): Action | ParseError {
    let idx = 0;

    const verb = parseVerb(tokens[idx++] as string);
    if (!verb) {
        return ParseError.INVALID_VERB;
    }

    const item1 = parseItem(tokens[idx++] as string, items);
    if (!item1) {
        return ParseError.INVALID_ITEM;
    }

    const preposition = parsePreposition(tokens[idx++] as string);
    if (!preposition) {
        return ParseError.INVALID_PREPOSITION;
    }

    const item2 = parseItem(tokens[idx++] as string, items);
    if (!item2) {
        return ParseError.INVALID_ITEM;
    }

    return { verb: verb, item: item1, instrument: [preposition, item2] };
}

function parseVerb(text: string): Verb | null {
    return validVerbs.indexOf(text) >= 0 ? text : null;
}

function parseItem(text: string, items: Item[]): Item | null {
    for (const item of items) {
        if (item.name.trim().toLowerCase() === text.trim().toLowerCase()) {
            return item;
        }
    }

    return null;
}

function parsePreposition(text: string): Preposition | null {
    return validPrepositions.indexOf(text) >= 0 ? text : null;
}

export function moveToScenario(game: Game, scenario: Scenario) {
    console.log('Leaving scenario: ', game.scenario.name);
    if (game.scenario.onExit) {
        game.scenario.onExit();
    }

    console.log('Entering scenario: ', game.scenario.name);
    game.scenario = scenario;
    if (game.scenario.onEnter) {
        game.scenario.onEnter();
    }
}

export function appendTextToStory(text: string) {
    story.innerHTML = story.innerHTML.concat('\n', text);
}
