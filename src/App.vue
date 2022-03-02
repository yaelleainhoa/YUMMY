<template>
  <div id="app">
    <Header/>align-items: center
    <div class="page">
      <div class="first_column">
        <div v-for="meal in this.mealsData.meals.slice(0,this.mealsData.meals.length/2+1)" :key="meal.id">
          <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" :recipe="meal.strInstructions.split('\n')" :id="meal.idMeal" />
        </div>
      </div>

      <div class="second_column">
        <div v-for="meal in this.mealsData.meals.slice(this.mealsData.meals.length/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" :recipe="meal.strInstructions.split('\n')" :id="meal.idMeal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import Header from './components/Header.vue'
import {getMealsDataByName} from "@/services/api/mealAPI.js"

export default {
  name: 'App',
  components: {
    RecipeCard,
    Header
    },
  data() {
    return {
      mealsData: [],
    }
  },
  created: function(){
    this.retrieveMealsData("chicken");
  },
	methods: {
			async retrieveMealsData(mealName) {
					this.mealsData = await getMealsDataByName(mealName);
			}
	}
}
</script>

<style>

body{
  background-color: rgb(255, 255, 255);
  margin:0px;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(243, 213, 211);
  margin-top: 30px;
}

.page{
  margin-top: 5vw;
  display: flex;
  flex-wrap: wrap;
}

.page > div{
  width: 50%;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
