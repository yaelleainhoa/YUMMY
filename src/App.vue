<template>
  <div id="app">
    <Header/>      
    <div class="mainRecipe" v-if="isVisible == true">
        <RecipePage :title_recipe="this.mainMealData[0].strMeal" :picture_url="this.mainMealData[0].strMealThumb" 
        :recipe="this.mainMealData[0].strInstructions.split('\n')" :id="this.mainMealData[0].idMeal" 
        v-on:hideMainRecipe="seeRecipes"/>
    </div>

    <div class="page" v-else>
      <div class="first_column">
        <div v-for="meal in this.mealsData.slice(0,(this.mealsData.length+1)/2)" :key="meal.id">
          <RecipeCard :title_recipe="meal.strMeal" :picture_url="meal.strMealThumb" 
          :id="meal.idMeal" v-on:updateVisibility="seeMainRecipe"/>
        </div>
      </div>

      <div class="second_column">
        <div v-for="meal in this.mealsData.slice((this.mealsData.length+1)/2)" :key="meal.id">
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
import {getMealsDataByName, getMealsDataById} from "@/services/api/mealAPI.js"

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
      idMeal:52772,
      mainMealData:[],
    }
  },
  created: function(){
    this.retrieveMainMealData();
    this.retrieveMealsData("chicken");
  },
  beforeUpdate: function(){
    this.updateMainMeal();
  },
	methods: {
    async retrieveMealsData(mealName) {
        this.mealsData = await getMealsDataByName(mealName);
    },

    async retrieveMainMealData(){
      this.mainMealData=await getMealsDataById(this.idMeal);
    },

    async updateMainMeal(){
      this.mainMealData=await getMealsDataById(this.idMeal);
    },

    seeMainRecipe: function(id){
      this.idMeal = id;
      this.isVisible=true;
      console.log(id);
    },

    seeRecipes: function(){
      this.isVisible=false;
    }

	}
}
</script>

<style>

body{
  background-color: rgb(255, 255, 255);
  margin:0px;
  width: 100vw;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(243, 213, 211);
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
  width: 15%;
  padding:1%;
  background-color: #f86565;
  border: none;
  color: white;
  cursor:pointer;
}
</style>
