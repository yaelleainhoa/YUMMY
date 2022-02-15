<template>
  <div id="ingredient_card">
      <p class="ingredient_title"><b>{{ingredient}} :</b> {{quantity}}</p>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: String,
    quantity: String
  }
}
</script>

<style scoped>

</style>
