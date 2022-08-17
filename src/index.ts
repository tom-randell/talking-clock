#!/usr/bin/env node
import program = require('commander');
import { makeTimeStringHumanFriendly } from "./conversion";

function main() {
    program
        .name('talking-clock')
        .version('1.0.0')
        .description('CLI tool for displaying the time in a human friendly way')
        .action((timeArg: string, options: any) => {
            const result = makeTimeStringHumanFriendly(timeArg || new Date());
            console.log(result);
        })
        .parse(process.argv);
}

export default main;