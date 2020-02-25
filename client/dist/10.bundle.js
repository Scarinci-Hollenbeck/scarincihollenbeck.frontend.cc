(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{868:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=i(a(0)),r=i(a(3)),n=i(a(909)),o=i(a(910)),c=i(a(911));function i(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.onCategorySelection,a=e.corePractices;return l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-sm-12 px-0"},l.default.createElement("div",{className:"line-header"},l.default.createElement("h3",null,"ABOUT OUR FIRM"))),l.default.createElement("div",{className:"col-sm-12 col-md-4 mt-5 border-right"},l.default.createElement(n.default,null)),l.default.createElement("div",{className:"col-sm-12 col-md-4 mt-5 border-right"},l.default.createElement(o.default,{corePractices:a})),l.default.createElement("div",{className:"col-sm-12 col-md-4 mt-5"},l.default.createElement(c.default,{onCategorySelection:t})))};u.propTypes={onCategorySelection:r.default.func,corePractices:r.default.arrayOf(r.default.object)},u.defaultProps={onCategorySelection:function(){},corePractices:[]},t.default=u},909:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l,r=a(0),n=(l=r)&&l.__esModule?l:{default:l};t.default=function(){return n.default.createElement("div",null,n.default.createElement("h5",{className:"red-title"},"Firm Overview"),n.default.createElement("hr",null),n.default.createElement("p",{className:"text-muted"},"With a growing practice of more than 70+ experienced attorneys, Scarinci Hollenbeck is an alternative to a National 250 law firm. With offices in New Jersey, New York City, San Francisco, and the District of Columbia, we serve the niche practice areas most often required by institutions, corporations, entities, and the people who own and control them."),n.default.createElement("a",{href:"/firm-overview",className:"red-title proxima-bold"},n.default.createElement("u",null,"Read More >>")))}},910:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=n(a(0)),r=n(a(3));function n(e){return e&&e.__esModule?e:{default:e}}var o=function(e){var t=e.corePractices;return l.default.createElement("div",null,l.default.createElement("h5",{className:"red-title"},"Core Practices"),l.default.createElement("hr",null),l.default.createElement("ul",{className:"ml-4"},t.map((function(e){return l.default.createElement("li",{key:e.name,className:"blue-title"},l.default.createElement("a",{href:e.link,className:"blue-title proxima-bold"},e.name))}))),l.default.createElement("a",{href:"/practices",className:"red-title proxima-bold"},l.default.createElement("u",null,"All Practices >>")))};o.propTypes={corePractices:r.default.arrayOf(r.default.object)},o.defaultProps={corePractices:[]},t.default=o},911:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var l=n(a(0)),r=n(a(3));function n(e){return e&&e.__esModule?e:{default:e}}var o=function(e){var t=e.onCategorySelection;return l.default.createElement("div",null,l.default.createElement("h5",{className:"red-title"},"Firm Insights"),l.default.createElement("hr",null),l.default.createElement("p",{className:"text-muted"},"Firm Insights is Scarinci Hollenbeck's library of articles written by our attorneys. It is our way of providing you with the most critical legal updates that could impact your business."),l.default.createElement("form",null,l.default.createElement("label",{htmlFor:"category"},l.default.createElement("p",{className:"text-muted"},"Know what you're looking for? Select a category below:"),l.default.createElement("select",{id:"category",className:"home-select w-100 p-2",onChange:t},l.default.createElement("option",null,"Select Category"),l.default.createElement("option",{value:"/category/law-firm-insights/business-law/"},"Business Law"),l.default.createElement("option",{value:"/category/law-firm-insights/cannabis-law/"},"Cannabis Law"),l.default.createElement("option",{value:"/category/law-firm-insights/commercial-real-estate/"},"Commercial Real Estate"),l.default.createElement("option",{value:"/category/law-firm-insights/entertainment-and-media/"},"Entertainment and Media"),l.default.createElement("option",{value:"/category/law-firm-insights/environmental-land-use/"},"Environmental and Land Use"),l.default.createElement("option",{value:"/category/law-firm-insights/intellectual-property/"},"Intellectual Property"),l.default.createElement("option",{value:"/category/law-firm-insights/labor-employment/"},"Labor and Employment"),l.default.createElement("option",{value:"/category/law-firm-insights/litigation/"},"Litigation"),l.default.createElement("option",{value:"/category/law-firm-insights/public-law/"},"Public Law"),l.default.createElement("option",{value:"/category/law-firm-insights/tax/"},"Tax"),l.default.createElement("option",{value:"/category/law-firm-insights/technology/"},"Technology")))),l.default.createElement("p",{className:"my-3 small-excerpt mb-0"},"Not sure? Feel free to browse here."),l.default.createElement("a",{href:"/category/law-firm-insights/",className:"red-title proxima-bold"},l.default.createElement("u",null,"Firm Insights >>")))};o.propTypes={onCategorySelection:r.default.func},o.defaultProps={onCategorySelection:function(){}},t.default=o}}]);