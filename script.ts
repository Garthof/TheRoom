import * as assets from './assets.js';
import * as engine from './engine.js';

function setupHTML() {
    story = document.getElementById('story') as HTMLTextAreaElement;
    story.innerHTML = 'Hello World! :)';

    command = document.getElementById('command') as HTMLInputElement;
    command.addEventListener('keyup', ({ key }) => {
        if (key === 'Enter') {
            onCommandEntered();
        }
    });
    command.value = '';

    enter = document.getElementById('enter') as HTMLButtonElement;
    enter.addEventListener('click', (_) => {
        onCommandEntered();
    });
}

function onCommandEntered() {
    const userInput = command.value.trim();
    console.log('User Input'.concat(' ', userInput));

    if (userInput.length > 0) {
        engine.handleUserInput(userInput, assets.game);
        scrollStoryToBottom();
    }

    command.value = '';
    command.focus();
}

function scrollStoryToBottom() {
    story.scrollTop = story.scrollHeight - story.clientHeight;
}

function main() {
    setupHTML();
}

main();
