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
    const listItem = document.createElement('li');
    listItem.textContent = data[i].char;
    listItem.addEventListener('click', () => {
      checkCharacter(x, y, data[i].coord, data[i].char);
    })
    list.appendChild(listItem);
  }
  element.appendChild(list);
  image_container.appendChild(element);
}

export { displayTarget, displayDropdown };