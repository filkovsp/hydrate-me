export default class Observable {
    constructor() {
        this.observers = new Array();
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(observer, message) {
        if(this.observers.indexOf(observer) > -1) {
            observer.update(message);
        }
    }

    notifyAll(message) {
        this.observers.forEach(observer => {
            observer.update(message);
        });
    }
}

export {Observable};