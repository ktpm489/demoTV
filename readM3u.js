const M3U8FileParser = require('m3u8-file-parser');
const fs = require('fs');
const content = fs.readFileSync('./example.m3u', { encoding: 'utf-8' });

const reader = new M3U8FileParser();
reader.read(content);
console.log('GetResult', reader.getResult().segments)
 // Get the parse result
reader.reset(); // Optional, If you want to parse a new file, call reset(