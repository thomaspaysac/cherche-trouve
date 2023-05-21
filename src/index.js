import './style.css';

const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

const displayTarget = (x, y) => {
  const container = document.getElementById('image-container');
  const element = document.createElement('div');
  element.classList.add('target');
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  container.appendChild(element);
}

image.addEventListener('click', (e) => {
  const bounds = image.getBoundingClientRect();
  const left = bounds.left;
  const top = bounds.top;
  const x = e.pageX - left;
  const y = e.pageY - top - 314;
  const cw = image.clientWidth;
  const ch = image.clientHeight;
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;
  const px = x/cw*iw;
  const py = y/ch*ih;
  console.log(px, py);
  displayTarget(px, py);
})

// Récupérer coordonées du click
// Ajouter un élément cadre aux coordonnées du click