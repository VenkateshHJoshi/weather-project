//937746edb6c778a06a426c933a09a3bc
const apiKey = '937746edb6c778a06a426c933a09a3bc';
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const locationSpan = document.getElementById('location');
const descriptionP = document.getElementById('description');
const temperatureSpan = document.getElementById('temperature');
const humiditySpan = document.getElementById('humidity');
const additionalWeatherDiv = document.getElementById('additionalWeather');

const importantPlacesIndia = {
    "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Gurgaon", "Faridabad", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Manipur": ["Imphal", "Churachandpur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Cherrapunji"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Amritsar", "Ludhiana", "Chandigarh"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Sikkim": ["Gangtok", "Pelling", "Lachung"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
    "West Bengal": ["Kolkata", "Darjeeling", "Howrah"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
    "Lakshadweep": ["Kavaratti"],
    "Delhi": ["New Delhi"],
    "Puducherry": ["Pondicherry"]
};

searchButton.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        if (isLocationInIndia(location)) {
            fetchWeather(location);
        } else {
            alert('Please enter a location related to India.');
        }
    }
});

function isLocationInIndia(location) {
    if (importantPlacesIndia[location]) {
        return true;
    }
    for (const state in importantPlacesIndia) {
        if (importantPlacesIndia[state].includes(location)) {
            return true;
        }
    }
    return false;
}

async function fetchWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod === '404') {
        alert('Location not found');
        return;
    }
    updateUI(data);
    fetchAdditionalWeather(location);
}

async function fetchAdditionalWeather(location) {
    additionalWeatherDiv.innerHTML = ''; // Clear previous additional weather data
    let places = importantPlacesIndia[location];
    if (!places) {
        places = [];
        for (const key in importantPlacesIndia) {
            if (importantPlacesIndia[key].includes(location)) {
                places = importantPlacesIndia[key];
                break;
            }
        }
    }
    for (const place of places) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayAdditionalWeather(data);
    }
}

function displayAdditionalWeather(data) {
    const additionalWeather = document.createElement('div');
    additionalWeather.classList.add('additional-weather');
    additionalWeather.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}&#8451;</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    additionalWeatherDiv.appendChild(additionalWeather);
}

function updateUI(data) {
    locationSpan.textContent = data.name;
    descriptionP.textContent = data.weather[0].description;
    temperatureSpan.textContent = data.main.temp;
    humiditySpan.textContent = data.main.humidity;
}

// Fetch and display weather for a default location on page load
fetchWeather('Delhi');
