import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
    constructor() {}

    getCounter(): number | null {
        if (localStorage.getItem('counter')) {
            return parseInt(localStorage.getItem('counter')!, 10);
        } else {
            return null;
        }
    }

    setCounter(counter: number) {
        localStorage.setItem('counter', counter.toString());
    }

    deleteCounter() {
        localStorage.removeItem('counter');
    }
}
