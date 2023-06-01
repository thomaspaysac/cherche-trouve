import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { checkCharacter } from ".";
import { doc } from "firebase/firestore";

const image_container = document.getElementById('image-container');
const image = document.getElementById('image');

const createSlide = (imgID, data) => {
  const slider = document.getElementById('slider');
    const slide = document.createElement('div');
    slide.classList.add('slide');
      const image = document.createElement('img');
      image.classList.add('image-preview');
      image.classList.add('frame-border');
      image.setAttribute('id', `image${imgID}-preview`);
      slide.appendChild(image);
      const slideInfo = document.createElement('div');
      slideInfo.classList.add('slide-info');
      slide.appendChild(slideInfo);
        const slideCredits = document.createElement('div');
        slideCredits.classList.add('slider_image-credits');
        slideCredits.textContent = data.credits.title + ', by ' + data.credits.artist;
        slideInfo.appendChild(slideCredits);
        const charListContainer = document.createElement('div');
          charListContainer.classList.add('characters-list');
          const charListTitle = document.createElement('div');
          charListTitle.classList.add('category-title');
          charListTitle.textContent = 'Characters to find:'
          charListContainer.appendChild(charListTitle);
          const charList = document.createElement('ul');
          data.data.forEach(el => {
            const listItem = document.createElement('li');
            listItem.classList.add('characters-list-item');
            const characterImage = document.createElement('img');
            characterImage.src = el.image;
            listItem.appendChild(characterImage);
            const characterName = document.createElement('span');
            characterName.textContent = el.char;
            listItem.appendChild(characterName);
            //listItem.textContent = el.char;
            charList.appendChild(listItem);
          })
          charListContainer.appendChild(charList);
          slideInfo.appendChild(charListContainer);
        const leaderboardContainer = document.createElement('div');
        leaderboardContainer.classList.add('leaderboard');
        const leaderboardTitle = document.createElement('div');
        leaderboardTitle.classList.add('category-title');
        leaderboardTitle.textContent = 'Best times:'
        leaderboardContainer.appendChild(leaderboardTitle);
        const leaderboard = document.createElement('ul');
          leaderboardContainer.appendChild(leaderboard);
          // Sort leaderboard and get first 3 to display
          const sortedLeaderBoard = data.leaderboard.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));
          sortedLeaderBoard.slice(0, 3).forEach(el => {
            const listItem = document.createElement('li');
            listItem.textContent = el.username + ' : ' + el.score;
            leaderboard.appendChild(listItem);
          })
          slideInfo.appendChild(leaderboardContainer);
        const selectBtn = document.createElement('button');
        selectBtn.classList.add('image-selection_button');
        selectBtn.setAttribute('data-id', imgID);
        selectBtn.textContent = '▶ Play';
        slideInfo.appendChild(selectBtn);
  slider.appendChild(slide);
}

const loadImgPreviews = (imgID) => {
  const previewContainer = document.getElementById(`image${imgID}-preview`);
  const imageRef = ref(getStorage(), `images/${imgID}.jpg`);
  getDownloadURL(imageRef)
  .then((url) => {
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
      const characterImage = document.createElement('img');
      characterImage.src = data[i].image;
      listItem.appendChild(characterImage);
      const characterName = document.createElement('span');
      characterName.textContent = data[i].char;
      listItem.appendChild(characterName);
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