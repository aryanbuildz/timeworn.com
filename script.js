/* HOW TO ADD YOUR OWN IMAGES
   Put a link or file path between the quotes of img:"" for each watch.
   Examples:  img:"images/submariner.jpg"   or   img:"https://example.com/watch.jpg"
   Leave it empty ("") to show the default drawn watch. */
const P=[
{b:"Rolex",n:"Submariner",c:"Sport",p:9100,img:"https://cdn2.ethoswatches.com/rolex/pub/media/catalog/product/cache/a68df29a9e2afb500a8d2ce09034894d/m/1/m124060-0001-drp-upright-bba-with-shadow.png",/* PASTE IMAGE LINK HERE */ d:"Iconic 41 mm diver with a rotating bezel and 300 m water resistance.",k:["#c9ccd1","#111","#8a8d93","#eee"]},
{b:"Omega",n:"Seamaster 300",c:"Sport",p:6200,img:"https://www.omegawatches.com/media/catalog/product/o/m/omega-seamaster-aqua-terra-150m-co-axial-master-chronometer-41-mm-22010412103006-5059c4.png?w=700",/* PASTE IMAGE LINK HERE */ d:"Dive watch with a wave-pattern dial and sapphire crystal.",k:["#b8bcc2","#1d3557","#444","#fff"]},
{b:"Rolex",n:"Datejust 36",c:"Luxury",p:8200,img:"https://media.rolex.com/image/upload/q_auto/f_auto/t_v7-cover-majesty-landscape/c_limit,w_1920/v1/a677b2c664f6/catalogue/2026/upright-c/m126234-0015",/* PASTE IMAGE LINK HERE */ d:"Timeless fluted-bezel dress watch with a date window.",k:["#d8b66a","#f2ead3","#c9a24f","#222"]},
{b:"Omega",n:"De Ville Prestige",c:"Dress",p:3900,img:"https://zimsonwatches.com/cdn/shop/files/omega-de-ville-prestige-co-axial-master-chronometer-40-mm-43413402001001-6e6004.png?v=1712298274",/* PASTE IMAGE LINK HERE */ d:"Slim, elegant case with a clean silver dial and leather strap.",k:["#c9ccd1","#f4f4f2","#5a3b27","#222"]},
{b:"Seiko",n:"Presage Cocktail",c:"Dress",p:480,img:"https://www.seikowatches.com/my-en/products/presage/special/cocktailtime/assets/img/article/HCB002J1.webp",/* PASTE IMAGE LINK HERE */ d:"Automatic movement with a textured deep-blue sunburst dial.",k:["#bfc3c9","#23395d","#3b2a20","#eee"]},
{b:"Tissot",n:"Gentleman",c:"Classic",p:750,img:"https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwcfa5d599/product-pictures/9ebd503f-b126-4746-b483-af5fcb826f22_T165-807-11-051-00_shadow.png?sm=fit&sw=450&sh=450,gravity=center",/* PASTE IMAGE LINK HERE */ d:"Everyday classic with a stainless steel bracelet and sapphire glass.",k:["#c4c8ce","#e9edf2","#9ea3aa","#1a1a1a"]},
{b:"Seiko",n:"Seiko 5 Sports",c:"Classic",p:310,img:"https://seikowatches.co.in/cdn/shop/files/HDB005K1_5_2048x.png?v=1789032068",/* PASTE IMAGE LINK HERE */ d:"Dependable automatic field watch built for daily wear.",k:["#aeb2b8","#2f4f3e","#3a3a3a","#f3f3f3"]},
{b:"Tissot",n:"PRX",c:"Classic",p:425,img:"https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dw783ceb3e/product-pictures/6c313b76-3e79-466d-83a5-042e47b276d5_T137-407-11-091-00_shadow.png?sm=fit&sw=800&sh=800,gravity=center",/* PASTE IMAGE LINK HERE */ d:"Retro 70s-inspired design with an integrated bracelet.",k:["#c0c4ca","#1f6f78","#a5a9af","#fff"]}
];
const $=s=>document.querySelector(s);
const money=v=>"$"+v.toLocaleString();

/* watch image sprite (shared by every page) */
document.body.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="w" viewBox="0 0 100 140">
<rect x="36" y="0" width="28" height="45" rx="4" fill="var(--strap)"/><rect x="36" y="95" width="28" height="45" rx="4" fill="var(--strap)"/>
<circle cx="50" cy="70" r="34" fill="var(--case)"/><circle cx="50" cy="70" r="29" fill="var(--dial)"/>
<g stroke="var(--hand)" stroke-width="1.6" stroke-linecap="round"><path d="M50 44v5M50 91v5M24 70h5M71 70h5"/><path d="M50 70V54" stroke-width="2.4"/><path d="M50 70l11 7" stroke-width="1.8"/></g>
<g stroke="var(--hand)" stroke-width=".8"><path d="M63 47l-2 3.5M37 47l2 3.5M63 93l-2-3.5M37 93l2-3.5M76 58l-4 2M76 82l-4-2M24 58l4 2M24 82l4-2"/></g>
<circle cx="50" cy="70" r="2" fill="var(--hand)"/></symbol></svg>`);
const watch=x=>x.img?`<img src="${x.img}" alt="${x.b} ${x.n}">`:`<svg role="img" aria-label="${x.b} ${x.n}" style="--case:${x.k[0]};--dial:${x.k[1]};--strap:${x.k[2]};--hand:${x.k[3]}"><use href="#w"/></svg>`;

/* cart storage: { productIndex: quantity } */
const load=()=>{try{return JSON.parse(localStorage.getItem("cart"))||{}}catch(e){return{}}};
const save=c=>{try{localStorage.setItem("cart",JSON.stringify(c))}catch(e){}};
function count(){$("#count").textContent=Object.values(load()).reduce((a,b)=>a+b,0)}
count();

/* ---------- shop page ---------- */
if($("#grid")){
 const cats=["All",...new Set(P.map(x=>x.c))];let cur="All";
 const render=()=>{
  $("#cats").innerHTML=cats.map(c=>`<button class="${c===cur?"on":""}" data-c="${c}">${c}</button>`).join("");
  $("#grid").innerHTML=P.map((x,i)=>({x,i})).filter(o=>cur==="All"||o.x.c===cur).map(({x,i})=>`
  <article class="card">${watch(x)}<div class="info"><span class="brand">${x.b}</span><h3>${x.n}</h3><p class="desc">${x.d}</p>
  <div class="price">${money(x.p)}</div><button class="btn" data-add="${i}">Add to Cart</button></div></article>`).join("");
 };
 const view=v=>{$("#shop-view").classList.toggle("hide",v!=="shop");$("#account-view").classList.toggle("hide",v!=="account");scrollTo(0,0)};
 document.addEventListener("click",e=>{
  const t=e.target;
  if(t.dataset.c){cur=t.dataset.c;render()}
  if(t.dataset.add){const c=load();c[t.dataset.add]=(c[t.dataset.add]||0)+1;save(c);count();t.textContent="Added ✓";setTimeout(()=>t.textContent="Add to Cart",1000)}
  if(t.dataset.tab){const r=t.dataset.tab==="reg";
   document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b===t));
   $("#nameBox").classList.toggle("hide",!r);$("#cBox").classList.toggle("hide",!r);
   $("#submit").textContent=r?"Create account":"Login";$("#msg").textContent=""}
  if(t.id==="submit"){const r=!$("#cBox").classList.contains("hide");
   if(!$("#e").value||!$("#p").value||(r&&(!$("#n").value||$("#p").value!==$("#c").value))){$("#msg").textContent=r?"Fill all fields; passwords must match.":"Enter email and password.";return}
   $("#msg").textContent=r?"Account created (demo only).":"Logged in (demo only)."}
  const g=t.closest("[data-go]");if(g)view(g.dataset.go);
 });
 render();
 if(location.hash==="#account")view("account");
}

/* ---------- cart page ---------- */
if($("#cart")){
 const render=()=>{
  const c=load(),ids=Object.keys(c).filter(i=>P[i]&&c[i]>0);
  if(!ids.length){$("#cart").innerHTML=`<div class="empty">Your cart is empty.<br><a href="index.html">Continue shopping</a></div>`;count();return}
  const sub=ids.reduce((s,i)=>s+P[i].p*c[i],0);
  $("#cart").innerHTML=ids.map(i=>{const x=P[i];return `
  <div class="item">${watch(x)}
   <div><span class="brand">${x.b}</span><h3>${x.n}</h3><div class="price">${money(x.p)}</div>
    <div class="qty"><button data-act="dec" data-id="${i}" aria-label="Decrease">−</button><span>${c[i]}</span><button data-act="inc" data-id="${i}" aria-label="Increase">+</button></div></div>
   <button class="rm" data-act="rm" data-id="${i}">Remove</button></div>`}).join("")+`
  <div class="sum"><div><span>Subtotal</span><span>${money(sub)}</span></div><div><span>Shipping</span><span>Free</span></div>
  <div class="total"><span>Total</span><span>${money(sub)}</span></div>
  <button class="btn" data-act="checkout">Checkout</button></div>`;
  count();
 };
 document.addEventListener("click",e=>{
  const a=e.target.dataset.act,id=e.target.dataset.id;if(!a)return;
  const c=load();
  if(a==="inc")c[id]++;
  if(a==="dec")c[id]=Math.max(0,c[id]-1);
  if(a==="rm")delete c[id];
  if(a==="checkout"){save({});$("#cart").innerHTML=`<div class="empty">Thank you! Your order has been placed (demo only).<br><a href="index.html">Back to shop</a></div>`;count();return}
  if(c[id]===0)delete c[id];
  save(c);render();
 });
 render();
}
