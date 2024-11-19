"use strict";
async function getCountry(countryName) {
  const countryInfoDiv = document.getElementById("country-info");
  countryInfoDiv.innerHTML = "";

  try {
    
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (!response.ok) {
      throw new Error("Country not found. Please check the name.");
    }

    const data = await response.json();

    // Extract information
    const country = data[0];
    const countryDetails = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
        `;

    countryInfoDiv.innerHTML = countryDetails;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      countryInfoDiv.innerHTML =
        "<p style='color: red;'>Connection lost. Please check your internet connection.</p>";
    } else {
      countryInfoDiv.innerHTML = `<p style='color: red;'>Error: ${error.message}</p>`;
    }
  }
}
