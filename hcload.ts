import Yargs from "https://deno.land/x/yargs/deno.ts";
import * as path from "https://deno.land/std/path/mod.ts"
import hcload from "https://deno.land/x/hcload/mod.ts"

const yargs = Yargs(Deno.args)
const args = yargs
    .usage("Usage: hcload -f [files...] -u [urls...]")
    .option("files", {
        alias: "f",
        description: "Path to file(s) to upload",
        type: "array",
    })
    .option("urls", {
        alias: "u",
        description: "URL(s) to host on CDN",
        type: "array",
    })
    .option("silent", {
        alias: "s",
        description: `Don't print "Working..."`,
        type: "boolean",
    })
    .example('hcload -f myPic.png', 'Upload one file')
    .example('hcload -f myPic.png vid.mp4 song.mp3', 'Upload multiple files')
    .example('hcload -u https://b.me/foo.mp3 ', 'Upload from one URL')
    .example('hcload -u https://a.me/foo.mp3 https://a.me/foo.jpg', 'Upload from multiple URLs')
    .example('hcload -u https://a.me/foo.mp3 -f myPic.png myMusic.mp3', 'Upload from file[s] and URL[s]')
    .argv

if (!args.files && !args.urls) {
    yargs.showHelp('error')
    Deno.exit(1)
}

if (!args.silent) {
    console.log("Working...")
}

const fullPaths = args.files.map((file: string) => path.resolve(file))
const urls: string[] = await hcload({
    files: fullPaths,
    urls: args.urls
})

urls.forEach(url => {
    console.log(url)
})

Deno.exit(0)