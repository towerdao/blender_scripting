import * as fs from 'fs';

import { CandyMachine, TraitValuePair } from "./candymachine";

import configjson from "./configjson";

import { weightedRand, mapEntries, filterEntries } from "./helpers";

import * as ENV from '../../env.json';

//@ts-ignore
function filterAndWeight(attribute, ctx) {
    //@ts-ignore
    const filtered = mapEntries(filterEntries(attribute.attributes, ({ include }) => include(ctx)), ({ weight }) => weight);

    return weightedRand(filtered)();
}

function* range(start: number, end: number) {
    for (let i = start; i < end; i++) yield i;
}

for (const index of range(ENV['RANGESTART'], ENV['RANGEEND'])) {
    const base = { };

    //@ts-ignore
    for (const [key, attribute] of Object.entries(configjson)) { //@ts-ignore
        const found = filterAndWeight(attribute, base); //@ts-ignore
        if (found != "None") base[key] = found;
    }

    if (fs.existsSync(`./built/${index}.blend.json`)) throw new Error(`File "./built/${index}.blend.json" already exists`);

    fs.writeFile(`./built/${index}.blend.json`, JSON.stringify(base), err => {
        if (err) {
            console.error(err)
            return
        }
    });

    const candyItem = CandyMachine.constructCandyMachineItem({
        itemName: ENV['CANDYITEM']['itemName'].replace("$index", index.toString()),
        itemNumber: index,
        externalUrl: ENV['CANDYITEM']['externalUrl'].replace("$index", index.toString()),
        project: ENV['CANDYITEM']['project'],
        collection: ENV['CANDYITEM']['collection'], //@ts-ignore
        attributes: Object.entries(configjson).map(([key, attribute]) => (base[key] != null ? { //@ts-ignore
            trait_type: attribute.label, //@ts-ignore
            value: attribute.attributes[base[key]].label //@ts-ignore
        } as TraitValuePair : undefined)),
        creators: ENV['CANDYITEM']['creators'],
    });

    if (fs.existsSync(`./built/${index}.json`)) throw new Error(`File "./built/${index}.json" already exists`);

    fs.writeFile(`./built/${index}.json`, JSON.stringify(candyItem), err => {
        if (err) {
            console.error(err)
            return
        }
    });
}

console.log("Completed");
console.log("");