import { connect, disconnect } from 'https://deno.land/x/ngrok@2.1.0/mod.ts'
import { Application, send } from 'https://deno.land/x/oak/mod.ts'
import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'
import * as path from "https://deno.land/std/path/mod.ts";
import ky from 'https://unpkg.com/ky/index.js'

type hcloadParams = {
    files?: string[],
    urls?: string[]
}

export default function (options: hcloadParams): Promise<string[]> {
    return new Promise(async resolve => {
        if (!(options.files || options.urls)) throw "Missing params"
        let baseMap: any = {}

        if (options.files) {
            options.files.forEach((file: string) => {
                baseMap[path.parse(file).base] = file
            })
        }

        const app = new Application()
        app.use(async (context: any) => {
            await send(context, baseMap[decodeURI(context.request.url.pathname.substring(1))], { root: '/' })
        })

        app.addEventListener("listen", async ({ port }) => {
            const ngrokUrl = "https://" + await connect({ protocol: 'http', port })

            let data = []

            if (options.files) {
                Object.keys(baseMap).forEach(base => {
                    data.push(ngrokUrl + '/' + base)
                })
            }

            if (options.urls) {
                data.push(...options.urls)
            }

            // @ts-ignore
            let response = await ky.post('https://cdn.hackclub.dev/api/new', { json: data }).json()
            disconnect()
            return resolve(response)
        })

        await app.listen({ port: await getFreePort(685) })
    })
}