(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{898:function(e,t,l){Object.defineProperty(t,"__esModule",{value:!0});var a=s(l(0)),n=s(l(3)),r=l(23),o=s(l(179)),c=s(l(180));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.onClick;return a.default.createElement(r.FaAngleDoubleRight,{className:"post-scroll post-scroll-right",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},d=function(e){var t=e.onClick;return a.default.createElement(r.FaAngleDoubleLeft,{className:"post-scroll post-scroll-left",tabIndex:0,onKeyDown:t,onClick:t})},i=function(e){var t=e.title,l=e.slides,n={dots:!0,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,arrows:!0,lazyLoad:!0,nextArrow:a.default.createElement(u,null),prevArrow:a.default.createElement(d,null)};return a.default.createElement("div",{className:"mt-5 category-slider-content"},a.default.createElement("div",{className:"line-header"},a.default.createElement("h3",null,t)),a.default.createElement(o.default,n,l.map((function(e){return a.default.createElement("div",{key:e.title,className:"px-3 pt-5 pb-2"},a.default.createElement("a",{href:e.link},a.default.createElement("img",{src:e.image?e.image:c.default,className:"img-fluid",alt:e.title}),a.default.createElement("h5",{className:"mt-3 mb-1"},e.title),a.default.createElement("p",{className:"text-muted small-excerpt"},e.excerpt)))}))))};i.propTypes={title:n.default.string,slides:n.default.arrayOf(n.default.object)},i.defaultProps={title:"",slides:[]},d.propTypes={onClick:n.default.func},u.propTypes={onClick:n.default.func},u.defaultProps={onClick:function(){}},d.defaultProps={onClick:function(){}},t.default=i}}]);