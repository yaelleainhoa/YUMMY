<template>
  <div class="header">
      
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>

     <div class="search">
      <label for="site-search">Search a recipe : </label>
      <input type="search" id="site-search" name="q"
        aria-label="Search through site content">
      <button>Search</button>
    </div>


    <div class="select by_area">
      <select class="selectArea"> 
          <option value="neutral">--Area--</option>
          <option value="canadian">Canadian</option>
          <option value="chinese">Chinese</option>
          <option value="french">French</option>
      </select>
      <button>Select</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
}
</script>

<style scoped>

.header{
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
}

.header > * {
    margin:10px;
}

.logo > img{
    width:60px;
}

</style>
