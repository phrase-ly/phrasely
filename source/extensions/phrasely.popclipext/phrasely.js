"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const image_1 = require("./image");
const summary_1 = require("./summary");
const langid_1 = require("./langid");
// export the actions
exports.actions = [
    {
        title: "Generate Image",
        code: image_1.default,
        icon: "image.svg",
    },
    {
        title: "Summarize",
        code: summary_1.summarize,
        icon: "summary.svg",
    },
    {
        title: "Identify Lanuggae",
        code: langid_1.identifyLanguageAction,
        icon: "langid.svg",
    },
];
