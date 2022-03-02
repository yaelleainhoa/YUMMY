<template>
  <div id="card">
    <div class="image_recipe"><img v-bind:src="picture_url"></div>
    <div class="text_recipe">
        <h1>{{title_recipe }}</h1>
        <Ingredients v-bind:idMeal = "id"/>
        <div class="recipe">
          <div v-for="recipe_line in recipe" v-bind:key="recipe_line.id"><p>{{recipe_line}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Ingredients from "./Ingredients.vue"

export default {
  name: 'RecipeCard',
  props: {
    title_recipe: {type: String, default : "No title"},
    recipe: {type: Array},
    picture_url:{type: String, default:require ("../assets/logo.png")},
    id:{}
  },
  components: {
      Ingredients
  }
}
</script>

<style scoped>
h1{
    color:#f86565;
    text-align: start;
}
#card{
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    margin:3%;
    border:solid;
    border-width: 0 0 0 2px;
    border-color: #ffb2b2;
    align-items: center;
}

.text_recipe{
    margin:2%;
    width: fit-content;
    height:auto;
    padding:5%;
}

.image_recipe{
    margin:1%;
    width: 30%;
}

.image_recipe > img{
  width: 90%;
}

</style>
