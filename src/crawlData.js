const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('graceful-fs')
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// GET DATA http://www.tivi12h.net/
// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

async function writeToFile(fileName, data) {
    try {
        await fs.writeFile(fileName, data);
        console.log('Write file' + fileName + 'Sucesss');
    } catch (err) {
        console.error('Write file' + fileName + ' Error: ' + err)
    }
}


function getMainTivi24h(link, time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            fetch(proxyurl + link)
                .then(res => res.text())
                .then(body => {
                    return resolve(body);
                });
        }, time);
    });
}

async function crawlListLinkFromMainData(html) {
    var $ = cheerio.load(html);
    var listData = [];
    console.log('------ Call here ------')
    /***
     * 	<li class="active"><a href="#1"><b>TOP HOT</b></a></li>
									<li><a href="#2"><b>CÁC TỈNH THÀNH</b></a></li>
									<li><a href="#3"><b>KÊNH TỔNG HỢP & THỂ THAO</b></a></li>
     */

    $('div[class="tab-pane  active"]').find('ul > div').each(function (index, element) {
        let obj = {}
        obj.tag = 'topHot'
        obj.listChannel = []
        $(element).find('li').each(function (index, element) {
            let tempObj = {}
            let currentTagL = $(element)
            tempObj.tagItem = formatData(currentTagL.attr('rel'))
            currentTagL.find('a').each(function (index, element) {
                var htmlLink = 'http://www.tivi12h.net/' + $(element).attr('href').replace('.', '');
                let el = $(element).children().last();
                var imgLink = el.attr('src');
                var title = el.attr('title')
                tempObj.htmlLink = htmlLink
                tempObj.imgLink = imgLink
                tempObj.title = title
            });
            obj.listChannel.push(tempObj)
        });
        listData.push(obj)
    })

    $('div[class="tab-pane "]').find('ul > div').each(function (index, element) {
        let obj = {}
        obj.tag = index === 0 ? 'tinhthanh' : 'tonghop'
        obj.listChannel = []
        $(element).find('li').each(function (index, element) {
            let tempObj = {}
            let currentTagL = $(element)
            tempObj.tagItem = formatData(currentTagL.attr('rel'))
            currentTagL.find('a').each(function (index, element) {
                var htmlLink = 'http://www.tivi12h.net/' + $(element).attr('href').replace('.', '');
                let el = $(element).children().last();
                var imgLink = el.attr('src');
                var title = el.attr('title')
                tempObj.htmlLink = htmlLink
                tempObj.imgLink = imgLink
                tempObj.title = title
                //  console.log('imgLink', imgLink , 'htmlLink', htmlLink, 'title',title)
            });
            obj.listChannel.push(tempObj)
        });
        listData.push(obj)
    })
    let newArr = []
    // console.log('Listdata', JSON.stringify(listData))
    for (var i = 0; i < listData.length; i++) {
        let currentItem = listData[i];
        for (var j = 0; j < currentItem.listChannel.length; j++) {
            let arrStreamLink = await getDataEachLinkTivi24h(currentItem.listChannel[j].htmlLink, 'http://www.tivi12h.net/')
            if (arrStreamLink && arrStreamLink.length > 0) {
                currentItem.listChannel[j].arrStreamLink = arrStreamLink
            }
        }
        newArr.push(currentItem)
    }

    console.log('NewArr', JSON.stringify(newArr))
    return newArr
    // await writeToFile('DataTV12h.json', JSON.stringify(newArr));

}

async function getDataMainTivi24h() {
    let data = await getMainTivi24h('http://www.tivi12h.net/', 20)
   return  await crawlListLinkFromMainData(data)
}
function formatData(str) {
    return str.replace(' ', '').replace('-', '')
}


async function crawlListLinkFromEachData(html, staticLink) {
    var $ = cheerio.load(html);
    var listLink = [];
    $('div[id="severkhac"]').find('a').each(function (index, element) {
        var link = $(element).attr('name');
        listLink.push(staticLink + link)

    });
    console.log('listLink', listLink)
    return listLink

}

async function getDataEachLinkTivi24h(link, staticLink) {
    let data = await getMainTivi24h(link, 20)
    let arrLink = await crawlListLinkFromEachData(data, staticLink)
    return arrLink
}

// getDataEachLinkTivi24h('http://www.tivi12h.net/kenh-vtv3-hd-online-live.html','http://www.tivi12h.net/')
// getDataMainTivi24h()
module.exports = {
    getDataMainTivi24h
}