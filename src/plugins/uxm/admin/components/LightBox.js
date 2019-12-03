import React, { Component } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class LightBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoIndex: 0  
        }
    }

    componentDidMount() {       
    }

    componentWillReceiveProps(nextProps){
       
    }
    
    static defaultProps = {
        images: [],
        show: false,
        onLightBoxClose: ()=>{}
    }


    render() {

        const { images, show } = this.props
        const { photoIndex } = this.state
        
        return (
            <div>        
                {show &&  (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.props.onLightBoxClose({ show: false })}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })
                    }
                />
                )}
            </div>
        );
    }
}

export default LightBox;