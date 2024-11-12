import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce"; // Import the debounce hook

const MealFinder = () => {
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
        placeholder="Search for meals..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      {/* Meal cards */}
      <div style={styles.mealList}>
        {filteredMeals && filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.idMeal} style={styles.mealCard}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={styles.mealImage}
              />
              <div style={styles.mealName}>{meal.strMeal}</div>
            </div>
          ))
        ) : (
          <div>No meals found</div>
        )}
      </div>
    </div>
  );
};

// Basic inline styles
const styles = {
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "20px",
    maxWidth: "500px", // Set a maximum width for the search input
    width: "50%", // Default width to 50%
    marginLeft: "auto", // Center the input horizontally
    marginRight: "auto",
  },

  mealList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  mealCard: {
    textAlign: "center",
    margin: "10px",
    width: "200px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  mealImage: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  },
  mealName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default MealFinder;