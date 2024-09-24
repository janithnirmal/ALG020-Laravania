/**
 * RequestManager class is responsible for managing all requests made by the application.
 */
export default class RequestManager {
    /**
     * @typedef {Function} ResponseHandlerProtocol
     * @property {function} handle - The function to handle the response.
     */
    static #responseHandlerProtocol = null;

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
     * @property {boolean} [showError = false] - Whether to show the error message.
     * @property {boolean} [showLoading = false] - Whether to show the loading message.
     * @property {boolean} [showToast = false] - Whether to show the toast message.
     * @property {function} [onSuccess] - The function to call on success.
     * @property {function} [onError] - The function to call on error.
     * 
     * @returns {any|null} - The response from the request or null if the request failed.
     */

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {string} method - The method to use for the request.
     * @param {RequestOptions} options - The options to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async send(
        url,
        data,
        method = "GET",
        options = {
            showError: false,
            showLoading: false,
            showToast: false,
            onSuccess: () => {},
            onError: () => {},
        }
    ) {}

    /**
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send with the request.
     * @param {RequestOptions} options - The options to use for the request.
     *
     * @returns {Array|Object|string|boolean} - The response from the request.
     */
    static async get(url, data, options = {}) {
        return await this.send(url, null, "GET", options);
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
    static async post(url, data, options = {}, callbacks = {}) {
        return await this.send(url, data, "POST", options, callbacks);
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
        return await this.send(url, data, "PUT", options);
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
        return await this.send(url, data, "DELETE", options);
    }

    static responseHandler(response) {
        const handledResponse = RequestManager.#handleResponse(response);
        return response.data;
    }

    /**
     * Handles the response by protocol.
     * @param {object} response - The response to handle.
     * @returns {object} - The handled response.
     */
    static #handleResponse(response) {
        return this.#responseHandlerProtocol
            ? this.#responseHandlerProtocol(response)
            : this.#defaultResponseHandler(response);
    }

    /**
     * Default response handler.
     * @param {object} response - The response to handle.
     * @returns {object} - The handled response.
     */
    static #defaultResponseHandler = (response) => {
        return response;
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
