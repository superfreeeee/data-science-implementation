module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser":"babel-eslint"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-undef': 'off',
      'vue/no-unused-vars': 'off',
      'vue/require-v-for-key': 'off',
      'no-unused-vars': 'off',
      'vue/no-unused-components': 'off'
    }
};
