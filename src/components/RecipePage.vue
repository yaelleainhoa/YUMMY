<template>
  <div id="card">
    <button class="seeRecipes"  v-on:click="udpate()">Click to go back</button>
    <h1>{{title_recipe }}</h1>
    <div class="image_recipe"><img v-bind:src="picture_url"></div>
    <div class="text_recipe">
        <Ingredients :ingredients="ingredients"/>
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
    ingredients:{type: Array}
  },
  components: {
      Ingredients
  },
  methods: {
    udpate: function () {
      this.$emit("hideMainRecipe")
    }
  }
}
</script>

<style scoped>
h1{
    color:var(--button-color);
    text-align: start;
}
#card{
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    margin:3%;
    border:solid;
    border-width: 0 0 0 2px;
    border-color: #e98484;
    align-items: center;
}

.seeRecipes{
  margin:2%;
}

.text_recipe{
    margin:0% 3% 0% 3%;
    width: fit-content;
    height:auto;
}

.image_recipe{
    margin:1%;
    width: 50%;
}

.image_recipe > img{
  width: 80%;
}

</style>
