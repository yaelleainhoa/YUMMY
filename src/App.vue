<template>
  <div id="app">
    <Header v-on:searchRecipe="seeSearchedRecipes" :recipeName="nameRecipes"/>   
    <div v-if="!loaded" class="loading">
    </div>
    <div v-else-if="!results">
      <div class="container">
          <div class="eyes">
          <span></span>
          <span></span>
          </div>
          <div class="mouth"></div>
          <div class="tears"></div>
          <div class=rain>
            <div class=rainDrop></div>
            <div class=rainDrop></div>
            <div class=rainDrop></div>
            <div class=rainDrop></div>
            <div class=rainDrop></div>
          </div>
      </div>
      <h2 class="no_results"> No results...<br> Please try another research</h2>
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
        <div class="more_recipes">
          <button  :class="!more_recipes?'disallow':''" v-on:click="seeMoreRecipes">See more recipes</button>
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
    watch: {
		nameRecipes: function(newSearch) {
			localStorage.setItem("search", newSearch)
		}},
  data() {
    return {
      mealsData: [],
      isVisible:false,
      idMeal:null,
      mainMealData:[],
      nameRecipes: localStorage.getItem("search") || "",
      loaded:false,
      results:true,
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
      this.results=true;
      this.nameRecipes = name;
      this.nb_of_recipes = Math.min(40,this.seeFilteredMeals.length);
      this.more_recipes=true;
      this.idMeal=null;
      if(this.seeFilteredMeals.length==0){
        this.results=null;
      }
    },

    pageLoaded: function(){
      this.loaded = true;
    },

    seeMoreRecipes: function(){
      let new_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      this.nb_of_recipes = new_nb;
      let next_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      this.nb_of_recipes=new_nb;
      if(new_nb==next_nb){
        this.more_recipes=false;
      }
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
  margin: 10% auto;
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

.container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  background: url(assets/sausage.png) no-repeat;
  width: 500px;
  background-size: contain;
}

.eyes span:first-child{
    content:'';
    display: block;
    height: 10px;
    width: 10px;
    top:170px;
    left: 70px;
    background:black;
    border-radius: 100%; 
    position: absolute;
}
.eyes span:last-child{
    content:'';
    display: block;
    height: 10px;
    width: 10px;
    top:170px;
    left: 150px;
    background:black;
    border-radius: 100%; 
    position: absolute;
}
.mouth{
  content: '';
  display: block;
  background: black;
  height: 8px;
  width: 8px;
  left: 250px;
  top: 120px;
  border-radius: 100% 100% 80% 80%;
  position: relative;
}

.eyes{
  position: absolute;
  left: 135px;
  top: -70px;
}

.tears{
  content: '';
  display: block;
  width: 3px;
  height: 7px;
  background: #84C7EB;
  top: 110px;
  left: 210px;
  position: absolute;
  border-radius: 0 0 100% 100%;
}
.rain {
	width: 180px;
	height: 140px;
  position: relative;
  right: -150px;
  top: 100px;
}

.rainDrop {
	position: relative;
	float: left;
	width: 4px;
	margin: 10px;
	left: 40px;
	background: #84C7EB;
	border-radius: 160px 160px 160px 160px;
	/*box-shadow: 1px 0.5px 1px 0.5px rgba(0, 0, 0, 0.75);*/
	animation: rain 0.8s infinite ease-out;
}

.rainDrop:nth-child(1) {
	height: 35px;
	top: 5px;
	animation-delay: -1.0s;
	
}

.rainDrop:nth-child(2) {
	height: 20px;
	animation-delay: -1.4s;
}

.rainDrop:nth-child(3) {
	height: 15px;
	top: 5px;
	animation-delay: -1.6s;
}

.rainDrop:nth-child(4) {
	height: 10px;
	top: 10px;
	animation-delay: -1.2s;
}

.rainDrop:nth-child(5) {
	height: 18px;
	top: 15px;
	animation-delay: -1.6s;
}

.no_results{
  text-align: center;
  position: relative;
  top: 450px;
}

@keyframes rain {
	0% {
		opacity: 1;
		transform: translate(0, 0);
	}
	100% {
		opacity: 0.2;
		transform: translate(0, 100px);
	}
}

</style>
