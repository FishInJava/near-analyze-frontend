// Temporary workaround for returning JSON payloads for non-200 (failed) responses
// Remove this file when this fix is implemented in `fetch-send-json`

let fetch = window.fetch;
// 怎么判断是nodejs还是浏览器端？
const createError = require('http-errors');

async function sendJson(method, url, json) {
    const response = await fetch(url, {
        method: method,
        body: method !== 'GET' ? JSON.stringify(json) : undefined,
        headers: { 'Content-type': 'application/json; charset=utf-8' }
    });

    if (!response.ok) {
        const body = await response.text();
        let parsedBody;

        try {
            parsedBody = JSON.parse(body);
        } catch (e) {
            throw createError(response.status, body);
        }

        throw createError(response.status, parsedBody);
    }
    if (response.status === 204) {
        // No Content
        return null;
    }
    return await response.json();
};

export {sendJson}