import RequestManager from "../modules/core/RequestManager";
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

    async boot() {
        console.log("test panel rendered");

        const response = await RequestManager.send(
            "/api/test",
            {
                name: "John Doe",
                age: 25,
                email: "john@doe.com",
            },
            "PUT",
            {
                requestType: "json",
            },
            {
                responseType: "json",
                showToast: true,
                onSuccess: (response) => {
                    console.log(response);
                },
                onError: (error) => {
                    "aaaah Aaah"
                },
            }
        );
        console.log(response);
    }
}
