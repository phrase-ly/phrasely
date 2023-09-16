"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorInfo = exports.getOpenAI = void 0;
const axios_1 = require("axios");
const getOpenAI = (options) => axios_1.default.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
    timeout: 60000,
});
exports.getOpenAI = getOpenAI;
const getErrorInfo = (error) => {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response;
        //return JSON.stringify(response);
        return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
    }
    else {
        return String(error);
    }
};
exports.getErrorInfo = getErrorInfo;
