<template>
  <div id="app" class="pt-5">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,500&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::selection {
  background: none;
}

body {
  background-color: #3fa9fc;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
</style>
