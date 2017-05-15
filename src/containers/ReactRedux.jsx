import React from 'react';
import { connect, } from 'react-redux';
import { SELECT_IMAGE, REMOVE_IMAGE, } from 'actions/types';
import Img from 'components/Img';
import Button from 'components/Button';

const { func, string, number, bool, arrayOf, } = React.PropTypes;

const ImageItem = (props) => {
  const { url, removeImage, selectImage, isSelected, } = props;
  return (
    <div key={url} className='thump-nail-item'>
      <Button warn disabled={isSelected} className='centered-foreground-item' onClick={removeImage}>Remove</Button>
      <Img src={url} className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
      <Button primary className='centered-foreground-item' onClick={selectImage}>Select</Button>
    </div>
  );
};

ImageItem.propTypes = {
  selectImage: func,
  removeImage: func,
  isSelected: bool,
  url: string,
};

/* react-redux allows you to pass state and dispatch to component
 props without implementing manually a Connect component*/
const mapStateToProps = state => ({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
//Thunk syntax
const mapDispatchToProps = ({
  selectImage: index => dispatch => dispatch({ type: SELECT_IMAGE, payload: index, }),
  removeImage: index => dispatch => dispatch({ type: REMOVE_IMAGE, payload: index, }),
});
@connect(mapStateToProps, mapDispatchToProps)
export default class ImageGallery extends React.Component{

  static propTypes = {
    selectImage: func,
    removeImage: func,
    selectedImage: number,
    images: arrayOf(string),
  };
  render() {
    const { selectImage, selectedImage, images, removeImage, } = this.props;
    return (
      <div className='note-example-m'>
        <div className='thump-nail-container'>
          {images.map((url, index) => (
            <ImageItem key={url} url={url}
                       selectImage={() => selectImage(index)}
                       removeImage={() => removeImage(index)}
                       isSelected={selectedImage === index}/>))}
        </div>
        <Img key={images[ selectedImage ]}
             src={images[ selectedImage ]}
             className='selected-item'/>
      </div>
    );
  }
}
