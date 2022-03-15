<template>
  <div class="header">
      
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>

    <div class="search-area">
      <input type="search" class="input" v-model="search" placeholder="Search a Recipe">
      <button v-on:click="sendForm()">Search</button>
      <div :class="search?'show':''" @click="cleanSearch" class="remove">
        <img src="@/assets/remove.png">
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Header',
  data(){
    return{
      search:""
    }
  },
  methods: {
    sendForm: function () {
      window.scroll(0,0);
      this.$emit("searchRecipe", this.search)
    },
    cleanSearch: function(){
      this.search=""
    }
  }
}
</script>

<style scoped>

.header{
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  height: 60px;
  width: 100%;
}

.logo{
  position: absolute;
  width:60px;
  padding: 0.5% 1% 0.5% 1%;
}

.logo > img{
  width:80%;
}

.remove{
  width: 8%;
  height: 8%;
  cursor:pointer;
  opacity: 0;
}

.show{
  opacity: 1;
}

.remove > img{
  width: 100%;
}


.search-area{
  display: flex;
  width: 25%;
  flex-direction: row;
  align-items: center;
  margin: auto;
}

</style>
