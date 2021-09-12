import {Bottle} from "./Bottle.js";
import {View} from "./View.js";
import {Timer} from "./Timer.js";
import {randomIntBetween} from "./Utils.js";

export default class HumanController {
    constructor(parent = null) {
        this.parent = parent;
        this.humanModel = new HumanModel();
        this.humanView = new HumanView(this);
        this.bottle = new Bottle(this);

        this.humanView.appendChild(this.bottle.bottleView.getDOM());

        let btnTopUp = document.createElement("button");
        btnTopUp.className = "btn-top-up";
        btnTopUp.textContent = "Top me up!";
        btnTopUp.id = this.id;
        btnTopUp.addEventListener("click", event => {
            this.topUp();
        });
        
        this.humanView.appendChild(btnTopUp);

        this.timer = new Timer();
        this.timer.addObserver(this);
        this.wakeUp();
    }

    update() {
        if(this.bottle.isEmpty()) {
            this.die();
        } else {
            this.drink();
        }
    }

    die() {
        this.humanView.die();
        this.humanModel.die();
    }

    drink() {
        this.bottle.drink();
        if(this.humanModel.isSleeping) {
            this.timer.stop();
            this.timer.startTimer(randomIntBetween(5, 7));
        } else {
            this.timer.stop();
            this.timer.startTimer(randomIntBetween(1, 3));
        }
    }

    isAlive() {
        return this.humanModel.isAlive;
    }

    sleep() {
        if(this.humanModel.isAlive) {
            this.humanView.sleep();
            this.humanModel.isSleeping = true;
        }
    }

    wakeUp() {
        if(this.humanModel.isAlive) {
            this.humanView.wakeUp();
            this.humanModel.isSleeping = false;
        }
        this.drink();
    }

    topUp(){
        if(this.isAlive()) {
            this.bottle.pour();
        }
    }

    getView() {
        return this.humanView;
    }
}

class HumanModel {
    constructor() {
        this.isAlive = true;
        this.isSleeping = false;
    }

    die() {
        this.isAlive = false;
    }
}

class HumanView extends View {

    constructor(controller) {
        super(controller);
    }
    
    init() {
        this.root = document.createElement("div");
        this.root.className = "human";

        this.face = document.createElement("p");
        this.face.className = "human-face";
        this.root.appendChild(this.face);
        this.wakeUp();
    }

    appendChild(child) {
        this.root.append(child);
    }

    die() {
        this.face.innerHTML = "&#128532;";
    }

    sleep() {
        this.face.innerHTML = "&#128524;";
    }

    wakeUp() {
        this.face.innerHTML = "&#128540;";
    }

}

export {HumanController as Human};