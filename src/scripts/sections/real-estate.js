// @ts-expect-error
import HousesTemplate from "components/house-article.pug";

/**
 * @typedef HouseEntry
 * @property {string} id
 * @property {string} title
 * @property {string} address
 * @property {string} type
 * @property {number} price
 */

/**
 * @param {HTMLElement} section 
 */
export async function initRealEstateSection(section) {
  /**
   * @type HTMLFormElement
   */
  const filterForm = section.querySelector(".filter-form");
  /**
   * @type HTMLInputElement
   */
  const filterInput = filterForm.querySelector(".filter-form__input");
  /**
   * @type HTMLElement
   */
  const houseContainer = section.querySelector(".real-estate__houses");
  const houseList = await populateHouseList(houseContainer);

  filterForm?.addEventListener("submit", filterHouses);

  /**
   * @param {Event} event 
   */
  function filterHouses(event) {
    event.preventDefault();

    if (filterInput.value.length > 3) {
      const filter = filterInput.value.toLowerCase();
      
      for (const house of houseList) {
        const title = house.querySelector(".house-entry__link")?.textContent?.toLowerCase();

        if (!title?.includes(filter)) {
          house.classList.add("house-entry--filtered-out");
        } else {
          house.classList.remove("house-entry--filtered-out");
        }
      }
    }
    
    // show all if no input
    if ( filterInput.value.length === 0 ){
      for (const house of houseList) {
        house.classList.remove("house-entry--filtered-out");
      }
    }
  }
}

/**
 * @param {HTMLElement} houseContainer 
 * @returns {Promise<NodeListOf<HTMLElement>>}
 */
async function populateHouseList(houseContainer) {
  const response = await fetch("https://603e38c548171b0017b2ecf7.mockapi.io/homes");
  /**
   * @type HouseEntry[]
   */
  const houses = await response.json();

  // create html out of template
  const html = HousesTemplate({ 
    houses,
    getRandomColor
  });
  // insert it into container
  houseContainer.insertAdjacentHTML("afterbegin", html);
  // 
  /**
   * @type NodeListOf<HTMLElement>
   */
  const houseList = houseContainer.querySelectorAll(".house-entry");

  return houseList;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = "";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
