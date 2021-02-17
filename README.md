# hcload

Upload files to Hackclub CDN via Deno and your CLI

Contents:

- [Module](#API)
- [CLI](#CLI)

# API

hcload offers a convenient deno API

```ts
import hcload from "https://deno.land/x/hcload/mod.ts"
const urls: string[] = await hcload({
    files: fullPaths,
    urls: YourUrls,
})
```

Where

- fullPaths is an array of complete filesystem paths to files
- urls is an array of urls

Only one parameter is nessecary, the other is optional

# CLI

Make sure you have [deno](https://deno.land/)

## Usage

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

```bash
Usage: hcload -f [files...] -u [urls...]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -f, --files    Path to file(s) to upload                               [array]
  -u, --urls     URL(s) to host on CDN                                   [array]
  -s, --silent   Don't print "Working..."                              [boolean]

Examples:
  hcload -f myPic.png                                      Upload one file
  hcload -f myPic.png vid.mp4 song.mp3                     Upload multiple files
  hcload -u https://b.me/foo.mp3                           Upload from one URL
  hcload -u https://a.me/foo.mp3 https://a.me/foo.jpg      Upload from multiple URLs
  hcload -u https://a.me/foo.mp3 -f myPic.png myMusic.mp3  Upload from file[s] and URL[s]
```