var story: HTMLTextAreaElement;
var command: HTMLInputElement;
main();

function setup() {
    story = <HTMLTextAreaElement>document.getElementById('story');
    story.innerHTML = 'Hello World! :)';

    command = <HTMLInputElement>document.getElementById('command');
    command.addEventListener('keyup', ({ key }) => {
        if (key === 'Enter') {
            onCommandEntered();
        }
    });
    command.value = '';
}

function onCommandEntered() {
    const userInput = command.value.trim();
    console.log('User Input'.concat(' ', userInput));

    if (userInput.length > 0) {
        const commandText = '>'.concat(' ', command.value);
        appendTextToStory(commandText);
    }

    command.value = '';
}

function appendTextToStory(text: string) {
    story.innerHTML = story.innerHTML.concat('\n', text);
}

function main() {
    setup();
}
