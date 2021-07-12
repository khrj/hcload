<div align="center">
    <img src="assets/logo.svg" width="350" height="350" alt="Hand with phone showing paper plane which is being tapped; Paper plane flying away out of phone">
    <h1>hcload</h1>
    <p>
        <b>Upload files to the Hack club CDN via Deno and your CLI</b>
    </p>
    <p>
        <img alt="build status" src="https://img.shields.io/github/workflow/status/khrj/hcload/Deno?label=checks" >
        <img alt="language" src="https://img.shields.io/github/languages/top/khrj/hcload" >
        <img alt="code size" src="https://img.shields.io/github/languages/code-size/khrj/hcload">
        <img alt="issues" src="https://img.shields.io/github/issues/khrj/hcload" >
        <img alt="license" src="https://img.shields.io/github/license/khrj/hcload">
        <img alt="version" src="https://img.shields.io/github/v/release/khrj/hcload">
    </p>
    <p>
        <b><a href="https://deno.land/x/hcload">View on deno.land</a></b>
    </p>
    <br>
    <br>
    <br>
</div>

Table of contents:

- [Module](#API)
- [CLI](#CLI)
- [Supporters](#Supporters)

# API

hcload offers a convenient deno API

```ts
import hcload from "https://deno.land/x/hcload@1.2.1/mod.ts"
const urls: string[] = await hcload({
    files: fullPaths,
    urls: YourUrls,
})
```

Where

- fullPaths is an array of complete filesystem paths to files
- urls is an array of urls

Only one parameter is nessecary

# CLI

Make sure you have [deno](https://deno.land/)

## Installation

```bash
deno install --unstable -A https://deno.land/x/hcload/hcload.ts
```

then run (see [usage](#Usage))

```bash
hcload -f filename.mp3
```

## Permissions

Needs the following

- --allow-env
- --allow-net
- --allow-read=~/.ngrok-deno
- --allow-write=~/.ngrok-deno
- --allow-run

Or just

- -A

## Usage

```
Usage: hcload -f [files...] -u [urls...]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -f, --files    Path to file(s) to upload                               [array]
  -u, --urls     URL(s) to host on CDN                                   [array]
  -s, --silent   Do not print "Working..."                              [boolean]

Examples:
  hcload -f myPic.png                                      Upload one file
  hcload -f myPic.png vid.mp4 song.mp3                     Upload multiple files
  hcload -u https://b.me/foo.mp3                           Upload from one URL
  hcload -u https://a.me/foo.mp3 https://a.me/foo.jpg      Upload from multiple URLs
  hcload -u https://a.me/foo.mp3 -f myPic.png myMusic.mp3  Upload from file[s] and URL[s]
```

## Supporters

[![Stargazers repo roster for @khrj/hcload](https://reporoster.com/stars/khrj/hcload)](https://github.com/khrj/hcload/stargazers)

[![Forkers repo roster for @khrj/hcload](https://reporoster.com/forks/khrj/hcload)](https://github.com/khrj/hcload/network/members)

## Related

- [Deno modules](https://github.com/khrj/deno-modules)
