import Yargs from "https://deno.land/x/yargs@v16.1.1-deno/deno.ts"
import * as path from "https://deno.land/std@0.75.0/path/mod.ts"
import hcload from "./mod.ts"

const args = Yargs(Deno.args)
    .usage("Usage: hcload -f file")
    .option("file", {
        alias: "f",
        description: "Path to file to upload",
        demandOption: true,
    })
    .example('hcload -f myPic.png', 'Upload a file')
    .argv

console.log("Working...")

const fullPath = path.resolve(args.file)
const url: string = await hcload(fullPath)

console.log(url)

Deno.exit(0)