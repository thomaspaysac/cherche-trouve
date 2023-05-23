import './style.css';
import { displayTarget, displayDropdown } from './DOMElements';

const image_container = document.getElementById('image-container');
const image = document.getElementById('image');
const templateData = [
  {char: 'Mario',
  coord: [113, 366],
  }
];

// Vérifie si le cadre contient le personnage
const checkCharacter = (x, y, target) => {
  console.log(x, y, target[0]);
  if ((target[0] -40) <= x && (target[0] +40) >= x
      && (target[1] -40) <= y && (target[1] +40) >= y) {
    console.log('found!');
  } else {
    console.log('nope');
  }
};

image.addEventListener('click', (e) => {
  const bounds = image.getBoundingClientRect();
  const left = bounds.left;
  const top = bounds.top;
  const x = e.pageX - left - window.scrollX;
  const y = e.pageY - top - window.scrollY;
  const tx = x - 40;
  const ty = y - 40;
  /*const cw = image.clientWidth;
  const ch = image.clientHeight;
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;
  const px = x/cw*iw;
  const py = y/ch*ih;*/
  if (document.getElementById('target-box')) {
    const targetBox = document.getElementById('target-box');
    const dropdown = document.getElementById('dropdown-choices');
    image_container.removeChild(targetBox);
    image_container.removeChild(dropdown);
    displayTarget(tx, ty);
    displayDropdown(tx, ty);
    checkCharacter(x, y, templateData[0].coord);
  } else {
    displayTarget(tx, ty);
    displayDropdown(tx, ty);
    checkCharacter(x, y, templateData[0].coord);
  }
})

// Récupérer coordonées du click
// Ajouter un élément cadre aux coordonnées du click
// Ajouter options en dropdown à côté du cadre
// Au choix d'une option, envoyer l'option et les coordonnées. Si match, valider le choix, et le retirer de la liste des choix
// Ajouter une marqueur visuel sur l'image après un choix correct
// Timer qui commence en début de partie et qui s'arrête lorsque la liste de choix est vide