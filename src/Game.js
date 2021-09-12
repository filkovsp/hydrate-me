import {Human} from "./Human.js";

export default class Game {
    static root = null;
    static humans = new Array();
    static #isStarted = true;

    static init(root) {
        if(root == undefined || root == null) {
            throw("Root element must be set!");
        }

        Game.root = root;
        Game.humans.push(new Human());

        Game.humans.forEach(human => {
            root.appendChild(human.getView().getDOM());
        });

        document.querySelector("#quantity-buttons > button#plus").addEventListener("click", event => {
            let human = new Human();
            Game.humans.push(human);
            Game.root.appendChild(human.getView().getDOM());
            if(!Game.#isStarted) {
                human.sleep();
            }
        });

        document.querySelector("#quantity-buttons > button#minus").addEventListener("click", event => {
            if(Game.humans.length > 1) {
                let human = Game.humans.pop();
                Game.root.removeChild(human.getView().getDOM())
            }
        });

        document.querySelector("#quantity-buttons > button#play").addEventListener("click", event => {
            if (Game.#isStarted) {
                Game.humans
                    .filter(human => human.isAlive())
                    .forEach(human => human.sleep());
                Game.#isStarted = false;
                event.target.innerHTML = "&#9658;";
                
            } else {
                Game.humans
                    .filter(human => human.isAlive())
                    .forEach(human => {human.wakeUp();
                });
                Game.#isStarted = true;
                event.target.innerHTML = "&#9632;";
            }
            
        });
    }
}

export {Game};