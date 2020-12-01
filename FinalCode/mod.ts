import { connect, disconnect } from 'https://deno.land/x/ngrok@2.1.0/mod.ts'
import { Application, send } from 'https://deno.land/x/oak@v6.3.1/mod.ts'
import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'
import ky from 'https://unpkg.com/ky/index.js'
import * as path from "https://deno.land/std@0.75.0/path/mod.ts"

export default async function (filePath: string): Promise<string> {
    return new Promise(async resolve => {
        const fileBase = path.parse(filePath).base

        const app = new Application()
        app.use(async (context: any) => {
            await send(context, filePath, { root: '/' })
        })

        app.addEventListener("listen", async ({ port }) => {
            const ngrokUrl = `https://${await connect({ protocol: 'http', port })}/${fileBase}`

            // @ts-ignore
            let response: string[] = await ky.post('https://cdn.hackclub.com/api/new', { json: [ngrokUrl] }).json()
 
            disconnect()
            return resolve(response[0])
        })

        await app.listen({ port: await getFreePort(2048) })
    }) as Promise<string>
}