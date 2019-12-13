var app = new Vue({
    el: '#app',

    data: {
        message: 'Grid builder',
        canvas: 2560,
        col: 12,
        container: 1620,
        gutter: 20
    },

    computed: {
        start: function() {
            return (this.canvas - this.container) / 2;
        },

        width: function() {
            return (this.container / this.col) - this.gutter;
        },

        grid: function() {
            var grid = [];

            grid.push('<svg version="1.1" id="ul_1600px" opacity="0.5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2560 1600" style="enable-background:new 0 0 2560 1600;" xml:space="preserve">');
                grid.push('<style type="text/css"> .st0{ opacity:0.5; fill:red; }</style>');
                grid.push('<rect x="'+this.start+'" y="0" class="st0" width="'+this.container+'" height="1600" />');
                for (var c = 1; c <= this.col; c++) {
                    grid.push('<rect x="'+this.offset(c)+'" y="0" class="st0 col'+c+'" width="'+this.width+'" height="1600" />');
                }
            grid.push('</svg>');

            return grid.join("\n");
        }
    },

    methods: {
        offset: function(c) {
            var r = c - 1;
            return this.start + (this.gutter / 2) + (this.width * r) + (this.gutter * r);
        },

        download: function(){
            var svg = [];
            svg.push('data:image/svg+xml,<?xml version="1.0" encoding="utf-8"?><!-- Generator: Grid Builder by Andrea Rufo  -->');
            svg.push(this.grid);

            svg = svg.join("\n");

            var dl = document.createElement('a');

            document.body.appendChild(dl); // This line makes it work in Firefox.
            dl.setAttribute('href', svg);
            dl.setAttribute('download', 'grid.svg');
            dl.click();
        }
    }
});
