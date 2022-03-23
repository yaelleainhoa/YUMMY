<template>
  <div id="app">
    <Header v-on:searchRecipe="seeSearchedRecipes"/>      
    <div class="mainRecipe" v-if="idMeal != null">
        <RecipePage :title_recipe="mainMeal.meal.strMeal" :picture_url="mainMeal.meal.strMealThumb" 
        :recipe="mainMeal.meal.strInstructions.split('\n')" :ingredients="mainMeal.ingredients"
        v-on:hideMainRecipe="seeRecipes"/>
    </div>

    <div class="page" v-else>
      <div class="first_column">
        <div v-for="meal in seeFilteredMeals.slice(0,(seeFilteredMeals.length+1)/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
          v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
        </div>
      </div>

      <div class="second_column">
        <div v-for="meal in seeFilteredMeals.slice((seeFilteredMeals.length+1)/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
          v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import RecipePage from './components/RecipePage.vue'
import Header from './components/Header.vue'
import {getAllDataMeals} from "@/services/api/mealAPI.js"

export default {
  name: 'App',
  components: {
    RecipeCard,
    Header,
    RecipePage
    },
  data() {
    return {
      mealsData: [],
      isVisible:false,
      idMeal:null,
      mainMealData:[],
      nameRecipes:""
    }
  },
  created: function(){
    this.retrieveMealsData(this.nameRecipes);
  },
  computed: {
    mainMeal: function(){
      let meal = this.mealsData.find(element => element.meal.idMeal == this.idMeal);
      return meal;
    },
    mealsDataSelected: function(){
      return this.mealsData.slice(0,40);
    },
    seeFilteredMeals: function(){
      let meals = this.mealsData;
      if(this.nameRecipes){
        meals = meals.filter(meal => (meal.meal.strMeal.toLowerCase().includes(this.nameRecipes.toLowerCase())) || (meal.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(this.nameRecipes.toLowerCase()))));
      }
      return meals.slice(0,40);
    },
  },
	methods: {
    async retrieveMealsData() {
        this.mealsData = await getAllDataMeals();
    },

    seeMainRecipe: function(id){
      this.idMeal = id;
    },

    seeRecipes: function(){
      this.idMeal = null;
    },

    seeSearchedRecipes: function(name){
      this.nameRecipes = name;
    },

	}
}
</script>

<style>

:root{
  --button-color: #ff6f61;
  --ingredient-color:#ebebeb;
  --shadow-color:rgb(231, 231, 231);
}

body{
  background-color: rgb(255, 255, 255);
  margin:0px;
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ffffff;
  margin-left: 0.5%;
}

#app:first-child{
  align-items: center
}

.page{
  margin-top: 5vw;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  margin-top: 60px;
}

.page > div{
  width: 50%;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}

button{
  width: fit-content;
  padding:1%;
  background-color: var(--button-color);
  border: none;
  color: white;
  cursor:pointer;
  margin:1%;
  border-radius: 50px;
}
</style>
