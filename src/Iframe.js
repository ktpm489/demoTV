/*
INIT: ensure Babel/Eslint/Flow is configured for ES Class Fields & Static Properties
JSX USAGE: <Iframe src='http://web.site' onLoad={myOnloadFunction}/>
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Iframe extends Component {

    componentDidMount() {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe)
        iframe.addEventListener('load', this.onLoad);
        // iframe.addEventListener('onerror', this.onError);
        iframe.contentWindow.onerror = function () {
            console.log('111!!');
        }
        iframe.onerror = function () {
            console.log("Error occurred while loading image");
        };
        iframe.onerror = function () {
             alert('style sheet loaded!');
        }
        // window.onerror = function (message, url, line, col, errorObj) {
        //     console.log("Error occurred while loading image");
        // };
       
       
    //    console.log('tttt' +  iframe.contentWindow)
    }
    
    onLoad = (e) => {
        console.log('OnLoad',e)
    }
    onError = (e) => {
        console.log('onError')
    }
    componentWillUnmount() {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe)
        iframe.removeEventListener('load', this.onLoad);
        // iframe.removeEventListener('error', this.onError);
    }

    render() {
        const iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'absolute',
        }

        return (
            <iframe
                title='Hello'
                ref="iframe"
                id='myframe'
                {...this.props}
                frameBorder={'0'}
                onerror="alert('Failed')"
                // width={'100%'}
                // height={'100%'}
                // style={iframeStyle}
            />
        )
    }

}

export default Iframe