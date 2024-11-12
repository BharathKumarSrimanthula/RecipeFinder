import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce"; // Import the debounce hook
import './RecipeFinder.css'; // Import the CSS file

const RecipeFind = () => {
  const [meals, setMeals] = useState([]); // All meals fetched from API
  const [filteredMeals, setFilteredMeals] = useState([]); // Meals after filtering based on search
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Use the custom debounce hook

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const mealsPerPage = 10; // Number of meals per page

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

  // Paginate meals
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredMeals.length / mealsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        className="search-input" // Use the CSS class
      />

      {/* Meal cards */}
      <div className="meal-list">
        {currentMeals && currentMeals.length > 0 ? (
          currentMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
              <div className="meal-name">{meal.strMeal}</div>
            </div>
          ))
        ) : (
          <div>No meals found</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredMeals.length / mealsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredMeals.length / mealsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeFind;
