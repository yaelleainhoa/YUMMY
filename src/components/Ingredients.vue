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
      ingredientsData: [],
      ingredientNumber: null
          }
  },
  created: function(){
    this.retrieveIngredientsData();
  },
	methods: {
			async retrieveIngredientsData() {
					this.ingredientsData = await getIngredientsDataById(this.idMeal);
          this.ingredientNumber = this.ingredientsData.length;
			}
}
}
</script>

<style scoped>

#ingredients{
    background-color: rgb(243, 187, 187);
    padding:5%;
    width: 80%;
    display: flex;
    flex-wrap:wrap;
}

#ingredients > div{
  width: 50%;
}

</style>
