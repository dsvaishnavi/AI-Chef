import React from 'react';

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try adding more ingredients!</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <img 
            src={recipe.image || 'https://spoonacular.com/recipeImages/placeholder.png'} 
            alt={recipe.title} 
          />
          <div className="recipe-info">
            <h3>{recipe.title}</h3>
            <p>Uses {recipe.usedIngredientCount} of your ingredients</p>
            <p>Missing {recipe.missedIngredientCount} ingredients</p>
            <a 
              href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-recipe"
            >
              View Recipe
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;