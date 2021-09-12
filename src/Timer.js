import {Observable} from "./Observable.js";

export default class Timer extends Observable {
    timerId = null;
    observers = new Array();
    
    constructor() {
        super();
    }
    
    startTimer(seconds) {
        this.timerId = setTimeout(() => {
            this.notifyAll(null);
        }, seconds * 1000);
    }

    startCountDown(seconds) {
        this.timerId = setInterval(() => {
            this.notifyAll(seconds);
            seconds -= 1;
            if (seconds == 0) {
                clearInterval(timerId);
            }
        }, 1000);
    }

    stop() {
        if(this.timerId) {
            clearInterval(this.timerId);
        }
    }

}

export {Timer};