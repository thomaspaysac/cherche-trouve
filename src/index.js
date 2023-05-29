import './style.css';
import { displayTarget, displayDropdown, addPinImage } from './DOMElements';
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

import { getStorage, ref, getDownloadURL, list } from "firebase/storage";

// DOM Elements
const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

// Global variables
let charData = [];
let pinImgSrc;

// Initialize game state, load characters data and images
const initGame = async () => {
  charData = [];
  charData = await getData();
  loadImage(1);
  loadPinImage();
}

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

const loadPinImage = () => {
  const pinImageRef = ref(storage, `pin.svg`);
  getDownloadURL(pinImageRef)
  .then((url) => {
    pinImgSrc = url;
  })  
}


// App

// Vérifie si le cadre contient le personnage
const checkCharacter = (x, y, coord, character, index) => {
  console.log(x, y, coord);
  if ((coord[0] -40) <= x && (coord[0] +40) >= x && (coord[1] -40) <= y && (coord[1] +40) >= y) {
    charData[index].found = true;
    document.getElementById(charData[index].char).style.display = 'none';
    addPinImage(pinImgSrc, coord[0], coord[1]);
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
    displayDropdown(tx, ty, x, y, charData);
  } else {
    displayTarget(tx, ty);
    displayDropdown(tx, ty, x, y, charData);
  }
})

// Test functions
const testButton = document.getElementById('test-button');
testButton.addEventListener('click', async () => {
  initGame();
})

export { checkCharacter };

// Timer qui commence en début de partie et qui s'arrête lorsque la liste de choix est vide
// Récapitulatif des personnages à trouver, qui deviennent grisés lorsqu'on les trouve