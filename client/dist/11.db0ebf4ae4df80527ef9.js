(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{960:function(e,t,n){(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),l=c(i),r=c(n(19)),a=n(23),u=c(n(3)),s=c(n(181));function c(e){return e&&e.__esModule?e:{default:e}}n(961);var f=(0,r.default)((function(){return n.e(5).then(n.t.bind(null,969,7))})),p={Accept:"application/json","Content-Type":"application/json"},d=function(e){var t=e.onClick;return l.default.createElement(a.FaAngleDoubleRight,{role:"button","aria-label":"footer news button right",className:"just-in-toggles just-in-toggle-right",onClick:t})},b=function(e){var t=e.onClick;return l.default.createElement(a.FaAngleDoubleLeft,{role:"button","aria-label":"footer news button left",className:"just-in-toggles just-in-toggle-left",onClick:t})},h=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={posts:[]},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,t),o(n,[{key:"componentDidMount",value:function(){var t=this;e("https://admin.scarincilies.com/wp-json/just-in/posts",{headers:p}).then((function(e){return e.json()})).then((function(e){return t.setState({posts:e})}))}},{key:"render",value:function(){var e={dots:!1,infinite:!1,speed:500,slidesToShow:4,slidesToScroll:4,lazyLoad:!0,nextArrow:l.default.createElement(d,null),prevArrow:l.default.createElement(b,null),initialSlide:0,responsive:[{breakpoint:1690,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1}}]},t=this.state.posts;return l.default.createElement("div",{className:"JustInCarousel d-block mx-auto"},l.default.createElement(s.default,e,t&&t.map((function(e){return l.default.createElement(f,{key:e.id,date:e.date,image:e.image,link:e.link,category:e.category,location:e.location,title:e.title})}))))}}]),n}(i.Component);d.propTypes={onClick:u.default.func},b.propTypes={onClick:u.default.func},d.defaultProps={onClick:function(){}},b.defaultProps={onClick:function(){}},t.default=h}).call(this,n(12))},961:function(e,t,n){}}]);