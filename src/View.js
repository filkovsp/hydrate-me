export default class View {
    constructor(controller) {
        if(controller == undefined || controller == null) {
            throw("Human Controler instance must be provided!");
        }

        this.controller = controller;
        this.root = null;
        this.init();
    }

    init() {
        throw("subclass View class and implement init() method in there!");
    }

    getDOM() {
        return this.root;
    }
}

export {View};