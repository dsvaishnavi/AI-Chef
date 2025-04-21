import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import IngredientInput from "./components/IngredientInput";
import RecipeList from "./components/RecipeList";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dietType, setDietType] = useState("all");
  const [cuisineType, setCuisineType] = useState("all");

  const API_KEY = "82c5ff844139474f8d420c805aad09f8";

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = {
        ingredients: ingredients.join(","),
        number: 12,
        apiKey: API_KEY,
        ignorePantry: true,
        ranking: 1,
      };

      // Add diet filter
      if (dietType !== "all") {
        params.diet = dietType === "vegetarian" ? "vegetarian" : "";
      }

      // Add cuisine filter
      if (cuisineType !== "all") {
        params.cuisine = cuisineType.toLowerCase(); // Spoonacular expects lowercase
      }

      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        { params }
      );

      setRecipes(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid API key. Please check your Spoonacular API key.");
      } else if (err.response?.status === 402) {
        setError("API quota exceeded. Please try again later.");
      } else {
        setError("Failed to fetch recipes. Please try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          onSearch={handleSearch}
        />

        <div className="filter-section">
          <div className="diet-filter">
            <h3>Diet Type:</h3>
            <button
              className={`filter-btn ${dietType === "all" ? "active" : ""}`}
              onClick={() => setDietType("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${dietType === "vegetarian" ? "active" : ""}`}
              onClick={() => setDietType("vegetarian")}
            >
              Vegetarian
            </button>
            <button
              className={`filter-btn ${dietType === "non-vegetarian" ? "active" : ""}`}
              onClick={() => setDietType("non-vegetarian")}
            >
              Non-Veg
            </button>
          </div>

          <div className="cuisine-filter">
            <h3>Cuisine:</h3>
            <button
              className={`filter-btn ${cuisineType === "all" ? "active" : ""}`}
              onClick={() => setCuisineType("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${cuisineType === "indian" ? "active" : ""}`}
              onClick={() => setCuisineType("indian")}
            >
              Indian
            </button>
            <button
              className={`filter-btn ${cuisineType === "italian" ? "active" : ""}`}
              onClick={() => setCuisineType("italian")}
            >
              Italian
            </button>
            <button
              className={`filter-btn ${cuisineType === "mexican" ? "active" : ""}`}
              onClick={() => setCuisineType("mexican")}
            >
              Mexican
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? <LoadingSpinner /> : <RecipeList recipes={recipes} />}
      </main>
    </div>
  );
}

export default App;