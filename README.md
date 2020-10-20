# hcload
Upload files to Hackclub CDN from your CLI

# Quickstart
```
npx hcload -f filename.txt
```

# Installation
```
npm install -g hcload
```

or 

```
yarn global add hcload
```

then run

```
hcload -f filename.txt
```

# Advantages

- It's convenient
- **Anonymous** - not tied to your slack username
- **Kinda private** - not viewable generally in #cdn, but can probably still be seen by HackClub staff
- Upload directly from a URL

# Usage

```
Usage: hcload [options]

Options:
  -V, --version          output the version number
  -f, --files <file...>  Path to file(s) to upload
  -u, --urls <url...>    URL(s) to host on CDN
  -s, --silent           Don't print "Working..."
  -h, --help             display help for command
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
