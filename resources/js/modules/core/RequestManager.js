import Core from "../../Core";

/**
 * RequestManager class is responsible for managing all requests made by the application.
 */
export default class RequestManager {
    /**
     * @typedef {Function} ResponseHandlerProtocol
     * @property {function} handle - The function to handle the response.
     */
    static #responseHandlerProtocol = null;
    static domain = "";

    /**
     * @param {string} domain - The domain to use for the request.
     *
     */
    constructor(domain) {
        this.domain = domain ?? Core.get_domain();
    }

    /**
     * Sets the domain.
     * @param {string} domain - The domain to set.
     * @returns {void}
     */
    static setDomain(domain) {
        this.domain = domain;
    }

    /**
     * Sets the domain.
     * @param {string} domain - The domain to set.
     * @returns {void}
     */
    static setDomain(domain) {
        this.domain = domain;
    }

    /**
     * @typedef {Object} RequestOptions
     * @property {boolean} [showLoading = false] - Whether to show the loading message.
     * @property {boolean} [wait = false] - Whether to wait for the request to complete.
     * @property {boolean} [useMainOrigin = false] - Whether to use the main origin.
     * @property {object} [headers = {}] - The headers to use for the request.
     * @property {("json"|"text"|"formData")} [requestType = "json"] - The type of request to send.
     * @returns {any|null} - The response from the request or null if the request failed.
     */

    /**
     * @typedef {Object} ResponseOptions
     * @property {boolean} [showToast = false] - Whether to show the toast message.
     * @property {("json"|"text"|"blob"|"arrayBuffer")} [responseType = "json"] - The type of response to return.
     * @property {boolean} [ignoreProtocol = false] - Whether to ignore the custom response protocol.
     * @property {function} [onSuccess] - The function to call on success.
     * @property {function} [onError] - The function to call on error.
     * @returns {any|null} - The response from the request or null if the request failed.
     */

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {("GET"|"POST"|"PUT"|"DELETE"|"HEAD")} method - The method to use for the request.
     * @param {RequestOptions} request_options - The options to use for the request.
     * @param {ResponseOptions} response_options - The options to use for the response.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async send(
        url,
        data,
        method = "GET",
        request_options = {
            showLoading: false,
            wait: false,
            useMainOrigin: false,
            requestType: "json",
            headers: {},
        },
        response_options = {
            showToast: false,
            responseType: "json",
            ignoreProtocol: false,
            onSuccess: (data) => data,
            onError: (error) => error,
        }
    ) {
        // create the query string
        let query_string =
            (method === "GET" || method === "HEAD") && data
                ? Object.keys(data)
                      .map((key) => `${key}=${data[key]}`)
                      .join("&")
                : null;

        // if the method is not GET or HEAD and the data is an object, add the body to the request options
        if (
            method !== "GET" &&
            method !== "HEAD" &&
            data &&
            data instanceof Object
        ) {
            if (request_options.requestType === "json") {
                request_options.body = JSON.stringify(data);
            } else if (request_options.requestType === "formData") {
                request_options.body = this.buildFormDataFromObject(data);
                console.log(request_options.body);
            } else {
                request_options.body = data;
            }
        }

        // set headers
        let content_type = "";
        switch (request_options.requestType) {
            case "json":
                content_type = "application/json";
                break;
            case "text":
                content_type = "text/plain";
                break;
            case "formData":
                content_type =
                    "multipart/form-data; charset=utf-8; boundary=" +
                    Math.random().toString().substr(2);
                break;
            default:
                content_type = "application/json";
                break;
        }
        request_options.headers = {
            Accept: "application/json",
            "Content-Type": content_type,
            ...request_options.headers,
        };

        // create the request options
        const modified_request_options = {
            method: method,
            headers: request_options.headers,
            ...request_options,
        };

        // build URL
        const URL =
            (request_options.useOtherOrigin ? "" : this.domain) +
            url +
            (query_string ?? "");

        // send the request
        const response = await fetch(URL, modified_request_options);
        console.log(response); // testing

        if (!response.ok) {
            response_options.onError(response)
            return null;
        }

        // get the response data
        const response_data =
            response_options.responseType === "json"
                ? this.responseHandler(await response.json(), response_options)
                : response_options.responseType === "text"
                ? await response.text()
                : response_options.responseType === "blob"
                ? await response.blob()
                : await response.text();

        return response_data;
    }

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {RequestOptions} options - The options to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async get(url, data, options = {}) {
        return await this.send(url, data, "GET", ...options, ...options);
    }

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {RequestOptions} options - The options to use for the request.
     * @param {object} callbacks - The callbacks to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async post(url, data, options = {}) {
        return await this.send(url, data, "POST", ...options, ...options);
    }

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {RequestOptions} options - The options to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async put(url, data, options = {}) {
        return await this.send(url, data, "PUT", ...options, ...options);
    }

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {RequestOptions} options - The options to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async delete(url, data, options = {}) {
        return await this.send(url, data, "DELETE", ...options, ...options);
    }

    /**
     * Builds a FormData object from an object.
     * @param {object} data - The object to build the FormData from.
     * @returns {FormData} - The FormData object.
     */
    static buildFormDataFromObject(data) {
        if (!(data instanceof Object)) {
            return null;
        }

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    }

    /**
     * Handles the response.
     * @param {object} response - The response to handle.
     * @returns {any} - The handled response.
     */
    static responseHandler(response, response_options) {
        return RequestManager.#handleResponse(response, response_options);
    }

    /**
     *
     * Handles the response by protocol.
     * @param {object} data - The response to handle.
     * @param {ResponseOptions} response_options - The options to use for the response.
     * @returns {object} - The handled response.
     */
    static #handleResponse(response, response_options) {
        let handled_response = response;
        if (!response_options.ignoreProtocol) {
            handled_response = this.#responseHandlerProtocol
                ? this.#responseHandlerProtocol(response, response_options)
                : this.#defaultResponseHandler(response, response_options);
        }
        return handled_response;
    }

    /**
     * Default response handler.
     * @param {object} response - The response to handle.
     * @param {ResponseOptions} response_options - The options to use for the response.
     * @returns {object} - The handled response.
     */
    static #defaultResponseHandler = (data, response_options) => {
        if (data.status === "success") {
            if (response_options.showToast) {
                Core.toast.show(
                    "success",
                    data.message ?? "Request Successful! ✅"
                );
            }

            if (
                response_options.onSuccess &&
                typeof response_options.onSuccess === "function"
            ) {
                response_options.onSuccess(data);
            }
            return data.results ?? null;
        } else if (data.status === "failed") {
            if (response_options.showToast) {
                Core.toast.show("error", data.error ?? "Request Failed! ⚠️");
            }

            if (
                response_options.onError &&
                typeof response_options.onError === "function"
            ) {
                response_options.onError(data.errors);
            }
            return null;
        } else {
            if (response_options.showToast) {
                Core.toast.show("error", "Request Failed! ⚠️"); // Error Code: 1211
            }
            response_options.onError(data);
            return null;
        }
    };

    /**
     * Sets the response handler protocol.
     * @param {ResponseHandlerProtocol} responseHandlerProtocol - The response handler protocol to use for the request.
     * @returns {void}
     */
    static setResponseHandlerProtocol(responseHandlerProtocol) {
        this.#responseHandlerProtocol = responseHandlerProtocol;
    }

    /**
     * Unsets the response handler protocol.
     * @returns {void}
     */
    static unsetResponseHandlerProtocol() {
        this.#responseHandlerProtocol = null;
    }
}
