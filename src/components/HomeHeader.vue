<template>
  <div class="home-header-container">
    <div class="wrapper">
      <span class="title">{{ title }}</span>
      <div class="subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    title: String,
    subtitle: String,
  },
};
</script>

<style scoped>
.home-header-container {
  padding: 16px 24px 0;
  height: 70px;
  background-color: white;
  border-bottom: 1px groove;
}

.wrapper {
  margin-left: 5.5%;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.subtitle {
  font-size: 14px;
  color: #8b9098;
  font-family: 'Microsoft YaHei';
  font-weight: 600;
}
</style>
