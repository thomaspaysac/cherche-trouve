import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { checkCharacter } from ".";

const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

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
      listItem.addEventListener('click', () => checkCharacter(x, y, data[i].coord, data[i].char, i))
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

export { displayTarget, displayDropdown, addPinImage };