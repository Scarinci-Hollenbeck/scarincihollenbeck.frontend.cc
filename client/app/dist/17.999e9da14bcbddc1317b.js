(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{466:function(e,t,n){n.r(t),function(e){var a=n(0),r=n.n(a),o=n(524),c=n(492),i=n(479),l=n(525),m=n(526),s=n(476);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var w=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(E,t);var n,a,u,w,b=(n=E,function(){var e,t=y(n);if(g()){var a=y(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return f(this,e)});function E(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,E),(t=b.call(this,e)).state={admin:[]},t.fetchPostData=t.fetchPostData.bind(h(t)),t}return a=E,(u=[{key:"componentDidMount",value:function(){var e=this.props.match.params.admin;this.fetchPostData("".concat("http://localhost:8400","/wp-json/individual-admin/admin/").concat(e))}},{key:"fetchPostData",value:function(t){var n=this;e(t).then((function(e){return e.json()})).then((function(e){return n.setState({admin:e})}))}},{key:"render",value:function(){var e=this.state.admin,t=e.Title,n=e.biography,a=e.email,u=e.image,p=e.name,d=e.social_media_links,f=e.vizibility,h=e.phone_extension,g=e.seo;return r.a.createElement("div",null,r.a.createElement(o.a,{seo:g}),e&&r.a.createElement("div",{id:"single-admin"},r.a.createElement(c.a,{image:"https://shhcsgmvsndmxmpq.nyc3.digitaloceanspaces.com/2020/04/attorney-header.jpg",profile:r.a.createElement(l.a,{admin:e,image:u,name:p}),height:"325px",infoCard:r.a.createElement(m.a,{name:p,Title:t,phone_extension:h,email:a,social_media_links:d,vizibility:f})}),r.a.createElement(i.a,null,r.a.createElement("div",null,r.a.createElement("div",{className:"line-header"},r.a.createElement("h3",null,"Biography")),r.a.createElement("div",{className:"w-100 mt-5"},r.a.createElement("div",{dangerouslySetInnerHTML:Object(s.b)(n)}))))))}}])&&p(a.prototype,u),w&&p(a,w),E}(a.Component);t.default=w}.call(this,n(129))},476:function(e,t,n){n.d(t,"g",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"h",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"f",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return m})),n.d(t,"c",(function(){return s}));var a=function(e,t){return void 0!==e&&e.sort((function(e,n){return e[t]>n[t]?1:e[t]<n[t]?-1:0})),e},r=function(e){return e.concat("-").concat(Math.floor(1e4*Math.random()+1))},o=function(e){return e.toLowerCase().replace(/\s/g,"-")},c=function(e){return{__html:e}},i=function(e,t){return void 0!==e&&e.sort((function(e,n){return e[t]<n[t]?1:e[t]>n[t]?-1:0})),e},l=function(e){var t=[{title:"lyndhurst",address:"1100 Valley Brook Ave. Lyndhurst, NJ 07071"},{title:"red bank",address:"331 Newman Springs Road Red Bank, NJ 07701"},{title:"new york",address:"3 Park Ave. New York, NY 10016"},{title:"washington dc",address:"Suite 250 1000 Potomac St., N.W. Washington D.C. 20007"},{title:"san francisco",address:"315 Montgomery St. San Francisco, CA 94104"}];navigator.geolocation.getCurrentPosition((function(n){var a=n.coords,r=a.latitude,o=a.longitude,c=e.replace(/[^a-zA-Z0-9 ]/g,"").toLowerCase(),i=t.filter((function(e){return e.title===c}))[0].address,l="https://www.google.com/maps/dir/".concat(r,"+").concat(o,"/").concat(i);window.open(l,"_blank")}),(function(e){console.warn("ERROR(".concat(e.code,"):").concat(e.message))}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})},m=function(e){return e.toLowerCase().replace(/\s/g,"-").replace(/[.]/gm,"")},s=function(e,t){for(var n=[],a=0;a<e.length;a+=1)e[a].key&&e[a].key===t&&n.push(e[a].selected);return n}},479:function(e,t,n){var a=n(0),r=n.n(a);t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},t)))}},492:function(e,t,n){var a=n(0),r=n.n(a),o=n(478);function c(){var e=l(["\n  background-color: rgba(0,0,0, .50);\n  border-radius: 4px;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 90%, 50% 100%, 1% 90%, 0 0);\n  max-height: ",";\n"]);return c=function(){return e},e}function i(){var e=l(["\n  background: linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(",") no-repeat 50%;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n  clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);\n"]);return i=function(){return e},e}function l(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}t.a=function(e){var t=e.profile,n=e.infoCard,a=e.image,l=e.height,m=o.a.div(i(),a),s=o.a.div(c(),l);return r.a.createElement(m,{className:"jumbotron jumbotron-fluid"},r.a.createElement("div",{className:"container animated fadeInUp fast mt--1 max-width-container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12 col-md-4 mb-3 mr-4 mh-325"},t),r.a.createElement(s,{className:"col-sm-12 col-md-7"},n))))}},524:function(e,t,n){var a=n(0),r=n.n(a),o=n(480),c=n(3),i=n.n(c),l=function(e){var t=e.seo;return r.a.createElement(o.Helmet,null,r.a.createElement("title",null,t.title),r.a.createElement("meta",{name:"description",content:t.metaDescription}),r.a.createElement("meta",{name:"robots",content:"max-snippet:-1, max-image-preview:large, max-video-preview:-1"}),r.a.createElement("link",{rel:"canonical",href:"".concat(window.location.origin,"/").concat(t.canonicalLink)}),r.a.createElement("meta",{property:"og:title",content:t.title}),r.a.createElement("meta",{property:"og:site_name",content:"Scarinci Hollenbeck"}),r.a.createElement("meta",{property:"og:type",content:"profile"}),r.a.createElement("meta",{property:"og:locale",content:"en_US"}),r.a.createElement("meta",{property:"og:url",content:"".concat(window.location.origin,"/").concat(t.canonicalLink)}),r.a.createElement("meta",{property:"og:image",content:t.featuredImg}),r.a.createElement("meta",{property:"og:image:secure_url",content:t.featuredImg}),r.a.createElement("meta",{property:"og:image:width",content:t.imgWidth}),r.a.createElement("meta",{property:"og:image:height",content:t.imgHeight}),r.a.createElement("meta",{property:"og:image:type",content:"image/jpg"}),r.a.createElement("meta",{property:"profile:first_name",content:t.firstName}),r.a.createElement("meta",{property:"profile:last_name",content:t.lastName}),r.a.createElement("meta",{name:"twitter:card",content:"summary"}),r.a.createElement("meta",{name:"twitter:description",content:t.metaDescription}),r.a.createElement("meta",{name:"twitter:title",content:t.title}),r.a.createElement("meta",{name:"twitter:site",content:"@S_H_Law"}),r.a.createElement("meta",{name:"twitter:image",content:t.featuredImg}),r.a.createElement("meta",{name:"twitter:creator",content:"@S_H_Law"}),r.a.createElement("script",{type:"application/ld+json"},'\n        {\n          "@context": "http://www.schema.org",\n          "@type": "Person",\n          "@id": '.concat(window.location.origin,"/").concat(t.canonicalLink,',\n          "name": ').concat(t.name,',\n          "alternateName": ').concat(t.title,',\n          "nationality": "American",\n          "Description": ').concat(t.metaDescription,',\n        "disambiguatingDescription": ').concat(t.metaDescription,',\n        "jobTitle": ').concat(t.jobPosition,',\n        "worksFor": [\n          {\n            "@type": "Organization",\n            "name": "Scarinci Hollenbeck, LLC",\n            "sameAs": [\n              "https://twitter.com/S_H_Law",\n              "https://www.facebook.com/ScarinciHollenbeck/",\n              "https://www.linkedin.com/company/scarinci-hollenbeck-llc/",\n            ]\n          }\n        ],\n        "url": ').concat(window.location.origin,"/").concat(t.canonicalLink,',\n        "image": ').concat(t.featuredImg,',\n        "address": {\n          "@type": "PostalAddress",\n          "addressLocality": ').concat(t.addressLocality,',\n          "addressRegion": "NJ",\n          "addressCountry": "United States"\n        }\n      }\n        ')))};l.propTypes={seo:i.a.objectOf(i.a.oneOfType([i.a.string,i.a.number,i.a.arrayOf(i.a.string)]))},l.defaultProps={seo:{}},t.a=l},525:function(e,t,n){var a=n(0),r=n.n(a),o=n(3),c=n.n(o),i=function(e){var t=e.image,n=e.name;return r.a.createElement("img",{rel:"preload",src:t.url,alt:n,className:"img-fluid white-transparent-border"})};i.propTypes={image:c.a.objectOf(c.a.string),name:c.a.string},i.defaultProps={image:{},name:""},t.a=i},526:function(e,t,n){var a=n(0),r=n.n(a),o=n(3),c=n.n(o),i=n(95),l=n(483),m=n(484),s=n(503),u=n(498),p=n(499),d=n(500),f=n(501),h=n(502),g=function(e){var t=e.Title,n=e.phone_extension,a=e.email,o=e.social_media_links,c=e.vizibility,g=e.name;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12 my-3"},r.a.createElement("span",{id:"red-block"}),r.a.createElement("h1",{className:"text-white proxima-bold border-bottom"},g)),r.a.createElement("div",{className:"col-sm-12 mt--1 mb-2 mx-0"},r.a.createElement("h5",{className:"text-white"},t)),r.a.createElement("div",{className:"col-sm-12 col-md-6"},r.a.createElement("ul",{className:"text-white no-dots ml-0"},r.a.createElement("li",{className:"mb-1"},r.a.createElement("h5",null,r.a.createElement(i.a,{icon:l.faPhone,className:"text-white"}),r.a.createElement("span",{className:"proxima-regular ft-18"}," ","201-896-4100"," ","  ".concat(n)))),r.a.createElement("li",{className:"mb-1"},r.a.createElement("h5",null,r.a.createElement(i.a,{icon:m.faEnvelope,className:"text-white"}),r.a.createElement("a",{href:"mailto:".concat(a),className:"text-white proxima-regular mail-link ft-18"}," ",a))))),r.a.createElement("div",{className:"col-sm-12 col-md-6"},o?r.a.createElement("span",null,r.a.createElement("ul",{className:"ml-0 mt-2"},o.map((function(e){return r.a.createElement("li",{key:e.channel,className:"mb-0 lh-1"},r.a.createElement("h5",null,"Twitter"===e.channel&&r.a.createElement(i.a,{icon:u.faTwitter,className:"text-white"}),"Facebook"===e.channel&&r.a.createElement(i.a,{icon:p.faFacebookSquare,className:"text-white"}),"LinkedIn"===e.channel&&r.a.createElement(i.a,{icon:d.faLinkedin,className:"text-white"}),"Skype"===e.channel&&r.a.createElement(i.a,{icon:f.faSkype,className:"text-white"}),"Instagram"===e.channel&&r.a.createElement(i.a,{icon:h.faInstagram,className:"text-white"}),r.a.createElement("a",{href:e.url,className:"text-white mail-link proxima-regular ft-17px position-relative icon"},"  Connect on ".concat(e.channel))))})),c?r.a.createElement("li",{className:"mb-0 lh-1"},r.a.createElement("h5",null,r.a.createElement(i.a,{icon:s.faAddressCard,className:"text-white"}),r.a.createElement("a",{href:c,className:"text-white mail-link proxima-regular ft-17px position-relative icon"}," Download Contact"))):"")):"")))};g.propTypes={name:c.a.string,Title:c.a.string,phone_extension:c.a.string,email:c.a.string,social_media_links:c.a.arrayOf(c.a.object),vizibility:c.a.string},g.defaultProps={Title:"",name:"",phone_extension:"",email:"",social_media_links:[],vizibility:""},t.a=g}}]);