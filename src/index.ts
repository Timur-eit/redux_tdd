import { double } from './double';

function showDouble(num: number): void {
    const doubleNumber = double(num);
    console.log(doubleNumber);
}

showDouble(10);