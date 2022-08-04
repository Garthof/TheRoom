let story = <HTMLTextAreaElement>document.getElementById('story');
let command = <HTMLInputElement>document.getElementById('command');

if (story != null) {
    story.innerHTML = 'Hello World! :)';
}

function appendTextToStory(text: string) {
    if (story != null) {
        story.innerHTML = story.innerHTML.concat('\n', text);
    }
}

function commandEntered() {
    console.log('Command Entered');
    if (story != null && command != null) {
        const commandText = '>'.concat(' ', command.value);
        appendTextToStory(commandText);
        console.log(commandText);
    }
}
