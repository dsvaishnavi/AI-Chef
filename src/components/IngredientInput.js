import React, { useState } from 'react';

const IngredientInput = ({ ingredients, setIngredients, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      setIngredients([...ingredients, inputValue.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  return (
    <div className="ingredient-input-container">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient (e.g., chicken, tomato)"
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>
      
      <div className="ingredient-tags">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="ingredient-tag">
            {ingredient}
            <button 
              onClick={() => handleRemoveIngredient(ingredient)}
              className="remove-tag"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      
      <button 
        onClick={onSearch} 
        className="search-button"
        disabled={ingredients.length === 0}
      >
        Find Recipes
      </button>
    </div>
  );
};

export default IngredientInput;