import Core from "./Core";
import { DashboardPanel } from "./panels/DashboardPanel";
import { TestPanel } from "./panels/TestPanel";

/**
 * repesent an instance of admin panel and mange all the features regarding the admin panel
 *
 * @description
 * **Directly dependant on the following dependancies**
 * - Core
 */
export default class Admin extends Core {
    static #instance = null;
    static get instance() {
        return Admin.#instance ?? null;
    }

    /**
     * @typedef {Object} AdminPanelInfo
     * @property {Date} started_time
     * @property {("live"|"offline"|"connecting"|"crashed")} state
     * @property {string} activePanelName
     */

    /**
     * @type {AdminPanelInfo}
     */
    info = null;

    /**
     * @typedef {Object} AdminPanelUI
     * @property {Array<Panel>} panels
     */

    /**
     * @type {AdminPanelUI}
     */
    UI = null;

    /**
     * @type {Panel}
     */
    activePanel = null;

    /**
     * @typedef {Object} AdminPanelData
     * @property {string} application_name
     * @property {string} application_version
     * @property {string} application_copyright
     */

    /**
     * @type {AdminPanelData}
     */
    data = {
        application_name: "Algowrite",
        application_version: "1.0.0",
        application_copyright:
            "Made with ❤️ by Algowrite © 2024. Free and Open Source for everyone.",
    };

    constructor() {
        super();
        Admin.#instance = this; // not required
        this.#init();
    }

    /**
     * testing method
     */
    async test() {
        console.log("test ===> start");
        console.log(this.info.started_time);
    }

    /**
     * initial panel bootstrap
     */
    async #init() {
        // set config data
        this.info = {
            started_time: new Date(),
            state: "live",
            activePanelName: "test", // default panel
        };

        this.activePanel = null;

        this.UI = {
            panels: this.#createPanels(),
        };

        // bootstrap functions
        await this.#boot();
    }

    /**
     * admin event subscriber
     */
    async #boot() {
        // set switch listners
        document
            .querySelectorAll("[data-admin-panel-switch]")
            .forEach((button) => {
                button.addEventListener("click", () => {
                    Admin.switchPanel(button.dataset.adminPanelSwitch);
                });
            });

        // load default panel
        Admin.switchPanel(this.info.activePanelName);
    }

    /**
     *
     * @returns {Admin|null} - returns the admin panel object
     */
    static getInstance() {
        return Admin.instance ?? null;
    }

    // UI manager
    /**
     *
     * @returns {Array<Panel>} - list of all the panels
     */
    #createPanels() {
        const panels = [
            new TestPanel({ name: "test" }),
            new DashboardPanel({ name: "dashboard" }),
        ];

        return panels;
    }

    /**
     * get all the initiated panels
     *
     * @returns {Array<Panel>} - panels list
     */
    static getPanelList() {
        return Admin.getInstance().UI.panels;
    }

    /**
     * get all the initiated panels
     *
     * @param {string} name - panel name
     * @returns {Panel} - panel
     */
    static getPanel(name) {
        Admin.getPanelList().forEach((panel) => {
            if (panel.name === name) {
                return panel;
            }
        });
        return null;
    }

    /**
     * returns current panel
     *
     * @returns {Panel} - current panel
     */
    static getCurrentPanel() {
        return Admin.getInstance().activePanel ?? null;
    }

    /**
     * change the main panel into a different panel
     *
     * @param {string} name panel name
     */
    static async switchPanel(name) {
        const adminPanel = Admin.getInstance();
        Admin.getPanelList().forEach(async (panel) => {
            if (panel.getName() === name) {
                await panel.render();
                adminPanel.info.activePanelName = name;
                adminPanel.activePanel = Admin.getPanel(name);
            }
        });
    }
}
