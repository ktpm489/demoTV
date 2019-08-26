import React, { Component } from 'react';

import ReactHLS from 'react-hls';
import * as arrData from './formatFile.json'
// let arr = ['http://hjyjrvmlsk.vcdn.com.vn/hls/elgfjdh/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/m0hlc1s/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/idmwifi/index.m3u8',
//   'https://hjyjrvmlsk.vcdn.com.vn/hls/hktebdo/index.m3u8',
//   'http://185.246.209.109:8080/GOL_TV/index.m3u8'
// ] 

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

  onError = (e, data) => {
    // console.log('e', e, 'data', data)
    if (data) {
      let { currentIndex, errList, currentData } = this.state
      if (currentIndex < arr.length) {
        errList.push(currentData)
        let newIndex = currentIndex + 1
        this.setState({
          currentIndex: newIndex,
          currentLink: arr[newIndex].link,
          currentData: arr[newIndex],
          errList: errList
        })
      }
    }
   
  }

  onSuccess = (url) => {
    // console.log('url', url)
    let { currentIndex, okList, currentData } = this.state
    if (currentIndex < arr.length) {
      okList.push(currentData)
      let newIndex = currentIndex + 1
      this.setState({
        currentIndex: newIndex,
        currentData: arr[newIndex],
        currentLink: arr[newIndex].link,
        okList: okList
      })
    }
  }

  render() {
    const {currentLink} = this.state
    // console.log('current arr',arr)
    console.log(this.state)
    return (
      // <Player>
      //   <HLSSource
      //     isVideoChild
      //     src="https://hjyjrvmlsk.vcdn.com.vn/hls/nwalmjv/index.m3u8"
      //   />
      //   {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
      // </Player>
      <div>
        <ReactHLS url={'http://113.161.6.157:8081/hls-live/livepkgr/_definst_/liveevent/livestream.m3u8'} constrols autoplay onError={this.onError} onSuccess={this.onSuccess}/>
      </div>

    );
  }
}

export default HLSPage;