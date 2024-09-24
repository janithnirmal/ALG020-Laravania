import Core from "../Core";
import Panel from "./../Panel";

/**
 * dashboard functionalities will be handled here
 */
export class DashboardPanel extends Panel {
    constructor(config) {
        super(config);
    }

    init() {
       
    }

    boot() {
        console.log("dashboard panel rendered");
    }
}
