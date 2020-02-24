import Vue from 'vue'

Vue.mixin({
  methods: {
    truncate(str, length) {
      return str.length <= length ? str: (str.substr(0, length) + "...");
    }
  }
})