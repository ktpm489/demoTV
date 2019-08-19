import React, { Component } from 'react';

import ReactHLS from 'react-hls';

class HLSPage extends Component {

  onError = (e, data) => {
    console.log('e', e, 'data', data)
  }

  render() {
    return (
      // <Player>
      //   <HLSSource
      //     isVideoChild
      //     src="https://hjyjrvmlsk.vcdn.com.vn/hls/nwalmjv/index.m3u8"
      //   />
      //   {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
      // </Player>
      <div>
        <ReactHLS url={"http://185.246.209.109:8080/GOL_TV/index"} constrols autoplay onError={this.onError} />
      </div>

    );
  }
}

export default HLSPage;