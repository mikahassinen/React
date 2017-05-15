import React from 'react';
import { connect, } from 'react-redux';
import FlipMove from 'react-flip-move';
import Input from 'components/Input';
import Button from 'components/Button';
import { SELECT_IMAGE, REMOVE_IMAGE, RESET_IMAGES, SHUFFLE_IMAGES, ADD_IMAGE, } from 'actions/types';
import Img from 'components/Img';

const { log, } = console;
const { func, string, number, bool, arrayOf, } = React.PropTypes;

/* TODO implement reducer reactions to corresponding action types SHUFFLE & REMOVE in file /reducers/images.js
    add shuffleImages, addImage and removeImage to mapDispatchToProps
 */

class Image extends React.Component {
  static propTypes = {
    selectImage: func,
    removeImage: func,
    isSelected: bool,
    url: string,
  };
  render() {
    const { url, removeImage, selectImage, isSelected, } = this.props;
    return (<div key={url} className='thump-nail-list-item'>
      <div className='image-action-container'>
        <Button warn className='centered-foreground-item' onClick={removeImage}>Remove</Button>
        <Button primary className='centered-foreground-item' onClick={selectImage}>Select</Button>
      </div>
      <Img
        src={url}
        className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
    </div>);
  }
}

class ImageGallery extends React.Component {

  state = { name, imageUrl: '', };

  static propTypes = {
    images: arrayOf(string),
    selectedImage: number,
    selectImage: func,
    addImage: func,
    removeImage: func,
    resetImages: func,
    shuffleImages: func,
  };

  static defaultProps = {
    addImage: () => log('TODO', ADD_IMAGE),
    removeImage: () => log('TODO', REMOVE_IMAGE),
    shuffleImages: () => log('TODO', SHUFFLE_IMAGES),
  }

  render() {
    const { selectImage, selectedImage, images, resetImages, addImage, removeImage, shuffleImages, } = this.props;
    const { name, imageUrl, } = this.state;
    return (
      <div className='note-exercise-l'>
        <div className='flex-row'>
          <Input
            placeholder='name'
            value={name}
            onChange={name => this.setState({ name, })} />
          <Input
            placeholder='image url'
            value={imageUrl}
            onChange={imageUrl => this.setState({ imageUrl, })} />
          <Button primary onClick={addImage}>Add</Button>
          <Button warn onClick={resetImages}>Reset Images</Button>
          {/* TODO shuffle images button*/}
        </div>
        <div className='flex-row'>
          <FlipMove duration={450} easing='ease-out' typeName='div'>
            {images.map((url, index) => (
              <Image
                key={url}
                url={url}
                selectImage={() => selectImage(index)}
                removeImage={() => removeImage(index)}
                isSelected={selectedImage === index} />
            ))}
          </FlipMove>
          <Img
            key={images[selectedImage]}
            src={images[selectedImage]}
            className='selected-item' />
        </div>
      </div>
    );
  }
}

/* state is redux store state*/
const mapStateToProps = state => ({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
const mapDispatchToProps = ({
  selectImage: index => (dispatch, getState)=> dispatch({ type: SELECT_IMAGE, payload: index, }),
  resetImages: () => (dispatch, getState) => dispatch({ type: RESET_IMAGES, }),
  /* TODO
   * removeImage
   * addImage,
   * shuffleImages, */
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
