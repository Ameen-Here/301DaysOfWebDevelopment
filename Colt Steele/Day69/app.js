import { franc, francAll } from "franc";

import langs from "langs";

import process from "process";

const sentenceToCheck = process.argv.slice(2).join(" ");

const langCode = francAll(sentenceToCheck)[0][0];

console.log(langs.where("3", langCode).name);
