export function getGreeting(name: string): string {
    if (!name.length || !name.match(/^[a-zA-Z]+$/)) {
        return 'Please enter your name in English letter.';
    } else {
        const date = new Date();
        const greeting = `Hello, ${name}! Today is ${date}`;
        return greeting;
    }
}