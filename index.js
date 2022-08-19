#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const conversion_1 = require("./conversion");
function main() {
    const program = new commander_1.Command();
    program
        .name('talking-clock')
        .version('1.0.0')
        .description('CLI tool for displaying the time in a human friendly way')
        .action((args, options) => {
        const sanitizedInput = (0, conversion_1.sanitizeInput)(options.args[0] || new Date());
        const result = (0, conversion_1.makeTimeStringHumanFriendly)(sanitizedInput);
        console.log(result);
    })
        .parse(process.argv);
}
exports.default = main;
//# sourceMappingURL=index.js.map