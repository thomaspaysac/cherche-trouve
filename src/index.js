import './style.css';
import { displayTarget, displayDropdown } from './DOMElements';
import { db } from './firebase';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

// DOM Elements
const image_container = document.getElementById('image-container');
const image = document.getElementById('image');


// Firebase functions
async function getData () {
  const imageData = doc(db, 'imagesDB', 'image1');
  const result = await getDoc(imageData);
  return result.data().data;
}

const storage = getStorage();

const loadImage = (img) => {
  const imageRef = ref(storage, `images/${img}.jpg`);
  getDownloadURL(imageRef)
  .then((url) => {
    image_container.style.display = 'block';
    image.src = url;
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        break;
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  });
}

// Test Data
const templateData = [
  {
    char: 'Mario',
    coord: [113, 366],
  },
  {
    char: 'Peach',
    coord: [202, 674]
  },
  {
    char: 'Luigi',
    coord: [244, 872]
  },
  {
    char: 'Eggman',
    coord: [27, 393]
  }
];

// App

// Vérifie si le cadre contient le personnage
const checkCharacter = (x, y, coord, character) => {
  console.log(x, y, coord);
  if ((coord[0] -40) <= x && (coord[0] +40) >= x
      && (coord[1] -40) <= y && (coord[1] +40) >= y) {
    console.log(`You found ${character}!`);
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
    displayDropdown(tx, ty, x, y, templateData);
    //checkCharacter(x, y, templateData[0].coord, templateData[0].char);
  } else {
    displayTarget(tx, ty);
    displayDropdown(tx, ty, x, y, templateData);
    //checkCharacter(x, y, templateData[0].coord, templateData[0].char);
  }
})

// Test functions
const testButton = document.getElementById('test-button');
testButton.addEventListener('click', async () => {
  const charData = await getData();
  console.log(charData);
  loadImage(1);
})

export { checkCharacter };

// Récupérer coordonées du click
// Ajouter un élément cadre aux coordonnées du click
// Ajouter options en dropdown à côté du cadre
// Au choix d'une option, envoyer l'option et les coordonnées. Si match, valider le choix, et le retirer de la liste des choix
// Ajouter une marqueur visuel sur l'image après un choix correct
// Timer qui commence en début de partie et qui s'arrête lorsque la liste de choix est vide