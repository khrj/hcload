#!/usr/bin/env node
const axios = require('axios')
const { program } = require('commander')
const { join, resolve, parse } = require('path')
const app = require('express')()
const ngrok = require('ngrok')

program.version(require(join(__dirname, 'package')).version)
program.requiredOption('-f, --file <file>', 'Path to file to upload')
program.parse(process.argv)

let fullPath = resolve('./' + program.file)
let base = parse(fullPath).base

app.get("/" + base, (_, res) => {
    res.sendFile(fullPath)
})

const server = app.listen(0, async _ => {
    console.log("Working...")
    const url = await ngrok.connect(server.address().port)
    axios
        .post('https://cdn.hackclub.dev/api/new', [url + '/' + base])
        .then(res => {
            console.log(res.data[0])
            process.exit(0)
        })
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
})

