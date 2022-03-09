<template>
  <div id="card">
    <div class="image_recipe"><img v-bind:src="picture_url"></div>
    <div class="text_recipe">
      <h1>{{title_recipe }}</h1>
      <Ingredients v-bind:idMeal = "id"/>
      <button class="seeRecipe"  v-on:click="udpate()">Click to see the recipe</button>
    </div>
  </div>
</template>

<script>
import Ingredients from "./Ingredients.vue"

export default {
  name: 'RecipeCard',
  props: {
    title_recipe: {type: String, default : "No title"},
    picture_url:{type: String, default:require ("../assets/logo.png")},
    id:{}
  },
  components: {
      Ingredients
  },
  methods: {
    udpate: function () {
      this.$emit("updateVisibility", this.id)
    }
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
    font-size: 0.9em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.seeRecipe{
  width: 30%;
  padding:2%;
}

.image_recipe{
    margin:1%;
    width: 100%;
    height:200px;
    overflow: hidden;
}

.image_recipe > img{
   object-fit: cover; 
  object-position: center -50px;
}

</style>
