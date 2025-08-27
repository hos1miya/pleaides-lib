"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
exports.isAPIError = isAPIError;
const PL_API_ERROR = Symbol();
function isAPIError(reason) {
    return reason[PL_API_ERROR] === true;
}
class APIClient {
    constructor(opts) {
        this.origin = opts.origin;
        this.credential = opts.credential;
        this.fetch = opts.fetch || ((...args) => fetch(...args));
    }
    request(endpoint, params = {}, credential) {
        const promise = new Promise((resolve, reject) => {
            this.fetch(`${this.origin}/api/${endpoint}`, {
                method: 'POST',
                body: JSON.stringify({
                    ...params,
                    i: credential !== undefined ? credential : this.credential,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'omit',
                cache: 'no-cache',
            }).then(async (res) => {
                const body = res.status === 204 ? null : await res.json();
                if (res.status === 200) {
                    resolve(body);
                }
                else if (res.status === 204) {
                    resolve(null);
                }
                else {
                    reject({
                        [PL_API_ERROR]: true,
                        ...body.error,
                    });
                }
            }).catch(reject);
        });
        return promise;
    }
}
exports.APIClient = APIClient;
//# sourceMappingURL=api.js.map