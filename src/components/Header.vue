<template>
  <div class="header">
      
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>

    <div class="search-area">
      <input v-on:keyup.enter="sendForm()" type="search" class="input" v-model="search" placeholder="Search a Recipe">
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
  box-shadow: 0px 20px 20px var(--shadow-color);
}

.logo{
  position: absolute;
  width:60px;
  padding: 0.5% 1% 0.5% 1%;
}

.logo > img{
  width:80%;
}

button{
  padding: 3% 5%;
}

input{
  border-radius: 50px;
  padding:1% 3%;
  border: 0.5px solid;
  border-color: gray;
}

.remove{
  width: 22px;
  height: 22px;
  cursor:pointer;
  opacity: 0;
  margin-left:5%;
}

.show{
  opacity: 1;
}

.remove > img{
  width: 100%;
}


.search-area{
  display: flex;
  width: 300px;
  flex-direction: row;
  align-items: center;
  margin: auto;
}

</style>
