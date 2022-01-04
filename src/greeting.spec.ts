import { getGreeting } from "./greeting";

describe('Greeting', () => {    
    const year = new Date().getFullYear();
    const name1 = 'John';
    const name2 = 'Bob';
    const name3 = '';
    const incorrectNameResult = 'Please enter your name in English letter.';
    
    it('Get correct greeting', () => {
        expect(getGreeting(name1)).toMatch(/Hello, John!/);
        expect(getGreeting(name2)).toMatch(/Hello, Bob!/);
        expect(getGreeting(name3)).toMatch(/Please enter your name/);
        expect(getGreeting(name1)).not.toMatch(incorrectNameResult);
        expect(getGreeting(name1)).not.toMatch(incorrectNameResult);
        expect(getGreeting('.')).toMatch(incorrectNameResult);
        expect(getGreeting('QWERTY')).not.toMatch(incorrectNameResult);
        expect(getGreeting('QWERTY111')).toMatch(incorrectNameResult);
        expect(getGreeting('123')).toMatch(incorrectNameResult);
        expect(getGreeting(name1)).toMatch(`${year}`);
    });
})