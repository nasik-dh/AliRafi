document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const filterBtn = document.getElementById('filterBtn');
  const filtersPanel = document.getElementById('filtersPanel');
  const closeFiltersBtn = document.getElementById('closeFiltersBtn');
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const recipesGrid = document.getElementById('recipesGrid');
  const recipeModal = document.getElementById('recipeModal');
  const closeModal = document.querySelector('.close-modal');
  const viewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
  const saveRecipeBtn = document.getElementById('saveRecipeBtn');
  const printRecipeBtn = document.getElementById('printRecipeBtn');
  const shareRecipeBtn = document.getElementById('shareRecipeBtn');
  const addToShoppingListBtn = document.getElementById('addToShoppingListBtn');
  const shoppingListBtn = document.getElementById('shoppingListBtn');
  const shoppingListModal = document.getElementById('shoppingListModal');
  const clearListBtn = document.getElementById('clearListBtn');
  const sendListBtn = document.getElementById('sendListBtn');
  const newListItem = document.getElementById('newListItem');
  const addItemBtn = document.getElementById('addItemBtn');
  const removeItemBtns = document.querySelectorAll('.remove-item');
  const voiceSearchBtn = document.getElementById('voiceSearchBtn');
  const voiceSearchModal = document.getElementById('voiceSearchModal');
  const stopListeningBtn = document.getElementById('stopListeningBtn');
  const themeToggle = document.getElementById('themeToggle');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const recipeSearch = document.getElementById('recipeSearch');
  
  // Sample recipe data
  const recipes = [
    {
      id: 1,
      title: "Summer Berry Salad",
      description: "Fresh mixed greens with seasonal berries, goat cheese, and balsamic glaze",
      season: "summer",
      time: 25,
      difficulty: "easy",
      servings: 4,
      dietary: ["vegetarian", "gluten-free"],
      ingredients: [
        "4 cups mixed greens (spinach, arugula, lettuce)",
        "1 cup fresh strawberries, sliced",
        "1/2 cup fresh blueberries",
        "1/2 cup fresh raspberries",
        "1/4 cup crumbled goat cheese",
        "1/4 cup sliced almonds",
        "2 tbsp balsamic glaze",
        "2 tbsp olive oil",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Wash and dry all greens and berries thoroughly.",
        "In a large bowl, combine the mixed greens with the sliced strawberries, blueberries, and raspberries.",
        "Sprinkle the crumbled goat cheese and sliced almonds over the top.",
        "In a small bowl, whisk together the olive oil, balsamic glaze, salt, and pepper.",
        "Drizzle the dressing over the salad just before serving and toss gently to combine.",
        "Serve immediately and enjoy this refreshing summer dish!"
      ],
      notes: "For a vegan version, substitute the goat cheese with avocado slices or vegan cheese. You can also add grilled chicken or salmon for extra protein.",
      nutrition: {
        calories: 250,
        fat: "18g",
        carbs: "22g",
        protein: "5g"
      },
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      saved: false
    },
    // More recipes can be added here
  ];
  
  // Shopping list items
  let shoppingList = [
    { id: 1, category: "produce", name: "Mixed greens (spinach, arugula, lettuce)", checked: false },
    { id: 2, category: "produce", name: "Fresh strawberries", checked: false },
    { id: 3, category: "produce", name: "Blueberries", checked: false },
    { id: 4, category: "dairy", name: "Goat cheese", checked: false },
    { id: 5, category: "pantry", name: "Sliced almonds", checked: false },
    { id: 6, category: "pantry", name: "Balsamic glaze", checked: false },
    { id: 7, category: "pantry", name: "Olive oil", checked: false }
  ];
  
  // Current filters
  let currentFilters = {
    season: "all",
    dietary: [],
    mealType: ["breakfast", "lunch", "dinner", "dessert", "snack"],
    maxTime: 60
  };
  
  // Initialize the app
  function init() {
    renderRecipes();
    setupEventListeners();
    updateTimeFilterValue();
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Navigation toggle for mobile
    navToggle.addEventListener('click', toggleNav);
    
    // Filter panel toggle
    filterBtn.addEventListener('click', toggleFilters);
    closeFiltersBtn.addEventListener('click', toggleFilters);
    
    // Season filter buttons
    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilters.season = this.dataset.season;
      });
    });
    
    // Dietary filter tags
    document.querySelectorAll('.dietary-tag').forEach(tag => {
      tag.addEventListener('click', function() {
        this.classList.toggle('active');
        const dietary = this.dataset.dietary;
        
        if (this.classList.contains('active')) {
          if (!currentFilters.dietary.includes(dietary)) {
            currentFilters.dietary.push(dietary);
          }
        } else {
          currentFilters.dietary = currentFilters.dietary.filter(d => d !== dietary);
        }
      });
    });
    
    // Meal type filter tags
    document.querySelectorAll('.meal-tag').forEach(tag => {
      tag.addEventListener('click', function() {
        this.classList.toggle('active');
        const mealType = this.dataset.meal;
        
        if (this.classList.contains('active')) {
          if (!currentFilters.mealType.includes(mealType)) {
            currentFilters.mealType.push(mealType);
          }
        } else {
          currentFilters.mealType = currentFilters.mealType.filter(m => m !== mealType);
        }
      });
    });
    
    // Time filter slider
    document.getElementById('timeFilter').addEventListener('input', function() {
      currentFilters.maxTime = parseInt(this.value);
      updateTimeFilterValue();
    });
    
    // Apply filters button
    applyFiltersBtn.addEventListener('click', function() {
      renderRecipes();
      toggleFilters();
    });
    
    // Reset filters button
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // View recipe buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('view-recipe-btn')) {
        const recipeCard = e.target.closest('.recipe-card');
        const recipeId = parseInt(recipeCard.dataset.id);
        openRecipeModal(recipeId);
      }
      
      if (e.target.classList.contains('save-recipe-btn')) {
        const recipeCard = e.target.closest('.recipe-card');
        const recipeId = parseInt(recipeCard.dataset.id);
        toggleSaveRecipe(recipeId, e.target);
        e.stopPropagation();
      }
    });
    
    // Close modal
    closeModal.addEventListener('click', closeRecipeModal);
    
    // Save recipe button in modal
    saveRecipeBtn.addEventListener('click', function() {
      const recipeId = parseInt(recipeModal.dataset.recipeId);
      const recipe = recipes.find(r => r.id === recipeId);
      
      if (recipe) {
        recipe.saved = !recipe.saved;
        this.classList.toggle('active');
        updateSaveButtonText(this, recipe.saved);
        
        // Update the save button in the recipe card
        const recipeCard = document.querySelector(`.recipe-card[data-id="${recipeId}"] .save-recipe-btn`);
        if (recipeCard) {
          recipeCard.classList.toggle('saved');
          recipeCard.innerHTML = recipe.saved ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
        }
      }
    });
    
    // Print recipe button
    printRecipeBtn.addEventListener('click', printRecipe);
    
    // Share recipe button
    shareRecipeBtn.addEventListener('click', shareRecipe);
    
    // Add to shopping list button
    addToShoppingListBtn.addEventListener('click', addRecipeToShoppingList);
    
    // Shopping list button
    shoppingListBtn.addEventListener('click', openShoppingList);
    
    // Clear shopping list button
    clearListBtn.addEventListener('click', clearShoppingList);
    
    // Send shopping list button
    sendListBtn.addEventListener('click', sendShoppingList);
    
    // Add item to shopping list
    addItemBtn.addEventListener('click', addItemToList);
    newListItem.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addItemToList();
      }
    });
    
    // Remove item from shopping list
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-item')) {
        const itemElement = e.target.closest('li');
        const itemId = parseInt(itemElement.dataset.id);
        removeItemFromList(itemId);
      }
    });
    
    // Voice search button
    voiceSearchBtn.addEventListener('click', startVoiceSearch);
    stopListeningBtn.addEventListener('click', stopVoiceSearch);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Load more recipes button
    loadMoreBtn.addEventListener('click', loadMoreRecipes);
    
    // Recipe search
    recipeSearch.addEventListener('input', filterRecipesBySearch);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === recipeModal) {
        closeRecipeModal();
      }
      if (e.target === shoppingListModal) {
        closeShoppingList();
      }
      if (e.target === voiceSearchModal) {
        stopVoiceSearch();
      }
    });
  }
  
  // Toggle mobile navigation
  function toggleNav() {
    navLinks.classList.toggle('active');
  }
  
  // Toggle filters panel
  function toggleFilters() {
    filtersPanel.classList.toggle('active');
  }
  
  // Update time filter display value
  function updateTimeFilterValue() {
    const timeValue = document.getElementById('timeFilterValue');
    const time = currentFilters.maxTime;
    
    if (time <= 30) {
      timeValue.textContent = "≤ 30 min";
    } else if (time <= 60) {
      timeValue.textContent = "≤ 60 min";
    } else {
      timeValue.textContent = "≤ 120 min";
    }
  }
  
  // Reset all filters
  function resetFilters() {
    currentFilters = {
      season: "all",
      dietary: [],
      mealType: ["breakfast", "lunch", "dinner", "dessert", "snack"],
      maxTime: 60
    };
    
    // Reset UI elements
    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.season === "all") btn.classList.add('active');
    });
    
    document.querySelectorAll('.dietary-tag').forEach(tag => {
      tag.classList.remove('active');
    });
    
    document.querySelectorAll('.meal-tag').forEach(tag => {
      tag.classList.add('active');
    });
    
    document.getElementById('timeFilter').value = 60;
    updateTimeFilterValue();
    
    renderRecipes();
  }
  
  // Render recipes based on current filters
  function renderRecipes() {
    recipesGrid.innerHTML = '';
    
    const filteredRecipes = recipes.filter(recipe => {
      // Filter by season
      if (currentFilters.season !== "all" && recipe.season !== currentFilters.season) {
        return false;
      }
      
      // Filter by dietary preferences
      if (currentFilters.dietary.length > 0) {
        const hasAllDietary = currentFilters.dietary.every(d => recipe.dietary.includes(d));
        if (!hasAllDietary) return false;
      }
      
      // Filter by cooking time
      if (recipe.time > currentFilters.maxTime) {
        return false;
      }
      
      return true;
    });
    
    if (filteredRecipes.length === 0) {
      recipesGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No recipes found</h3>
          <p>Try adjusting your filters or search for something else</p>
        </div>
      `;
      return;
    }
    
    filteredRecipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card animate__animated animate__fadeIn';
      recipeCard.dataset.id = recipe.id;
      
      // Create season badge
      let seasonBadgeClass = '';
      let seasonIcon = '';
      
      switch (recipe.season) {
        case 'spring':
          seasonBadgeClass = 'spring';
          seasonIcon = '<i class="fas fa-seedling"></i>';
          break;
        case 'summer':
          seasonBadgeClass = 'summer';
          seasonIcon = '<i class="fas fa-sun"></i>';
          break;
        case 'autumn':
          seasonBadgeClass = 'autumn';
          seasonIcon = '<i class="fas fa-leaf"></i>';
          break;
        case 'winter':
          seasonBadgeClass = 'winter';
          seasonIcon = '<i class="fas fa-snowflake"></i>';
          break;
      }
      
      // Create dietary tags
      let dietaryTags = '';
      recipe.dietary.forEach(diet => {
        let icon = '';
        switch (diet) {
          case 'vegetarian':
            icon = '<i class="fas fa-carrot"></i>';
            break;
          case 'vegan':
            icon = '<i class="fas fa-leaf"></i>';
            break;
          case 'gluten-free':
            icon = '<i class="fas fa-bread-slice"></i>';
            break;
          case 'dairy-free':
            icon = '<i class="fas fa-cheese"></i>';
            break;
          case 'nut-free':
            icon = '<i class="fas fa-peanut"></i>';
            break;
        }
        dietaryTags += `<span class="${diet}">${icon}</span>`;
      });
      
      recipeCard.innerHTML = `
        <div class="recipe-card-header">
          <span class="season-badge ${seasonBadgeClass}">
            ${seasonIcon} ${recipe.season.charAt(0).toUpperCase() + recipe.season.slice(1)}
          </span>
          <button class="save-recipe-btn ${recipe.saved ? 'saved' : ''}">
            <i class="${recipe.saved ? 'fas' : 'far'} fa-bookmark"></i>
          </button>
        </div>
        <div class="recipe-card-image">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="quick-info">
            <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
            <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
          </div>
        </div>
        <div class="recipe-card-body">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <div class="dietary-tags">
            ${dietaryTags}
          </div>
        </div>
        <button class="view-recipe-btn">View Recipe</button>
      `;
      
      recipesGrid.appendChild(recipeCard);
    });
  }
  
  // Open recipe modal
  function openRecipeModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    recipeModal.dataset.recipeId = recipeId;
    
    // Set season class
    let seasonClass = '';
    let seasonIcon = '';
    
    switch (recipe.season) {
      case 'spring':
        seasonClass = 'spring';
        seasonIcon = '<i class="fas fa-seedling"></i>';
        break;
      case 'summer':
        seasonClass = 'summer';
        seasonIcon = '<i class="fas fa-sun"></i>';
        break;
      case 'autumn':
        seasonClass = 'autumn';
        seasonIcon = '<i class="fas fa-leaf"></i>';
        break;
      case 'winter':
        seasonClass = 'winter';
        seasonIcon = '<i class="fas fa-snowflake"></i>';
        break;
    }
    
    // Set dietary tags
    let dietaryTags = '';
    recipe.dietary.forEach(diet => {
      let icon = '';
      let text = '';
      switch (diet) {
        case 'vegetarian':
          icon = '<i class="fas fa-carrot"></i>';
          text = 'Vegetarian';
          break;
        case 'vegan':
          icon = '<i class="fas fa-leaf"></i>';
          text = 'Vegan';
          break;
        case 'gluten-free':
          icon = '<i class="fas fa-bread-slice"></i>';
          text = 'Gluten-Free';
          break;
        case 'dairy-free':
          icon = '<i class="fas fa-cheese"></i>';
          text = 'Dairy-Free';
          break;
        case 'nut-free':
          icon = '<i class="fas fa-peanut"></i>';
          text = 'Nut-Free';
          break;
      }
      dietaryTags += `<span class="${diet}">${icon} ${text}</span>`;
    });
    
    // Set ingredients list
    let ingredientsList = '';
    recipe.ingredients.forEach(ingredient => {
      ingredientsList += `<li>${ingredient}</li>`;
    });
    
    // Set instructions list
    let instructionsList = '';
    recipe.instructions.forEach((instruction, index) => {
      instructionsList += `<li>${instruction}</li>`;
    });
    
    // Update modal content
    document.getElementById('recipeTitle').textContent = recipe.title;
    document.getElementById('recipeSeason').className = seasonClass;
    document.getElementById('recipeSeason').innerHTML = `${seasonIcon} ${recipe.season.charAt(0).toUpperCase() + recipe.season.slice(1)}`;
    document.getElementById('recipeTime').innerHTML = `<i class="fas fa-clock"></i> ${recipe.time} minutes`;
    document.getElementById('recipeDifficulty').innerHTML = `<i class="fas fa-signal"></i> ${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}`;
    document.getElementById('recipeServings').innerHTML = `<i class="fas fa-users"></i> Serves ${recipe.servings}`;
    document.querySelector('.dietary-tags').innerHTML = dietaryTags;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeImage').alt = recipe.title;
    document.getElementById('ingredientsList').innerHTML = ingredientsList;
    document.getElementById('instructionsList').innerHTML = instructionsList;
    document.querySelector('.recipe-notes p').textContent = recipe.notes;
    
    // Update nutrition info
    document.querySelector('.nutrition-value:nth-child(1)').textContent = recipe.nutrition.calories;
    document.querySelector('.nutrition-value:nth-child(2)').textContent = recipe.nutrition.fat;
    document.querySelector('.nutrition-value:nth-child(3)').textContent = recipe.nutrition.carbs;
    document.querySelector('.nutrition-value:nth-child(4)').textContent = recipe.nutrition.protein;
    
    // Update save button
    saveRecipeBtn.classList.toggle('active', recipe.saved);
    updateSaveButtonText(saveRecipeBtn, recipe.saved);
    
    // Show modal
    recipeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  // Close recipe modal
  function closeRecipeModal() {
    recipeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Toggle save recipe
  function toggleSaveRecipe(recipeId, button) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    recipe.saved = !recipe.saved;
    button.classList.toggle('saved');
    button.innerHTML = recipe.saved ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
    
    // Show notification
    showNotification(`${recipe.saved ? 'Saved' : 'Removed'} "${recipe.title}" ${recipe.saved ? 'to' : 'from'} your recipes`);
  }
  
  // Update save button text
  function updateSaveButtonText(button, isSaved) {
    button.innerHTML = isSaved 
      ? '<i class="fas fa-bookmark"></i> Saved' 
      : '<i class="far fa-bookmark"></i> Save Recipe';
  }
  
  // Print recipe
  function printRecipe() {
    const recipeId = parseInt(recipeModal.dataset.recipeId);
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${recipe.title} | Seazon AI</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          h1 { color: #4CAF50; margin-bottom: 10px; }
          .meta { display: flex; gap: 15px; margin-bottom: 20px; font-size: 14px; }
          .meta span { display: flex; align-items: center; gap: 5px; }
          .tags { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
          .tag { padding: 4px 10px; border-radius: 20px; font-size: 12px; }
          .vegetarian { background-color: #E8F5E9; color: #4CAF50; }
          .vegan { background-color: #F1F8E9; color: #8BC34A; }
          .gluten-free { background-color: #FFF8E1; color: #FFC107; }
          .dairy-free { background-color: #E1F5FE; color: #03A9F4; }
          .nut-free { background-color: #FFF3E0; color: #FF9800; }
          .columns { display: flex; gap: 30px; margin-top: 20px; }
          .column { flex: 1; }
          h2 { font-size: 18px; margin: 20px 0 10px; color: #4CAF50; }
          ul, ol { padding-left: 20px; }
          li { margin-bottom: 8px; }
          .notes { background-color: #FFF8E1; padding: 15px; border-left: 4px solid #FFC107; margin-top: 20px; }
          .nutrition { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px; }
          .nutrition-item { text-align: center; }
          .nutrition-value { font-size: 18px; font-weight: bold; }
          .nutrition-label { font-size: 12px; color: #777; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${recipe.title}</h1>
        <div class="meta">
          <span><i class="fas fa-calendar"></i> ${recipe.season.charAt(0).toUpperCase() + recipe.season.slice(1)}</span>
          <span><i class="fas fa-clock"></i> ${recipe.time} minutes</span>
          <span><i class="fas fa-signal"></i> ${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</span>
          <span><i class="fas fa-users"></i> Serves ${recipe.servings}</span>
        </div>
        
        <div class="tags">
          ${recipe.dietary.map(diet => {
            let text = '';
            switch (diet) {
              case 'vegetarian': text = 'Vegetarian'; break;
              case 'vegan': text = 'Vegan'; break;
              case 'gluten-free': text = 'Gluten-Free'; break;
              case 'dairy-free': text = 'Dairy-Free'; break;
              case 'nut-free': text = 'Nut-Free'; break;
            }
            return `<span class="tag ${diet}">${text}</span>`;
          }).join('')}
        </div>
        
        <div class="columns">
          <div class="column">
            <h2><i class="fas fa-carrot"></i> Ingredients</h2>
            <ul>
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="column">
            <h2><i class="fas fa-list-ol"></i> Instructions</h2>
            <ol>
              ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
            
            <div class="nutrition">
              <div class="nutrition-item">
                <div class="nutrition-value">${recipe.nutrition.calories}</div>
                <div class="nutrition-label">Calories</div>
              </div>
              <div class="nutrition-item">
                <div class="nutrition-value">${recipe.nutrition.fat}</div>
                <div class="nutrition-label">Fat</div>
              </div>
              <div class="nutrition-item">
                <div class="nutrition-value">${recipe.nutrition.carbs}</div>
                <div class="nutrition-label">Carbs</div>
              </div>
              <div class="nutrition-item">
                <div class="nutrition-value">${recipe.nutrition.protein}</div>
                <div class="nutrition-label">Protein</div>
              </div>
            </div>
            
            <div class="notes">
              <h2><i class="fas fa-lightbulb"></i> Chef's Notes</h2>
              <p>${recipe.notes}</p>
            </div>
          </div>
        </div>
        
        <div class="no-print" style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
          Printed from Seazon AI • ${new Date().toLocaleDateString()}
        </div>
        
        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 200);
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
  
  // Share recipe
  function shareRecipe() {
    const recipeId = parseInt(recipeModal.dataset.recipeId);
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    if (navigator.share) {
      navigator.share({
        title: `${recipe.title} | Seazon AI`,
        text: `Check out this delicious ${recipe.season} recipe: ${recipe.title}`,
        url: window.location.href
      }).catch(err => {
        console.log('Error sharing:', err);
        showNotification('Sharing failed. Please try again.');
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = `${window.location.origin}${window.location.pathname}?recipe=${recipeId}`;
      prompt('Copy this link to share:', shareUrl);
    }
  }
  
  // Add recipe ingredients to shopping list
  function addRecipeToShoppingList() {
    const recipeId = parseInt(recipeModal.dataset.recipeId);
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    recipe.ingredients.forEach(ingredient => {
      // Simple categorization (in a real app, this would be more sophisticated)
      let category = "pantry";
      if (ingredient.includes("cheese") || ingredient.includes("milk") || ingredient.includes("yogurt")) {
        category = "dairy";
      } else if (ingredient.includes("greens") || ingredient.includes("berries") || ingredient.includes("fruit") || ingredient.includes("vegetable")) {
        category = "produce";
      } else if (ingredient.includes("chicken") || ingredient.includes("beef") || ingredient.includes("fish")) {
        category = "meat";
      }
      
      const newItem = {
        id: Date.now(),
        category,
        name: ingredient,
        checked: false
      };
      
      shoppingList.push(newItem);
    });
    
    showNotification(`Added ${recipe.ingredients.length} items to your shopping list`);
    closeRecipeModal();
  }
  
  // Open shopping list modal
  function openShoppingList() {
    renderShoppingList();
    shoppingListModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  // Close shopping list modal
  function closeShoppingList() {
    shoppingListModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Render shopping list
  function renderShoppingList() {
    const categories = {
      produce: { name: "Produce", items: [] },
      dairy: { name: "Dairy", items: [] },
      meat: { name: "Meat", items: [] },
      pantry: { name: "Pantry", items: [] },
      other: { name: "Other", items: [] }
    };
    
    // Group items by category
    shoppingList.forEach(item => {
      if (categories[item.category]) {
        categories[item.category].items.push(item);
      } else {
        categories.other.items.push(item);
      }
    });
    
    // Generate HTML for each category
    let categoriesHtml = '';
    
    for (const [key, category] of Object.entries(categories)) {
      if (category.items.length === 0) continue;
      
      let itemsHtml = '';
      
      category.items.forEach(item => {
        itemsHtml += `
          <li data-id="${item.id}">
            <input type="checkbox" id="item${item.id}" ${item.checked ? 'checked' : ''}>
            <label for="item${item.id}">${item.name}</label>
            <button class="remove-item"><i class="fas fa-times"></i></button>
          </li>
        `;
      });
      
      categoriesHtml += `
        <div class="category">
          <h3>${category.name}</h3>
          <ul>
            ${itemsHtml}
          </ul>
        </div>
      `;
    }
    
    document.querySelector('.list-categories').innerHTML = categoriesHtml;
    
    // Add event listeners for checkboxes
    document.querySelectorAll('.category input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const itemId = parseInt(this.closest('li').dataset.id);
        const item = shoppingList.find(i => i.id === itemId);
        if (item) item.checked = this.checked;
      });
    });
  }
  
  // Clear shopping list
  function clearShoppingList() {
    if (shoppingList.length === 0) return;
    
    if (confirm('Are you sure you want to clear your entire shopping list?')) {
      shoppingList = [];
      renderShoppingList();
      showNotification('Shopping list cleared');
    }
  }
  
  // Send shopping list to phone/email
  function sendShoppingList() {
    if (shoppingList.length === 0) {
      showNotification('Your shopping list is empty');
      return;
    }
    
    let listText = "My Seazon AI Shopping List:\n\n";
    
    // Group by category
    const categories = {};
    shoppingList.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    for (const [category, items] of Object.entries(categories)) {
      listText += `${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
      items.forEach(item => {
        listText += `- ${item.name}${item.checked ? ' (✓)' : ''}\n`;
      });
      listText += '\n';
    }
    
    if (navigator.share) {
      navigator.share({
        title: 'My Shopping List',
        text: listText
      }).catch(err => {
        console.log('Error sharing:', err);
        showNotification('Sharing failed. Please try again.');
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const emailBody = encodeURIComponent(listText);
      const mailtoLink = `mailto:?subject=My%20Shopping%20List&body=${emailBody}`;
      window.location.href = mailtoLink;
    }
  }
  
  // Add item to shopping list
  function addItemToList() {
    const itemName = newListItem.value.trim();
    if (!itemName) return;
    
    // Simple categorization
    let category = "other";
    if (itemName.toLowerCase().includes("cheese") || itemName.toLowerCase().includes("milk") || itemName.toLowerCase().includes("yogurt")) {
      category = "dairy";
    } else if (itemName.toLowerCase().includes("fruit") || itemName.toLowerCase().includes("vegetable") || itemName.toLowerCase().includes("greens")) {
      category = "produce";
    } else if (itemName.toLowerCase().includes("chicken") || itemName.toLowerCase().includes("beef") || itemName.toLowerCase().includes("fish")) {
      category = "meat";
    } else if (itemName.toLowerCase().includes("oil") || itemName.toLowerCase().includes("flour") || itemName.toLowerCase().includes("salt")) {
      category = "pantry";
    }
    
    const newItem = {
      id: Date.now(),
      category,
      name: itemName,
      checked: false
    };
    
    shoppingList.push(newItem);
    newListItem.value = '';
    renderShoppingList();
    showNotification('Item added to shopping list');
  }
  
  // Remove item from shopping list
  function removeItemFromList(itemId) {
    shoppingList = shoppingList.filter(item => item.id !== itemId);
    renderShoppingList();
    showNotification('Item removed from shopping list');
  }
  
  // Start voice search
  function startVoiceSearch() {
    voiceSearchModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // In a real app, you would use the Web Speech API here
    // This is just a simulation
    setTimeout(() => {
      const queries = [
        "Show me quick vegetarian recipes",
        "Find summer dessert ideas",
        "Search for gluten-free dinner options",
        "Look up easy breakfast recipes"
      ];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      
      showNotification(`Searching for: "${randomQuery}"`);
      stopVoiceSearch();
      
      // Simulate search results
      recipeSearch.value = randomQuery;
      filterRecipesBySearch();
    }, 2000);
  }
  
  // Stop voice search
  function stopVoiceSearch() {
    voiceSearchModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Toggle dark/light theme
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }
  
  // Load more recipes (simulated)
  function loadMoreRecipes() {
    // In a real app, this would fetch more recipes from an API
    // For this demo, we'll just duplicate the existing recipes
    const newRecipes = [...recipes];
    recipes.push(...newRecipes);
    renderRecipes();
    showNotification(`Loaded ${newRecipes.length} more recipes`);
  }
  
  // Filter recipes by search input
  function filterRecipesBySearch() {
    const searchTerm = recipeSearch.value.toLowerCase();
    
    if (!searchTerm) {
      renderRecipes();
      return;
    }
    
    const filteredRecipes = recipes.filter(recipe => {
      return (
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
        recipe.dietary.some(d => d.toLowerCase().includes(searchTerm)) ||
        recipe.season.toLowerCase().includes(searchTerm)
      );
    });
    
    if (filteredRecipes.length === 0) {
      recipesGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No recipes found for "${searchTerm}"</h3>
          <p>Try a different search term or adjust your filters</p>
        </div>
      `;
      return;
    }
    
    recipesGrid.innerHTML = '';
    filteredRecipes.forEach(recipe => {
      // Same recipe card creation as in renderRecipes()
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card animate__animated animate__fadeIn';
      recipeCard.dataset.id = recipe.id;
      
      // ... (rest of the recipe card creation code)
      
      recipesGrid.appendChild(recipeCard);
    });
  }
  
  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification animate__animated animate__fadeInUp';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate__fadeOutDown');
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Initialize the app
  init();
});