document.addEventListener("DOMContentLoaded", function () {
  const countryList = document.getElementById("country-list");
  const searchInput = document.getElementById("search-input");
  const regionFilter = document.getElementById("region-filter");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Function to toggle dark mode
  function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", !isDarkMode);
    document.body.classList.toggle("light-mode", isDarkMode);

    // Toggle the moon and sun icon
    if (isDarkMode) {
      darkModeToggle.classList.remove("fa-sun");
      darkModeToggle.classList.add("fa-moon");
    } else {
      darkModeToggle.classList.remove("fa-moon");
      darkModeToggle.classList.add("fa-sun");
    }
  }

  // Event listener for dark mode toggle (clicking on moon/sun icon)
  darkModeToggle.addEventListener("click", toggleDarkMode);

  // Fetch the JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredData = data;

      // Function to populate country cards
      function populateCountryCards() {
        countryList.innerHTML = "";

        filteredData.forEach((country) => {
          const countryCard = document.createElement("div");
          countryCard.classList.add("country-card");

          // Flag Image
          const flagImage = document.createElement("img");
          flagImage.src = country.flags.png;
          flagImage.alt = country.name;
          flagImage.classList.add("flag-image");
          countryCard.appendChild(flagImage);

          // Country Name as a link
          const countryNameLink = document.createElement("a");
          countryNameLink.href = `country.html?code=${country.alpha3Code}`;
          countryNameLink.textContent = country.name;
          countryCard.appendChild(countryNameLink);

          // Other Information
          const countryInfo = document.createElement("div");
          countryInfo.classList.add("country-info");

          // Population
          const population = document.createElement("p");
          population.textContent =
            "Population: " + country.population.toLocaleString();
          countryInfo.appendChild(population);

          // Region
          const region = document.createElement("p");
          region.textContent = "Region: " + country.region;
          countryInfo.appendChild(region);

          // Capital
          const capital = document.createElement("p");
          capital.textContent = "Capital: " + country.capital;
          countryInfo.appendChild(capital);

          countryCard.appendChild(countryInfo);

          countryList.appendChild(countryCard);
        });
      }

      // Event listener for region filter
      regionFilter.addEventListener("change", function () {
        const selectedRegion = regionFilter.value;

        if (selectedRegion) {
          filteredData = data.filter(
            (country) => country.region === selectedRegion
          );
        } else {
          filteredData = data; // Show all countries when no region is selected
        }

        populateCountryCards();
      });

      // Event listener for search input
      searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm) {
          filteredData = data.filter((country) =>
            country.name.toLowerCase().includes(searchTerm)
          );
        } else {
          filteredData = data; // Show all countries when search input is empty
        }

        populateCountryCards();
      });

      // Initial population of country cards
      populateCountryCards();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Initial call to toggleDarkMode to set initial state
  toggleDarkMode();
});
