export const emptyResponseCodes = [202, 204];
export class Api {
    config;
    authToken;
    constructor(config) {
        this.config = config;
        this.authToken = config.authToken;
    }
    async httpRequest(path, config) {
        let json;
        const headers = new Headers(config.headers);
        headers.append("authorization", this.authToken);
        const url = new URL(path, this.config.baseUrl);
        const request = new Request(url, { ...config, headers });
        try {
            const response = await fetch(request);
            if (response.ok && !emptyResponseCodes.includes(response.status)) {
                json = await response.json();
            }
            if (response.status === 403) {
                this.config.errorHandler();
            }
            return {
                status: response.status,
                response: json,
            };
        }
        catch (error) {
            console.error(`Api encountered an error performing request: ${error}`);
        }
        return null;
    }
    async get(path, config) {
        return await this.httpRequest(path, {
            method: "get",
            ...config,
        });
    }
    async post(path, body, config) {
        return await this.httpRequest(path, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
            ...config,
        });
    }
    async put(path, body, config) {
        return await this.httpRequest(path, {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
            ...config,
        });
    }
    async delete(path, config) {
        return await this.httpRequest(path, {
            method: "delete",
            ...config,
        });
    }
    setAuthToken(authToken) {
        this.authToken = authToken;
    }
}
//# sourceMappingURL=Api.js.map