---
layout: post
title: Creating Your First Node.js Command-line Application
categories: [Ionic]
tags: [datable, charts, primeng]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---


Create a new folder for your project and navigate to it in your terminal. We will refer to it as your project folder.

# Setting up package.json

Assuming that you have already installed node, we must first create a package.json file. The npm utility can help you with that. Run this command in your project folder:

`npm init`

Read a json and re-write it

<pre style="background:#000;color:#f8f8f8"><span style="color:#aeaeae;font-style:italic">// Declare variables</span>
<span style="color:#99cf50">var</span> fs <span style="color:#e28964">=</span> require(<span style="color:#65b042">'fs'</span>),
    obj

<span style="color:#aeaeae;font-style:italic">// Read the file and send to the callback</span>
fs.readFile(<span style="color:#65b042">'path/to/file'</span>, handleFile)

<span style="color:#aeaeae;font-style:italic">// Write the callback function</span>
<span style="color:#99cf50">function</span> <span style="color:#89bdff">handleFile</span>(err, data) {
    <span style="color:#e28964">if</span> (err) <span style="color:#e28964">throw</span> err
    obj <span style="color:#e28964">=</span> JSON.<span style="color:#dad085">parse</span>(data)
    <span style="color:#aeaeae;font-style:italic">// You can now play with your datas</span>
}
</pre>

[readFile](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback)