(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Products"],{"3cbe":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),n=Object(o["createElementVNode"])("h2",null,"產品列表",-1),r={class:"container"},a={class:"vld-parent"},i={class:"table align-middle"},l=Object(o["createElementVNode"])("thead",null,[Object(o["createElementVNode"])("tr",null,[Object(o["createElementVNode"])("th",null,"圖片"),Object(o["createElementVNode"])("th",null,"商品名稱"),Object(o["createElementVNode"])("th",null,"價格"),Object(o["createElementVNode"])("th")])],-1),d={style:{width:"200px"}},s={key:0,class:"h5"},u={key:1},b={class:"h6"},p={class:"h5"},m={class:"btn-group btn-group-sm"},f=["onClick"],g=["disabled","onClick"],O={class:"spinner-grow spinner-grow-sm"},h=Object(o["createTextVNode"])(" 加到購物車 ");function j(e,t,c,j,v,N){var E=Object(o["resolveComponent"])("ProductModal"),V=Object(o["resolveComponent"])("Spinner"),y=Object(o["resolveComponent"])("Loading");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[n,Object(o["createElementVNode"])("div",r,[Object(o["createVNode"])(E,{ref:"checkMore",product:v.product,onAddToCart:N.addToCart,onClearSingleProduct:N.clearSingleProduct},null,8,["product","onAddToCart","onClearSingleProduct"]),Object(o["createElementVNode"])("div",a,[Object(o["createVNode"])(y,{active:v.isLoading,"onUpdate:active":t[0]||(t[0]=function(e){return v.isLoading=e}),"can-cancel":!0,"is-full-page":v.fullPage},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(V)]})),_:1},8,["active","is-full-page"])]),Object(o["createElementVNode"])("table",i,[l,Object(o["createElementVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(v.products,(function(t){return Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:t.id},[Object(o["createElementVNode"])("td",d,[Object(o["createElementVNode"])("div",{style:Object(o["normalizeStyle"])([{backgroundImage:"url(".concat(t.imageUrl,")")},{height:"100px","background-size":"cover","background-position":"center"}])},null,4)]),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(t.title),1),Object(o["createElementVNode"])("td",null,[t.price===t.origin_price?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",s,Object(o["toDisplayString"])(e.$filters.currency(t.price))+" 元 ",1)):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",u,[Object(o["createElementVNode"])("del",b,"原價 "+Object(o["toDisplayString"])(e.$filters.currency(t.origin_price))+" 元",1),Object(o["createElementVNode"])("div",p,"現在只要 "+Object(o["toDisplayString"])(e.$filters.currency(t.price))+" 元",1)]))]),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("div",m,[Object(o["createElementVNode"])("button",{class:"btn btn-outline-secondary",type:"button",onClick:function(e){return N.openProductModal(t.id)}}," 查看更多 ",8,f),Object(o["createElementVNode"])("button",{disabled:v.isLoadingItem===t.id,class:"btn btn-outline-danger",type:"button",onClick:function(e){return N.addToCart(t.id)}},[Object(o["withDirectives"])(Object(o["createElementVNode"])("div",O,null,512),[[o["vShow"],v.isLoadingItem===t.id]]),h],8,g)])])])})),128))])])])],64)}c("99af"),c("a9e3");var v=c("6805"),N=c("6be2"),E=(c("a4d3"),c("e01a"),c("d3b7"),c("ddb0"),{id:"productModal",ref:"ProductModal",class:"modal fade",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}),V={class:"modal-dialog modal-xl",role:"document"},y={class:"modal-content border-0"},k={class:"modal-header bg-dark text-white"},S={id:"exampleModalLabel",class:"modal-title"},C=Object(o["createElementVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),P={class:"modal-body"},I={class:"row"},M={class:"col-sm-6 vld-parent"},L=["src"],x={class:"col-sm-6"},w={class:"badge bg-primary rounded-pill"},D={key:0,class:"h5"},B={key:1},T={class:"h6"},F={class:"h5"},$={class:"input-group"};function _(e,t,c,n,r,a){var i=Object(o["resolveComponent"])("v-field"),l=Object(o["resolveComponent"])("error-message"),d=Object(o["resolveComponent"])("v-form");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",E,[Object(o["createElementVNode"])("div",V,[Object(o["createElementVNode"])("div",y,[Object(o["createElementVNode"])("div",k,[Object(o["createElementVNode"])("h5",S,[Object(o["createElementVNode"])("span",null,Object(o["toDisplayString"])(c.product.title),1)]),C]),Object(o["createElementVNode"])("div",P,[Object(o["createElementVNode"])("div",I,[Object(o["createElementVNode"])("div",M,[Object(o["createElementVNode"])("img",{class:"img-fluid",src:c.product.imageUrl,alt:""},null,8,L)]),Object(o["createElementVNode"])("div",x,[Object(o["createElementVNode"])("span",w,Object(o["toDisplayString"])(),1),Object(o["createElementVNode"])("p",null,"商品描述："+Object(o["toDisplayString"])(c.product.description),1),Object(o["createElementVNode"])("p",null,"商品內容："+Object(o["toDisplayString"])(c.product.content),1),c.product.price===c.product.origin_price?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",D,Object(o["toDisplayString"])(c.product.price)+" 元 ",1)):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",B,[Object(o["createElementVNode"])("del",T,"原價 "+Object(o["toDisplayString"])(c.product.origin_price)+" 元",1),Object(o["createElementVNode"])("div",F,"現在只要 "+Object(o["toDisplayString"])(c.product.price)+" 元",1)])),Object(o["createElementVNode"])("div",null,[Object(o["createElementVNode"])("div",$,[Object(o["createVNode"])(d,{class:"input-group"},{default:Object(o["withCtx"])((function(e){var c=e.values,n=e.errors;return[Object(o["createVNode"])(i,{modelValue:r.qty,"onUpdate:modelValue":[t[0]||(t[0]=function(e){return r.qty=e}),function(e){return c.數量=Number(c.數量)}],class:Object(o["normalizeClass"])([{"is-invalid":n["數量"]},"form-control"]),min:"1",max:"20",name:"數量",rules:"between:1,20",type:"number"},null,8,["modelValue","class","onUpdate:modelValue"]),Object(o["createVNode"])(l,{class:"invalid-feedback",name:"數量"}),Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=function(){return a.addToCart&&a.addToCart.apply(a,arguments)})}," 加入購物車 ")]})),_:1})])])])])])])])],512)}c("e9c4");var A=c("7c2b"),q=c.n(A),U={name:"ProductModal",props:["product"],data:function(){return{qty:1,ProductModal:{},tempObj:{}}},watch:{product:{handler:function(e){this.tempObj=JSON.parse(JSON.stringify(e))},deep:!0}},methods:{addToCart:function(){this.$emit("addToCart",this.tempObj.id,this.qty)}},mounted:function(){var e=this;this.ProductModal=new q.a(this.$refs.ProductModal),this.$refs.ProductModal.addEventListener("hidden.bs.modal",(function(){e.$emit("clear-single-product"),e.qty=1}))}},J=c("6b0d"),R=c.n(J);const z=R()(U,[["render",_]]);var G=z,X=c("9062"),Y=c.n(X),H=(c("e40d"),c("a420")),K={name:"ProductsView",components:{ProductModal:G,Loading:Y.a,Spinner:H["a"]},data:function(){return{isLoading:!1,fullPage:!0,cartData:{},products:[],product:{},productId:"",ProductModal:"",isLoadingItem:"",qty:""}},mixins:[v["a"]],methods:{openProductModal:function(e){this.productId=e,this.getSingleProduct(),this.openModal()},getProducts:function(){var e=this;this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("steve-vue","/products/all"),{}).then((function(t){e.isLoading=!1,e.products=t.data.products})).catch((function(t){e.isLoading=!1,e.alertError(t.data.message)}))},getSingleProduct:function(){var e=this;this.isLoading=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("steve-vue","/product/").concat(this.productId)).then((function(t){e.product=t.data.product,e.isLoading=!1})).catch((function(t){e.isLoading=!1,console.error(t.response)}))},getCart:function(){var e=this;this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("steve-vue","/cart")).then((function(t){e.cartData=t.data.data})).catch((function(e){console.error(e.data.message)}))},addToCart:function(e){var t=this,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o={product_id:e,qty:Number(c)};this.isLoading=!0,this.$http.post("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("steve-vue","/cart"),{data:o}).then((function(e){return t.isLoading=!1,t.getCart(),N["a"].emit("get-cart"),t.$refs.checkMore.ProductModal.hide(),e})).then((function(e){t.alertSuccess(e.data.message)})).catch((function(e){t.isLoading=!1,console.error(e),t.alertError(e)}))},clearSingleProduct:function(){this.product={}},openModal:function(){this.$refs.checkMore.ProductModal.show()},testEmit:function(e,t){console.log("testEmit",e,t),this.isLoading=!0}},mounted:function(){this.getProducts()}};const Q=R()(K,[["render",j]]);t["default"]=Q},"408a":function(e,t,c){var o=c("e330");e.exports=o(1..valueOf)},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,c){var o=c("e330"),n=c("1d80"),r=c("577e"),a=c("5899"),i=o("".replace),l="["+a+"]",d=RegExp("^"+l+l+"*"),s=RegExp(l+l+"*$"),u=function(e){return function(t){var c=r(n(t));return 1&e&&(c=i(c,d,"")),2&e&&(c=i(c,s,"")),c}};e.exports={start:u(1),end:u(2),trim:u(3)}},a9e3:function(e,t,c){"use strict";var o=c("83ab"),n=c("da84"),r=c("e330"),a=c("94ca"),i=c("6eeb"),l=c("1a2d"),d=c("7156"),s=c("3a9b"),u=c("d9b5"),b=c("c04e"),p=c("d039"),m=c("241c").f,f=c("06cf").f,g=c("9bf2").f,O=c("408a"),h=c("58a8").trim,j="Number",v=n[j],N=v.prototype,E=n.TypeError,V=r("".slice),y=r("".charCodeAt),k=function(e){var t=b(e,"number");return"bigint"==typeof t?t:S(t)},S=function(e){var t,c,o,n,r,a,i,l,d=b(e,"number");if(u(d))throw E("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=h(d),t=y(d,0),43===t||45===t){if(c=y(d,2),88===c||120===c)return NaN}else if(48===t){switch(y(d,1)){case 66:case 98:o=2,n=49;break;case 79:case 111:o=8,n=55;break;default:return+d}for(r=V(d,2),a=r.length,i=0;i<a;i++)if(l=y(r,i),l<48||l>n)return NaN;return parseInt(r,o)}return+d};if(a(j,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var C,P=function(e){var t=arguments.length<1?0:v(k(e)),c=this;return s(N,c)&&p((function(){O(c)}))?d(Object(t),c,P):t},I=o?m(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),M=0;I.length>M;M++)l(v,C=I[M])&&!l(P,C)&&g(P,C,f(v,C));P.prototype=N,N.constructor=P,i(n,j,P)}},e9c4:function(e,t,c){var o=c("23e7"),n=c("da84"),r=c("d066"),a=c("2ba4"),i=c("e330"),l=c("d039"),d=n.Array,s=r("JSON","stringify"),u=i(/./.exec),b=i("".charAt),p=i("".charCodeAt),m=i("".replace),f=i(1..toString),g=/[\uD800-\uDFFF]/g,O=/^[\uD800-\uDBFF]$/,h=/^[\uDC00-\uDFFF]$/,j=function(e,t,c){var o=b(c,t-1),n=b(c,t+1);return u(O,e)&&!u(h,n)||u(h,e)&&!u(O,o)?"\\u"+f(p(e,0),16):e},v=l((function(){return'"\\udf06\\ud834"'!==s("\udf06\ud834")||'"\\udead"'!==s("\udead")}));s&&o({target:"JSON",stat:!0,forced:v},{stringify:function(e,t,c){for(var o=0,n=arguments.length,r=d(n);o<n;o++)r[o]=arguments[o];var i=a(s,null,r);return"string"==typeof i?m(i,g,j):i}})}}]);
//# sourceMappingURL=Products.ce570d2d.js.map