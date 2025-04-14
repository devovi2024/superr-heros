const allTabsBody = document.querySelectorAll('.tab-body-single'); 
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
const searchList = document.getElementById('search-list');

let activeTab = 1;


const init = () => {
    updateActiveTab();
};

// Update active tab 
const updateActiveTab = () => {
    allTabsHead.forEach((tab, index) => {
        tab.classList.toggle('active-tab', index + 1 === activeTab);
        allTabsBody[index].classList.toggle('show-tab', index + 1 === activeTab);
    });
};

allTabsHead.forEach(tabHead => {
  tabHead.addEventListener('click', () => {
      activeTab = +tabHead.dataset.id;
      updateActiveTab();
  });
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchText = searchForm.search.value.trim();
  if (searchText) fetchAllSuperHero(searchText);
});



// Fetch superhero data from API
const fetchAllSuperHero = async (searchText) => {
    const url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`;
    try {
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success') {
            showSearchList(allData.results); 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const showSearchList = (data) => {
  searchList.innerHTML = data.map(({ id, name, image }) => `
      <div class="search-list-item">
          <img src="${image.url || ''}" alt="${name} image">
          <p data-id="${id}">${name}</p>
      </div>
  `).join('');
};

searchForm.search.addEventListener('keyup', () => {
  const searchValue = searchForm.search.value.trim();
  if (searchValue.length > 1) fetchAllSuperHero(searchValue);
  else searchList.innerHTML = '';
});

searchList.addEventListener('click', (event) => {
  const selectedHero = allData.results.find(hero => hero.id === event.target.dataset.id);
  if (selectedHero) {
      showSuperheroDetails(selectedHero);
      searchList.innerHTML = '';
  }
});




const showSuperheroDetails = (data) => {
  const { image, name, powerstats, biography, appearance, connections } = data;

  const thumbnail = document.getElementsByClassName('app-body-content-thumbnail')[0];
  thumbnail.innerHTML = `<img src="${image.url}">`;

  const nameElement = document.getElementsByClassName('name')[0];
  nameElement.textContent = name;

  const createStatsList = (stats) => {
      let statsList = '';
      for (const key in stats) {
          if (stats.hasOwnProperty(key)) {
              statsList += `
                  <li>
                      <div>
                          <i class="fa-solid fa-shield-halved"></i>
                          <span>${key}</span>
                      </div>
                      <span>${stats[key]}</span>
                  </li>
              `;
          }
      }
      return statsList;
  };

  const powerstatsElement = document.getElementsByClassName('powerstats')[0];
  powerstatsElement.innerHTML = createStatsList(powerstats);

  const biographyElement = document.getElementsByClassName('biography')[0];
  biographyElement.innerHTML = createStatsList(biography);

  const appearanceElement = document.getElementsByClassName('appearance')[0];
  appearanceElement.innerHTML = createStatsList(appearance);

  const connectionsElement = document.getElementsByClassName('connections')[0];
  connectionsElement.innerHTML = createStatsList(connections);
}
