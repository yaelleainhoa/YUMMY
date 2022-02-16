<template>
  <div id="card">
    <div class="image_recipe"><img src="../assets/logo.png"></div>
    <div class="text_recipe">
        <h1>{{title_recipe }}</h1>
        <Ingredients />
        <div class="recipe"><p>{{recipe}}</p></div>
    </div>
  </div>
</template>

<script>
import Ingredients from "./Ingredients.vue"

export default {
  name: 'RecipeCard',
  props: {
    title_recipe: String,
    recipe: String
  },
  components: {
      Ingredients
  }
}
</script>

<style scoped>
h1{
    color:#eb1414;
    text-align: start;
}
#card{
    display: flex;
    background-color: rgb(255, 224, 224);
    margin:3%;
    border:solid;
    border-width: 0 0 0 2px;
    border-color: #eb1414;
    align-items: center;
}

.text_recipe{
    margin:2%;
    width: fit-content;
    height:auto;
}

.image_recipe{
    margin:1%;
    width: 80%;
}

.image_recipe > img{
  width: 80%;
}

</style>
