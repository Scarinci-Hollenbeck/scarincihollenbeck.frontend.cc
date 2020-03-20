(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{437:function(e,t,a){(function(e){Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=a(2),r=v(n),i=v(a(480)),c=v(a(481)),o=v(a(482)),u=v(a(441)),d=v(a(483)),s=v(a(484)),f=v(a(492)),m=v(a(493)),b=a(438),p=v(a(496)),g=v(a(497));function v(e){return e&&e.__esModule?e:{default:e}}function h(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var E=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={bio:[],loading:!1,currentTab:"biography",currentSidebarTab:"Related Practices",matterTab:"",readMore:!1,spinner:!1},t.fetchPostData=t.fetchPostData.bind(t),t.tabClick=t.tabClick.bind(t),t.matterClick=t.matterClick.bind(t),t.toggleReadMore=t.toggleReadMore.bind(t),t.setSideBarTab=t.setSideBarTab.bind(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,t),l(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.attorney;this.setState({spinner:!0}),this.fetchPostData("https://admin.legalmarketinghouse.com/wp-json/individual-attorney/attorney/"+e)}},{key:"fetchPostData",value:function(t){var a=this;this.setState({loading:!0}),e(t).then((function(e){return e.json()})).then((function(e){var t="";void 0!==e.representativeMatters[0]&&(t=e.representativeMatters[0].title);a.setState({matterTab:t,bio:e,spinner:!1})}))}},{key:"tabClick",value:function(e){var t=e;this.setState({currentTab:t})}},{key:"matterClick",value:function(e){var t=e;this.setState({matterTab:t})}},{key:"setSideBarTab",value:function(e){var t=e;this.setState({currentSidebarTab:t})}},{key:"toggleReadMore",value:function(){this.setState((function(e){return{readMore:!e.readMore}}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.bio,l=(t.loading,t.currentTab),n=t.matterTab,v=t.readMore,E=t.spinner,y=t.currentSidebarTab,T=a.fullName,k=a.designation,N=a.profileImage,w=a.phoneNumber,M=a.email,_=a.biography,x=a.fax,P=a.clients,C=a.socialMediaLinks,S=a.representativeMatters,j=a.representativeClients,O=a.relatedPractices,A=a.additionalInforamtion,R=a.education,I=a.barAdmissions,L=a.eventPosts,B=a.newsPosts,z=a.blogPosts,H=a.awards,F=a.presentations,D=a.publications,K=a.media,U=a.videos,J=a.tabs,W=a.chair,$=a.pdf,V=a.vizibility,Y=a.seo,q=void 0;void 0!==A&&(q=[{title:"Education",content:R},{title:"Bar Admissions",content:I}].concat(h(A)));var G=[];void 0!==B&&void 0!==L&&(G=[].concat(h(B),h(L)));var Z=void 0,Q=void 0;if(void 0!==J){var X=J.headers,ee=J.body;Z=X.filter((function(e){return"number"!=typeof e})),Q=ee.filter((function(e){return""!==e[1]}))}return r.default.createElement("div",{id:"single-attorney"},r.default.createElement(i.default,{seo:Y}),!E&&r.default.createElement("div",null,r.default.createElement(c.default,{image:p.default,profile:r.default.createElement(d.default,{image:N,name:T}),height:"325px",infoCard:r.default.createElement(s.default,{fullName:T,chair:W,designation:k,phoneNumber:w,fax:x,email:M,socialMediaLinks:C,pdf:$,vizibility:V})}),r.default.createElement(u.default,null,r.default.createElement("div",{className:"line-header",id:"nav-tab",role:"tablist"},r.default.createElement(f.default,{currentTab:l,tabTitle:"biography",tabClick:this.tabClick,title:"Biography"}),S&&r.default.createElement(f.default,{currentTab:l,tabTitle:"representative-matters",tabClick:this.tabClick,title:"Representative Matters"}),j&&r.default.createElement(f.default,{currentTab:l,tabTitle:"representative-clients",tabClick:this.tabClick,title:"Representative Clients"}),F&&r.default.createElement(f.default,{currentTab:l,tabTitle:"presentations",tabClick:this.tabClick,title:"Presentations"}),D&&r.default.createElement(f.default,{currentTab:l,tabTitle:"publications",tabClick:this.tabClick,title:"Publications"}),K&&r.default.createElement(f.default,{currentTab:l,tabTitle:"media",tabClick:this.tabClick,title:"Media"}),z&&r.default.createElement(f.default,{currentTab:l,tabTitle:"blogs",tabClick:this.tabClick,title:"Articles"}),G.length>0&&void 0!==G&&r.default.createElement(f.default,{currentTab:l,tabTitle:"newsevents",tabClick:this.tabClick,title:"News & Events"}),U&&r.default.createElement(f.default,{currentTab:l,tabTitle:"videos",tabClick:this.tabClick,title:"Videos"}),J&&Z.map((function(t){return r.default.createElement(f.default,{key:t,currentTab:l,tabTitle:(0,b.urlify)(t),tabClick:e.tabClick,title:t})})))),r.default.createElement(o.default,{body:r.default.createElement(g.default,{biography:_,currentTab:l,readMore:v,toggleReadMore:this.toggleReadMore,representativeMatters:S,matterClick:this.matterClick,matterTab:n,representativeClients:j,presentations:F,publications:D,media:K,blogPosts:z,newsEventArticles:G,videos:U,tabs:J,clients:P,awards:H,filterBody:Q}),sidebar:r.default.createElement("span",null,r.default.createElement(m.default,{title:"Related Practices",content:O,currentSidebarTab:y,setSideBarTab:this.setSideBarTab,show:!0}),r.default.createElement("br",null),r.default.createElement(m.default,{title:"Additional Information",content:q,currentSidebarTab:y,setSideBarTab:this.setSideBarTab,show:!0}))})))}}]),a}(n.Component);t.default=E}).call(this,a(118))},438:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});t.sortByKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]>a[t]?1:e[t]<a[t]?-1:0})),e},t.addRandomKey=function(e){return e.concat("-").concat(Math.floor(1e4*Math.random()+1))},t.urlify=function(e){return e.toLowerCase().replace(/\s/g,"-")},t.createMarkup=function(e){return{__html:e}},t.sortByDateKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]<a[t]?1:e[t]>a[t]?-1:0})),e},t.getDirectionsFromLocation=function(e){var t=[{title:"lyndhurst",address:"1100 Valley Brook Ave. Lyndhurst, NJ 07071"},{title:"red bank",address:"331 Newman Springs Road Red Bank, NJ 07701"},{title:"new york",address:"3 Park Ave. New York, NY 10016"},{title:"washington dc",address:"Suite 250 1000 Potomac St., N.W. Washington D.C. 20007"},{title:"san francisco",address:"315 Montgomery St. San Francisco, CA 94104"}];navigator.geolocation.getCurrentPosition((function(a){var l=a.coords,n=l.latitude,r=l.longitude,i=e.replace(/[^a-zA-Z0-9 ]/g,"").toLowerCase(),c="https://www.google.com/maps/dir/"+n+"+"+r+"/"+t.filter((function(e){return e.title===i}))[0].address;window.open(c,"_blank")}),(function(e){console.warn("ERROR("+e.code+"):"+e.message)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})},t.splitUrl=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e.split("/"),l=a.filter((function(e){return""!==e}));return null!==t&&(l=l.filter((function(e){return""!==e&&e!==t}))),l},t.locationUrl=function(e){return e.toLowerCase().replace(/\s/g,"-").replace(/[.]/gm,"")},t.filterByKey=function(e,t){for(var a=[],l=0;l<e.length;l+=1)e[l].key&&e[l].key===t&&a.push(e[l].selected);return a},t.makeTitle=function(e){return e.replace(/-|\s/g," ").replace(/\+/g," ").toUpperCase()}},441:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l,n=a(2),r=(l=n)&&l.__esModule?l:{default:l};t.default=function(e){var t=e.children;return r.default.createElement("div",{className:"container"},r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-sm-12"},t)))}},480:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=a(440),r=i(a(4));function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.seo;return l.default.createElement(n.Helmet,null,l.default.createElement("title",null,t.title),l.default.createElement("meta",{name:"description",content:t.metaDescription}),l.default.createElement("meta",{name:"robots",content:"max-snippet:-1, max-image-preview:large, max-video-preview:-1"}),l.default.createElement("link",{rel:"canonical",href:window.location.origin+"/"+t.canonicalLink}),l.default.createElement("meta",{property:"og:title",content:t.title}),l.default.createElement("meta",{property:"og:site_name",content:"Scarinci Hollenbeck"}),l.default.createElement("meta",{property:"og:type",content:"profile"}),l.default.createElement("meta",{property:"og:locale",content:"en_US"}),l.default.createElement("meta",{property:"og:url",content:window.location.origin+"/"+t.canonicalLink}),l.default.createElement("meta",{property:"og:image",content:t.featuredImg}),l.default.createElement("meta",{property:"og:image:secure_url",content:t.featuredImg}),l.default.createElement("meta",{property:"og:image:width",content:t.imgWidth}),l.default.createElement("meta",{property:"og:image:height",content:t.imgHeight}),l.default.createElement("meta",{property:"og:image:type",content:"image/jpg"}),l.default.createElement("meta",{property:"profile:first_name",content:t.firstName}),l.default.createElement("meta",{property:"profile:last_name",content:t.lastName}),l.default.createElement("meta",{name:"twitter:card",content:"summary"}),l.default.createElement("meta",{name:"twitter:description",content:t.metaDescription}),l.default.createElement("meta",{name:"twitter:title",content:t.title}),l.default.createElement("meta",{name:"twitter:site",content:"@S_H_Law"}),l.default.createElement("meta",{name:"twitter:image",content:t.featuredImg}),l.default.createElement("meta",{name:"twitter:creator",content:"@S_H_Law"}),l.default.createElement("script",{type:"application/ld+json"},'\n        {\n          "@context": "http://schema.org",\n          "@type": "LegalService",\n          "name": '+t.fullName+',\n          "description": '+t.schemaDescription+',\n          "url": '+window.location.origin+"/"+t.canonicalLink+',\n          "image": '+t.featuredImg+',\n          "priceRange": "$$$$",\n          "telephone": '+t.phone+',\n          "email": '+t.email+',\n          "hasMap": '+t.map+',\n          "address": {\n            "@type": "PostalAddress",\n            "addressLocality": '+t.town+',\n            "addressRegion": '+t.state+',\n            "postalCode": '+t.zip+',\n            "streetAddress": '+t.address+'\n          },\n          "geo": {\n            "@type": "GeoCoordinates",\n            "latitude": '+t.lat+',\n            "longitude": '+t.long+'\n          },\n          "sameAs": '+t.socialMedia+',\n          "openingHours": "Mo,Tu,We,Th,Fr, 8:00-5:00"\n        }\n        '))};c.propTypes={seo:r.default.objectOf(r.default.oneOfType([r.default.string,r.default.number,r.default.arrayOf(r.default.string)]))},c.defaultProps={seo:{}},t.default=c},481:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=o(["\n  background: linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(",") no-repeat 50%;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n"],["\n  background: linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(",") no-repeat 50%;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n"]),n=o(["\n  background-color: rgba(0,0,0, .50);\n  border-radius: 4px;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  max-height: ",";\n"],["\n  background-color: rgba(0,0,0, .50);\n  border-radius: 4px;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  max-height: ",";\n"]),r=c(a(2)),i=c(a(439));function c(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}t.default=function(e){var t=e.profile,a=e.infoCard,c=e.image,o=e.height,u=i.default.div(l,c),d=i.default.div(n,o);return r.default.createElement(u,{className:"jumbotron jumbotron-fluid"},r.default.createElement("div",{className:"container animated fadeInUp fast mt--1 max-width-container"},r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-sm-12 col-md-4 mb-3 mr-4 mh-325"},t),r.default.createElement(d,{className:"col-sm-12 col-md-7"},a))))}},482:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l,n=a(2),r=(l=n)&&l.__esModule?l:{default:l};t.default=function(e){var t=e.body,a=e.sidebar;return r.default.createElement("div",{className:"container mt-3"},r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-sm-12 col-md-9"},t),r.default.createElement("div",{className:"col-sm-12 col-md-3"},a)))}},483:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=r(a(2)),n=r(a(4));function r(e){return e&&e.__esModule?e:{default:e}}var i=function(e){var t=e.image,a=e.name;return l.default.createElement("img",{rel:"preload",src:t,alt:a,className:"img-fluid white-transparent-border"})};i.propTypes={image:n.default.string,name:n.default.string},i.defaultProps={image:"",name:""},t.default=i},484:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=p(a(2)),n=a(85),r=a(445),i=a(485),c=a(446),o=a(486),u=a(487),d=a(488),s=a(489),f=a(490),m=a(491),b=p(a(4));function p(e){return e&&e.__esModule?e:{default:e}}var g=function(e){var t=e.fullName,a=e.chair,b=e.designation,p=e.phoneNumber,g=e.fax,v=e.email,h=e.socialMediaLinks,E=e.pdf,y=e.vizibility;return l.default.createElement("div",{className:"col-sm-12"},l.default.createElement("div",{className:"mt-3"},l.default.createElement("span",{id:"red-block"}),l.default.createElement("h1",{className:"text-white border-bottom"},t?t+" ":"",void 0!==a&&a.length>0?l.default.createElement("span",{className:" h5 text-white"},"-"," "+b):"")),void 0!==a&&a.length>0?l.default.createElement("div",{className:"my-3"},a.map((function(e){return l.default.createElement("span",{key:e.title,className:"text-white h5"},l.default.createElement("strong",null,"Chair: "),l.default.createElement("a",{href:e.link,className:"text-white chair-link h5"},e.title," ","Practice"),l.default.createElement("br",null))}))):l.default.createElement("div",{className:"col-sm-12 mt-3"},l.default.createElement("h4",{className:"text-white ml--10px"},b)),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 col-md-6"},l.default.createElement("ul",{className:"text-white no-dots mt-2 ml-0"},p?l.default.createElement("li",{className:"mb-1"},l.default.createElement("h5",null,l.default.createElement(n.FontAwesomeIcon,{icon:r.faPhone,className:"text-white"})," ",l.default.createElement("span",{className:"proxima-regular ft-17px"},"  "+p))):"",g?l.default.createElement("li",{className:"mb-1"},l.default.createElement("h5",null,l.default.createElement(n.FontAwesomeIcon,{icon:i.faFax,className:"text-white"})," ",l.default.createElement("span",{className:"proxima-regular ft-17px"},"  "+g))):"",v?l.default.createElement("li",{className:"mb-1"},l.default.createElement("h5",null,l.default.createElement(n.FontAwesomeIcon,{icon:c.faEnvelope,className:"text-white"}),l.default.createElement("a",{href:"mailto:"+v,className:"text-white proxima-regular mail-link ft-17px"}," "+v))):"")),l.default.createElement("div",{className:"col-sm-12 col-md-6"},h?l.default.createElement("span",null,l.default.createElement("ul",{className:"ml-0 mt-2"},h.map((function(e){return l.default.createElement("li",{key:e.channel,className:"mb-0 lh-1"},l.default.createElement("h5",null,"Twitter"===e.channel&&l.default.createElement(n.FontAwesomeIcon,{icon:u.faTwitter,className:"text-white"}),"Facebook"===e.channel&&l.default.createElement(n.FontAwesomeIcon,{icon:d.faFacebookSquare,className:"text-white"}),"LinkedIn"===e.channel&&l.default.createElement(n.FontAwesomeIcon,{icon:s.faLinkedin,className:"text-white"}),"Skype"===e.channel&&l.default.createElement(n.FontAwesomeIcon,{icon:f.faSkype,className:"text-white"}),"Instagram"===e.channel&&l.default.createElement(n.FontAwesomeIcon,{icon:m.faInstagram,className:"text-white"}),l.default.createElement("a",{href:e.url,className:"text-white mail-link proxima-regular ft-17px position-relative icon"},"  Connect on "+e.channel)))})),E?l.default.createElement("li",{className:"mb-0 lh-1"},l.default.createElement("h5",null," ",l.default.createElement("a",{href:E,className:"text-white mail-link proxima-regular ft-17px position-relative icon"}," Download Biography"))):"",y?l.default.createElement("li",{className:"mb-0 lh-1"},l.default.createElement("h5",null,l.default.createElement(n.FontAwesomeIcon,{icon:o.faAddressCard,className:"text-white"}),l.default.createElement("a",{href:y,className:"text-white mail-link proxima-regular ft-17px position-relative icon"}," Download Contact"))):"")):"")))};g.propTypes={fullName:b.default.string,chair:b.default.arrayOf(b.default.oneOfType([b.default.string,b.default.object])),designation:b.default.string,phoneNumber:b.default.string,fax:b.default.string,email:b.default.string,socialMediaLinks:b.default.arrayOf(b.default.object),pdf:b.default.string,vizibility:b.default.string},g.defaultProps={fullName:"",chair:[],designation:"",phoneNumber:"",fax:"",email:"",socialMediaLinks:[],pdf:"",vizibility:""},t.default=g},492:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=r(a(2)),n=r(a(4));function r(e){return e&&e.__esModule?e:{default:e}}var i=function(e){var t=e.currentTab,a=e.tabTitle,n=e.tabClick,r=e.title;return l.default.createElement("h3",{className:t===a?"active":"",id:"nav-home-tab","data-toggle":"tab",onClick:function(){return n(a)},href:"#"+a,role:"tab","aria-controls":"nav-home","aria-selected":!0,"aria-hidden":!0},r)};i.propTypes={currentTab:n.default.string,tabTitle:n.default.string,tabClick:n.default.func,title:n.default.string},i.defaultProps={currentTab:"",tabTitle:"",tabClick:function(){},title:""},t.default=i},493:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=(a(494),a(495),a(438));function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.title,a=e.content,n=e.show,i=e.setSideBarTab,c=e.currentSidebarTab;return l.default.createElement("div",null,l.default.createElement("a",{href:"#"+(0,r.urlify)(t),onClick:function(e){return i(t)},className:"sidebar-title","data-toggle":"collapse"},t,t===c||n?l.default.createElement("faMinus",{className:"float-right"}):l.default.createElement("faPlus",{className:"float-right"})),l.default.createElement("div",{id:""+(0,r.urlify)(t),className:n?"collapse show":"collapse"},l.default.createElement("div",{className:"off-white"},l.default.createElement("ul",{className:"pl-0 py-3 pr-1 no-dots sidebar-content"},a.map((function(e){return l.default.createElement("li",{key:""+(0,r.addRandomKey)("sbc"),className:"mb-2"},e.link?l.default.createElement("a",{href:e.link,className:"link-style small-excerpt"},e.title):l.default.createElement("strong",null,e.title),e.content&&l.default.createElement("div",{dangerouslySetInnerHTML:(0,r.createMarkup)(e.content)}))}))))))};c.propTypes={title:n.default.string,currentSidebarTab:n.default.string,content:n.default.arrayOf(n.default.object),show:n.default.bool,setSideBarTab:n.default.func},c.defaultProps={title:"",currentSidebarTab:"",content:[],show:!1,setSideBarTab:function(){}},t.default=c},496:function(e,t,a){e.exports=a.p+"0da0db2af3038d05f41713ce468fee29.jpg"},497:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=m(a(2)),n=(m(a(4)),m(a(498))),r=m(a(499)),i=m(a(500)),c=m(a(501)),o=m(a(502)),u=m(a(503)),d=m(a(504)),s=m(a(505)),f=a(438);function m(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.biography,a=e.currentTab,m=e.readMore,b=e.toggleReadMore,p=e.representativeMatters,g=e.matterClick,v=e.matterTab,h=e.representativeClients,E=e.presentations,y=e.publications,T=e.media,k=e.blogPosts,N=e.newsEventArticles,w=e.videos,M=e.clients,_=e.awards,x=e.filterBody,P=e.tabs,C=(0,f.sortByDateKey)(k,"date");return l.default.createElement("div",null,l.default.createElement("div",{className:"tab-content"},t&&l.default.createElement(n.default,{currentTab:a,tabTitle:"biography",title:"Biography",content:t,readMore:m,toggleReadMore:b}),p&&l.default.createElement(r.default,{currentTab:a,matterClick:g,matterTab:v,tabTitle:"representative-matters",title:"Representative Matters",content:p}),h&&l.default.createElement(r.default,{currentTab:a,matterTab:v,tabTitle:"representative-clients",title:"Representative Clients",content:h}),E&&l.default.createElement(i.default,{currentTab:a,tabTitle:"presentations",title:"Presentations",content:E}),y&&l.default.createElement(i.default,{currentTab:a,tabTitle:"publications",title:"Publications",content:y}),T&&l.default.createElement(i.default,{currentTab:a,tabTitle:"media",title:"Media",content:T}),k&&l.default.createElement(c.default,{currentTab:a,tabTitle:"blogs",title:"Articles",content:C}),N.length>0&&void 0!==N&&l.default.createElement(c.default,{currentTab:a,tabTitle:"newsevents",title:"News & Events",content:N}),w&&l.default.createElement(o.default,{title:"Videos",content:w,currentTab:a,tabTitle:"videos"}),P&&x.map((function(e){return l.default.createElement(u.default,{key:(0,f.addRandomKey)(e[1]),title:e[1],content:e[2],currentTab:a,tabTitle:(0,f.urlify)(e[1])})}))),M&&M.length>0&&l.default.createElement(d.default,{content:M,title:"Clients"}),_&&_.length>0&&l.default.createElement(d.default,{content:_,title:"Awards"}),N.length>0&&l.default.createElement(s.default,{title:"News & Events",content:N}),k&&l.default.createElement(s.default,{title:"Recent Articles",content:C}))}},498:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.currentTab,a=e.tabTitle,n=e.content,i=e.title,c=e.toggleReadMore,o=e.readMore,u=n.split(/<p[^>]*>/).filter((function(e){return""!==e})),d=u[0].replace("</p>",""),s=u[1],f=u.slice(2,u.length).join("<p>");return l.default.createElement("div",{className:t===a?"tab-pane active":"tab-pane",id:a,role:"tabpanel","aria-labelledby":"nav-bio-tab"},l.default.createElement("h4",{className:"bg-light-gray"},i),l.default.createElement("p",{className:"bio",dangerouslySetInnerHTML:(0,r.createMarkup)(d),id:"nav-bio-tab"}),l.default.createElement("p",{className:"bio",dangerouslySetInnerHTML:(0,r.createMarkup)(s)}),l.default.createElement("div",{id:"content",className:"collapse mt-4 ml-1"},l.default.createElement("div",{className:"bio",dangerouslySetInnerHTML:(0,r.createMarkup)(f)})),l.default.createElement("a",{href:"#content",type:"collapse",className:"red-title proxima-bold","data-toggle":"collapse","data-target":"#content",onClick:function(){return c()}},o?l.default.createElement("u",null,"Read Less >>"):l.default.createElement("u",null,"Read More >>")))};c.propTypes={currentTab:n.default.string,tabTitle:n.default.string,content:n.default.string,title:n.default.string,toggleReadMore:n.default.func,readMore:n.default.bool},c.defaultProps={currentTab:"",tabTitle:"",content:"",title:"",toggleReadMore:function(){},readMore:!1},t.default=c},499:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.currentTab,a=e.content,n=e.title,i=e.tabTitle;return l.default.createElement("div",{className:t===i?"tab-pane active":"tab-pane",id:i,role:"tabpanel","aria-labelledby":"nav-matter-tab"},l.default.createElement("h4",{className:"bg-light-gray"},n),a.map((function(e,t){return l.default.createElement("span",{key:(0,r.addRandomKey)(e.title),className:"mb-4 d-block",id:"nav-matter-tab"},e.title?l.default.createElement("a",{href:"#"+(0,r.urlify)(e.title),className:"sidebar-title","data-toggle":"collapse"},e.title,l.default.createElement("i",{className:"text-white fas float-right mt-1"})):"",l.default.createElement("div",{id:""+(0,r.urlify)(e.title),className:0===t?"collapse show":"collapse"},l.default.createElement("div",{className:"off-white matters px-2 py-3",dangerouslySetInnerHTML:(0,r.createMarkup)(e.content)})))})))};c.propTypes={currentTab:n.default.string,tabTitle:n.default.string,content:n.default.arrayOf(n.default.object),title:n.default.string},c.defaultProps={currentTab:"",tabTitle:"",content:[],title:""},t.default=c},500:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.title,a=e.currentTab,n=e.tabTitle,i=e.content;return l.default.createElement("div",{className:a===n?"tab-pane active":"tab-pane",id:n,role:"tabpanel","aria-labelledby":"nav-"+n+"-tab"},l.default.createElement("h4",{className:"bg-light-gray"},t),l.default.createElement("div",{className:"article-container",id:"nav-"+n+"-tab"},l.default.createElement("table",{className:"table mb-5"},l.default.createElement("thead",{className:"thead-dark"},l.default.createElement("tr",null,i.header&&i.header.map((function(e){return l.default.createElement("th",{key:e.c,className:"text-uppercase"},e.c)})))),l.default.createElement("tbody",null,i.body&&i.body.map((function(e){return l.default.createElement("tr",{key:(0,r.addRandomKey)(e[0].c)},l.default.createElement("td",{dangerouslySetInnerHTML:(0,r.createMarkup)(e[0].c)}),l.default.createElement("td",{dangerouslySetInnerHTML:(0,r.createMarkup)(e[1].c)}),e[2]?l.default.createElement("td",null,e[2].c):l.default.createElement("td",null))}))))))};c.propTypes={title:n.default.string,currentTab:n.default.string,tabTitle:n.default.string,content:n.default.object},c.defaultProps={title:"",currentTab:"",tabTitle:"",content:{}},t.default=c},501:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.title,a=e.link,n=e.img;return l.default.createElement("div",{className:"col-sm-12 col-md-4 my-2 article-card"},l.default.createElement("a",{href:a},l.default.createElement("img",{src:n||"https://admin.legalmarketinghouse.com/wp-content/themes/sh-law-theme/includes/assets/images/88a9c0b8e7ff2ed7ecff91cfdaa0b816.png",className:"img-thumbnail mt-3",alt:t}),l.default.createElement("h5",{className:"my-3 small-excerpt text-center mt-2"},t)))},o=function(e){var t=e.currentTab,a=e.tabTitle,n=e.title,i=e.content;return l.default.createElement("div",{className:t===a?"tab-pane active":"tab-pane",id:a,role:"tabpanel","aria-labelledby":"nav-"+a+"-tab"},l.default.createElement("h4",{className:"bg-light-gray"},n),l.default.createElement("div",{id:"nav-"+a+"-tab",className:"article-container container"},l.default.createElement("div",{className:"row"},i.map((function(e){return l.default.createElement(c,{key:(0,r.addRandomKey)(e.title),link:e.link,title:e.title,img:e.featuredImg})})))))};c.propTypes={title:n.default.string,link:n.default.string,img:n.default.oneOfType([n.default.string,n.default.any])},c.defaultProps={title:"",link:"",img:""},o.propTypes={currentTab:n.default.string,tabTitle:n.default.string,title:n.default.string,content:n.default.arrayOf(n.default.object)},o.defaultProps={currentTab:"",tabTitle:"",title:"",content:[]},t.default=o},502:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.currentTab,a=e.tabTitle,n=e.title,i=e.content;return l.default.createElement("div",{className:t===a?"tab-pane active":"tab-pane",id:a,role:"tabpanel","aria-labelledby":"nav-"+a+"-tab"},l.default.createElement("h4",{className:"bg-light-gray"},n),l.default.createElement("div",{className:"article-container container",id:"nav-"+a+"-tab"},l.default.createElement("div",{className:"row"},i.map((function(e){return l.default.createElement("div",{key:(0,r.addRandomKey)(e.title),className:"col-sm-12"},l.default.createElement("div",{dangerouslySetInnerHTML:(0,r.createMarkup)(e.embed_video),className:"w-100"}),l.default.createElement("h5",{className:"mt-2 mb-4"},e.title+" ","-",l.default.createElement("span",{className:"red-title"}," "+e.date)))})))))};c.propTypes={currentTab:n.default.string,tabTitle:n.default.string,title:n.default.string,content:n.default.arrayOf(n.default.object)},c.defaultProps={currentTab:"",tabTitle:"",title:"",content:[]},t.default=c},503:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=a(438);function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.currentTab,a=e.tabTitle,n=e.title,i=e.content;return l.default.createElement("div",{className:t===a?"tab-pane active":"tab-pane",id:a,role:"tabpanel","aria-labelledby":"nav-"+a+"-tab"},l.default.createElement("h4",{className:"bg-light-gray"},n),l.default.createElement("div",{className:"container article-container"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{id:"nav-"+a+"-tab",dangerouslySetInnerHTML:(0,r.createMarkup)(i)}))))};c.propTypes={currentTab:n.default.string,tabTitle:n.default.string,title:n.default.string,content:n.default.string},c.defaultProps={currentTab:"",tabTitle:"",title:"",content:""},t.default=c},504:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(2)),n=i(a(4)),r=i(a(168));function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.content,a=e.title;return l.default.createElement("div",{className:"mt-4 w-100 d-block attorney-news-slider"},l.default.createElement("h4",{className:"bg-light-gray"},"Awards"===a?l.default.createElement("span",null,a," ","-"," ",l.default.createElement("a",{href:"/awards/",className:"small-excerpt position-relative award-link"},"Award Methodology")):a),l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12"},t.length>3?l.default.createElement(r.default,{sliderType:"LargeArticle",slides:t,start:0,end:3,arrowSize:1}):l.default.createElement("div",{className:"d-flex flex-row"},t.map((function(e){return l.default.createElement("a",{href:e.link,key:e.title,className:"mx-3"},l.default.createElement("img",{src:e.featuredImg,width:"230",alt:e.title,className:"img-fluid"}))})))))))};c.propTypes={content:n.default.arrayOf(n.default.object),title:n.default.string},c.defaultProps={content:[],title:""},t.default=c},505:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=o(a(2)),n=o(a(4)),r=o(a(168)),i=a(438),c=o(a(506));function o(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.title,a=e.content;return l.default.createElement("div",{className:"mt-4 w-100 d-block attorney-news-slider"},l.default.createElement("h4",{className:"bg-light-gray"},t),a.length>3?l.default.createElement(r.default,{sliderType:"MiniArticle",slides:a,start:0,end:3,arrowSize:1}):l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},a.map((function(e){return l.default.createElement("div",{key:(0,i.addRandomKey)(e.title),className:"col-sm-12 col-md-4 article-card"},l.default.createElement("a",{href:e.link},l.default.createElement("img",{src:e.featuredImg?e.featuredImg:c.default,alt:e.title,width:"230",className:"img-thumbnail mt-3"}),l.default.createElement("h5",{className:"my-3 small-excerpt"},e.title)))})))))};u.propTypes={title:n.default.string,content:n.default.arrayOf(n.default.object)},u.defaultProps={title:"",content:[]},t.default=u},506:function(e,t,a){e.exports=a.p+"498cfc424a756181e26c500d29fc2a41.png"}}]);