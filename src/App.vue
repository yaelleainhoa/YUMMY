<template>
  <div id="app">
    <Header v-on:searchRecipe="seeSearchedRecipes"/>      
    <div class="mainRecipe" v-if="idMeal != null">
        <RecipePage :title_recipe="mainMeal.strMeal" :picture_url="mainMeal.strMealThumb" 
        :recipe="mainMeal.strInstructions.split('\n')" :id="mainMeal.idMeal" 
        v-on:hideMainRecipe="seeRecipes"/>
    </div>

    <div class="page" v-else>
      <div class="first_column">
        <div v-for="meal in mealsDataSelected.slice(0,(mealsDataSelected.length+1)/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" 
          :id="meal.idMeal" v-on:updateVisibility="seeMainRecipe"/>
        </div>
      </div>

      <div class="second_column">
        <div v-for="meal in mealsDataSelected.slice((mealsDataSelected.length+1)/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" 
        :id="meal.idMeal" v-on:updateVisibility="seeMainRecipe"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import RecipePage from './components/RecipePage.vue'
import Header from './components/Header.vue'
import {getMealsDataByName, getMealsLaunchWebsite} from "@/services/api/mealAPI.js"

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
    this.lauchWebsite();
    // this.retrieveMealsData(this.nameRecipes);
  },
  computed: {
    mainMeal: function(){
      let meal = this.mealsData.find(element => element.idMeal == this.idMeal);
      return meal;
    },
    mealsDataSelected: function(){
      // this.retrieveMealsData(this.nameRecipes);
      return this.mealsData;
    }
  },
	methods: {
    async retrieveMealsData(mealName) {
        this.mealsData = await getMealsDataByName(mealName);
    },

    async lauchWebsite(){
      this.mealsData = await getMealsLaunchWebsite();
    },

    seeMainRecipe: function(id){
      this.idMeal = id;
    },

    seeRecipes: function(){
      this.idMeal = null;
    },

    seeSearchedRecipes: function(name){
      this.nameRecipes = name;
      this.retrieveMealsData(this.nameRecipes);
    },

	}
}
</script>

<style>

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
  background-color: rgb(243, 213, 211);
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
  background-color: #f86565;
  border: none;
  color: white;
  cursor:pointer;
  margin:1%;
  border-radius: 50px;
}
</style>
