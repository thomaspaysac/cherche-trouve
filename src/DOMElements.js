const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

const displayTarget = (x, y) => {
  const element = document.createElement('div');
  element.setAttribute('id', 'target-box');
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  image_container.appendChild(element);
}

const displayDropdown = (x, y) => {
  const element = document.createElement('div');
  element.setAttribute('id', 'dropdown-choices');
  element.style.left = `${x + 105}px`;
  element.style.top = `${y}px`;
  element.innerHTML = ' <ul><li>Choix 1</li><li>Choix 2</li><li>Choix 3</li><li>Choix 4</li><li>Choix 5</li></ul>';
  image_container.appendChild(element);
}

export { displayTarget, displayDropdown };