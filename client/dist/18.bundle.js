(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{886:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=d(a(0)),n=d(a(3)),r=a(14),c=d(a(956)),i=d(a(957));function d(e){return e&&e.__esModule?e:{default:e}}var o=function(e){var t=e.content,a=e.sortedMembers,n=e.chair,d=e.handleLink,o=e.currentTab,s=e.attorneysMentioned,m=e.title;return l.default.createElement("div",null,t.length>0?l.default.createElement("div",{className:"tab-content"},l.default.createElement("div",{className:o===t[0].title?"tab-pane active article-container mt-4":"tab-pane article-container mt-4",id:"#"+t[0].title,role:"tabpanel","aria-labelledby":"nav-home-tab",dangerouslySetInnerHTML:(0,r.createMarkup)(t[0].content)}),t.map((function(e,t){return t>0?l.default.createElement("div",{key:e.title,id:"#"+e.title,className:o===e.title?"tab-pane active article-container mt-4":"tab-pane article-container mt-4",role:"tabpanel","aria-labelledby":"nav-home-tab",dangerouslySetInnerHTML:(0,r.createMarkup)(e.content)}):""})),l.default.createElement("div",{id:"team",className:"members"===o?"tab-pane active mt-4":"tab-pane mt-4",role:"tabpanel","aria-labelledby":"nav-home-tab"},l.default.createElement(i.default,{members:a,chair:n,handleLink:d}))):"",l.default.createElement(c.default,{attorneysMentioned:s,title:m}))};o.propTypes={content:n.default.arrayOf(n.default.object),sortedMembers:n.default.arrayOf(n.default.object),chair:n.default.arrayOf(n.default.object),handleLink:n.default.func,currentTab:n.default.string,attorneysMentioned:n.default.arrayOf(n.default.object),title:n.default.string},o.defaultProps={content:[],sortedMembers:[],chair:[],handleLink:function(){},currentTab:"",attorneysMentioned:[],title:""},t.default=o},956:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=d(a(0)),n=d(a(3)),r=d(a(178)),c=a(23),i=a(14);function d(e){return e&&e.__esModule?e:{default:e}}a(383);var o=function(e){var t=e.onClick;return l.default.createElement(c.FaAngleDoubleRight,{className:"featured-slider-arrow right",role:"button",tabIndex:"0",onKeyPress:t,onClick:t})},s=function(e){var t=e.onClick;return l.default.createElement(c.FaAngleDoubleLeft,{className:"featured-slider-arrow left",role:"button",tabIndex:"0",onKeyPress:t,onClick:t})},m=function(e){var t=e.attorneysMentioned,a=e.title,n="https://admin.scarincilies.com/wp-content/themes/sh-law-theme/includes/assets/images/88a9c0b8e7ff2ed7ecff91cfdaa0b816.png",c={centerMode:!0,infinite:!0,slidesToShow:3,dots:!0,adaptiveHeight:!0,nextArrow:l.default.createElement(o,null),prevArrow:l.default.createElement(s,null),className:"fs-container",responsive:[{breakpoint:1690,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1,dots:!1,arrows:!1,autoplay:!0}}]};return l.default.createElement("div",{className:"mt-4 w-100 d-block"},l.default.createElement("h4",{className:"bg-light-gray"},"Latest From"," ",a),t.length>3?l.default.createElement(r.default,c,t.map((function(e){return l.default.createElement("div",{key:(0,i.addRandomKey)(e.title),className:"article-card"},l.default.createElement("a",{href:e.link},l.default.createElement("img",{src:e.featuredImg?e.featuredImg:n,alt:e.title,width:"230",className:"img-thumbnail mx-auto d-block mt-3"}),l.default.createElement("h5",{className:"my-3 text-center small-excerpt"},e.title)))}))):l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},t.map((function(e){return l.default.createElement("div",{key:(0,i.addRandomKey)(e.title),className:"col-sm-12 col-md-4 article-card"},l.default.createElement("a",{href:e.link},l.default.createElement("img",{src:e.featuredImg?e.featuredImg:n,alt:e.title,width:"230",className:"img-thumbnail mt-3"}),l.default.createElement("h5",{className:"my-3 small-excerpt"},e.title)))})))))};o.propTypes={onClick:n.default.func},o.defaultProps={onClick:function(){}},s.propTypes={onClick:n.default.func},s.defaultProps={onClick:function(){}},m.propTypes={title:n.default.string,attorneysMentioned:n.default.arrayOf(n.default.object)},m.defaultProps={title:"",attorneysMentioned:[]},t.default=m},957:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=c(a(0)),n=c(a(3)),r=c(a(382));function c(e){return e&&e.__esModule?e:{default:e}}a(383);var i=function(e){return e.split("/attorneys/").pop()},d=function(e){var t=e.members,a=e.chair,n=e.handleLink;return l.default.createElement("span",null,a.length>0?l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row bg-light-gray"},l.default.createElement("div",{className:"col-sm-12"},l.default.createElement("h4",{className:"c-title"},"Group"))),l.default.createElement("div",{className:"row"},a.map((function(e){return l.default.createElement("div",{key:e.ID,className:"col-sm-12 col-md-12 col-lg-6"},l.default.createElement(r.default,{link:"/attorneys/"+i(e.link),image:e.image,name:e.name,title:e.designation,number:e.contact,email:e.email,height:"112px",width:"81px"}))})))):"",t?l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row mt-5 bg-light-gray"},l.default.createElement("div",{className:"col-sm-12 col-md-6"},l.default.createElement("h4",{className:"c-title"},"Members")),l.default.createElement("div",{className:"col-sm-12 col-md-6"},l.default.createElement("form",{className:"w-100 pt-2"},l.default.createElement("select",{onChange:n,className:"w-100"},t.map((function(e){return l.default.createElement("option",{value:e.link,key:e.ID,className:"w-100"},e.name)})))))),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 members-container"},t.map((function(e){return l.default.createElement("div",{key:e.ID,className:"w-45 float-left mr-4 mb-3"},l.default.createElement(r.default,{link:"/attorneys/"+i(e.link),image:e.image,name:e.name,title:e.designation,number:e.contact,email:e.email,height:"112px",width:"81px"}))}))))):"")};d.propTypes={members:n.default.arrayOf(n.default.object),chair:n.default.arrayOf(n.default.object),handleLink:n.default.func},d.defaultProps={members:[],chair:[],handleLink:function(){}},t.default=d}}]);