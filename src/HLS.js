import React, { Component } from 'react';
import Hls from 'hls.js';

export default class HLSSource extends Component {
    constructor(props, context) {
        super(props, context);
        this.hls = new Hls();
    }

    componentDidMount() {
        // `src` is the property get from this component
        // `video` is the property insert from `Video` component
        // `video` is the html5 video element
        const { src, video } = this.props;
        // load hls video source base on hls.js
        if (Hls.isSupported()) {
            this.hls.loadSource(src);
            this.hls.attachMedia(video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }


    componentWillUnmount() {
        // destroy hls video source
        if (this.hls) {
            this.hls.destroy();
        }
    }

    render() {
        return (
            <source
                src={this.props.src}
                type={this.props.type || 'application/x-mpegURL'}
            />
        );
    }
}

// import React, { Component } from "react";

// import Hls from "hls.js";



// class Player extends Component {

//     state = {};



//     componentDidUpdate() {

//         if (Hls.isSupported() && this.player) {

//             const video = this.player;

//             const hls = new Hls();

//             hls.loadSource(
//                 "https://hjyjrvmlsk.vcdn.com.vn/hls/nwalmjv/index.m3u8"
//             );

//             hls.attachMedia(video);

//             hls.on(Hls.Events.MANIFEST_PARSED, function () {

//                 video.play();

//             });

//         }

//     }



//     render() {

//         return (

//             <div className="playerwrapper player">

//                 <div className="playerInner">

//                     <video

//                         className="videoCanvas"

//                         ref={player => (this.player = player)}

//                         autoPlay={true}

//                     />

//                 </div>

//             </div>

//         );

//     }

// }



// export default Player;
