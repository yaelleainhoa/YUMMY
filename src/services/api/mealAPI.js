const getMealsDataByName =
    async function(mealName) {
  const pathMeal =
      ' https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName
  const response = await fetch(pathMeal)
  if (response.status == 200) {
    const data = await response.json()
    console.log(data)
    return data
  }
  else {
    new Error(response.statusText)
  }
}

const getMealsDataById =
    async function(mealId) {
  const pathMeal =
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId
  const response = await fetch(pathMeal)
  if (response.status == 200) {
    const data = await response.json()
    return data
  }
  else {
    new Error(response.statusText)
  }
}

const getIngredientsDataById =
    async function(mealId) {
  const pathMeal =
      ' https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId
  const response = await fetch(pathMeal)
  if (response.status == 200) {
    const data = await response.json()
    let ingredients = [];
    for (let i = 1; i < 21 && data.meals[0]['strMeasure' + i]; i++) {
      let ingredientName = data.meals[0]['strIngredient' + i];
      ingredientName =
          ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
      let ingredientMesure = data.meals[0]['strMeasure' + i];
      let ingredient = {'name': ingredientName, 'measure': ingredientMesure};
      ingredients.push(ingredient)
    }

    return ingredients
  }
  else {
    new Error(response.statusText)
  }
}

export {
  getIngredientsDataById, getMealsDataByName, getMealsDataById
}