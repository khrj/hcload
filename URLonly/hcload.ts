import Yargs from "https://deno.land/x/yargs@v16.1.1-deno/deno.ts"
import * as path from "https://deno.land/std@0.75.0/path/mod.ts"
import hcload from "./mod.ts"

const args = Yargs(Deno.args)
    .usage("Usage: hcload -u url")
    .option("url", {
        alias: "u",
        description: "Path to url to mirror",
        demandOption: true,
    })
    .example('hcload -u https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 'Mirror a url')
    .argv

console.log("Working...")

const mirroredURL: string = await hcload(args.url)

console.log(mirroredURL)

Deno.exit(0)