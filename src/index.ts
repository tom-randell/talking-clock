#!/usr/bin/env node
import { Command } from 'commander';
import { makeTimeStringHumanFriendly } from "./conversion";

function main() {
    const program = new Command();
    program
        .name('talking-clock')
        .version('1.0.0')
        .description('CLI tool for displaying the time in a human friendly way')
        .action((args, options: any) => {
            const result = makeTimeStringHumanFriendly(options.args[0] || new Date());
            console.log(result);
        })
        .parse(process.argv);
}

export default main;