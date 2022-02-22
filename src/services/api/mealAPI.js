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

export {
  getMealsDataByName
}