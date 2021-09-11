import {HumanController} from "./Human.js";

export default class Game {
    static root = null;
    static humanControllers = new Array();
    static #isStarted = true;

    static init(root) {
        if(root == undefined || root == null) {
            throw("Root element must be set!");
        }

        Game.root = root;
        Game.humanControllers.push(new HumanController());

        Game.humanControllers.forEach(humanController => {
            root.appendChild(humanController.getView().getDOM());
        });

        document.querySelector("#quantity-buttons > button#plus").addEventListener("click", event => {
            let humanController = new HumanController();
            Game.humanControllers.push(humanController);
            Game.root.appendChild(humanController.getView().getDOM());
            if(!Game.#isStarted) {
                humanController.timer.stop();
            }
        });

        document.querySelector("#quantity-buttons > button#minus").addEventListener("click", event => {
            if(Game.humanControllers.length > 1) {
                let humanController = Game.humanControllers.pop();
                Game.root.removeChild(humanController.getView().getDOM())
            }
        });

        document.querySelector("#quantity-buttons > button#play").addEventListener("click", event => {
            if (Game.#isStarted) {
                Game.humanControllers.forEach(humanController => {
                    humanController.timer.stop();
                });
                Game.#isStarted = false;
                event.target.innerHTML = "&#9658;";
                
            } else {
                Game.humanControllers.forEach(humanController => {
                    humanController.timer.startTimer();
                });
                Game.#isStarted = true;
                event.target.innerHTML = "&#9632;";
            }
            
        });
    }
}

export {Game};