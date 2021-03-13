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
    bigPhoto.classList.add('big-photo');
    bigPhoto.classList.add('open');
    bigBox.appendChild(bigPhoto);
    bigPhoto.src = './src/images/gallery/1/1.jpg';
    modalEl.classList.add('open');

    const filmStock = document.createElement('div');
    filmStock.classList.add('film-stock');
    modalEl.appendChild(filmStock);

    for (let i = 0; i < 4; i++) {
      const smallPhoto = document.createElement('img');
      smallPhoto.classList.add('small-photo');
      smallPhoto.src = './src/images/gallery/1/1.1.jpg';
      filmStock.appendChild(smallPhoto);
    }

    const closeEl = modalEl.querySelector('.modal-close');
    closeEl.addEventListener('click', () => {
      modalEl.classList.remove('open');
      bigBox.remove();
      bigPhoto.remove();
      const smallPhotos = document.querySelectorAll('.small-photo');
      smallPhotos.forEach((smallPhoto) => {
        smallPhoto.remove();
      });
    });
  });
});
