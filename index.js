#!/usr/bin/env node
const axios = require('axios')
const { program } = require('commander')
const { join, resolve, parse } = require('path')
const app = require('express')()
const ngrok = require('ngrok')

program.version(require(join(__dirname, 'package')).version)
program
    .option('-f, --files <file...>', 'Path to file(s) to upload')
    .option('-u, --urls <url...>', 'URL(s) to host on CDN')
    .option('-s, --silent', 'Don\'t print "Working..."')

program.parse(process.argv)

if (!program.files && !program.urls) {
    program.help()
}

let baseMap = {}

if (program.files) {
    program.files.forEach(file => {
        const fullPath = resolve(join(file))
        const base = parse(fullPath).base
        baseMap[base] = fullPath
    })
}

app.get("/*", (req, res) => {
    res.sendFile(baseMap[decodeURI(req.path.substring(1))])
})

const server = app.listen(0, async _ => {
    if (!program.silent) {
        console.log("Working...")
    }
    const ngrokUrl = await ngrok.connect(server.address().port)
    let data = []

    if (program.files) {
        Object.keys(baseMap).forEach(base => {
            data.push(ngrokUrl + '/' + base)
        })
    }

    if (program.urls) {
        data.push(...program.urls)
    }

    axios
        .post('https://cdn.hackclub.dev/api/new', data)
        .then(res => {
            res.data.forEach(line => {
                console.log(line)
            })
            process.exit(0)
        })
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
})