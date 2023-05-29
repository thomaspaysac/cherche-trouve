import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { checkCharacter } from ".";

const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

const createSlide = (imgID) => {
  const slider = document.getElementById('slider');
  const slide = document.createElement('div');
    slide.classList.add('slide');
  const image = document.createElement('img');
    image.classList.add('image-preview');
    image.setAttribute('id', `image${imgID}-preview`);
    //loadImgPreviews(imgID);
  const selectBtn = document.createElement('button');
    selectBtn.classList.add('image-selection_button');
    selectBtn.textContent = imgID;
  slide.appendChild(image);
  slide.appendChild(selectBtn);
  slider.appendChild(slide);
}

const loadImgPreviews = (imgID) => {
  const previewContainer = document.getElementById(`image${imgID}-preview`);
  const imageRef = ref(getStorage(), `images/${imgID}.jpg`);
  getDownloadURL(imageRef)
  .then((url) => {
    /*previewContainer.style.background = `url('${url}')`;
    previewContainer.style.backgroundSize = 'contain';
    previewContainer.style.backgroundRepeat = 'no-repeat';*/
    previewContainer.src = url;
  })
}

const displayTarget = (x, y) => {
  const element = document.createElement('div');
  element.setAttribute('id', 'target-box');
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  image_container.appendChild(element);
}

const displayDropdown = (tx, ty, x, y, data) => {
  const element = document.createElement('div');
  element.setAttribute('id', 'dropdown-choices');
  element.style.left = `${tx + 90}px`;
  element.style.top = `${ty}px`;
  const list = document.createElement('ul');
  for (let i = 0; i < data.length; i++) {
    if (!data[i].found) {
      const listItem = document.createElement('li');
      listItem.setAttribute('id', data[i].char);
      listItem.textContent = data[i].char;
      listItem.addEventListener('click', () => checkCharacter(x, y, data[i].coord, i))
      list.appendChild(listItem);
    }
  }
  element.appendChild(list);
  image_container.appendChild(element);
}

const addPinImage = (url, x, y) => {
  const element = document.createElement('img');
  element.src = url;
  element.classList.add('pin-image');
  element.style.left = `${x - 35}px`;
  element.style.top = `${y - 35}px`;
  image_container.appendChild(element);
}


export { displayTarget, displayDropdown, addPinImage, loadImgPreviews, createSlide };