/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const token = getCookie('token');
  if (token) {
    fetchPlaces(token);
  }

  populateCountryFilter();

  document.getElementById('country-filter').addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    filterPlaces(selectedCountry);
  });
});

async function fetchPlaces(token) {
  const endpoint = 'http://127.0.0.1:5000/places';

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayPlaces(data);
  } catch (error) {
    console.error('Error fetching places:', error);
  }
}

function displayPlaces(places) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';

  if (Array.isArray(places) && places.length > 0) {
    places.forEach(place => {
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');
      placeCard.setAttribute('data-country', place.country);

      placeCard.innerHTML = `
              <img src="${place.image}" alt="${place.name}" class="place-image">
              <div class="place-details">
                  <h3>${place.name}</h3>
                  <p>Price per night: $${place.price}</p>
                  <p>Location: ${place.location}</p>
                  <button class="details-button">View Details</button>
              </div>
          `;

      placesList.appendChild(placeCard);
    });

    populateCountryFilter(places);
  } else {
    const noPlacesMessage = document.createElement('p');
    noPlacesMessage.textContent = 'No places available.';
    placesList.appendChild(noPlacesMessage);
  }
}

function populateCountryFilter(places = []) {
  const countryFilter = document.getElementById('country-filter');
  const countries = new Set(['all']);

  places.forEach(place => countries.add(place.country));

  countryFilter.innerHTML = '';

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });
}

function filterPlaces(selectedCountry) {
  const placeCards = document.querySelectorAll('#places-list .place-card');

  placeCards.forEach(card => {
    const placeCountry = card.getAttribute('data-country');
    if (selectedCountry === 'all' || placeCountry === selectedCountry) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length);
    }
  }
  return null;
}
