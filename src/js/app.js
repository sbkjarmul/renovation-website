const logoEl = document.querySelector('.logo img');
const menuEl = document.querySelector('.menu');
const burgerEl = document.querySelector('.burger');

const modalEl = document.querySelector('.modal');
const thumbnails = document.querySelectorAll('.gallery-img');
const arrows = document.querySelectorAll('.control');

const contactBtn = document.querySelector('.footer__button');

contactBtn.addEventListener('click', (e) => {
  console.log(e.target);
});

arrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    changeImages(e.target);
  });
});

burgerEl.addEventListener('click', (e) => {
  menuEl.classList.toggle('active');
});

if (screen.width < 1100) {
  logoEl.src = './src/images/brand-mobile.png';
} else {
  logoEl.src = './src/images/brand.png';
  menuEl.classList.remove('active');
}

const createContainer = () => {
  const bigBox = document.createElement('div');
  bigBox.classList.add('big-box');
  modalEl.appendChild(bigBox);

  return bigBox;
}

const createBigImage = (parentElement) => {
  const bigPhoto = document.createElement('img');
  bigPhoto.classList.add('big-photo');
  bigPhoto.classList.add('open');
  parentElement.appendChild(bigPhoto);

  return bigPhoto;
}

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    // const bigBox = document.createElement('div');
    // bigBox.classList.add('big-box');
    // modalEl.appendChild(bigBox);

    const bigBox = createContainer();
    const bigPhoto = createBigImage(bigBox);
    // const bigPhoto = document.createElement('img');
    // bigPhoto.classList.add('big-photo');
    // bigPhoto.classList.add('open');
    // bigBox.appendChild(bigPhoto);

    const activeThumbnail = thumbnail.querySelector('img');
    const photoNr = activeThumbnail.getAttribute('data-original');
    modalEl.style.backgroundImage = `url(
      ./src/images/gallery/${photoNr}/${photoNr}.1.jpg
    )`;

    bigPhoto.src = `./src/images/gallery/${photoNr}/${photoNr}.1.jpg`;

    const filmStock = document.createElement('div');
    filmStock.classList.add('film-stock');


    let i = 1;
    while (doesImgExists(`./src/images/gallery/${photoNr}/${photoNr}.${i}.jpg`)) {
      const smallPhoto = createThumbnail(photoNr, i);

      smallPhoto.addEventListener('click', () => {
        // modalEl.querySelectorAll('.small-photo').forEach((photo) => {
        //   photo.classList.remove('active');
        // });
        disableActiveImage();
        setActiveImage(smallPhoto, bigPhoto);
        // smallPhoto.classList.add('active');
        // bigPhoto.src = smallPhoto.src;
        // modalEl.style.backgroundImage = `url(${smallPhoto.src})`;
      });

      filmStock.appendChild(smallPhoto);
      i++;
    }

    modalEl.appendChild(filmStock);

    // const closeEl = modalEl.querySelector('.modal-close');
    // closeEl.addEventListener('click', () => {
    //   modalEl.classList.remove('open');
    //   setInterval(() => {
    //     bigBox.remove();
    //     bigPhoto.remove();
    //   }, 500);

    //   removeThumbnails();
    //   // const smallPhotos = document.querySelectorAll('.small-photo');
    //   // smallPhotos.forEach((smallPhoto) => {
    //   //   smallPhoto.remove();
    //   // });
      
    // });
    const closeEl = modalEl.querySelector('.modal-close');
    closeEl.addEventListener('click', () => {
      closeGallery(bigBox, bigPhoto);
    });

    modalEl.classList.add('open');
  });
});

const disableActiveImage = () => {
  modalEl.querySelectorAll('.small-photo').forEach((photo) => {
    photo.classList.remove('active');
  });
}

const setActiveImage = (smallPhoto, bigPhoto) => {
  smallPhoto.classList.add('active');
  bigPhoto.src = smallPhoto.src;
  modalEl.style.backgroundImage = `url(${smallPhoto.src})`;
}

const closeGallery = (bigBox, bigPhoto) => {
  modalEl.classList.remove('open');
  setInterval(() => {
    bigBox.remove();
    bigPhoto.remove();
  }, 500);

  removeThumbnails();
}

const removeThumbnails = () => {
  const smallPhotos = document.querySelectorAll('.small-photo');
  smallPhotos.forEach((smallPhoto) => {
    smallPhoto.remove();
  });
}

const createThumbnail = (photoNumber, iterationNumber) => {
  const smallPhoto = document.createElement('img');
  smallPhoto.classList.add('small-photo');
  smallPhoto.src = `./src/images/gallery/${photoNumber}/${photoNumber}.${iterationNumber}.jpg`;

  if (iterationNumber === 1) {
    smallPhoto.classList.add('active');
  }

  return smallPhoto;
}

function doesImgExists(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, false);
  xhr.send();

  if (xhr.status === 404) {
    return false;
  } 

  return true;
}

const removeActiveAndGetIndex = (array) => {
  let index = array.findIndex((photo) => {
    return photo.classList.contains('active');
  });

  array[index].classList.remove('active');

  return index;
}

const changeBackgroundImagePrevious = (array, index) => {
  if (index === 0) {
    modalEl.style.backgroundImage = 
      `url(${array[array.length - 1].src}`;
  } else {
     modalEl.style.backgroundImage = `url(${array[index - 1].src}`;
  }
}

const changeBackgroundImageNext = (array, index) => {
  if (index === array.length - 1) {
    modalEl.style.backgroundImage = `url(${array[0].src}`;
  } else {
    modalEl.style.backgroundImage = `url(${array[index + 1].src}`;
  }
}

const changeBigImagePrevious = (array, index) => {
  const bigPhoto = modalEl.querySelector('.big-photo');

  if (index === 0) {
    array[array.length - 1].classList.add('active');
    bigPhoto.src = array[array.length - 1].src;
  } else {
    array[index - 1].classList.add('active');
    bigPhoto.src = array[index - 1].src;
  }
}

const changeBigImageNext = (array, index) => {
  const bigPhoto = modalEl.querySelector('.big-photo');

  if (index === array.length - 1) {
    array[0].classList.add('active');
    bigPhoto.src = array[0].src;
  } else {
    array[index + 1].classList.add('active');
    bigPhoto.src = array[index + 1].src;
  }
}

function changeImages(arrow) {
  const isLeft = arrow.classList.contains('left');
  const isRight = arrow.classList.contains('right');
  let smallPhotos = Array.from(document.querySelectorAll('.small-photo'));
  let index = removeActiveAndGetIndex(smallPhotos);

  if (isLeft) {
    changeBackgroundImagePrevious(smallPhotos, index);
    changeBigImagePrevious(smallPhotos, index);
  }  
  
  if (isRight) {
    changeBigImageNext(smallPhotos, index);
    changeBackgroundImageNext(smallPhotos, index);
  }
}
