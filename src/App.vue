<template>
  <div id="app">
    <div v-for="meal in this.mealsData.meals" :key="meal.id">
      <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" :recipe="meal.strInstructions.split('\n')" :id="meal.idMeal" />
    </div>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import {getMealsDataByName} from "@/services/api/mealAPI.js"

export default {
  name: 'App',
  components: {
    RecipeCard
    },
  data() {
    return {
      mealsData: []
    }
  },
  created: function(){
    this.retrieveMealsData();
  },
	methods: {
			async retrieveMealsData() {
					this.mealsData = await getMealsDataByName("chicken");
			}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
