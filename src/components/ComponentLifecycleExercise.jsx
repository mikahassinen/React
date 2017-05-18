import React from 'react';
import Img from 'components/Img';
import whiteCollar from 'images/business-cat-white-collar-tie.jpg';
import candidate from 'images/cat-candidate.jpg';
import grumpy from 'images/grumpy.jpg';
import {keys,} from 'common/utils';

/* AnimateImageList animates 'image removed' and 'image added' animations.
 * Removal animations are not possible with css alone
 * AnimateImageList achieves it 'image removed' animation by caching props.images in it's state.
 * When image is actually removed, AnimateImageList delays it's removal from it's inner state.
 * AnimateImageList sets the removed items css class to 'image-shrink-out'
 * Ones animation has finished then AnimateImageList removes the image from its state.
 */
/*

 AnimationImageList has fundamel build in error.
 What happens if user re-clicks image toggle before it has been animated out?
 TOD Extra: If you code has this issue fix it
 */

const {object,} = React.PropTypes;
const deleteTime = 390;
class AnimateImageList extends React.Component {

    static propTypes = {
        images: object.isRequired,
    }

    state = {
        /*   example shape of state
         images: {
         imgName: {
         src: 'url/path',
         isRemoved:false
         },
         img2Name: {...} ...
         }*/
        images: {
            ImgWhiteCollar: {
                src: whiteCollar,
                isRemoved: true,
                isAnimating: false
            },
            imgCandidate: {
                src: candidate,
                isRemoved: false,
                isAnimating: false
            },
            imgGrumpy: {
                src: grumpy,
                isRemoved: false,
                isAnimating: false
            },

        }
    }

    // Set the initial images before component mount
    componentWillMount() {
        // shallow copy props images
        const {...propsImages} = this.props.images;
        const images = mapNewImages(propsImages);
        this.setState({images,});
    }

    /* TOD
     1. set removed images state isRemoved to true
     (... so that className with correct animation will be displayed)
     2. set timeout for removing the image after animation has finished
     (use this.setTimeoutToRemoveImage(imgName) method for this)
     3. set next state
     */
    componentWillReceiveProps(nextProps) {
        const notRemovedImages = mapNewImages({...nextProps.images,});
        const images = {...this.state.images,};
        const removedImage = Object.keys(images).reduce((acc, key) => {
            if (!notRemovedImages[key]) {
                acc[key] = {...images[key], isRemoved: true,};
                this.setTimeoutToRemoveImage(key);
            }
            return acc;
        }, {});
        const nextImages = {...notRemovedImages, ...removedImage,};
        this.setState({images: nextImages,});
    }


    componentWillUnmount() { // (no thing to do here)
        // clear any possible timeouts
        keys(this).filter(k => k.includes('imgRemoval'))
            .forEach((k) => {
                if (k instanceof String) {
                    this[k].clearTimeout(k);
                }
            });
    }

    handleLoginClick() {
        this.setState({isAnimating: true});
    }

    handleLogoutClick() {
        this.setState({isAnimating: false});
    }

    setTimeoutToRemoveImage(key) { // (nothing to do here)
        // remove image after 0.4seconds
        this[`imgRemoval${key}`] = setTimeout(() => {
            // take shallow copy of images
            const {...images} = this.state.images;
            //check should we remove this image after deleteTime is over
            const isDeleted = this.state.images.isRemoved;
            if (isDeleted) {
                delete images[key];
            }
            this.setState({images,});
        }, deleteTime);
    }


    render() {
        const {images,} = this.state;
        return (
            <div className='centering-flex'>
                {keys(images)
                    .sort((k1, k2) => k1 < k2)
                    .map(k => (
                        <Img
                            key={k}
                            src={images[k].src}
                            className={images[k].isRemoved ? 'image-shrink-out' : 'image-pop-up'}/>
                    ))}
            </div>
        );
    }
}

const cvPicks = {whiteCollar, candidate, grumpy,};
export
default
class ImageList extends React.Component {

    state = {images: cvPicks,};

    toggleImage(name) {
        const {...images} = this.state.images;
        if (images[name]) {
            delete images[name];
        } else {
            images[name] = cvPicks[name];
        }
        this.setState({images,});
    }

    render() {
        const {images,} = this.state;
        const isLoggedIn = this.state.isAnimating;

        return (
            <div className='note-exercise-m'>
                <div className='centering-flex'>
                    {['whiteCollar', 'grumpy', 'candidate',]
                        .map(name => (
                                <button
                                    key={name}
                                    className={images[name] ? 'button-warning' : 'button-primary'}
                                    onClick={() => this.toggleImage(name)}>{name}</button>
                            )
                        )}
                </div>
                <div className='centering-flex'>
                    <AnimateImageList images={this.state.images}/>
                </div>
            </div>
        );
    }
}
/* mapNewImages function
 takes: {imgName: 'path/orUrl', img2Name: 'path/orUrl', ...}
 produces: {imgName: {src: 'path/urUrl', isRemoved: false}, img2Name: {...} ...}
 */
function mapNewImages(images) {
    return keys(images)
        .reduce((acc, k) => {
            acc[k] = {src: images[k], isRemoved: false,};
            return acc;
        }, {});
}
