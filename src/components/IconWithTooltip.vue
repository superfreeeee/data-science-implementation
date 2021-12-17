<template>
  <a-tooltip :placement="placement || 'right'">
    <template slot="title">{{ title }}</template>
    <div class="icon-container" @click="action">
      <a-icon :type="iconType" />
    </div>
  </a-tooltip>
</template>

<script>
export default {
  name: 'IconWithTooltip',
  props: ['title', 'iconType', 'className', 'action', 'placement'],
};
</script>

<style scoped>
.icon-container {
  /* center */
  display: flex;
  align-items: center;
  justify-content: center;
  /* size */
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
}

.icon-container:hover {
  background-color: #b3b3b3;
}
</style>
