"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const image_1 = require("./image");
const summary_1 = require("./summary");
// export the actions
exports.actions = [
    {
        title: "Generate Image",
        code: image_1.default,
        icon: "image.svg",
    },
    {
        title: "ChatGPT: Chat",
        code: summary_1.default,
        icon: "summary.svg",
    },
];
