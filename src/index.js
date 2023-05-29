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
import { getApp } from 'firebase/app';

// DOM Elements
const image_container = document.getElementById('image-container');
const image = document.getElementById('image');
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('game-over-modal');
const characterCounter = document.getElementById('character-counter');
const imageSelectionButtons = document.querySelectorAll('.image-selection_button');


// Global variables
let charData = [];
let charCounter;
let pinImgSrc;
let timer;

// Initialize game state, load characters data and images
const initGame = async (imgID) => {
  // Reset game state
  charData = [];
  charCounter = 0;
  clearInterval(timer);
  document.querySelectorAll('.pin-image').forEach(el => el.remove());
  // Get data from backend
  charData = await getData();
  loadImage(imgID);
  loadPinImage();
  // Start timer
  const startingTime = new Date().getTime();
  timer = setInterval(() => { gameTimer(startingTime) }, 1000)
  
  updateDisplay();
}

const endGame = () => {
  clearInterval(timer);
  gameOverModal.style.display = 'block';
}

// Firebase functions
const storage = getStorage();

async function getData () {
  const imageData = doc(db, 'imagesDB', 'image1');
  const result = await getDoc(imageData);
  return result.data().data;
}

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

// Modals
document.getElementById('game-over-modal_close').addEventListener('click', () => gameOverModal.style.display = 'none');
document.getElementById('game-over-modal_start-again').addEventListener('click', () => {
  gameOverModal.style.display = 'none';
  initGame('1');
});


// Game flow
// Vérifie si le cadre contient le personnage
const checkCharacter = (x, y, coord, index) => {
  console.log(x, y, coord);
  if ((coord[0] -40) <= x && (coord[0] +40) >= x && (coord[1] -40) <= y && (coord[1] +40) >= y) {
    charData[index].found = true;
    document.getElementById(charData[index].char).style.display = 'none';
    addPinImage(pinImgSrc, coord[0], coord[1]);
    charCounter++;
    updateDisplay();
    // Si tous les personnages ont été trouvés, arrête le timer
    if (allCharsFound()) {
      endGame()
    }
  } else {
    console.log('Nope');
  }
};

const allCharsFound = () => {
  const result = charData.every(el => {
    if (el.found === true) {
      return true;
    }
  });
  return result;
};

const updateDisplay = () => {
  characterCounter.textContent = `${charCounter} / ${charData.length}`;
}

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

// Timer function
const gameTimer = (startingTime) => {
  const timeDistance = new Date().getTime() - startingTime;
  const minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);
  if (seconds < 10 && minutes < 10) {
    timerElement.textContent = `0${minutes}:0${seconds}`;
  } else if (seconds < 10) {
    timerElement.textContent = `${minutes}:0${seconds}`;
  } else if (minutes < 10) {
    timerElement.textContent = `0${minutes}:${seconds}`;
  } else {
    timerElement.textContent = `${minutes}:${seconds}`;
  }
};

// Test functions
const testButton = document.getElementById('test-button');
testButton.addEventListener('click', async () => {
  initGame('1');
})

imageSelectionButtons.forEach(el => {
  el.addEventListener('click', () => initGame(el.textContent))
})

export { checkCharacter };

// Récapitulatif des personnages à trouver, qui deviennent grisés lorsqu'on les trouve
// Ajouter leaderboard