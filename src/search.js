
const searchForm = document.querySelector('.app-header-search');
const searchList = document.getElementById('search-list');
let allData = [];

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

const initSearch = () => {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchText = searchForm.search.value.trim();
      if (searchText) fetchAllSuperHero(searchText);
    });

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
};

export { initSearch, fetchAllSuperHero, showSearchList };
