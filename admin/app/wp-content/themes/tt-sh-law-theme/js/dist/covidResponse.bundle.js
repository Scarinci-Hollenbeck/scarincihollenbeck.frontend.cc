!function(e){function t(t){for(var n,o,s=t[0],c=t[1],i=t[2],m=0,f=[];m<s.length;m++)o=s[m],r[o]&&f.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(u&&u(t);f.length;)f.shift()();return l.push.apply(l,i||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],n=!0,s=1;s<a.length;s++){var c=a[s];0!==r[c]&&(n=!1)}n&&(l.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={9:0},l=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/wp-content/themes/sh-law-theme/includes/assets/images/";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=c;l.push([933,0]),a()}({4:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});t.createMarkup=function(e){return{__html:e}},t.getDirectionsFromLocation=function(e){var t=[{title:"lyndhurst",address:"1100 Valley Brook Ave. Lyndhurst, NJ 07071"},{title:"red bank",address:"331 Newman Springs Road Red Bank, NJ 07701"},{title:"new york",address:"3 Park Ave. New York, NY 10016"},{title:"washington dc",address:"Suite 250 1000 Potomac St., N.W. Washington D.C. 20007"},{title:"san francisco",address:"315 Montgomery St. San Francisco, CA 94104"}];navigator.geolocation.getCurrentPosition((function(a){var n=a.coords,r=n.latitude,l=n.longitude,o=e.replace(/[^a-zA-Z0-9 ]/g,"").toLowerCase(),s="https://www.google.com/maps/dir/"+r+"+"+l+"/"+t.filter((function(e){return e.title===o}))[0].address;window.open(s,"_blank")}),(function(e){console.warn("ERROR("+e.code+"):"+e.message)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})},t.splitUrl=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e.split("/"),n=a.filter((function(e){return""!==e}));return null!==t&&(n=n.filter((function(e){return""!==e&&e!==t}))),n},t.splitUrlPreview=function(e,t){var a=e.substring(e.indexOf(t)+1);return a=a.substring(0,a.indexOf("&"))},t.sortByKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]>a[t]?1:e[t]<a[t]?-1:0})),e},t.sortByDateKey=function(e,t){return void 0!==e&&e.sort((function(e,a){return e[t]<a[t]?1:e[t]>a[t]?-1:0})),e},t.addRandomKey=function(e){return e.concat("-").concat(Math.floor(1e4*Math.random()+1))},t.urlify=function(e){return e.toLowerCase().replace(/\s/g,"-")},t.locationUrl=function(e){return e.toLowerCase().replace(/\s/g,"-").replace(/[.]/gm,"")},t.makeTitle=function(e){return e.indexOf("-")>-1?e.replace(/-|\s/g," ").toUpperCase():e.indexOf("+")>-1?e.replace(/\+/g," ").toUpperCase():e.toUpperCase()},t.unLink=function(e){return e.replace(/-|\s/g," ").replace(/\+/g," ")},t.filterByKey=function(e,t){for(var a=[],n=0;n<e.length;n+=1)e[n].key&&e[n].key===t&&a.push(e[n].selected);return a},t.sumbitSearchForm=function(e){var t=e.s,a=e.practice,n=e.attorney,r=e.category,l=((t||"")+" "+(a&&"Filter by practice"!==a?a:"")+" "+(n&&"Filter by attorney"!==n?n:"")+" "+(r&&"Filter by category"!==r?r:"")).trim().replace(/[^\w\s]/gi,"");return"https://admin.scarincihollenbeck.com/?s="+l.toLowerCase().replace(/\s/g,"+")}},933:function(e,t,a){a(16),e.exports=a(934)},934:function(e,t,a){var n=o(a(0)),r=o(a(14)),l=o(a(935));function o(e){return e&&e.__esModule?e:{default:e}}r.default.render(n.default.createElement(l.default,null),document.getElementById("covid-response"))},935:function(e,t,a){(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),l=i(r),o=i(a(936)),s=i(a(937)),c=a(4);function i(e){return e&&e.__esModule?e:{default:e}}a(941);var u=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={title:"",content:"",date:"",searchTerm:"",t:{keyword:"",attorney:"",practice:"",category:""},allAttorneys:[],allPractices:[],allCategories:[],coronaPosts:[]},t.fetchPostData=t.fetchPostData.bind(t),t.onChange=t.onChange.bind(t),t.onSubmit=t.onSubmit.bind(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,t),n(a,[{key:"componentDidMount",value:function(){var t=this,a=window.location.href,n="covid-19-crisis-management-unit";a.indexOf("covid-response-index.html")>-1&&(a="https://admin.scarincihollenbeck.com/"+n),a.indexOf("page_id=")>-1?this.fetchPageData("https://admin.scarincihollenbeck.com/wp-json/preview/page/"+n):(console.log("https://admin.scarincihollenbeck.com/wp-json/preview/page/"+n),this.fetchPageData("https://admin.scarincihollenbeck.com/wp-json/single-page/page/"+n)),e("https://admin.scarincihollenbeck.com/wp-json/attorney-search/practices").then((function(e){return e.json()})).then((function(e){t.setState({allPractices:e})})),e("https://admin.scarincihollenbeck.com/wp-json/attorney-search/attorneys").then((function(e){return e.json()})).then((function(e){t.setState({allAttorneys:e})})),e("https://admin.scarincihollenbeck.com/wp-json/wp/v2/categories?per_page=100").then((function(e){return e.json()})).then((function(e){t.setState({allCategories:e})})),e("https://feed.hollenbeckscarinci.com/covid-19-news").then((function(e){return e.json()})).then((function(e){t.setState({coronaPosts:e})}))}},{key:"onChange",value:function(e){var t=e.target,a=t.value,n=t.name,r=this.state.t;r[n]=a,this.setState({t:r})}},{key:"onSubmit",value:function(){var e=this.state.t;window.location=(0,c.sumbitSearchForm)(e)}},{key:"fetchPageData",value:function(t){var a=this;e(t).then((function(e){return e.json()})).then((function(e){var t=e.content,n=e.title;a.setState({title:n}),a.setState({content:t})}))}},{key:"fetchPostData",value:function(t){var a=this;e(t).then((function(e){return e.json()})).then((function(e){var t=e.attorneys,n=e.author,r=e.content,l=e.date,o=e.posts,s=e.title;a.setState({attorneys:t,author:n,content:r,date:l,posts:o,title:s})}))}},{key:"render",value:function(){var e=this.state,t=e.title,a=e.content,n=e.searchTerm,r=e.allPractices,i=e.allAttorneys,u=e.allCategories,m=e.coronaPosts,f=a.match(/<h2(.*?)>(.*?)<\/h2>/g),d=null!==f?f:"",p=(0,c.sortByKey)(r,"title"),h=(0,c.sortByKey)(i,"last_name"),y=a.replace(d,"");return l.default.createElement("span",null,l.default.createElement(o.default,{title:t,subTitle:d}),l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 col-md-8"},l.default.createElement("div",{className:"post-content",dangerouslySetInnerHTML:(0,c.createMarkup)(y)})),l.default.createElement(s.default,{searchTerm:n,onChange:this.onChange,onSubmit:this.onSubmit,allPractices:p,allAttorneys:h,allCategories:u,coronaPosts:m}))))}}]),a}(r.Component);t.default=u}).call(this,a(10))},936:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=l(a(0)),r=l(a(3));function l(e){return e&&e.__esModule?e:{default:e}}var o=function(e){var t=e.title,a=e.subTitle;return n.default.createElement("div",{className:"jumbotron jumbotron-fluid city-background"},n.default.createElement("div",{className:"container animated fadeInUp fast mt--1 max-width-container"},n.default.createElement("div",{className:"row"},n.default.createElement("div",{className:"col-sm-12 col-md-10 bg-black offset-md-1"},n.default.createElement("div",{className:"p-3"},n.default.createElement("span",{id:"red-block"}),n.default.createElement("h1",{className:"text-white proxima-bold"},t),n.default.createElement("span",{id:"white-border"}),a.length>0?n.default.createElement("h2",{className:"proxima-regular mt-3 mb-5"},a[0].replace(/(<([^>]+)>)/gi,"")):"")))))};o.propTypes={title:r.default.string,subTitle:r.default.arrayOf(r.default.string)},o.defaultProps={title:"",subTitle:[]},t.default=o},937:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=c(a(0)),r=c(a(3)),l=c(a(938)),o=c(a(939)),s=a(4);function c(e){return e&&e.__esModule?e:{default:e}}var i=function(e){var t=e.searchTerm,a=e.onChange,r=e.onSubmit,c=e.allPractices,i=e.allAttorneys,u=e.allCategories,m=e.coronaPosts;return n.default.createElement("div",{className:"col-sm-12 col-md-4 hide-print"},n.default.createElement(l.default,{searchTerm:t,onChange:a,allPractices:c,allAttorneys:i,allCategories:u,onSubmit:r}),n.default.createElement("div",{className:"w-100 mt-4"},n.default.createElement("div",{className:"sidebar-title"},"Current COVID-19 News"),n.default.createElement("div",{className:"off-white mh-500"},m.length>0?m.map((function(e){return n.default.createElement("div",{key:(0,s.addRandomKey)(e.title),className:"p-2"},n.default.createElement("a",{href:e.link,className:"top-article"},n.default.createElement("h5",{className:"mb-0"},e.title),n.default.createElement("p",{className:"my-0 ft-22"},(t=e.isoDate,(a=new Date(t)).getMonth()+1+"-"+a.getDate()+"-"+a.getFullYear())),n.default.createElement("p",{className:"mt-0 mb-3 ft-22",dangerouslySetInnerHTML:(0,s.createMarkup)(e.source)})));var t,a})):n.default.createElement("div",{className:"d-block mx-auto my-15 text-center"}," News Feeds Loading..."))),n.default.createElement("div",{className:"w-100 mt-4"},n.default.createElement("div",{className:"sidebar-title"},"Have a COVID-19 Question?"),n.default.createElement("div",{className:"off-white mh-375 p-1"},n.default.createElement(o.default,null))))};i.propTypes={searchTerm:r.default.string,onChange:r.default.func,onSubmit:r.default.func,allPractices:r.default.arrayOf(r.default.object),allAttorneys:r.default.arrayOf(r.default.object),allCategories:r.default.arrayOf(r.default.object),coronaPosts:r.default.arrayOf(r.default.object)},i.defaultProps={searchTerm:"",onChange:function(){},onSubmit:function(){},allPractices:[],allAttorneys:[],allCategories:[],coronaPosts:[]},t.default=i},938:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=l(a(0)),r=l(a(3));function l(e){return e&&e.__esModule?e:{default:e}}var o=function(e){var t=e.onSubmit,a=e.onChange,r=e.allPractices,l=e.allAttorneys,o=e.allCategories;return n.default.createElement("div",{className:"w-100"},n.default.createElement("form",{onChange:a},n.default.createElement("label",{htmlFor:"searchSite",className:"w-100"},n.default.createElement("input",{name:"keyword",type:"search",id:"searchSite",placeholder:"Keyword...",className:"form-control p-2"}),n.default.createElement("span",{className:"sr-only"},"Search For Attorney")),n.default.createElement("label",{htmlFor:"searchPractice",className:"d-block w-100"},n.default.createElement("select",{name:"practice",id:"searchPractice",className:"form-control p-2"},n.default.createElement("option",{defaultValue:"Filter by practice"},"Filter by practice"),r.map((function(e){return n.default.createElement("option",{value:e.title,key:e.ID},e.title)}))),n.default.createElement("span",{className:"sr-only"},"Filter by Practice")),n.default.createElement("label",{htmlFor:"searchAttorney",className:"d-block w-100"},n.default.createElement("select",{name:"attorney",id:"searchAttorney",className:"form-control p-2"},n.default.createElement("option",{defaultValue:"Filter by attorney"},"Filter by attorney"),l.map((function(e){return n.default.createElement("option",{value:e.title,key:e.id},e.title)}))),n.default.createElement("span",{className:"sr-only"},"Filtery by Attorney")),n.default.createElement("label",{htmlFor:"searchCategory",className:"d-block w-100"},n.default.createElement("select",{name:"category",id:"searchCategory",className:"form-control p-2"},n.default.createElement("option",{defaultValue:"Filter by category"},"Filter by category"),o.map((function(e){return"Uncategorized"!==e.name?n.default.createElement("option",{value:e.name,key:e.id},e.name):""}))),n.default.createElement("span",{className:"sr-only"},"Filtery by Category")),n.default.createElement("button",{type:"button",className:"btn btn-secondary proxima-bold px-5 mr-2"},"Clear"),n.default.createElement("button",{type:"button",onClick:function(){return t()},className:"btn btn-danger px-5"},"Search")))};o.propTypes={onChange:r.default.func,onSubmit:r.default.func,allPractices:r.default.arrayOf(r.default.object),allAttorneys:r.default.arrayOf(r.default.object),allCategories:r.default.arrayOf(r.default.object)},o.defaultProps={onSubmit:function(){},onChange:function(){},allPractices:[],allAttorneys:[],allCategories:[]},t.default=o},939:function(e,t,a){(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(0),o=(n=l)&&n.__esModule?n:{default:n};a(940);var s=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={firstName:"",lastName:"",email:"",phone:"",subject:"",message:"",successMessage:!1},t.onFormChange=t.onFormChange.bind(t),t.onFormSubmit=t.onFormSubmit.bind(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,t),r(a,[{key:"onFormChange",value:function(e){var t=e.target,a=t.name,n=t.value;"firstName"===a&&this.setState({firstName:n}),"lastName"===a&&this.setState({lastName:n}),"email"===a&&this.setState({email:n}),"phone"===a&&this.setState({phone:n}),"subject"===a&&this.setState({subject:n}),"message"===a&&this.setState({message:n})}},{key:"onFormSubmit",value:function(t){var a=this;t.preventDefault();var n=this.state,r={firstName:n.firstName,lastName:n.lastName,email:n.email,phone:n.phone,subject:n.subject,message:n.message,pageTitle:document.querySelector("h1.text-white.proxima-bold").innerText,siteUrl:window.location.href};e("https://forms.hollenbeckscarinci.com/shlaw/site/contact/form",{method:"post",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}).then((function(e){200===e.status&&a.setState({successMessage:!0})}))}},{key:"render",value:function(){var e=this.state,t=e.firstName,a=e.lastName,n=e.email,r=e.phone,l=e.subject,s=e.message,c=e.successMessage;return o.default.createElement("form",{className:"mt-3 mb-3",onSubmit:this.onFormSubmit,method:"post"},o.default.createElement("div",{className:"form-row"},o.default.createElement("div",{className:"col-md-6 mb-3"},o.default.createElement("label",{htmlFor:"firstName",className:"sr-only"},"First name"),o.default.createElement("input",{type:"text",className:"form-control",name:"firstName",onChange:this.onFormChange,id:"firstName",placeholder:"First name",value:t,required:!0})),o.default.createElement("div",{className:"col-md-6 mb-3"},o.default.createElement("label",{htmlFor:"lastName",className:"sr-only"},"Last name"),o.default.createElement("input",{type:"text",className:"form-control",name:"lastName",onChange:this.onFormChange,id:"lastName",placeholder:"Last name",value:a,required:!0})),o.default.createElement("div",{className:"col-md-6 mb-3"},o.default.createElement("label",{htmlFor:"email",className:"sr-only"},"Email"),o.default.createElement("input",{type:"email",className:"form-control",name:"email",onChange:this.onFormChange,id:"email",placeholder:"Email",value:n,required:!0})),o.default.createElement("div",{className:"col-md-6 mb-3"},o.default.createElement("label",{htmlFor:"phone",className:"sr-only"},"Phone"),o.default.createElement("input",{type:"tel",className:"form-control",name:"phone",onChange:this.onFormChange,id:"phone",placeholder:"Phone",value:r,required:!0})),o.default.createElement("div",{className:"col-sm-12 mb-3"},o.default.createElement("label",{htmlFor:"subject",className:"sr-only"},"Subject"),o.default.createElement("input",{type:"text",className:"form-control",name:"subject",onChange:this.onFormChange,id:"subject",placeholder:"Subject",value:l,required:!0})),o.default.createElement("div",{className:"col-sm-12 mb-3"},o.default.createElement("label",{htmlFor:"message",className:"sr-only"},"message"),o.default.createElement("textarea",{rows:"6",className:"form-control",name:"message",onChange:this.onFormChange,id:"message",placeholder:"Message",value:s,required:!0}))),o.default.createElement("div",{className:"col-sm-12"},o.default.createElement("p",{className:"small-excerpt ml--1"},"The use of the Internet or this form for communication with the firm or any individual member of the firm does not establish an attorney-client relationship. Confidential or time-sensitive information should not be sent through this form."),o.default.createElement("label",{htmlFor:"disclaimer",className:"d-flex flex-row mt-3 disclaimer"},o.default.createElement("input",{type:"checkbox",className:"form-control",id:"disclaimer",name:"disclaimer",required:!0}),o.default.createElement("span",{className:"text-muted small-excerpt mt-0"},"I have read the disclaimer *"))),o.default.createElement("input",{type:"submit",className:"ml-2 w-25 mt-2 btn btn-danger",value:"Submit"}),c?o.default.createElement("p",{className:"text-success"},"Thank you for your inquiry one of our representative will reach out to you shortly!"):"")}}]),a}(l.Component);t.default=s}).call(this,a(10))},940:function(e,t,a){},941:function(e,t,a){}});