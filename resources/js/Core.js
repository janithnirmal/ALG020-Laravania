import Config from "./Config";
import EventManager from "./modules/core/EventManager";
import LocalStorageManager from "./modules/core/LocalStorageManager";
import RequestManager from "./modules/core/RequestManager";
import ToastManager from "./modules/core/ToastManager";

import { APIRequestHandler } from "./modules/optional/Algowrite";
import { ExtendedDatatables } from "./modules/optional/ExtendedDatatables";
import { NotificationManager } from "./modules/optional/NotificationManager";
import { ImageInputManager } from "./modules/optional/ImageInputManager";
import { AttributeObserver } from "./modules/optional/AttributeObserver";

/**
 * Core class is a singleton class that is responsible for managing all the plugins and features of the application.
 *
 * @description
 * **Directly dependant on the following dependancies**
 *
 * ***core plugins***
 * - Config
 * - EventManager
 * - RequestManager
 * - LocalStorageManager
 *
 * ***optional plugins***
 * - AttributeObserver
 * - NotificationManager
 * - ToastManager
 * - ImageInputManager
 * - ExtendedDatatables
 */
export default class Core extends Config {
    // core plugins
    //
    //
    //
    /** @type {EventManager} */
    static EM = null;
    /** @type {RequestManager} */
    static RM = null;
    /** @type {LocalStorageManager} */
    static LSM = null;
    /** @type {ToastManager} */
    static toast = null;
    //
    //
    //====================================

    // optional plugins
    //
    //
    //
    /** @type {APIRequestHandler} */
    static APIR = null;
    /** @type {NotificationManager} */
    static NM = null;
    /** @type {AttributeObserver} */
    static AO = null;
    /** @type {ExtendedDatatables} */
    static EDT = null;
    /** @type {ImageInputManager} */
    static ImageInputManager = null;
    //
    //
    //====================================

    constructor() {
        super();
        console.log("plugins initializing...");
        this.#_init_core_plugins(); // register core plugins
        this.#_init_optional_plugins(); // register optional plugins
        console.log("plugins initialized...");
    }

    /**
     * @description
     * initialize core plugins
     */
    #_init_core_plugins() {
        try {
            Core.EM = new EventManager();
            Core.RM = new RequestManager();
            Core.LSM = new LocalStorageManager();
            Core.toast = new ToastManager();
        } catch (error) {
            console.error(error);

            alert("Missing Plugins! ⚠️");
            console.error("Plugin Not Found!");
        }
    }

    /**
     * @description
     * initialize optional plugins
     */
    #_init_optional_plugins() {
        try {
            Core.EDT = new ExtendedDatatables();
            Core.APIR = new APIRequestHandler("http://localhost:9001");
            Core.NM = new NotificationManager(
                "http://localhost:9001/api/notification"
            );
            Core.ImageInputManager = new ImageInputManager();
            Core.AO = new AttributeObserver();
        } catch (error) {
            console.error(error);

            alert("Missing Plugins! ⚠️");
            console.error("Plugin Not Found!");
        }
    }
}
