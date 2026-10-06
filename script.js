const body=document.body;
window.addEventListener("load",()=>{setTimeout(()=>{document.querySelector(".loader")?.classList.add("done");body.classList.add("loaded")},450)});

const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const filters=document.querySelectorAll(".filter"), photos=[...document.querySelectorAll(".photo")];
filters.forEach(btn=>btn.addEventListener("click",()=>{
 filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 photos.forEach(p=>p.classList.toggle("hidden",f!=="all"&&p.dataset.category!==f));
}));

const lightbox=document.querySelector(".lightbox"), lbImg=lightbox.querySelector("img"), cap=lightbox.querySelector("figcaption");
let current=0;
const visible=()=>photos.filter(p=>!p.classList.contains("hidden"));
function show(i){
 const list=visible(); current=(i+list.length)%list.length; const p=list[current];
 lbImg.src=p.dataset.image; lbImg.alt=p.querySelector("img").alt;
 cap.innerHTML=`${p.dataset.title} <small>${p.dataset.category}</small>`;
 lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
photos.forEach(p=>p.addEventListener("click",()=>show(visible().indexOf(p))));
function close(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow=""}
lightbox.querySelector(".lightbox-close").onclick=close;
lightbox.querySelector(".lightbox-prev").onclick=()=>show(current-1);
lightbox.querySelector(".lightbox-next").onclick=()=>show(current+1);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)close()});
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")show(current-1);if(e.key==="ArrowRight")show(current+1)});
