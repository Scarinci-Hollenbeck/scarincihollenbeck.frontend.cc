(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{967:function(e,t,l){Object.defineProperty(t,"__esModule",{value:!0});var n=u(l(0)),a=u(l(178)),o=u(l(3)),r=l(23),i=l(14),s=u(l(179));function u(e){return e&&e.__esModule?e:{default:e}}l(386);var c=function(e){var t=e.onClick;return n.default.createElement(r.FaAngleDoubleRight,{className:"quick-news-scroll right",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},d=function(e){var t=e.onClick;return n.default.createElement(r.FaAngleDoubleLeft,{className:"quick-news-scroll left",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},f=function(e){var t=e.title,l=e.articles,o={dots:!0,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,arrows:!0,lazyLoad:!0,nextArrow:n.default.createElement(c,null),prevArrow:n.default.createElement(d,null),responsive:[{breakpoint:1690,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1}}]},r=(0,i.sortByKey)(l,"date");return n.default.createElement("div",null,n.default.createElement("div",{className:"line-header"},n.default.createElement("h3",null,t)),n.default.createElement(a.default,o,r.map((function(e){return n.default.createElement("div",{key:e.title,className:"px-3 pt-5 pb-2"},n.default.createElement("a",{href:e.link},n.default.createElement("img",{src:e.image?e.image:s.default,className:"img-thumbnail mx-auto d-block",alt:e.title}),n.default.createElement("h5",{className:"mt-3 mb-2 text-center small-excerpt proxima-bold"},e.title)))}))))};f.propTypes={title:o.default.string,articles:o.default.arrayOf(o.default.object),PostsNextArrow:o.default.func,PostsPrevArrow:o.default.func},f.defaultProps={title:"",articles:[],PostsNextArrow:function(){},PostsPrevArrow:function(){}},d.propTypes={onClick:o.default.func},d.defaultProps={onClick:function(){}},c.propTypes={onClick:o.default.func},c.defaultProps={onClick:function(){}},t.default=f}}]);