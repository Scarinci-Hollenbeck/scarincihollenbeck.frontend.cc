!function(e){function t(t){for(var n,o,c=t[0],s=t[1],i=t[2],f=0,d=[];f<c.length;f++)o=c[f],r[o]&&d.push(r[o][0]),r[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);d.length;)d.shift()();return l.push.apply(l,i||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],n=!0,c=1;c<a.length;c++){var s=a[c];0!==r[s]&&(n=!1)}n&&(l.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={17:0},l=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/wp-content/themes/sh-law-theme/includes/assets/images/";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var u=s;l.push([925,0]),a()}({25:function(e,t,a){e.exports=a.p+"46030ee63ff23381bed7683e81dc99c2.png"},366:function(e,t,a){},367:function(e,t,a){},4:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});t.createMarkup=function(e){return{__html:e}},t.getDirectionsFromLocation=function(e){var t=[{title:"lyndhurst",address:"1100 Valley Brook Ave. Lyndhurst, NJ 07071"},{title:"red bank",address:"331 Newman Springs Road Red Bank, NJ 07701"},{title:"new york",address:"3 Park Ave. New York, NY 10016"},{title:"washington dc",address:"Suite 250 1000 Potomac St., N.W. Washington D.C. 20007"},{title:"san francisco",address:"315 Montgomery St. San Francisco, CA 94104"}];navigator.geolocation.getCurrentPosition((function(a){var n=a.coords,r=n.latitude,l=n.longitude,o=e.replace(/[^a-zA-Z0-9 ]/g,"").toLowerCase(),c="https://www.google.com/maps/dir/"+r+"+"+l+"/"+t.filter((function(e){return e.title===o}))[0].address;window.open(c,"_blank")}),(function(e){console.warn("ERROR("+e.code+"):"+e.message)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})},t.splitUrl=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e.split("/"),n=a.filter((function(e){return""!==e}));return null!==t&&(n=n.filter((function(e){return""!==e&&e!==t}))),n},t.splitUrlPreview=function(e,t){var a=e.substring(e.indexOf(t)+1);return a=a.substring(0,a.indexOf("&"))},t.sortByKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]>a[t]?1:e[t]<a[t]?-1:0})),e},t.sortByDateKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]<a[t]?1:e[t]>a[t]?-1:0})),e},t.addRandomKey=function(e){return e.concat("-").concat(Math.floor(1e4*Math.random()+1))},t.urlify=function(e){return e.toLowerCase().replace(/\s/g,"-")},t.locationUrl=function(e){return e.toLowerCase().replace(/\s/g,"-").replace(/[.]/gm,"")},t.makeTitle=function(e){return e.indexOf("-")>-1?e.replace(/-|\s/g," ").toUpperCase():e.indexOf("+")>-1?e.replace(/\+/g," ").toUpperCase():e.toUpperCase()},t.unLink=function(e){return e.replace(/-|\s/g," ").replace(/\+/g," ")},t.filterByKey=function(e,t){for(var a=[],n=0;n<e.length;n+=1)e[n].key&&e[n].key===t&&a.push(e[n].selected);return a},t.sumbitSearchForm=function(e){var t=e.s,a=e.practice,n=e.attorney,r=e.category,l=((t||"")+" "+(a&&"Filter by practice"!==a?a:"")+" "+(n&&"Filter by attorney"!==n?n:"")+" "+(r&&"Filter by category"!==r?r:"")).trim().replace(/[^\w\s]/gi,"");return"https://admin.scarincihollenbeck.com/?s="+l.toLowerCase().replace(/\s/g,"+")}},925:function(e,t,a){a(16),e.exports=a(926)},926:function(e,t,a){var n=o(a(0)),r=o(a(14)),l=o(a(927));function o(e){return e&&e.__esModule?e:{default:e}}r.default.render(n.default.createElement(l.default,null),document.getElementById("quick-news"))},927:function(e,t,a){(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),l=i(r),o=a(4),c=i(a(928)),s=i(a(929));function i(e){return e&&e.__esModule?e:{default:e}}function u(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}a(366);var f=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={results:[],news:[],events:[],insight:[],trending:[],pageNums:[],currentPage:"",searchTerm:"",allPractices:[],allAttorneys:[],allCategories:[],breadCrumb:[],categorySlug:"",t:{keyword:"",attorney:"",practice:"",category:""}},t.onChange=t.onChange.bind(t),t.onSubmit=t.onSubmit.bind(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,t),n(a,[{key:"componentDidMount",value:function(){var e=this,t=window.location.href,a=["quick-news",1],n=1;if(t.indexOf("quick-news-index")>-1)this.setState({breadCrumb:a,categorySlug:"Quick News",currentPage:n},(function(){e.getPosts("https://admin.scarincihollenbeck.com/wp-json/quick-news/posts/"+n)}));else if(t.indexOf("/page/")>-1){var r=t.split("/page/").pop().replace("/","");a=["quick-news",r],n=r,this.setState({breadCrumb:a,categorySlug:"Quick News",currentPage:n},(function(){e.getPosts("https://admin.scarincihollenbeck.com/wp-json/quick-news/posts/"+n)}))}else a=["quick-news",1],this.setState({breadCrumb:a,categorySlug:"Quick News",currentPage:n},(function(){e.getPosts("https://admin.scarincihollenbeck.com/wp-json/quick-news/posts/"+n)}))}},{key:"onChange",value:function(e){var t=e.target,a=t.value,n=t.name,r=this.state.t;r[n]=a,this.setState({t:r})}},{key:"onSubmit",value:function(){var e=this.state.t;window.location=(0,o.sumbitSearchForm)(e)}},{key:"getPosts",value:function(t){var a=this;e(t).then((function(e){return e.json()})).then((function(e){var t=e.pages,n=e.results,r=e.posts;a.setState({results:n,trending:r});for(var l=[],o=1;o<=t;o+=1)l.push(o);a.setState({pageNums:l})})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/category/posts/firm-news").then((function(e){return e.json()})).then((function(e){var t=[].concat(u(e.latest),u(e.archives));a.setState({news:t})}))})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/category/posts/firm-events").then((function(e){return e.json()})).then((function(e){var t=[].concat(u(e.latest),u(e.archives));a.setState({events:t})}))})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/category/posts/law-firm-insights").then((function(e){return e.json()})).then((function(e){var t=[].concat(u(e.latest),u(e.archives));a.setState({insight:t})}))})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/attorney-search/practices").then((function(e){return e.json()})).then((function(e){a.setState({allPractices:e})}))})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/attorney-search/attorneys").then((function(e){return e.json()})).then((function(e){a.setState({allAttorneys:e})}))})).then((function(){e("https://admin.scarincihollenbeck.com/wp-json/wp/v2/categories?per_page=100").then((function(e){return e.json()})).then((function(e){a.setState({allCategories:e})}))}))}},{key:"render",value:function(){var e=this.state,t=e.results,a=e.news,n=e.events,r=e.insight,o=e.trending,i=e.pageNums,u=e.searchTerm,f=e.allPractices,d=e.allAttorneys,m=e.allCategories,p=e.breadCrumb,h=e.categorySlug,y=e.currentPage,g=y>2?y-1:1,b=y<i.length?parseInt(y,10)+1:i.length,v=window.location.href.split("/").filter((function(e){return""!==e})),w="number"==typeof v[v.length-1]?v[v.length-1]:1;return l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 mt-0 mb-4"},l.default.createElement("h6",null,l.default.createElement("span",null,l.default.createElement("a",{href:""+window.location.origin,className:"red-title proxima-bold"},"HOME")),l.default.createElement("strong",{className:"text-black mt-2 mx-2 proxima-bold"},l.default.createElement("i",{className:"fas fa-caret-right"})),p.map((function(e,t){return t<p.length-1?l.default.createElement("span",{key:e},l.default.createElement("span",null,l.default.createElement("span",{className:"red-title proxima-bold text-uppercase"},e===h?l.default.createElement("u",null,h):""+h)),l.default.createElement("strong",{className:"text-black mt-2 mx-2 proxima-bold"},l.default.createElement("i",{className:"fas fa-caret-right"}))):l.default.createElement("span",{key:e},l.default.createElement("span",{className:"red-title proxima-bold"},e===h?l.default.createElement("u",null,e):""+e))})))),l.default.createElement("div",{className:"col-sm-12 col-lg-8"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 col-md-6"},t.map((function(e,t){return t<5?l.default.createElement("div",{className:"p-2",key:e.id},l.default.createElement("a",{href:e.link,className:"top-article"},l.default.createElement("h5",{className:"mb-0"},e.title),l.default.createElement("p",{className:"mt-0 mb-3 text-muted small-excerpt"},e.description))):""}))),l.default.createElement("div",{className:"col-sm-12 col-md-6"},t.map((function(e,t){return t>5?l.default.createElement("div",{className:"p-2",key:e.id},l.default.createElement("a",{href:e.link,className:"top-article"},l.default.createElement("h5",{className:"mb-0"},e.title),l.default.createElement("p",{className:"mt-0 mb-3 text-muted small-excerpt"},e.description))):""})))),l.default.createElement("div",{className:"w-100 mt-0 ml--1"},void 0!==t&&i.length>1?l.default.createElement("nav",{"aria-label":"pagination"},l.default.createElement("ul",{className:"d-flex flex-wrap no-dots lead"},l.default.createElement("li",{className:"mr-2"},l.default.createElement("a",{className:"text-dark",href:window.location.origin+"/quick-news/page/"+g+"/",tabIndex:"-1","aria-label":"previous link"},l.default.createElement("i",{className:"fas fa-angle-double-left","aria-hidden":"true"}))),i.map((function(e){return w===e?l.default.createElement("li",{className:w===e?"active mr-2":"mr-2",key:"page-"+e},l.default.createElement("a",{className:"text-dark mt-2",href:window.location.origin+"/quick-news/page/"+e+"/"},e)):""})),l.default.createElement("li",{className:"mx-1"},"..."),i.map((function(e){return i.length-1===e?l.default.createElement("li",{className:w===e?"active mr-2":"mr-2",key:"page-"+e},l.default.createElement("a",{className:"text-dark",href:window.location.origin+"/quick-news/page/"+e+"/"},e)):""})),l.default.createElement("li",{className:"ml-1"},l.default.createElement("a",{className:"text-dark",href:window.location.origin+"/quick-news/page/"+b+"/","aria-label":"next link"},l.default.createElement("i",{className:"fas fa-angle-double-right","aria-hidden":"true"}))))):""),l.default.createElement("div",{className:"w-100 d-block"},l.default.createElement(c.default,{title:"Firm News",articles:a}),l.default.createElement(c.default,{title:"Firm Events",articles:n}),l.default.createElement(c.default,{title:"Firm Insights",articles:r}))),l.default.createElement("div",{className:"col-sm-12 col-md-4"},l.default.createElement(s.default,{searchTerm:u,onChange:this.onChange,onSubmit:this.onSubmit,allPractices:f,allAttorneys:d,allCategories:m,trending:o}))))}}]),a}(r.Component);t.default=f}).call(this,a(10))},928:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=s(a(0)),r=s(a(35)),l=s(a(3)),o=a(4),c=s(a(25));function s(e){return e&&e.__esModule?e:{default:e}}a(366);var i=function(e){var t=e.onClick;return n.default.createElement("i",{className:"fas fa-angle-double-right quick-news-scroll right",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},u=function(e){var t=e.onClick;return n.default.createElement("i",{className:"fas fa-angle-double-left quick-news-scroll left",role:"button",tabIndex:0,onKeyDown:t,onClick:t})},f=function(e){var t=e.title,a=e.articles,l={dots:!0,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,arrows:!0,nextArrow:n.default.createElement(i,null),prevArrow:n.default.createElement(u,null),responsive:[{breakpoint:1690,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:650,settings:{slidesToShow:1,slidesToScroll:1}}]},s=(0,o.sortByKey)(a,"date");return n.default.createElement("div",null,n.default.createElement("div",{className:"line-header"},n.default.createElement("h3",null,t)),n.default.createElement(r.default,l,s.map((function(e){return n.default.createElement("div",{key:e.title,className:"px-3 pt-5 pb-2"},n.default.createElement("a",{href:e.link},n.default.createElement("img",{src:e.image?e.image:c.default,className:"img-thumbnail mx-auto d-block",alt:e.title}),n.default.createElement("h5",{className:"mt-3 mb-2 text-center small-excerpt proxima-bold"},e.title)))}))))};f.propTypes={title:l.default.string,articles:l.default.arrayOf(l.default.object),PostsNextArrow:l.default.func,PostsPrevArrow:l.default.func},f.defaultProps={title:"",articles:[],PostsNextArrow:function(){},PostsPrevArrow:function(){}},u.propTypes={onClick:l.default.func},u.defaultProps={onClick:function(){}},i.propTypes={onClick:l.default.func},i.defaultProps={onClick:function(){}},t.default=f},929:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=s(a(0)),r=s(a(3)),l=s(a(930)),o=s(a(931)),c=s(a(932));function s(e){return e&&e.__esModule?e:{default:e}}var i=function(e){var t=e.searchTerm,a=e.onChange,r=e.onSubmit,s=e.trending,i=e.allPractices,u=e.allAttorneys,f=e.allCategories;return n.default.createElement("div",null,n.default.createElement(l.default,{searchTerm:t,onChange:a,allPractices:i,allAttorneys:u,allCategories:f,onSubmit:r}),n.default.createElement(o.default,null),n.default.createElement(c.default,{posts:s}))};i.propTypes={searchTerm:r.default.string,onChange:r.default.func,onSubmit:r.default.func,allPractices:r.default.arrayOf(r.default.object),allAttorneys:r.default.arrayOf(r.default.object),allCategories:r.default.arrayOf(r.default.object),trending:r.default.arrayOf(r.default.object)},i.defaultProps={searchTerm:"",onChange:function(){},onSubmit:function(){},allPractices:[],allAttorneys:[],allCategories:[],trending:[]},t.default=i},930:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),l=(n=r)&&n.__esModule?n:{default:n},o=a(4);var c=function(e){var t=e.onSubmit,a=e.onChange,n=e.allPractices,r=e.allAttorneys,c=e.allCategories,s=(0,o.sortByKey)(c,"name");return console.log(s),l.default.createElement("div",{className:"w-100"},l.default.createElement("form",{onChange:a},l.default.createElement("label",{htmlFor:"searchSite",className:"w-100"},l.default.createElement("input",{name:"keyword",type:"search",id:"searchSite",placeholder:"Keyword...",className:"form-control p-2"}),l.default.createElement("span",{className:"sr-only"},"Search For Attorney")),l.default.createElement("label",{htmlFor:"searchPractice",className:"d-block w-100"},l.default.createElement("select",{name:"practice",id:"searchPractice",className:"form-control p-2"},l.default.createElement("option",{defaultValue:"Filter by practice"},"Filter by practice"),n.map((function(e){return l.default.createElement("option",{value:e.title,key:e.ID},e.title)}))),l.default.createElement("span",{className:"sr-only"},"Filter by Practice")),l.default.createElement("label",{htmlFor:"searchAttorney",className:"d-block w-100"},l.default.createElement("select",{name:"attorney",id:"searchAttorney",className:"form-control p-2"},l.default.createElement("option",{defaultValue:"Filter by attorney"},"Filter by attorney"),r.map((function(e){return l.default.createElement("option",{value:e.title,key:e.id},e.title)}))),l.default.createElement("span",{className:"sr-only"},"Filtery by Attorney")),l.default.createElement("label",{htmlFor:"searchCategory",className:"d-block w-100"},l.default.createElement("select",{name:"category",id:"searchCategory",className:"form-control p-2"},l.default.createElement("option",{defaultValue:"Filter by category"},"Filter by category"),c.map((function(e){return"Uncategorized"!==e.name?l.default.createElement("option",{value:e.name,key:e.id},e.name):""}))),l.default.createElement("span",{className:"sr-only"},"Filtery by Category")),l.default.createElement("button",{type:"button",className:"btn btn-secondary proxima-bold px-5 mr-2"},"Clear"),l.default.createElement("button",{type:"button",onClick:function(){return t()},className:"btn btn-danger px-5"},"Search")))};c.propTypes={onChange:PropType.func,onSubmit:PropType.func,allPractices:PropType.arrayOf(PropType.object),allAttorneys:PropType.arrayOf(PropType.object),allCategories:PropType.arrayOf(PropType.object)},c.defaultProps={onSubmit:function(){},onChange:function(){},allPractices:[],allAttorneys:[],allCategories:[]},t.default=c},931:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),l=(n=r)&&n.__esModule?n:{default:n};a(367);t.default=function(){return l.default.createElement("div",{className:"w-100 mt-5"},l.default.createElement("div",{className:"sidebar-title"},"Firm Resources"),l.default.createElement("div",{className:"off-white"},l.default.createElement("div",{className:"p-2 list-style ml-45"},l.default.createElement("a",{href:"https://scarincihollenbeck/firm-news",className:"h5"},"Firm News")),l.default.createElement("div",{className:"p-2 pb-1 list-style ml-45"},l.default.createElement("a",{href:"https://scarincihollenbeck/firm-events",className:"h5"},"Firm Events")),l.default.createElement("div",{className:"p-2 pb-1 list-style ml-45"},l.default.createElement("a",{href:"https://scarincihollenbeck/law-firm-insights",className:"h5"},"Firm Insights"))))}},932:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=l(a(0)),r=l(a(3));function l(e){return e&&e.__esModule?e:{default:e}}a(367);var o=function(e){var t=e.posts;return n.default.createElement("div",{className:"w-100 mt-5"},n.default.createElement("div",{className:"sidebar-title"},"Trending Stories"),n.default.createElement("div",{className:"off-white"},t?t.map((function(e){return n.default.createElement("div",{key:e.ID,className:"p-2"},n.default.createElement("a",{href:e.link,className:"top-article"},n.default.createElement("h5",{className:"mb-0"},e.title),n.default.createElement("p",{className:"mt-0 mb-3 ft-22"},e.author)))})):""))};o.propTypes={posts:r.default.arrayOf(r.default.object)},o.defaultProps={posts:[]},t.default=o}});