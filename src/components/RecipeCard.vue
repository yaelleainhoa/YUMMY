<template>
  <div id="card">
    <img class="image_recipe" src="../assets/logo.png">
    <div class="text_recipe">
        <h1>{{title_recipe }}</h1>
        <div class="recipe"><p>{{recipe}}</p></div>
        <Ingredients />
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
    color:#ff5719;
    text-align: start;
}
#card{
    display: flex;
    background-color: rgb(255, 233, 224);
    margin:3%;
}

.image_recipe{
    margin:1%;
}

</style>
