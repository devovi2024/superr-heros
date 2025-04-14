
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
  };
  
  export { showSuperheroDetails };
  