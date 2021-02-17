const logoEl = document.querySelector('.logo img');
const menuEl = document.querySelector('.menu');
const burgerEl = document.querySelector('.burger');

burgerEl.addEventListener("click", (e) => {
  console.log(e.target);
  menuEl.classList.toggle("active");
  console.log(menuEl);
})

if (screen.width < 1100) {
  logoEl.src = '../src/images/brand-mobile.png';
}
else {
  logoEl.src = '../src/images/brand.png';
  menuEl.classList.remove("active");
}

