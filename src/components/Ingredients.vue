<template>
  <div id="ingredients">
      <Ingredient ingredient="Eggs" quantity="7"/>
      <Ingredient ingredient="Sugar" quantity="600 g"/>
      <Ingredient ingredient="Salt" quantity="7 g"/>

  </div>
</template>

<script>

import Ingredient from './Ingredient.vue'

export default {
  name: 'Ingredients',
  components: {
    Ingredient
  }
}
</script>

<style scoped>

#ingredients{
    background-color: rgb(231, 175, 158);
    padding:2%;
    width: 50%;
}

</style>
