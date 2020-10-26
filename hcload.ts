import Yargs from "https://deno.land/x/yargs/deno.ts";
import { connect, disconnect } from 'https://deno.land/x/ngrok@2.1.0/mod.ts'
import { Application, send } from 'https://deno.land/x/oak/mod.ts'
import * as path from "https://deno.land/std/path/mod.ts";
import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'
import ky from 'https://unpkg.com/ky/index.js';

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

let baseMap: any = {}

if (args.files) {
    args.files.forEach((file: string) => {
        const fullPath: string = path.resolve(path.join(file))
        const base: string = path.parse(fullPath).base
        baseMap[base] = fullPath
    })
}

const app = new Application()
app.use(async (context: any) => {
    await send(context, baseMap[decodeURI(context.request.url.pathname.substring(1))], {root: '/'})
})

app.addEventListener("listen", async ({port}) => {
    const ngrokUrl = "https://" + await connect({protocol: 'http', port})

    let data = []

    if (args.files) {
        Object.keys(baseMap).forEach(base => {
            data.push(ngrokUrl + '/' + base)
        })
    }

    if (args.urls) {
        data.push(...args.urls)
    }

    // @ts-ignore
    let response = await ky.post('https://cdn.hackclub.dev/api/new', {json: data}).json()
  
    for (const line of response) {
        console.log(line)
    }

    disconnect()
    Deno.exit(0)
})

await app.listen({ port: await getFreePort(685) })