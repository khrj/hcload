# hcload
Upload files to Hackclub CDN from your CLI

Contents:  
- [Deno](#Deno)
- [Node](#Node)

# Deno
Make sure you have [deno](https://deno.land/)

## Quickstart

```
deno run --unstable -A https://raw.githubusercontent.com/KhushrajRathod/hcload/main/hcload.ts
```

## Installation
```
deno install --unstable -A https://raw.githubusercontent.com/KhushrajRathod/hcload/main/hcload.ts
```

then run (see [usage](#Usage))

```
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

# Advantages

- It's convenient
- **Anonymous** - not tied to your slack username
- **Kinda private** - not viewable generally in #cdn, but can probably still be seen by HackClub staff
- Upload directly from a URL

# Usage

```
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

# Examples

Upload multiple files

```
hcload -f 0.jpg 1.mp3 2.iso 3.png
```

Upload from a URL / multiple URLs

```
hcload -u https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png https://homepages.cae.wisc.edu/~ece533/images/airplane.png https://homepages.cae.wisc.edu/~ece533/images/pool.png
```

Upload both from URLs and from files

```
hcload -f 0.dmg -u https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png 
```

Upload silently (without printing "Working...") (for scripts)
```
hcload -sf 0.mp4
```

# Node

> Note: The node.js version is not maintained. Source is available in git history

```
npx hcload -f filename.txt
# or
npm install -g hcload
hcload -f filename.txt
```