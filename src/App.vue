<template>
  <div id="app">
    <!-- <RecipeCard :title_recipe="mealsData[0].strMeal" :picture_url="mealsData[0].strThumb" :recipe="mealsData[0].strInstructions"/> -->
    <RecipeCard title_recipe="Pumpkin pie" recipe="Place the pumpkin in a large saucepan, cover with water and bring to the boil. Cover with a lid and simmer for 15 mins or until tender. Drain pumpkin; let cool.\r\nHeat oven to 180C/160C fan/gas 4. Roll out the pastry on a lightly floured surface and use it to line a 22cm loose-bottomed tart tin. Chill for 15 mins. Line the pastry with baking parchment and baking beans, then bake for 15 mins. Remove the beans and paper, and cook for a further 10 mins until the base is pale golden and biscuity. Remove from the oven and allow to cool slightly.\r\nIncrease oven to 220C/200C fan/gas 7. Push the cooled pumpkin through a sieve into a large bowl. In a separate bowl, combine the sugar, salt, nutmeg and half the cinnamon. Mix in the beaten eggs, melted butter and milk, then add to the pumpkin purée and stir to combine. Pour into the tart shell and cook for 10 mins, then reduce the temperature to 180C/160C fan/gas 4. Continue to bake for 35-40 mins until the filling has just set.\r\nLeave to cool, then remove the pie from the tin. Mix the remaining cinnamon with the icing sugar and dust over the pie. Serve chilled."/>
    <RecipeCard title_recipe="Cheesecake" recipe="Position an oven shelf in the middle of the oven. Preheat the oven to fan 160C/conventional 180C/gas 4. Line the base of a 23cm springform cake tin with parchment paper. For the crust, melt the butter in a medium pan. Stir in the biscuit crumbs and sugar so the mixture is evenly moistened. Press the mixture into the bottom of the pan and bake for 10 minutes. Cool on a wire rack while preparing the filling.\r\nFor the filling, increase the oven temperature to fan 200C/conventional 240C/gas 9. In a table top mixer fitted with the paddle attachment, beat the soft cheese at medium-low speed until creamy, about 2 minutes. With the mixer on low, gradually add the sugar, then the flour and a pinch of salt, scraping down the sides of the bowl and the paddle twice.\r\nSwap the paddle attachment for the whisk. Continue by adding the vanilla, lemon zest and juice. Whisk in the eggs and yolk, one at a time, scraping the bowl and whisk at least twice. Stir the 284ml carton of soured cream until smooth, then measure 200ml/7fl oz (just over 3⁄4 of the carton). Continue on low speed as you add the measured soured cream (reserve the rest). Whisk to blend, but don't over-beat. The batter should be smooth, light and somewhat airy.\r\nBrush the sides of the springform tin with melted butter and put on a baking sheet. Pour in the filling - if there are any lumps, sink them using a knife - the top should be as smooth as possible. Bake for 10 minutes. Reduce oven temperature to fan 90C/conventional 110C/gas 1⁄4 and bake for 25 minutes more. If you gently shake the tin, the filling should have a slight wobble. Turn off the oven and open the oven door for a cheesecake that's creamy in the centre, or leave it closed if you prefer a drier texture. Let cool in the oven for 2 hours. The cheesecake may get a slight crack on top as it cools.\r\nCombine the reserved soured cream with the 142ml carton, the sugar and lemon juice for the topping. Spread over the cheesecake right to the edges. Cover loosely with foil and refrigerate for at least 8 hours or overnight.\r\nRun a round-bladed knife around the sides of the tin to loosen any stuck edges. Unlock the side, slide the cheesecake off the bottom of the tin onto a plate, then slide the parchment paper out from underneath."/>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import {getMealsDataByName} from "@/services/api/mealAPI.js"
getMealsDataByName("pie")

export default {
  name: 'App',
  components: {
    RecipeCard
    },
  data() {
    return {
      mealsData: []
    }
  },
	methods: {
			async retrieveMealsData() {
					this.mealsData = await getMealsDataByName()
			}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
