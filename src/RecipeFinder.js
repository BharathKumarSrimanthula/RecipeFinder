import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce"; // Import the debounce hook
import './RecipeFinder.css'; // Import the CSS file

const RecipeFinder = () => {
  const [meals, setMeals] = useState([]); // All meals fetched from API
  const [filteredMeals, setFilteredMeals] = useState([]); // Meals after filtering based on search
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Use the custom debounce hook

  // Fetch meals when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?i"
        ); // Example API endpoint (chicken)
        const data = await response.json();
        setMeals(data.meals); // Set all meals
        setFilteredMeals(data.meals); // Initially, show all meals
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meals");
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Filter meals based on the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    } else {
      setFilteredMeals(meals); // If search term is empty, show all meals
    }
  }, [debouncedSearchTerm, meals]);

  // Handle the search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Set the search term
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Meal Finder</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for meals"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input" // Use the CSS class
      />

      {/* Meal cards */}
      <div className="meal-list"> {/* Use the CSS class */}
        {filteredMeals && filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card"> {/* Use the CSS class */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image" // Use the CSS class
              />
              <div className="meal-name">{meal.strMeal}</div> {/* Use the CSS class */}
            </div>
          ))
        ) : (
          <div>No meals found</div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
