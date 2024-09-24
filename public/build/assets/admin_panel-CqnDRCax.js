var $e=Object.defineProperty;var oe=r=>{throw TypeError(r)};var Ce=(r,e,t)=>e in r?$e(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>Ce(r,typeof e!="symbol"?e+"":e,t),Y=(r,e,t)=>e.has(r)||oe("Cannot "+t);var o=(r,e,t)=>(Y(r,e,"read from private field"),t?t.call(r):e.get(r)),h=(r,e,t)=>e.has(r)?oe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,t),y=(r,e,t,s)=>(Y(r,e,"write to private field"),s?s.call(r,t):e.set(r,t),t),c=(r,e,t)=>(Y(r,e,"access private method"),t);var C;const D=class D{constructor(){if(o(D,C))return o(D,C);y(D,C,this)}static getInstance(){return o(this,C)}static get(e){return this.config[e]}static set(e,t){this.config[e]=t}static get_domain(){return this.config.domain}static set_domain(e){this.config.domain=e}static get_main_container_id(){return this.config.main_container_id}static set_main_container_id(e){this.config.main_container_id=e}};C=new WeakMap,p(D,"config",{domain:"http://localhost:8000",main_container_id:"adminPanelMainContainer"}),h(D,C,null);let Z=D;var S,ce;let xe=(ce=class{constructor(){h(this,S,{});y(this,S,{})}subscribe(e,...t){o(this,S)[e]||(o(this,S)[e]=[]),t.forEach(s=>{o(this,S)[e].push(s)})}unsubscribe(e){delete o(this,S)[e]}emit(e,t){o(this,S)[e]&&(o(this,S)[e].forEach(s=>{s(t)}),this.emit(`${e}_end`))}},S=new WeakMap,ce);var g,ee,P,he;class Re{constructor(e={}){h(this,g);this.namespace="",this.encryptionAPI=e.encryptionAPI||"/encrypt",this.decryptionAPI=e.decryptionAPI||"/decrypt",this.primary=c(this,g,ee).call(this,"primary")||{defaults:{},protected:{},state:{}},this.secondary=c(this,g,ee).call(this,"secondary")||{defaults:{},protected:{},state:{}},c(this,g,P).call(this,"primary",this.primary),c(this,g,P).call(this,"secondary",this.secondary)}_subscribeShaneObject(e,t="primary",s={}){const{onBefore:n=null,onAfter:i=null}=s;typeof n=="function"&&n(),this[t][e]?console.log(`Already subscribed to Shane object '${e}' in ${t}`):(this[t][e]={},c(this,g,P).call(this,t,this[t]),console.log(`Subscribed to new Shane object '${e}' in ${t}`)),typeof i=="function"&&i()}_unsubscribeShaneObject(e,t="primary",s={force:!1,onBefore:null,onAfter:null}){const{force:n=!1,onBefore:i=null,onAfter:l=null}=s,d=["defaults","protected","state"];if(typeof i=="function"&&i(),d.includes(e)){console.log(`Cannot unsubscribe a default Shane object '${e}' in ${t}`);return}if(this[t][e]){const a=Object.keys(this[t][e]).length===0;n||a?(delete this[t][e],c(this,g,P).call(this,t,this[t]),console.log(`Unsubscribed from Shane object '${e}' in ${t}`)):console.log(`Shane object '${e}' in ${t} contains data and was not removed. Use force to unsubscribe.`)}else console.log(`Shane object '${e}' does not exist in ${t}`);typeof l=="function"&&l()}async _encryptData(e){try{return await RequestManager.post(this.encryptionAPI,e,{showError:!0,showLoading:!0})}catch(t){throw console.error("Error encrypting data:",t),t}}async _decryptData(e){try{return await RequestManager.post(this.decryptionAPI,e,{showError:!0,showLoading:!0})}catch(t){throw console.error("Error decrypting data:",t),t}}subscribe(e,t="primary"){this._subscribeShaneObject(e,t)}unsubscribe(e,t="primary",s={force:!1}){this._unsubscribeShaneObject(e,t,s)}async setItem(e,t,s={}){const{megaObject:n="primary",shaneObject:i="defaults",encrypt:l=!1,expiration:d=null,onBefore:a=null,onAfter:m=null}=s;a&&typeof a=="function"&&a();let b=t;if(l&&(b=await this._encryptData(t)),!this[n])throw new Error(`Mega object '${n}' does not exist`);this[n][i]||this._subscribeShaneObject(i,n),this[n][i][e]={data:b,expiration:d?c(this,g,he).call(this,d):null},c(this,g,P).call(this,n,this[n]),m&&typeof m=="function"&&m()}async getItem(e,t={}){const{megaObject:s="primary",shaneObject:n=null,onBefore:i=null,onAfter:l=null}=t;typeof i=="function"&&i();const d=m=>{for(const b in m)if(m[b][e])return m[b][e];return null};let a;return n?a=this[s][n][e]||null:a=d(this[s])||d(this.secondary),a?a.expiration&&new Date(a.expiration)<new Date?(console.log(`Item '${e}' has expired`),null):(n==="protected"&&a.data&&(a.data=await this._decryptData(a.data)),typeof l=="function"&&l(a.data),a.data):(console.log(`Item '${e}' not found`),null)}removeItem(e,t={}){const{megaObject:s="primary",shaneObject:n=null,onBefore:i=null,onAfter:l=null}=t;if(typeof i=="function"&&i(),n)this[s][n][e]?(delete this[s][n][e],c(this,g,P).call(this,s,this[s]),typeof l=="function"&&l()):console.log(`Item '${e}' not found in ${n} of ${s}`);else{for(const d in this[s])if(this[s][d][e]){delete this[s][d][e],c(this,g,P).call(this,s,this[s]),typeof l=="function"&&l();return}for(const d in this.secondary)if(this.secondary[d][e]){delete this.secondary[d][e],c(this,g,P).call(this,"secondary",this.secondary),typeof l=="function"&&l();return}}}clearAll(e={}){const{megaObject:t="primary",shaneObject:s=null,onBefore:n=null,onAfter:i=null}=e;typeof n=="function"&&n(),s?(this[t][s]={},c(this,g,P).call(this,t,this[t])):(this[t]={defaults:{},protected:{},state:{}},c(this,g,P).call(this,t,this[t])),typeof i=="function"&&i()}isExist(e,t="primary"){return!!this[t][e]}}g=new WeakSet,ee=function(e){const t=localStorage.getItem(`${this.namespace}${e}`);return t?JSON.parse(t):null},P=function(e,t){localStorage.setItem(`${this.namespace}${e}`,JSON.stringify(t))},he=function(e){const t=new Date;return new Date(t.setMonth(t.getMonth()+e)).toISOString()};var M,x,W,de,V;let qe=(M=class{static setDomain(e){this.domain=e}static setDomain(e){this.domain=e}static async send(e,t,s="GET",n={showError:!1,showLoading:!1,showToast:!1,onSuccess:()=>{},onError:()=>{}}){}static async get(e,t,s={}){return await this.send(e,null,"GET",s)}static async post(e,t,s={},n={}){return await this.send(e,t,"POST",s,n)}static async put(e,t,s={}){return await this.send(e,t,"PUT",s)}static async delete(e,t,s={}){return await this.send(e,t,"DELETE",s)}static responseHandler(e){var t;return c(t=M,W,de).call(t,e),e.data}static setResponseHandlerProtocol(e){y(this,x,e)}static unsetResponseHandlerProtocol(){y(this,x,null)}},x=new WeakMap,W=new WeakSet,de=function(e){return o(this,x)?o(this,x).call(this,e):o(this,V).call(this,e)},V=new WeakMap,h(M,W),h(M,x,null),h(M,V,e=>e),M);var H,z;class He{constructor(e){h(this,H);this.baseURL=e,this.callbacks={success:[()=>{console.log("callback success worked")}],failed:[()=>{console.log("callback failed worked")}]}}async request(e,t,s={},n={}){var d;this.callbacks={...this.callbacks,...n};let i=`${this.baseURL}${t}`,l={method:e,headers:{"Content-Type":"application/json"},...s};if(e==="GET"&&s.params){const a=new URLSearchParams(s.params).toString();i+=`?${a}`}e==="POST"&&s.body&&(s.body instanceof FormData?(console.log(l),delete l.headers["Content-Type"],l.body=s.body):l.body=createFormData(s.body)),console.log(l);try{const a=await fetch(i,l),m=await a.text();if((d=a.headers.get("content-type"))==null?void 0:d.includes("application/json")){const A=JSON.parse(m);return this.handleJSONResponse(A)}else return console.error("Response is not JSON:",m),!1}catch(a){return console.error("Fetch error:",a),!1}}createFormData(e){const t=new FormData;return Object.keys(e).forEach(s=>{t.append(s,e[s])}),t}handleJSONResponse(e){return e.status==="success"?(c(this,H,z).call(this,"success",e.results,1),e.results||!0):e.status==="failed"?(Array.isArray(e.errors)?(Core.toast.prompt("Errors occuerd : "+e.errors.length),console.log(e.errors)):e.error?(Core.toast.prompt("Error occured : "+e.error),console.log(e.error)):(Core.toast.prompt("API Error"),console.log(e)),c(this,H,z).call(this,"failed"),!1):(console.error("Unexpected JSON response:",e),c(this,H,z).call(this,"failed"),!1)}async get(e,t){return await this.request("GET",e,{params:t})}async post(e,t){return await this.request("POST",e,{body:t})}}H=new WeakSet,z=function(e,t=null){this.callbacks[e].forEach(s=>{s(t)})};class Ue{constructor(){this.tables={}}createTable(e,t,s,n={}){const i=e.querySelector(t);if(!i)throw new Error(`Table with selector ${t} not found.`);const l=t;return this.tables[l]={element:i,columns:s,options:n,data:[]},this.renderTable(l),l}addData(e,t){this.tables[e]&&(this.tables[e].data.push(...t),this.renderTable(e))}updateData(e,t){this.tables[e]&&(this.tables[e].data=t,this.renderTable(e))}clearTable(e){this.tables[e]&&(this.tables[e].data=[],this.renderTable(e))}destroyTable(e){this.tables[e]&&(this.tables[e].element.innerHTML="",delete this.tables[e])}destroyAllTables(){for(let e in this.tables)this.destroyTable(e)}renderTable(e){if(!this.tables[e])return;const{element:t,columns:s,data:n,options:i}=this.tables[e];t.innerHTML="";const l=document.createElement("thead"),d=document.createElement("tr");s.forEach(m=>{const b=document.createElement("th");b.textContent=m.title,d.appendChild(b)}),l.appendChild(d),t.appendChild(l);const a=document.createElement("tbody");n.forEach(m=>{const b=document.createElement("tr");s.forEach(A=>{const B=document.createElement("td");typeof A.render=="function"?B.innerHTML=A.render(m[A.data],m):B.textContent=m[A.data]||"",b.appendChild(B)}),a.appendChild(b)}),t.appendChild(a),i.classes&&i.classes.table&&(t.className=i.classes.table)}}var O,ue,me;const E=class E{constructor(){h(this,O);c(this,O,ue).call(this)}prompt(e="Sample Toast Message!",t=0){switch(t){case 1:E.component.style.backgroundColor="green";break;case 0:E.component.style.backgroundColor="red";break}E.component.querySelector(".toast-body").innerText=e,E.toast.show()}};O=new WeakSet,ue=function(){E.component=c(this,O,me).call(this),document.body.prepend(E.component),E.toast=new bootstrap.Toast(E.component)},me=function(){const e=`
                            <div class="position-absolute toast bottom-0 mb-4 end-0 text-white align-items-center  border-0 m-2" role="alert" aria-live="assertive" aria-atomic="true">
                              <div class="d-flex">
                                <div class="toast-body"></div>
                                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                              </div>
                            </div>
                          `,t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstChild},p(E,"component"),p(E,"toast");let te=E;class Oe{constructor(){this.events={}}subscribe(e,...t){this.events[e]||(this.events[e]=[]),t.forEach(s=>{this.events[e].push(s)})}unsubscribe(e){delete this.events[e]}emit(e,t){this.events[e]&&(this.events[e].forEach(s=>{s(t)}),this.emit(`${e}_end`))}}var I,N,k,ne,_,R,q,pe,Be,ge;class Fe{constructor(e){h(this,q);h(this,I,null);h(this,N,"");h(this,k,"");h(this,ne,{info:[],warning:[],errors:[]});h(this,_,null);h(this,R,null);y(this,k,e),y(this,N,o(this,k)),c(this,q,ge).call(this),c(this,q,pe).call(this),y(this,I,new Oe)}setSource(e){y(this,k,e),o(this,I).emit("new_resource_url")}resetSource(){y(this,k,o(this,N)),o(this,I).emit("reset_resource_url")}getPopupModel(){return o(this,R)}popup(e){o(this,I).emit("popup_before"),o(this,R).querySelector(".modal-title").innerHTML=e,o(this,_).show(),o(this,I).emit("popup_after")}eventRegister(e,t=[]){o(this,I).subscribe(e,...t)}eventClear(e){o(this,I).unsubscribe(e)}}I=new WeakMap,N=new WeakMap,k=new WeakMap,ne=new WeakMap,_=new WeakMap,R=new WeakMap,q=new WeakSet,pe=function(){},Be=async function(e,t=null){const s=await fetch(`${o(this,k)}${t?"?"+t:""}`);s.ok||console.log("Source Error!");try{const n=s.json();return o(this,I).emit("new_resource_url"),n}catch{console.log("Invalid response!")}return null},ge=function(){document.body.insertAdjacentHTML("beforeend",`
      <div class="modal" tabindex="-1" id="NotificationManagerPupupModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `),y(this,R,document.getElementById("NotificationManagerPupupModal")),y(this,_,new bootstrap.Modal(o(this,R)))};const $=class ${createImagePicker(e,t,s,n){const i={picker:new je(e,t,s,n),container:e};return $.pickers.push(i),i}destoryAll(){$.pickers=[]}getPickers(){return $.pickers}getPicker(e){return $.pickers.find(t=>t.container==e)}};p($,"pickers",[]);let se=$;class je{constructor(e,t={}){this.options={id:"1",duplicatePolicy:{type:"none",max:1},style:"app",theme:{},...t},this.images=[],this.initializeElements(e),this.alertManager=new _e(this.parentDiv),this.applyStyle(),this.addEventListeners()}initializeElements(e){this.parentDiv=e,this.imagePickerElement=e.querySelector(".image-picker"),this.thumbnailsElement=e.querySelector(".thumbnails"),this.imageInput=e.querySelector(".imageInput"),this.downloadBtn=e.querySelector(".downloadBtn"),this.loadingScreen=e.querySelector(".loading-screen")}applyStyle(){this.imagePickerElement.classList.add(this.options.style)}addEventListeners(){this.imagePickerElement.addEventListener("click",this.handleImagePickerClick.bind(this)),this.imageInput.addEventListener("change",this.handleImageInputChange.bind(this)),this.imageInput.addEventListener("cancel",this.handleImageInputCancel.bind(this)),this.downloadBtn.addEventListener("click",()=>this.downloadImages()),this.addDragAndDropListeners()}addDragAndDropListeners(){["dragenter","dragover","dragleave","drop"].forEach(t=>{this.imagePickerElement.addEventListener(t,this.preventDefault)}),this.imagePickerElement.addEventListener("dragenter",this.highlight.bind(this)),this.imagePickerElement.addEventListener("dragover",this.highlight.bind(this)),this.imagePickerElement.addEventListener("dragleave",this.unhighlight.bind(this)),this.imagePickerElement.addEventListener("drop",this.handleDrop.bind(this))}handleImagePickerClick(e){e.detail===1&&(this.imageInput.click(),this.imageInput.disabled=!0)}handleImageInputChange(e){this.handleImageSelection(e.target.files),e.target.value="",this.imageInput.disabled=!1}handleImageInputCancel(){this.imageInput.disabled&&(this.imageInput.disabled=!1)}preventDefault(e){e.preventDefault(),e.stopPropagation()}highlight(){this.imagePickerElement.classList.add("active")}unhighlight(){this.imagePickerElement.classList.remove("active")}handleDrop(e){this.unhighlight(),this.handleImageSelection(e.dataTransfer.files)}async handleImageSelection(e){this.showLoadingScreen();try{await Promise.all(Array.from(e).map(t=>this.handleImage(t)))}catch(t){console.error("Error handling image selection:",t)}finally{this.hideLoadingScreen(),this.imageInput.disabled=!1}}async handleImage(e){if(!this.validateImage(e))return this.alertManager.show("Invalid file type. Only images are allowed","info"),!1;const t=await this.readFileAsDataURL(e);return this.canAddImage(t)?(this.images.push(t),this.displayImages(),this.showSuccess(),!0):(this.alertManager.show("Duplicate image not allowed!","error"),!1)}readFileAsDataURL(e){return new Promise(t=>{const s=new FileReader;s.onload=n=>t({src:n.target.result,name:e.name}),s.readAsDataURL(e)})}validateImage(e){return e.type.startsWith("image/")}canAddImage(e){if(this.images.some(t=>t.name===e.name))return!1;switch(this.options.duplicatePolicy.type){case"none":return!this.images.some(t=>t.src===e.src);case"limited":return this.images.filter(t=>t.src===e.src).length<this.options.duplicatePolicy.max;case"no-consecutive":return this.images.length===0||this.images[this.images.length-1].src!==e.src;default:return!0}}displayImages(){this.thumbnailsElement.innerHTML="",this.images.forEach((e,t)=>{const s=new Je(e,t,this,this.options.id);this.thumbnailsElement.appendChild(s.getElement())})}removeImage(e){this.images.splice(e,1),this.displayImages()}showSuccess(){this.imagePickerElement.classList.add("success"),setTimeout(()=>this.imagePickerElement.classList.remove("success"),1e3),this.alertManager.show("Image added!","success")}downloadImages(e="file"){if(e==="file"){const t=JSON.stringify(this.images),s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download="imageData.json",i.click(),URL.revokeObjectURL(n)}else return this.images}showLoadingScreen(){this.loadingScreen.style.display="flex"}hideLoadingScreen(){this.loadingScreen.style.display="none"}getImageFiles(){return this.images.map(e=>{const[,t]=e.src.split(","),s=atob(t),n=e.src.split(":")[1].split(";")[0],i=new ArrayBuffer(s.length),l=new Uint8Array(i);for(let a=0;a<s.length;a++)l[a]=s.charCodeAt(a);const d=new Blob([i],{type:n});return new File([d],e.name,{type:n})})}getImageDataURLs(){return this.images.map(e=>e.src)}async addImage(e){if(e instanceof File)return console.log("Handling File input:",e),this.handleImage(e);if(typeof e=="object"&&e.src&&e.name){if(e.src.startsWith("data:image/"))return console.log("Handling Data URL input:",e),this.canAddImage(e)?(this.images.push(e),this.displayImages(),this.showSuccess(),!0):(this.alertManager.show("Duplicate image not allowed!","error"),!1);console.log("Handling URL input:",e);try{const s=await(await fetch(e.src)).blob();console.log("Fetched image:",s);const n=s.type;if(n.startsWith("image/")){const i=new File([s],e.name,{type:n})}else return this.handleImage(file)}catch(t){return console.error("Error fetching image:",t),this.alertManager.show("Error loading image from URL","error"),!1}}else return console.error("Invalid input type"),!1}clear(){this.images=[],this.displayImages()}}var K,fe;class Je{constructor(e,t,s,n){h(this,K);this.image=e,this.index=t,this.imagePicker=s,this.element=document.createElement("div"),this.element.className="thumbnail",this.id=n,this.element.appendChild(c(this,K,fe).call(this))}getElement(){return this.element}}K=new WeakSet,fe=function(){const e=`<div class="d-flex">
                    <img src="${this.image.src}" alt="${this.image.name}">
                    <div class="cross" >X</div>
                  </div>`,t=document.createElement("template");t.innerHTML=e.trim();const s=t.content.firstChild;return s.querySelector(".cross").addEventListener("click",()=>{this.imagePicker.removeImage(this.index)}),s};class Ne{constructor(e,t,s,n){this.message=e,this.type=t,this.manager=s,this.parent=n,this.counter=1,this.element=this.createElement(),this.startTimeout()}createElement(){const e=document.createElement("div");return e.className=`alert alert-${this.type}`,e.innerHTML=`
      <span class="message">${this.message}</span>
      <span class="counter">${this.counter}</span>
      <span class="close">&times;</span>
    `,e.querySelector(".close").addEventListener("click",()=>{this.dismiss()}),this.parent.querySelector(".alertContainer").appendChild(e),e}incrementCounter(){this.counter+=1,this.element.querySelector(".counter").textContent=this.counter}startTimeout(){this.timeoutId=setTimeout(()=>{this.dismiss()},3e3)}resetTimeout(){clearTimeout(this.timeoutId),this.startTimeout()}dismiss(){this.element.remove(),this.manager.removeAlert(this)}}class _e{constructor(e){this.parent=e,this.alerts=[]}show(e,t="info"){const s=this.alerts.find(n=>n.type===t);if(s)s.incrementCounter(),s.resetTimeout(),s.element.style.animation="none",s.element.offsetHeight,s.element.style.animation="fade-in 0.5s";else{const n=new Ne(e,t,this,this.parent);this.alerts.push(n)}}removeAlert(e){this.alerts=this.alerts.filter(t=>t!==e)}}const le={},Ge=()=>{const r=document.documentElement;Object.keys(le).forEach(e=>{r.style.setProperty(`--${e}`,le[e])})};Ge();class j{constructor(){return j.instance||(this.observers=new Map,j.instance=this),j.instance}observeAttribute(e,t,s){const n=`${e}_${t}`;this.observers.has(n)&&this.observers.get(n).disconnect();const i=new MutationObserver(d=>{for(let a of d){if(a.type==="attributes"&&a.attributeName===t){const m=e.getAttribute(t);s(m)}a.type==="childList"&&a.removedNodes.forEach(m=>{m===e&&this.stopObserving(e,t)})}}),l={attributes:!0,childList:!0,subtree:!0};i.observe(e.parentNode,l),this.observers.set(n,i)}stopObserving(e,t){const s=`${e}_${t}`;this.observers.has(s)&&(this.observers.get(s).disconnect(),this.observers.delete(s))}stopAllObserving(){this.observers.forEach(e=>e.disconnect()),this.observers.clear()}}var u,F,be,ye;let v=(u=class extends Z{constructor(){super();h(this,F);console.log("plugins initializing..."),c(this,F,be).call(this),c(this,F,ye).call(this),console.log("plugins initialized...")}},F=new WeakSet,be=function(){try{u.EM=new xe,u.RM=new qe,u.LSM=new Re}catch(t){console.error(t),alert("Missing Plugins! ⚠️"),console.error("Plugin Not Found!")}},ye=function(){try{u.EDT=new Ue,u.toast=new te,u.APIR=new He("http://localhost:9001"),u.NM=new Fe("http://localhost:9001/api/notification"),u.ImageInputManager=new se,u.AO=new j}catch(t){console.error(t),alert("Missing Plugins! ⚠️"),console.error("Plugin Not Found!")}},p(u,"EM",null),p(u,"RM",null),p(u,"LSM",null),p(u,"APIR",null),p(u,"NM",null),p(u,"AO",null),p(u,"toast",null),p(u,"EDT",null),p(u,"ImageInputManager",null),u);var X,G,Q,ie,L,U,ae,f,we,Ee,Pe,Ie,Se,Le,Ae,Me;class ve{constructor(e){h(this,f);h(this,X,v.get_main_container_id());h(this,G,v.get_domain());h(this,Q,{});h(this,ie,null);h(this,L,null);h(this,U,[]);h(this,ae,null);if(!J.getInstance())throw Error("Admin Panel is not instantiated");if(!e.name)throw Error("Missing Parameter : config.name : string");y(this,Q,e),y(this,L,e.name),c(this,f,we).call(this)}init(){}boot(){}async render(){const e=document.getElementById(o(this,X));e.innerHTML="",e.innerHTML=await c(this,f,Se).call(this),this.data=null,c(this,f,Pe).call(this),this.eventDispatch(`${o(this,L)}_launch`)}getName(){return o(this,L)}addListner(e,t){v.EM.subscribe(e,t)}eventDispatch(e){v.EM.emit(e)}async requestActionProcess(e,t,s={}){if(!t||!e)throw new Error("Invalid Action Process");const n=e==="view"||e==="get"?"GET":"POST";if(e!=="view"&&e!=="get"){const a=v.APIR.createFormData(this.scrapeData(t));t.querySelectorAll("[data-image-picker]").forEach(b=>{let A=1;v.ImageInputManager.getPicker(b).picker.getImageFiles().forEach(B=>{let re=b.dataset.name+"_"+A;console.log(re),a.append(re,B),A++}),console.log(v.ImageInputManager.getPicker(b).picker.getImageFiles())}),s={body:a,...s},console.log("options is modified"+e)}const i=[()=>this.clearInputs(t)],l=[];return t.dataset.onsuccess&&t.dataset.onsuccess.split(" ").forEach(a=>{i.push(this[a]?this[a]:()=>{})}),t.dataset.onfailed&&t.dataset.onfailed.split(" ").forEach(a=>{l.push(this[a]?this[a]:()=>{})}),console.log(s),await v.APIR.request(n,t.dataset.endpoint??"/",s,{success:i,failed:l})}scrapeData(e){const t=e.querySelectorAll("input[name], textarea[name], select[name], [data-custom-data]"),s={};return t.forEach(n=>{s[n.name]=n.value??""}),s}clearInputs(e=null){e.querySelectorAll("input[name], textarea[name], select[name]").forEach(n=>{n.value=""});const s=v.ImageInputManager.getPicker(e);s&&s.picker.clear()}async viewProcessEventAction(e){const t=await this.requestActionProcess("view",e);switch(e.dataset.viewType){case"table":const s=e.dataset.field.split(" ");t.forEach(n=>{e.innerHTML+=n[s[1]]+" : "+n[s[0]]+"<br>"});break;case"list":console.log(t);break}console.log("proform viewing operations : "+e.dataset.adminContainer)}async addProcessEventAction(e){const t=await this.requestActionProcess("add",e);t!==!1&&v.toast.prompt(t,1),console.log("proform adding operations : "+e.dataset.adminContainer)}async updateProcessEventAction(e){const t=await this.requestActionProcess(e,{method:"POST"});v.toast.prompt(t),console.log("proform updating operations : "+e.dataset.adminContainer)}}X=new WeakMap,G=new WeakMap,Q=new WeakMap,ie=new WeakMap,L=new WeakMap,U=new WeakMap,ae=new WeakMap,f=new WeakSet,we=function(){this.addListner(`${o(this,L)}_switch`,()=>{J.switchPanel(o(this,L))}),c(this,f,Ee).call(this),this.init()},Ee=function(){},Pe=function(){c(this,f,Le).call(this),c(this,f,Ie).call(this),this.boot()},Ie=function(){},Se=async function(){return console.log(`${o(this,G)}/comp/panel/${o(this,L)}`),await fetch(`${o(this,G)}/comp/panel/${o(this,L)}`).then(e=>e.text()).then(e=>(console.log(e),e)).catch(e=>{console.error(e),console.error("Panel template loading failed! : UI fetch failed")})},Le=function(){c(this,f,Me).call(this);const e=document.querySelectorAll("[data-admin-container]");let t="",s=null;e.forEach(n=>{if(n.dataset.isView){this.viewProcessEventAction(n);return}else s=n.querySelector("[data-btn-action]"),t=s?s.dataset.btnAction:"";c(this,f,Ae).call(this,n),n.querySelectorAll("[data-image-picker]").forEach(l=>{v.ImageInputManager.createImagePicker(l,{id:"1",duplicatePolicy:{type:"limited",max:2},style:"app",theme:defaultTheme})});const i=()=>{switch(t){case"add":this.addProcessEventAction(n);break;case"update":this.updateProcessEventAction(n);break}};s&&(s.addEventListener("click",i),o(this,U).push({event:"click",btn:s,action:i}))})},Ae=function(e){e.querySelectorAll("select[data-options]").forEach(t=>{v.AO.stopObserving(t,"data-options");function s(){t.innerHTML="";try{JSON.parse(t.dataset.options).forEach(n=>{const i=document.createElement("option");i.value=n[0],i.text=n[1],t.appendChild(i)})}catch{throw new Error("Invalid Selector Configuration at :"+e.dataset.adminContainer)}}s(),v.AO.observeAttribute(t,"data-options",s)})},Me=function(){o(this,U).forEach(e=>{e.btn.removeEventListener(e.event,e.action)}),y(this,U,[]),console.log("cleaned")};class ze extends ve{constructor(e){super(e)}init(){console.log("dashboard panel created")}boot(){console.log("dashboard panel rendered")}}class We extends ve{constructor(e){super(e)}init(){console.log("test panel created")}boot(){console.log("test panel rendered")}}var T,ke,Te,De;const w=class w extends v{constructor(){super();h(this,T);p(this,"info",null);p(this,"UI",null);p(this,"activePanel",null);p(this,"data",null);w.instance=this,c(this,T,ke).call(this)}async test(){console.log("test ===> start"),console.log(this.info.started_time)}static getInstance(){return w.instance??null}static getPanelList(){return w.getInstance().UI.panels}static getPanel(t){return w.getPanelList().forEach(s=>{if(s.name===t)return s}),null}static getCurrentPanel(){return w.getInstance().activePanel??null}static async switchPanel(t){const s=w.getInstance();w.getPanelList().forEach(async n=>{n.getName()===t&&(await n.render(),s.info.activePanelName=t,s.activePanel=w.getPanel(t))})}};T=new WeakSet,ke=async function(){this.info={started_time:new Date,state:"live",activePanelName:"calendar"},this.activePanel=null,this.UI={panels:c(this,T,De).call(this)},await c(this,T,Te).call(this)},Te=async function(){document.querySelectorAll("[data-admin-panel-switch]").forEach(t=>{t.addEventListener("click",()=>{w.switchPanel(t.dataset.adminPanelSwitch)})}),w.switchPanel("test")},De=function(){return[new We({name:"test"}),new ze({name:"dashboard"})]},p(w,"instance",null);let J=w;document.addEventListener("DOMContentLoaded",()=>{console.log("admin panel loaded"),new J});
