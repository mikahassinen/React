import React from 'react';

const CATS = [ getRandomCatUrl(), getRandomCatUrl(), getRandomCatUrl(), ];
const IMG_HEIGHT = 240;

const Component = props => (
  <div className='flex note-example-l'>
    <ul>
      {/* This gives you the same result...*/}
      <li><img className='image-default' src={getRandomCatUrl()} role='presentation' height={IMG_HEIGHT} /></li>
      <li><img className='image-default' src={getRandomCatUrl()} role='presentation' height={IMG_HEIGHT} /></li>
      <li><img className='image-default' src={getRandomCatUrl()} role='presentation' height={IMG_HEIGHT} /></li>
    </ul>
    <ul>
      {/* ... but this is more convenient*/}
      {CATS.map((url, index) => <li key={index}><img src={url} role='presentation' height={IMG_HEIGHT} /></li>)
        /* when creating elements dynamically,
        you always need to provide each element a unique key*/
      }
    </ul>
  </div>
);

function getRandomCatUrl() {
  const URLS = [
    'http://random.cat/i/9nGhK.jpg',
    'http://random.cat/i/tumblr_lnbhr9gsbC1qg6j9eo1_500.jpg',
    'http://random.cat/i/20160202053446.jpg',
    'http://random.cat/i/DyqsD.jpg',
    'http://random.cat/i/tumblr_m421kru3Gq1r6nwiqo2_1280.jpg',
    'http://random.cat/i/lAs9D.gif',
    'http://random.cat/i/EFlSK.jpg',
    'http://random.cat/i/image1(1).jpg',
    'http://random.cat/i/QAP6w.jpg',
    'http://random.cat/i/xhfMW.jpg',
    'http://random.cat/i/Y3KLw.jpg',
    'http://random.cat/i/21857105562_75931e95df_b.jpg',
    'http://random.cat/i/NaJaQ.jpg',
  ];
  const index = parseInt(Math.random() * 10000) % URLS.length;
  return URLS[index];
}

export default Component;
