document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".navbar-left");
  const flagImage = document.querySelector(".flag-image");
  const countryName = document.querySelector(".country-name");
  const nativeName = document.querySelector(".native-name span");
  const topLevelDomain = document.querySelector(".top-level-domain span");
  const population = document.querySelector(".population span");
  const currencies = document.querySelector(".currencies span");
  const languages = document.querySelector(".languages span");
  const region = document.querySelector(".region span");
  const subRegion = document.querySelector(".sub-region span");
  const capital = document.querySelector(".capital span");
  const borderCountryList = document.querySelector(".border-country-list");

  // Get the country code from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get("code");

  // Fetch the data.json file to get the country details
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the country with the matching alpha3Code
      const countryData = data.find(
        (country) => country.alpha3Code === countryCode
      );

      if (countryData) {
        flagImage.src = countryData.flags.png;
        console.log(flagImage.src);
        console.log(countryData.flags.png);
        countryName.textContent = countryData.name;
        nativeName.textContent = countryData.nativeName;
        topLevelDomain.textContent = countryData.topLevelDomain[0];
        population.textContent = countryData.population.toLocaleString();
        currencies.textContent = countryData.currencies[0].name;
        languages.textContent = countryData.languages
          .map((lang) => lang.name)
          .join(", ");
        region.textContent = countryData.region;
        subRegion.textContent = countryData.subregion;
        capital.textContent = countryData.capital;

        // Populate border countries
        if (countryData.borders) {
          borderCountryList.innerHTML = countryData.borders
            .map((border) => {
              const borderCountry = document.createElement("div");
              borderCountry.classList.add("border-country");
              borderCountry.textContent = border;
              return borderCountry.outerHTML;
            })
            .join("");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  // Add event listener for the back button
  backButton.addEventListener("click", function () {
    window.history.back();
  });
});
