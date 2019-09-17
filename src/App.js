import React, { Component } from 'react';

import ReactHLS from 'react-hls';
import ReactJWPlayer from 'react-jw-player';
import * as arrData from './formatFile.json'
import Iframe from './Iframe'
import { getDataMainTivi24h } from './crawlData'
// let arr = ['http://hjyjrvmlsk.vcdn.com.vn/hls/elgfjdh/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/m0hlc1s/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/idmwifi/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/hktebdo/index.m3u8',
//   'http://185.246.209.109:8080/GOL_TV/index.m3u8'
// ] 

const playlist = [
{
    file: 'http://live.savitar.tv/Animal/myStream/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9OC8yNy8yMDE5IDg6NTQ6MTUgQU0maGFzaF92YWx1ZT1PMkV0YjJKdVdiUWg1TmJhdWgyOWxRPT0mdmFsaWRtaW51dGVzPTM2MCZpZD0w',
  image: 'https://link-to-my-other-poster.jpg',
}];
let arr = arrData.default
class HLSPage extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      currentLink : arr[0].link,
      currentIndex : 0,
      currentData : arr[0],
      errList : [],
      okList : []
    }
  }

  async componentDidMount () {
    let data = await getDataMainTivi24h()
    // let blob = data.blob()
    // let blob = new Blob(data, { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sample.json`);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);
    // this.iframe.addEventListener('error', this.onIFrameError);
  }

  componentWillMount() {
    // this.refs.iframe.removeEventListener('error', this.onIFrameError);
  }


  onError = (e, data) => {
    console.log('e', e, 'data', data)
    // if (data) {
    //   let { currentIndex, errList, currentData } = this.state
    //   if (currentIndex < arr.length) {

    //     errList.push(currentData)
    //     let newIndex = currentIndex + 1
    //     this.setState({
    //       currentIndex: newIndex,
    //       currentLink: arr[newIndex].link ? arr[newIndex].link : '',
    //       currentData: arr[newIndex],
    //       errList: errList
    //     })
    //   }
    // }
   
  }


  onIFrameError = (e)=> {
    console.log('errrr',e)
  }

  onSuccess = (url) => {
    console.log('url', url)
    // let { currentIndex, okList, currentData, currentLink } = this.state
    // if (currentIndex < arr.length) {
    //   if (currentLink) {
    //     okList.push(currentData)
    //   }
      
    //   let newIndex = currentIndex + 1
    //   this.setState({
    //     currentIndex: newIndex,
    //     currentData: arr[newIndex],
    //     currentLink: arr[newIndex].link ? arr[newIndex].link : '',
    //     okList: okList
    //   })
    // }
  }

  render() {
    // const {currentLink} = this.state
    // console.log('current arr',arr)
    // console.log(this.state)
    return (
      // <Player>
      //   <HLSSource
      //     isVideoChild
      //     src="https://hjyjrvmlsk.vcdn.com.vn/hls/nwalmjv/index.m3u8"
      //   />
      //   {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
      // </Player>
      <div>
        {/* <ReactHLS url={'http://51.15.108.237/live/bein2-hq/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9OS81LzIwMTkgNDo0NjoxNyBBTSZoYXNoX3ZhbHVlPWwrK2l0MnVQSzJsd05oNGZLOTUzcXc9PSZ2YWxpZG1pbnV0ZXM9MTAmaWQ9MTE1Ljc5LjE5NS4xMCZzdHJtX2xlbj0xMw=='} constrols autoplay onError={this.onError} onSuccess={this.onSuccess}/> */}
        {/* <ReactHLS url={'http://51.15.108.237/live/fox-hq/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9OS81LzIwMTkgNjowNjo1NyBBTSZoYXNoX3ZhbHVlPXI2MDlpU3BkZzhQek14VG1USGE3eVE9PSZ2YWxpZG1pbnV0ZXM9MTAmaWQ9MTE1Ljc5LjE5NS4xMCZzdHJtX2xlbj0xMQ=='} constrols autoplay onError={this.onError} onSuccess={this.onSuccess}/> */}
        {/* <ReactHLS url={'http://peer2.savitar.tv/Science/myStream/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9OS8xNi8yMDE5IDM6MzY6MjkgQU0maGFzaF92YWx1ZT1RYXRIZXN5YzIwTU8vSms0RzZFemp3PT0mdmFsaWRtaW51dGVzPTM2MCZpZD0w'} constrols autoplay onError={this.onError} onSuccess={this.onSuccess}/> */}
        {/* <video
          controls
          class='video-js vjs-default-skin'
          data-setup=''
          data-viblast-key='56fe4fce-1efd-4638-a2fb-e2097b5ad840'
          width='300'
          height='250'
          autoplay
        >
          <source
            type='application/x-mpegURL'
            src='http://51.15.108.237/live/fox-hq/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9OS81LzIwMTkgNjowNjo1NyBBTSZoYXNoX3ZhbHVlPXI2MDlpU3BkZzhQek14VG1USGE3eVE9PSZ2YWxpZG1pbnV0ZXM9MTAmaWQ9MTE1Ljc5LjE5NS4xMCZzdHJtX2xlbj0xMQ==' />
        </video> */}

        {/* <Iframe width="560" height="315" src="http://tivis.101vn.com/ok/sctv/vinhlong1show.php" frameborder="0" allow="autoplay" allowFullScreen/> */}
        {/* <Iframe src="http://tivis.101vn.com/ok/sctv/vinhlong1show.php" allowFullScreen="true" width="100%" scrolling='no' height="465" frameborder="0" ></Iframe> */}
        <Iframe src="http://www.tivi12h.net/listkenh/lps/lichphatsong.html" allowFullScreen="true" width="100%" scrolling='no' height="465" frameborder="0" ></Iframe>
        {/* <iframe title="TTT" ref={(c) => { this.iframe = c; }} width="560" height="315" src="//ok.ru/videoembed/22221095992549084?autoplay=1" allow="autoplay" allowFullScreen onError={this.onIFrameError}></iframe> */}
        {/* <ReactJWPlayer
          playlist={playlist}
          licenseKey='RMhqKz6IV+MbLaihIZGDs0ri2jlucVNw4oIVtd+27lw='
          playerId={'rrrrrr'} // bring in the randomly generated playerId
          playerScript='https://cdn.jwplayer.com/libraries/H6KfP68V.js'
        /> */}
     
      </div>

    );
  }
}

export default HLSPage;