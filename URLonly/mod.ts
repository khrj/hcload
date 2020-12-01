import ky from 'https://unpkg.com/ky/index.js'

export default async function (url: string): Promise<string> {
        // @ts-ignore
        return await ky.post('https://cdn.hackclub.com/api/new', { json: [url] }).json()
}