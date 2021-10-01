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

        btnTopUp.addEventListener("click", event => {
            this.topUp();
        });
        
        this.humanView.appendChild(btnTopUp);

        this.timer = new Timer();
        this.timer.addObserver(this);
        this.timer.startTimer(randomIntBetween(2, 5));
        
        this.wakeUp();
    }

    isAlive() {
        return this.humanModel.isAlive;
    }

    isDead() {
        return !this.humanModel.isAlive;
    }

    getView() {
        return this.humanView;
    }

    update() {
        if(this.bottle.isEmpty()) {
            this.die();
        } else {
            this.drink();
        }
    }

    topUp(){
        if(this.isAlive()) {
            this.bottle.pour();
        }
    }

    drink() {
        if(this.isDead()) {
            return;
        }

        this.bottle.drink();
        if(this.humanModel.isSleeping) {
            this.timer.stop();
            this.timer.startTimer(randomIntBetween(5, 7));
        } else {
            this.timer.stop();
            this.timer.startTimer(randomIntBetween(1, 3));
        }
    }

    die() {
        this.humanView.setFace("&#128532;");
        this.humanModel.isAlive = false;
    }

    sleep() {
        if(this.isAlive()) {
            this.humanView.setFace("&#128524;");
            this.humanModel.isSleeping = true;
            this.timer.stop();
            this.timer.startTimer(randomIntBetween(5, 7));
        }
    }

    wakeUp() {
        if(this.isAlive()) {
            this.humanView.setFace("&#128540;");
            this.humanModel.isSleeping = false;
        }
        this.drink();
    }

}

class HumanModel {
    constructor() {
        this.isAlive = true;
        this.isSleeping = false;
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
        // this.wakeUp();
    }

    appendChild(child) {
        this.root.append(child);
    }

    setFace(faceCode) {
        /* 
            More about emojis here: 
            https://www.w3schools.com/charsets/ref_emoji_smileys.asp 
            https://www.w3schools.com/charsets/ref_emoji.asp
        */
        this.face.innerHTML = faceCode;
    }
}

export {HumanController as Human};