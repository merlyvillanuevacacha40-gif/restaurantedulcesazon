"use strict";
/* Dulce Sazón · JavaScript vanilla — accesible y responsive */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MENU = [
  { id:1, name:"Hamburguesa Dulce Sazón", category:"hamburguesas", price:9.90, desc:"Carne jugosa, queso cheddar, lechuga, tomate y salsa secreta de la casa en pan brioche.", tags:["chef"], allergens:"Gluten, leche, huevo", kcal:650, img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
  { id:2, name:"Hamburguesa Doble Queso", category:"hamburguesas", price:12.50, desc:"Doble medallón, doble queso, cebolla caramelizada y papas chips caseras.", tags:["picante"], allergens:"Gluten, leche", kcal:820, img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80" },
  { id:3, name:"Hamburguesa Pollo Crujiente", category:"hamburguesas", price:9.50, desc:"Pechuga crujiente marinada, col rallada fresca y mayonesa de miel.", tags:["kid"], allergens:"Gluten, huevo", kcal:580, img:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80" },
  { id:4, name:"Hamburguesa Veggie de la Huerta", category:"hamburguesas", price:9.90, desc:"Medallón de vegetales y avena, palta, tomate y salsa tahini. Pan sin gluten bajo pedido.", tags:["vegetariano","sin-gluten"], allergens:"Sésamo", kcal:520, img:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80" },
  { id:5, name:"Papas Fritas Clásicas", category:"papas", price:4.50, desc:"Papas rústicas doradas con sal marina, bien crocantes por fuera y suaves por dentro.", tags:["vegetariano","sin-gluten"], allergens:"Ninguno", kcal:340, img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80" },
  { id:6, name:"Papas con Queso Dulce", category:"papas", price:6.50, desc:"Papas fritas cubiertas de queso cheddar fundido y ciboulette.", tags:["vegetariano"], allergens:"Leche", kcal:480, img:"https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80" },
  { id:7, name:"Nuggets con Salsa de Miel", category:"papas", price:7.00, desc:"Nuggets de pollo caseros con salsa de miel y mostaza suave.", tags:["kid"], allergens:"Gluten, huevo", kcal:420, img:"https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80" },
  { id:8, name:"Brownie Tibio con Helado", category:"postres", price:5.50, desc:"Brownie de chocolate 70% tibio con bocha de crema americana.", tags:["vegetariano"], allergens:"Gluten, leche, huevo, frutos secos", kcal:460, img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80" },
  { id:9, name:"Sundae Dulce Sazón", category:"postres", price:5.00, desc:"Helado de vainilla, salsa de chocolate, crema y cereza.", tags:["vegetariano","kid"], allergens:"Leche", kcal:320, img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80" },
  { id:10, name:"Tarta de Frutilla de la Abuela", category:"postres", price:4.50, desc:"Base crocante, crema pastelera suave y frutillas frescas.", tags:["vegetariano"], allergens:"Gluten, leche, huevo", kcal:310, img:"https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80" },
  { id:11, name:"Malteada de Frutilla", category:"bebidas", price:5.00, desc:"Leche batida con frutillas frescas y crema batida.", tags:["vegetariano","sin-gluten","kid"], allergens:"Leche", kcal:260, img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },
  { id:12, name:"Limonada Fresca con Menta", category:"bebidas", price:3.50, desc:"Limón natural, menta fresca y un toque de miel. Bien helada.", tags:["vegetariano","sin-gluten"], allergens:"Ninguno", kcal:90, img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80" },
];
const CATEGORY_LABEL={hamburguesas:"Hamburguesa",papas:"Papas & Snacks",postres:"Postre",bebidas:"Bebida"};
const money=n=>`$${n.toFixed(2)}`;
const $=id=>document.getElementById(id);

/* Toast */
let toastTimer;
function toast(msg){ const t=$("toast"); t.textContent=msg; t.hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.hidden=true,2200); }

/* Tamaño de texto (inclusivo) */
let fontLevel=Number(localStorage.getItem("ds-font")||0);
function applyFont(){ document.documentElement.style.fontSize = `${16+fontLevel*2}px`; localStorage.setItem("ds-font",fontLevel); }
$("fontUp")?.addEventListener("click",()=>{ fontLevel=Math.min(4,fontLevel+1); applyFont(); toast("Texto más grande"); });
$("fontDown")?.addEventListener("click",()=>{ fontLevel=Math.max(-2,fontLevel-1); applyFont(); toast("Texto más pequeño"); });
applyFont();

/* Menú móvil */
const navToggle=$("navToggle"), primaryNav=$("primaryNav");
function setNav(open){ primaryNav.dataset.open=String(open); navToggle.setAttribute("aria-expanded",String(open)); navToggle.setAttribute("aria-label",open?"Cerrar menú de navegación":"Abrir menú de navegación"); }
navToggle.addEventListener("click",()=>setNav(primaryNav.dataset.open!=="true"));
primaryNav.addEventListener("click",e=>{ if(e.target.closest("a")) setNav(false); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") setNav(false); });

/* Carta */
const menuGrid=$("menuGrid"), menuEmpty=$("menuEmpty"), menuCount=$("menuCount"), menuSearch=$("menuSearch");
const filterButtons=[...document.querySelectorAll(".filter-btn")];
let activeFilter="todos";
const order=new Map();
function badge(tag){ const map={vegetariano:["badge--veg","Vegetariano"],"sin-gluten":["badge--gf","Sin gluten"],picante:["badge--spicy","Picante"],kid:["badge--kid","Para niños"],chef:["badge--chef","★ Recomendado de la Chef Merly"]}; return map[tag]?`<span class="badge ${map[tag][0]}">${map[tag][1]}</span>`:""; }
function renderMenu(){
  const q=menuSearch.value.trim().toLowerCase();
  const items=MENU.filter(it=> (activeFilter==="todos"||it.category===activeFilter||it.tags.includes(activeFilter)) && (!q||it.name.toLowerCase().includes(q)||it.desc.toLowerCase().includes(q)));
  menuGrid.innerHTML=items.map(it=>`
    <article class="menu-card">
      <img src="${it.img}" alt="Plato: ${it.name}" loading="lazy" />
      <div class="menu-card__body">
        <div class="menu-card__top"><h3>${it.name}</h3><span class="price">${money(it.price)}</span></div>
        <p>${it.desc}</p>
        <p>${it.tags.map(badge).join("")}<small>${CATEGORY_LABEL[it.category]}</small></p>
        <div class="menu-card__actions">
          <button class="btn btn--ghost" type="button" data-detail="${it.id}">Ver detalle</button>
          <button class="btn btn--primary" type="button" data-add="${it.id}">Agregar</button>
        </div>
      </div>
    </article>`).join("");
  menuEmpty.hidden=items.length>0;
  menuCount.textContent=`${items.length} plato${items.length===1?"":"s"} visible${items.length===1?"":"s"}`;
}
menuSearch.addEventListener("input",renderMenu);
filterButtons.forEach(b=>b.addEventListener("click",()=>{ activeFilter=b.dataset.filter; filterButtons.forEach(x=>{ const a=x===b; x.classList.toggle("is-active",a); x.setAttribute("aria-pressed",String(a)); }); renderMenu(); }));

/* Detalle + agregar */
const dialog=$("dishDialog"), dialogContent=$("dialogContent");
menuGrid.addEventListener("click",e=>{
  const d=e.target.closest("[data-detail]"), a=e.target.closest("[data-add]");
  if(d){ const it=MENU.find(x=>x.id===Number(d.dataset.detail)); dialogContent.innerHTML=`<h2 id="dialogTitle">${it.name}</h2><img src="${it.img}" alt="Plato: ${it.name}" style="width:100%;margin-bottom:1rem" /><p>${it.desc}</p><p><strong>Precio:</strong> ${money(it.price)} · <strong>Energía:</strong> ${it.kcal} kcal</p><p><strong>Alérgenos:</strong> ${it.allergens}</p><p>${it.tags.map(badge).join("")}</p>`; dialog.showModal(); }
  if(a){ const id=Number(a.dataset.add); order.set(id,(order.get(id)||0)+1); renderOrder(); toast("¡Agregado a tu pedido! ♥"); a.textContent="¡Agregado! ✓"; setTimeout(()=>a.textContent="Agregar",1200); }
});

/* Pedido */
function renderOrder(){
  const list=$("orderList"), totalEl=$("orderTotal"), empty=$("orderEmpty");
  if(!order.size){ list.innerHTML=""; empty.hidden=false; totalEl.textContent=money(0); return; }
  empty.hidden=true; let total=0;
  list.innerHTML=[...order.entries()].map(([id,qty])=>{ const it=MENU.find(x=>x.id===id); const sub=it.price*qty; total+=sub;
    return `<li><span>${it.name}</span><span class="qty"><button type="button" data-dec="${id}" aria-label="Quitar uno de ${it.name}">−</button><strong>${qty}</strong><button type="button" data-inc="${id}" aria-label="Agregar uno de ${it.name}">+</button></span><span>${money(sub)}</span></li>`; }).join("");
  totalEl.textContent=money(total);
}
$("orderList").addEventListener("click",e=>{
  const inc=e.target.closest("[data-inc]"), dec=e.target.closest("[data-dec]");
  if(inc){ const id=Number(inc.dataset.inc); order.set(id,order.get(id)+1); renderOrder(); }
  if(dec){ const id=Number(dec.dataset.dec); const q=order.get(id)-1; q<=0?order.delete(id):order.set(id,q); renderOrder(); }
});
$("clearOrder").addEventListener("click",()=>{ order.clear(); renderOrder(); toast("Pedido vaciado"); });

/* Reserva */
const form=$("reservationForm"), dateInput=$("date");
dateInput.min=new Date().toISOString().split("T")[0];
const rules={ name:v=>v.trim().length>=2, email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), phone:v=>v.replace(/\D/g,"").length>=7, date:v=>v&&v>=dateInput.min, time:v=>v!=="", guests:v=>v!=="" };
function validateField(input){ const ok=rules[input.id](input.value); input.setAttribute("aria-invalid",String(!ok)); $(`${input.id}Error`).hidden=ok; return ok; }
form.addEventListener("input",e=>{ if(e.target.id in rules) validateField(e.target); });
form.addEventListener("submit",e=>{
  e.preventDefault();
  const fields=Object.keys(rules).map(id=>$(id)); const results=fields.map(validateField);
  if(results.includes(false)){ fields.find(f=>f.getAttribute("aria-invalid")==="true")?.focus(); return; }
  const code="DS-"+Math.random().toString(36).slice(2,7).toUpperCase();
  const s=$("formSuccess");
  s.textContent=`¡Reserva recibida, ${$("name").value.trim()}! Código: ${code}. Te confirmaremos en ${$("email").value.trim()} para el ${$("date").value} a las ${$("time").value} (${$("guests").value} personas). Tu pedido actual: ${$("orderTotal").textContent}. ¡Gracias por elegir Dulce Sazón! ♥`;
  s.hidden=false; form.reset(); toast("¡Reserva confirmada! ♥");
});

/* Testimonios */
const TESTIMONIALS=[
  {text:"“La hamburguesa Dulce Sazón es increíble y el personal es un amor. Volveremos seguro.”",author:"María G. · Clienta frecuente"},
  {text:"“Reservé para 6 personas y nos atendieron de maravilla. Las papas con queso son mi debilidad.”",author:"Javier L. · Reserva de grupo"},
  {text:"“Entré con mi familia y todo fue facilísimo: sin escalones, silla para mi nena y carta con letra grande.”",author:"Ana R. · Primera visita"},
];
let tIndex=0;
function showTestimonial(i){ tIndex=(i+TESTIMONIALS.length)%TESTIMONIALS.length; $("testimonialText").textContent=TESTIMONIALS[tIndex].text; const [n,r]=TESTIMONIALS[tIndex].author.split(" · "); $("testimonialAuthor").innerHTML=`<strong>${n}</strong> · ${r||""}`; $("testimonialPosition").textContent=`${tIndex+1} de ${TESTIMONIALS.length}`; }
$("prevTestimonial").addEventListener("click",()=>showTestimonial(tIndex-1));
$("nextTestimonial").addEventListener("click",()=>showTestimonial(tIndex+1));
if(!prefersReducedMotion) setInterval(()=>showTestimonial(tIndex+1),7000);

/* Extras */
$("year").textContent=new Date().getFullYear();
const header=$("siteHeader"), backTop=$("backTop");
window.addEventListener("scroll",()=>{ header.classList.toggle("is-scrolled",scrollY>8); backTop.hidden=scrollY<400; },{passive:true});
backTop.addEventListener("click",()=>scrollTo({top:0,behavior:prefersReducedMotion?"auto":"smooth"}));
document.querySelectorAll("[data-count]").forEach(el=>{ const target=Number(el.dataset.count); if(prefersReducedMotion){ el.textContent=target; return; } const io=new IntersectionObserver(([e])=>{ if(!e.isIntersecting)return; io.disconnect(); let c=0; const step=()=>{ c+=1; el.textContent=c; if(c<target) requestAnimationFrame(step); }; step(); },{threshold:.6}); io.observe(el); });
if(!prefersReducedMotion && "IntersectionObserver" in window){ const rio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("is-visible"); rio.unobserve(e.target); }}),{threshold:.15}); document.querySelectorAll(".feature-card,.menu-card,.gallery-grid li").forEach(el=>{ el.classList.add("reveal"); rio.observe(el); }); }
const navLinks=[...document.querySelectorAll(".primary-nav a[href^='#']")];
const sio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) navLinks.forEach(l=>l.classList.toggle("is-current",l.getAttribute("href")===`#${e.target.id}`)); }),{rootMargin:"-40% 0px -55% 0px"});
["inicio","nosotros","carta","galeria","reservas","contacto"].forEach(id=>{ const s=$(id); if(s) sio.observe(s); });

renderMenu(); renderOrder(); showTestimonial(0);
