type Action = {
    text: string;
};
const useAction: Action = { text: 'use' };
const lookAction: Action = { text: 'look' };
const pickAction: Action = { text: 'pick' };

type ActionEffect = {
    action: Action;
    effect: () => void;
};

interface Item {
    validActions: ActionEffect[];
}

class DescribableItem implements Item {
    description: string;
    validActions: ActionEffect[];

    constructor(description: string, actions: ActionEffect[]) {
        this.description = description;
        this.validActions = actions;
        this.validActions.push({
            action: lookAction,
            effect: () => {
                appendTextToStory(description);
            },
        });
    }
}

class Room extends DescribableItem {
    items: Item[];

    constructor(description: string, actions: ActionEffect[], items: Item[]) {
        super(description, actions);
        this.items = items;
    }
}
