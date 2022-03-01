<template>
  <div id="ingredients">
    <div v-for="ingredient in this.ingredientsData" :key="ingredient.id">
      <Ingredient :ingredient="ingredient.name" :quantity="ingredient.measure"/>
    </div>
  </div>
</template>

<script>

import Ingredient from './Ingredient.vue'
import {getIngredientsDataById} from '../services/api/mealAPI.js'

export default {
  name: 'Ingredients',
  props: {
    idMeal:{}
  },
  components: {
    Ingredient
      },
   data() {
    return {
      ingredientsData: []
          }
  },
  created: function(){
    this.retrieveIngredientsData();
  },
	methods: {
			async retrieveIngredientsData() {
					this.ingredientsData = await getIngredientsDataById(52933);
			}
}
}
</script>

<style scoped>

#ingredients{
    background-color: rgb(243, 187, 187);
    padding:2%;
}

</style>
