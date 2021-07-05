const logoEl = document.querySelector('.logo img');
const menuEl = document.querySelector('.menu');
const burgerEl = document.querySelector('.burger');

const modalEl = document.querySelector('.modal');
const previews = document.querySelectorAll('.gallery-img');
const arrows = document.querySelectorAll('.control');

const contactBtn = document.querySelector('.footer__button');

contactBtn.addEventListener('click', (e) => {
  console.log(e.target);
});

arrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    changeImage(e.target);
  });
});

document.addEventListener('keyup', (e) => {
  changeImage(e);
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

previews.forEach((preview) => {
  preview.addEventListener('click', () => {
    const bigBox = document.createElement('div');
    bigBox.classList.add('big-box');
    modalEl.appendChild(bigBox);

    const bigPhoto = document.createElement('img');
    const previewPhoto = preview.querySelector('img');
    const photoNr = previewPhoto.getAttribute('data-original');
    modalEl.style.backgroundImage = `url(
      ./src/images/gallery/${photoNr}/${photoNr}.1.jpg
    )`;

    bigPhoto.classList.add('big-photo');
    bigPhoto.classList.add('open');
    bigBox.appendChild(bigPhoto);
    bigPhoto.src = `./src/images/gallery/${photoNr}/${photoNr}.1.jpg`;
    modalEl.classList.add('open');

    const filmStock = document.createElement('div');
    filmStock.classList.add('film-stock');
    modalEl.appendChild(filmStock);

    let i = 1;

    while (doesImgExists(`./src/images/gallery/${photoNr}/${photoNr}.${i}.jpg`)) {
      const smallPhoto = document.createElement('img');
      smallPhoto.classList.add('small-photo');
      smallPhoto.src = `./src/images/gallery/${photoNr}/${photoNr}.${i}.jpg`;

      if (i === 1) {
        smallPhoto.classList.add('active');
      }

      smallPhoto.addEventListener('click', () => {
        modalEl.querySelectorAll('.small-photo').forEach((photo) => {
          photo.classList.remove('active');
        });

        smallPhoto.classList.add('active');
        bigPhoto.src = smallPhoto.src;
        modalEl.style.backgroundImage = `url(${smallPhoto.src})`;
      });

      filmStock.appendChild(smallPhoto);
      i++;
    }

    const closeEl = modalEl.querySelector('.modal-close');
    closeEl.addEventListener('click', () => {
      modalEl.classList.remove('open');
      setInterval(() => {
        bigBox.remove();
        bigPhoto.remove();
      }, 500);

      const smallPhotos = document.querySelectorAll('.small-photo');
      smallPhotos.forEach((smallPhoto) => {
        smallPhoto.remove();
      });
    });
  });
});

function doesImgExists(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, false);
  xhr.send();

  if (xhr.status === 404) {
    return false;
  } 

  return true;
}

function changeImage(arrow) {
  const isLeft = arrow.classList.contains('left');
  const isRight = arrow.classList.contains('right');
  let smallPhotos = Array.from(document.querySelectorAll('.small-photo'));

  if (isLeft) {
    let index = smallPhotos.findIndex((photo) => {
      return photo.classList.contains('active');
    });

    smallPhotos[index].classList.remove('active');
    if (index === 0) {
      smallPhotos[smallPhotos.length - 1].classList.add('active');
      const bigPhoto = modalEl.querySelector('.big-photo');
      bigPhoto.src = smallPhotos[smallPhotos.length - 1].src;
      modalEl.style.backgroundImage = `url(${
        smallPhotos[smallPhotos.length - 1].src
      }`;
    } else {
      smallPhotos[index - 1].classList.add('active');

      const bigPhoto = modalEl.querySelector('.big-photo');
      bigPhoto.src = smallPhotos[index - 1].src;
      modalEl.style.backgroundImage = `url(${smallPhotos[index - 1].src}`;
    }
  }  
  
  if (isRight) {
    let index = smallPhotos.findIndex((photo) => {
      return photo.classList.contains('active');
    });

    smallPhotos[index].classList.remove('active');
    if (index === smallPhotos.length - 1) {
      smallPhotos[0].classList.add('active');
      const bigPhoto = modalEl.querySelector('.big-photo');
      bigPhoto.src = smallPhotos[0].src;
      modalEl.style.backgroundImage = `url(${smallPhotos[0].src}`;
    } else {
      smallPhotos[index + 1].classList.add('active');
      const bigPhoto = modalEl.querySelector('.big-photo');
      bigPhoto.src = smallPhotos[index + 1].src;
      modalEl.style.backgroundImage = `url(${smallPhotos[index + 1].src}`;
    }
  }
}
