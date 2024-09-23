<template>
  <div id="app">
    <nav>
      <router-link to="/css-test">
        <button>CSS Test</button>
      </router-link>
      <router-link to="/js-test">
        <button>JS Test</button>
      </router-link>
      <router-link to="/optional-test/thisweek?roomId=A101">
        <button>Optional Test</button>
      </router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 10px;
  background-color: #D8CFC4;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #C1B3A0;
}
</style>