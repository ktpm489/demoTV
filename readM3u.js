const M3U8FileParser = require('m3u8-file-parser');
const fs = require('fs');

function readData () {
    const content = fs.readFileSync('./example.m3u', { encoding: 'utf-8' });
    const reader = new M3U8FileParser();
    reader.read(content);
    // console.log('GetResult', reader.getResult().segments)
    // Get the parse result
    let arrNew = []
    reader.getResult().segments.map((item, index) => {
        // console.log('item', item.inf['tvg-logo'])
        arrNew.push({
            title: item.inf.title,
            link: item.url,
            logo: item.inf['tvg-logo']
        })
    }
    )
    reader.reset(); // Optional, If you want to parse a new file, call reset
    console.log('arraData', JSON.stringify(arrNew))
    fs.writeFileSync('./formatFile.json', JSON.stringify(arrNew), { encoding: 'utf-8' })
    return arrNew
}

readData()