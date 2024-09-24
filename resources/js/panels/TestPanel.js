import Panel from "./../Panel";

/**
 * testing functionalities will be handled here
 */
export class TestPanel extends Panel {
    constructor(config) {
        super(config);
    }

    init() {
        console.log("test panel created");
    }

    boot() {
        console.log("test panel rendered");
    }
}
