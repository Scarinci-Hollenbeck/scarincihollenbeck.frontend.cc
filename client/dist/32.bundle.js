(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{875:function(e,t,l){Object.defineProperty(t,"__esModule",{value:!0});var a=i(l(0)),o=i(l(3)),n=i(l(179)),s=l(23),r=i(l(180));function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.onClick;return a.default.createElement(s.FaAngleDoubleRight,{className:"post-scroll post-scroll-right",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},d=function(e){var t=e.onClick;return a.default.createElement(s.FaAngleDoubleLeft,{className:"post-scroll post-scroll-left",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},u=function(e){var t=e.onClick;return a.default.createElement(s.FaAngleDoubleRight,{className:"post-scroll location-scroll-right",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},f=function(e){var t=e.onClick;return a.default.createElement(s.FaAngleDoubleLeft,{className:"post-scroll location-scroll-left",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},m=function(e){var t=e.sortedPosts,l=e.sortedLocations,o={dots:!0,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,arrows:!0,lazyLoad:!0,nextArrow:a.default.createElement(c,null),prevArrow:a.default.createElement(d,null),responsive:[{breakpoint:1690,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1}}]},s={dots:!0,speed:500,infinite:!1,slidesToShow:3,slidesToScroll:3,arrows:!0,lazyLoad:!0,nextArrow:a.default.createElement(u,null),prevArrow:a.default.createElement(f,null),responsive:[{breakpoint:1690,settings:{slidesToShow:3,initialSlide:0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:0}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:0}}]};return a.default.createElement("div",{className:"row"},a.default.createElement("div",{className:"col-sm-12 px-0"},a.default.createElement(n.default,o,t.map((function(e){return a.default.createElement("div",{key:e.title,className:"px-3 pt-5 pb-2"},a.default.createElement("a",{href:e.link},a.default.createElement("img",{src:e.image?e.image:r.default,className:"img-thumbnail mx-auto d-block",alt:e.title}),a.default.createElement("h5",{className:"mt-3 mb-2 text-center"},e.category),a.default.createElement("p",{className:"text-muted small-excerpt text-center"},e.title)))})))),a.default.createElement("div",{className:"col-sm-12 mt-5 px-0"},a.default.createElement("div",{className:"line-header"},a.default.createElement("h3",null,"OUR OFFICES"))),a.default.createElement("div",{className:"col-sm-12 px-0 mt-5"},a.default.createElement(n.default,s,l.map((function(e){return a.default.createElement("div",{className:"card w-95 mb-2",key:e.id},a.default.createElement("a",{href:e.slug},a.default.createElement("img",{src:e.featuredImg,alt:e.title,className:"card-img-top"}),a.default.createElement("p",{className:"red-title m-3"},a.default.createElement("strong",null," "+e.title.toUpperCase()))))})))))};m.propTypes={sortedPosts:o.default.arrayOf(o.default.object),sortedLocations:o.default.arrayOf(o.default.object)},m.defaultProps={sortedPosts:[],sortedLocations:[]},c.propTypes={onClick:o.default.func},d.propTypes={onClick:o.default.func},u.propTypes={onClick:o.default.func},f.propTypes={onClick:o.default.func},c.defaultProps={onClick:function(){}},d.defaultProps={onClick:function(){}},u.defaultProps={onClick:function(){}},f.defaultProps={onClick:function(){}},t.default=m}}]);