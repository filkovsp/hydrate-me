import {Bottle} from "./Bottle.js";
import {View} from "./View.js";
import {Timer} from "./Timer.js";

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
        this.timer.startTimer();
    }

    update() {
        if(this.bottle.isEmpty()) {
            this.die();
        } else {
            this.bottle.drink();
            this.timer.startTimer();
        }
    }

    die() {
        this.humanView.die();
        this.humanModel.die();
    }

    isAlive() {
        return this.humanModel.isAlive;
    }

    sleep() {
        if(this.humanModel.isAlive) {
            this.humanView.sleep();
            this.timer.stop();
        }
    }

    wakeUp() {
        if(this.humanModel.isAlive) {
            this.humanView.wakeUp();
            this.timer.startTimer();
        }
    }

    topUp(){
        if(this.humanModel.isAlive) {
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
        this.face.innerHTML = "&#128540;";
        this.root.appendChild(this.face);
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