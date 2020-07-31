$(document).ready(function() {
    $('#currentYear').text(new Date().getFullYear());

    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const errorDiv = document.querySelector('.error');
    const locationDiv = document.querySelector('.location');
    const forecastDiv = document.querySelector('.forecast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorDiv.textContent = ''; 
        locationDiv.textContent = 'Loading...';
        forecastDiv.textContent = '';
        const location = input.value;
        fetch('/weather?location=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    errorDiv.textContent = data.error; 
                    locationDiv.textContent = '';
                    forecastDiv.textContent = '';
                    return;
                } 
                errorDiv.textContent = '';
                locationDiv.textContent = data.location;
                forecastDiv.textContent = data.forecast;
            });
        });
    });
});


