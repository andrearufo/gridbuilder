var app = new Vue({
  el: '#app',
  data: {
    message: 'Grid builder',
    layer: 2560,
    col: 12,
    container: 1620,
    gutter: 20
  },

  computed: {
    start: function() {
      return (this.layer - this.container) / 2;
    },

    width: function() {
      return (this.container / this.col) - this.gutter;
    }
  },

  methods: {
    offset: function(c) {
      var r = c - 1;
      return this.start + (this.gutter / 2) + (this.width * r) + (this.gutter * r);
    }
  }
});
