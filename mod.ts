import { Application, Ngrok, path, send } from "./deps.ts"

type hcloadParams = {
    files?: string[]
    urls?: string[]
}

export default function(options: hcloadParams): Promise<string[]> {
    return new Promise(resolve => {
        if (!(options.files || options.urls)) throw "Missing params"
        const baseMap: Record<string, string> = {}

        if (options.files) {
            options.files.forEach((file: string) => {
                baseMap[path.parse(file).base] = file
            })
        }

        const controller = new AbortController()
        const app = new Application()

        app.use(async (context) => {
            await send(context, baseMap[decodeURI(context.request.url.pathname.substring(1))], { root: "/" })
        })

        app.addEventListener("listen", async ({ port }) => {
            const ngrok = await Ngrok.create({ protocol: "http", port })

            ngrok.addEventListener("ready", async (event) => {
                const ngrokUrl = "https://" + event.detail

                const data = []

                if (options.files) {
                    Object.keys(baseMap).forEach(base => {
                        data.push(ngrokUrl + "/" + base)
                    })
                }

                if (options.urls) {
                    data.push(...options.urls)
                }

                const response = await fetch("https://cdn.hackclub.com/api/new", {
                    method: "POST",
                    body: JSON.stringify(data),
                })

                const uploadedURLs = await response.json()

                await ngrok.destroy()
                resolve(uploadedURLs)
                controller.abort()
            })
        })

        app.listen({ port: 20845, signal: controller.signal })
    })
}
