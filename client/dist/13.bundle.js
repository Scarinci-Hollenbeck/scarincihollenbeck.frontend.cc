(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{876:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(0)),r=i(a(3)),c=i(a(382)),n=a(14);function i(e){return e&&e.__esModule?e:{default:e}}a(946);var m=function(e){var t=e.attorneys,a=e.practices,r=e.map,i=e.title,m=(0,n.sortByKey)(t,"lastName");return l.default.createElement("div",null,l.default.createElement("h4",{className:"bg-light-gray text-capitalize"},i," ","Office"),l.default.createElement("div",{className:"w-100"},l.default.createElement("iframe",{title:i+" office",src:r,className:"w-100 h-300",frameBorder:"0",allowFullScreen:!0})),l.default.createElement("h4",{className:"bg-light-gray text-capitalize mt-5"},i," ","Attorneys"),l.default.createElement("div",{className:"container limit-location-container"},l.default.createElement("div",{className:"row"},m.map((function(e){return l.default.createElement("div",{key:e.ID,className:"col-sm-12 col-md-6 mb-2"},l.default.createElement(c.default,{link:"/attorneys/"+(t=e.link,t.split("/attorneys/").pop()),image:e.image,name:e.name,title:e.designation,number:e.contact,email:e.email,height:"112px",width:"81px"}));var t})))),l.default.createElement("h4",{className:"bg-light-gray mt-5"},"Services We Offer"),l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 col-md-6"},l.default.createElement("ul",{className:"blue-title"},a.map((function(e,t){return a.length/2>t?l.default.createElement("li",{key:e.ID},l.default.createElement("a",{href:e.slug,className:"proxima-bold blue-title"},l.default.createElement("u",null,e.title))):""})))),l.default.createElement("div",{className:"col-sm-12  col-md-6"},l.default.createElement("ul",{className:"blue-title"},a.map((function(e,t){return a.length/2<=t?l.default.createElement("li",{key:e.ID},l.default.createElement("a",{href:e.slug,className:"proxima-bold blue-title"},l.default.createElement("u",null,e.title))):""})))))))};m.propTypes={attorneys:r.default.arrayOf(r.default.object),practices:r.default.arrayOf(r.default.object),map:r.default.string,title:r.default.string},m.defaultProps={attorneys:[],practices:[],map:"",title:""},t.default=m},946:function(e,t,a){}}]);