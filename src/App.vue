<template>
  <div id="app">
    <Header v-on:searchRecipe="seeSearchedRecipes"/>   
    <div v-if="!loaded" class="loading">
    </div>
    <div v-else class="loaded">
      <div class="mainRecipe" v-if="idMeal != null">
          <RecipePage :title_recipe="mainMeal.meal.strMeal" :picture_url="mainMeal.meal.strMealThumb" 
          :recipe="mainMeal.meal.strInstructions.split('\n')" :ingredients="mainMeal.ingredients"
          v-on:hideMainRecipe="seeRecipes"/>
      </div>

      <div class="page" v-else>
        <div class="first_column">
          <div v-for="meal in seeFilteredMeals.slice(0,nb_of_recipes/2)" :key="meal.id">
            <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
            v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
          </div>
        </div>

        <div class="second_column">
          <div v-for="meal in seeFilteredMeals.slice(seeFilteredMeals.length/2, seeFilteredMeals.length/2 + nb_of_recipes/2)" :key="meal.id">
            <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
            v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
          </div>
        </div>
      </div>
      <div class="more_recipes">
        <button  :class="!more_recipes?'disallow':''" v-on:click="seeMoreRecipes">See more recipes</button>
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
      nameRecipes:"",
      loaded:false,
      nb_of_recipes: 20,
      more_recipes:true
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
      return this.mealsData;
    },
    seeFilteredMeals: function(){
      let meals = this.mealsData;
      if(this.nameRecipes){
        meals = meals.filter(meal => (meal.meal.strMeal.toLowerCase().includes(this.nameRecipes.toLowerCase())) || (meal.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(this.nameRecipes.toLowerCase()))));
      }
      return meals;
    },
  },
	methods: {
    async retrieveMealsData() {
        this.mealsData = await getAllDataMeals();
        this.pageLoaded();
    },

    seeMainRecipe: function(id){
      this.idMeal = id;
    },

    seeRecipes: function(){
      this.idMeal = null;
    },

    seeSearchedRecipes: function(name){
      this.nameRecipes = name;
      this.nb_of_recipes = Math.min(40,this.seeFilteredMeals.length);
    },

    pageLoaded: function(){
      this.loaded = true;
    },

    seeMoreRecipes: function(){
      console.log("nb of recipe before : ", this.nb_of_recipes);
      console.log("nb of total recipes :", this.seeFilteredMeals.length);
      let new_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      this.nb_of_recipes = new_nb;
      let next_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      this.nb_of_recipes=new_nb;
      if(new_nb==next_nb){
        this.more_recipes=false;
      }
      console.log("nb of recipe after : ", this.nb_of_recipes);
    }

	}
}
</script>

<style>

:root{
  --button-color: #ff6f61;
  --ingredient-color:#ebebeb;
  --shadow-color:rgb(231, 231, 231);
  --disable-color:#858585;
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

.loading {
  position:absolute;
  left:50%;
  top:50%;
  width: 1rem; /* control the size */
  background: var(--button-color); /* control the color here */
}
.loading,
.loading::before,
.loading::after {
  content: "";
  display: grid;
  grid-area: 1/1;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.2); /* and here, 3 is the transparency */
  animation: r 3s linear infinite var(--s, 0s);
}
.loading::before {
  --s: 1s;
}
.loading::after {
  --s: 2s;
}

.more_recipes{
  display: flex;
  justify-content: center;
  margin:10%;
}

.disallow{
  background-color: var(--disable-color);
  cursor:initial;
}

@keyframes r {
  to {
    box-shadow: 0 0 0 6rem #0000;
  }
}

</style>
