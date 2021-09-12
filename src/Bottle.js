import {View} from "./View.js";

export default class BottleController {
    static CAPACITY = 10;
    constructor(parent) {
        this.parent = parent;    
        this.bottleModel = new BottleModel(BottleController.CAPACITY);
        this.bottleView = new BottleView(this);
        this.bottleView.updateBottleLevel(this.getVolume());
    }

    getVolume() {
        return this.bottleModel.volume;
    }

    getCapacity() {
        return BottleController.CAPACITY;
    }

    fillUp() {
        this.bottleModel.volume = BottleController.CAPACITY;
        this.bottleView.updateBottleLevel(this.getVolume());
        return true;
    }

    pour() {
        if(this.bottleModel.volume <= BottleController.CAPACITY - 1) {
            this.bottleModel.volume += 1;
            this.bottleView.updateBottleLevel(this.getVolume());
            return true;
        }
        
        return false;
    }

    drink() {
        if (this.bottleModel.volume >= 1) {
            this.bottleModel.volume -= 1;
            this.bottleView.updateBottleLevel(this.getVolume());
            return true;
        }
        
        return false;
    }

    isFull() {
        return this.bottleModel.volume > 0;
    }

    isEmpty() {
        return this.bottleModel.volume == 0;
    }
}

class BottleModel {
    constructor(volume = 0) {
        this.volume = Number(volume);
    }
}

class BottleView extends View {
    
    constructor(controller) {
        super(controller);
    }

    init() {
        this.root = document.createElement("div");
        this.root.className = "bottle";
        
        for(let i = 0; i < this.controller.getCapacity(); i++) {
            this.root.innerHTML += `<div class="bottle-section"></div>\n`;
        }
    }
    
    updateBottleLevel(level) {
        Array.from(this.root.children)
            .reverse()
            .forEach((bottleSection, index) => {
                if(index < level) {
                    bottleSection.style.backgroundColor = "#5d9ae5";
                } else {
                    bottleSection.style.backgroundColor = "";
                }
            });
    }
}

export {BottleController as Bottle};