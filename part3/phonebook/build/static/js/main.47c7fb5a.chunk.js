(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(17),r=t.n(c),a=t(8),o=t(3),u=t(2),i=t.n(u),s=t(4),d=t.n(s),f="/api/persons",l={getAll:function(){return d.a.get(f).then((function(e){return e.data}))},create:function(e){return d.a.post(f,e).then((function(e){return e.data}))},delete:function(e){return d.a.delete("".concat(f,"/").concat(e))},update:function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))}},b=t(0),j=function(e){var n=e.onChange;return Object(b.jsxs)("div",{children:["filter shown with ",Object(b.jsx)("input",{onChange:n})]})},h=function(e){return Object(b.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.persons,t=e.onDelete;return Object(b.jsx)("ul",{children:n.map((function(e){return Object(b.jsxs)("li",{children:[e.name," ",e.number,Object(b.jsx)("button",{onClick:function(){return t(e)},children:"Delete"})]},e.name)}))})},O=function(e){var n=e.notification,t=n.type;return Object(b.jsx)(i.a.Fragment,{children:null!==n&&Object(b.jsx)("div",{className:"notification ".concat(t),children:n.message})})},p=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),i=Object(o.a)(r,2),s=i[0],d=i[1],f=Object(u.useState)(""),p=Object(o.a)(f,2),v=p[0],x=p[1],g=Object(u.useState)(""),w=Object(o.a)(g,2),C=w[0],y=w[1],N=Object(u.useState)(null),S=Object(o.a)(N,2),k=S[0],D=S[1];Object(u.useEffect)((function(){l.getAll().then((function(e){c(e)}))}),[]);var A=""===C?t:t.filter((function(e){return e.name.toLowerCase().indexOf(C.toLowerCase())>=0}));Object(u.useEffect)((function(){var e=setTimeout((function(){D(null)}),5e3);return function(){clearTimeout(e)}}),[k]);var E=function(e){return t.find((function(n){return n.name===e}))};return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Phonebook"}),null!==k&&Object(b.jsx)(O,{notification:k}),Object(b.jsx)(j,{onChange:function(e){y(e.target.value)}}),Object(b.jsx)("h3",{children:"Add a new"}),Object(b.jsx)(h,{onSubmit:function(e){e.preventDefault();var n=E(s);if(n){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var r=Object(a.a)(Object(a.a)({},n),{},{number:v}),o=n.id;l.update(o,r).then((function(e){c((function(n){return n.map((function(n){return n.id!==o?n:e}))})),D({type:"success",message:"Edited ".concat(s,"'s number")})})).catch((function(e){D({type:"error",message:"Information of ".concat(s," has already been deleted from server")}),c((function(e){return e.filter((function(e){return e.id!==o}))}))})).finally((function(){d(""),x("")}))}}else{var u={name:s,number:v};l.create(u).then((function(e){c(t.concat(e)),d(""),x(""),D({type:"success",message:"Added ".concat(e.name)})})).catch((function(e){return D({type:"error",message:e.response.data})}))}},newName:s,newNumber:v,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){x(e.target.value)}}),Object(b.jsx)("h1",{children:"Numbers"}),Object(b.jsx)(m,{persons:A,onDelete:function(e){window.confirm("Delete ".concat(e.name," ?"))&&l.delete(e.id).then((function(){c((function(n){return n.filter((function(n){return n.id!==e.id}))}))}))}})]})};t(41);r.a.render(Object(b.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.47c7fb5a.chunk.js.map