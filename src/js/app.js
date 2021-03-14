const logoEl = document.querySelector('.logo img');
const menuEl = document.querySelector('.menu');
const burgerEl = document.querySelector('.burger');

const modalEl = document.querySelector('.modal');
const previews = document.querySelectorAll('.gallery-img');

burgerEl.addEventListener('click', (e) => {
  console.log(e.target);
  menuEl.classList.toggle('active');
  console.log(menuEl);
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
    while (
      doesImgExists(`./src/images/gallery/${photoNr}/${photoNr}.${i}.jpg`)
    ) {
      const smallPhoto = document.createElement('img');
      smallPhoto.classList.add('small-photo');

      smallPhoto.src = `./src/images/gallery/${photoNr}/${photoNr}.${i}.jpg`;

      if (i == 1) {
        smallPhoto.classList.add('active');
      }

      smallPhoto.addEventListener('click', () => {
        modalEl.querySelectorAll('.small-photo').forEach((photo) => {
          photo.classList.remove('active');
        });
        smallPhoto.classList.add('active');
        bigPhoto.src = smallPhoto.src;
        modalEl.style.backgroundImage = `url(${smallPhoto.src}
        )`;
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

  if (xhr.status == '404') {
    return false;
  } else {
    return true;
  }
}
