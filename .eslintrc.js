module.exports = {
  root: true,

  env: {
    node: true
  },

  use: [
    {
      loader: "babel-loader"}
      ],

  extends: [
    'plugin:vue/essential'
  ]


}
