<template>
  <div id="card">
          <img src="@/assets/return.png" class="seeRecipes"  v-on:click="udpate()">


    <div id="content">
      <div class="image_recipe"><img v-bind:src="picture_url"></div>
      <div class="text_recipe">
            <div id="title">
      <h1>{{title_recipe }}</h1>
    </div>
          <Ingredients :ingredients="ingredients"/>
          <div class="recipe">
            <div v-for="recipe_line in recipe" v-bind:key="recipe_line.id"><p>{{recipe_line}}</p>
            </div>
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
    text-align: center;
}
#card{
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  margin:3% 0%;
  padding: 1%;
  /* align-items: center; */
  /* box-shadow: 0px 0px 20px var(--shadow-color);
  border-radius: 20px; */
}

#content{
  display: flex;
}

#title{
  display: flex;
}

.seeRecipes{
  width: 40px;
  height: 40px;
  margin:2%;
  cursor: pointer;
}

.text_recipe{
    margin:0% 3% 0% 3%;
    width: fit-content;
    height:auto;
}

.image_recipe{
    margin:auto;
    width:70%;
}

.image_recipe > img{
  width: 100%;
}

</style>
