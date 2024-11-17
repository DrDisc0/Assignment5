document.addEventListener("DOMContentLoaded", () => {
    const carList = document.getElementById("car-list");
    const applyFiltersButton = document.getElementById("apply-filters");
  
    // Load dropdown values dynamically
    const makes = [...new Set(usedCars.map(car => car.make))].sort();
    const colors = [...new Set(usedCars.map(car => car.color))].sort();
  
    const makeDropdown = document.getElementById("make");
    const colorDropdown = document.getElementById("color");
  
    makes.forEach(make => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      makeDropdown.appendChild(option);
    });
  
    colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorDropdown.appendChild(option);
    });
  
    // Render car cards
    const renderCars = (cars) => {
      carList.innerHTML = "";
      if (cars.length === 0) {
        carList.innerHTML = "<p>No cars match your filters. Please try again.</p>";
        return;
      }
      cars.forEach(car => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p>Mileage: ${car.mileage} miles</p>
          <p>Price: $${car.price.toLocaleString()}</p>
          <p>Color: ${car.color}</p>
          <p>Gas Mileage: ${car.gasMileage}</p>
        `;
        carList.appendChild(card);
      });
    };
  
    renderCars(usedCars);
  
    // Apply filters
    applyFiltersButton.addEventListener("click", () => {
      const minYear = parseInt(document.getElementById("min-year").value) || 0;
      const maxYear = parseInt(document.getElementById("max-year").value) || Infinity;
      const selectedMakes = Array.from(makeDropdown.selectedOptions).map(opt => opt.value);
      const maxMileage = parseInt(document.getElementById("max-mileage").value) || Infinity;
      const minPrice = parseInt(document.getElementById("min-price").value) || 0;
      const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;
      const selectedColors = Array.from(colorDropdown.selectedOptions).map(opt => opt.value);
  
      const filteredCars = usedCars.filter(car => {
        return (
          car.year >= minYear &&
          car.year <= maxYear &&
          (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
          car.mileage <= maxMileage &&
          car.price >= minPrice &&
          car.price <= maxPrice &&
          (selectedColors.length === 0 || selectedColors.includes(car.color))
        );
      });
  
      renderCars(filteredCars);
    });
  });
  document.getElementById("clear-filters").addEventListener("click", () => {
    // Reset filter inputs
    document.getElementById("min-year").value = "";
    document.getElementById("max-year").value = "";
    document.getElementById("make").value = ""; // Assuming it's a dropdown or multiple select
    document.getElementById("max-mileage").value = "";
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";
    document.getElementById("color").value = ""; // Assuming it's a dropdown or multiple select
  
    // Redisplay the full car list
    displayCars(usedCars);
  });
  
  