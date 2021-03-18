<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  /*:root {*/
  /*  --body-sidespan: 10pt; !* html 边距 *!*/
  /*}*/

  html, body {

    /*width: calc(100% - 2 * var(--body-sidespan));*/
    /*min-width: 100pt !important;*/
    /*height: calc(100% - 2 * var(--body-sidespan));*/
    /*min-height: 100pt !important;*/
    /*display: block;*/
    /*margin: var(--body-sidespan);*/
    /*width: 100%;*/
    /*padding:1px 16px;*/
    /*height:1000px;*/
    height: 100%;
    width: 100%;
    background-color: rgba(156, 151, 151, 0.07);

  }

  #app {
    width: 100%;
    height: 100%;
    background-color: rgb(220, 220, 220);
  }
</style>
