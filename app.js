function toEmbed(u){
  u=(u||"").trim();
  const m=u.match(/src=["']([^"']+)["']/); if(m) u=m[1];
  let y=u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if(y) return "https://www.youtube.com/embed/"+y[1];
  return u.replace(/(drive\.google\.com\/file\/d\/[^/]+)\/view.*/,"$1/preview");
}
document.querySelectorAll("[data-video]").forEach(el=>{
  const u=toEmbed(VIDEOS[el.dataset.video]); if(!u) return;
  el.innerHTML=/\.(mp4|webm)$/i.test(u)?'<video controls playsinline preload="metadata" src="'+u+'"></video>':'<iframe src="'+u+'" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; picture-in-picture" title="Demo video"></iframe>';
  el.style.border="0";
});
const pl=document.getElementById("posts");
if(pl&&POSTS.length) pl.innerHTML=POSTS.slice(0,3).map(p=>'<li><a href="'+p.url+'">'+p.title+'</a></li>').join("");
const ba=document.getElementById("ba"),sl=document.getElementById("slider");
if(ba&&sl) sl.addEventListener("input",()=>ba.style.setProperty("--p",sl.value+"%"));
const bubble=document.getElementById("bubble");
function say(t){if(bubble.textContent===t)return;bubble.classList.add("hide");setTimeout(()=>{bubble.textContent=t;bubble.classList.remove("hide")},180);}
const first=document.querySelector("[data-ayla]"); if(first) bubble.textContent=first.dataset.ayla;
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.dataset.ayla)say(e.target.dataset.ayla)}),{rootMargin:"-45% 0px -45% 0px"});document.querySelectorAll("[data-ayla]").forEach(s=>io.observe(s));}

const prog=document.getElementById("prog"),bl=document.querySelectorAll(".blobs i"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
function sc(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;if(prog)prog.style.width=(h>0?y/h*100:0)+"%";if(!rm)bl.forEach((b,i)=>b.style.transform="translateY("+(y*(.08+i*.06))+"px)");}
addEventListener("scroll",sc,{passive:true});sc();
document.querySelectorAll("[data-img]").forEach(el=>{const u=IMAGES[el.dataset.img];if(!u){el.remove();return;}el.innerHTML=el.dataset.img==='me'?'<img src="'+u+'" alt="Iman">':'<div class="dots"><i></i><i></i><i></i></div><img src="'+u+'" alt="Screenshot">';});
const fs=document.querySelectorAll(".f");
if("IntersectionObserver" in window&&!rm){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}}),{threshold:.15});fs.forEach((f,i)=>{f.classList.add("rv");f.style.transitionDelay=(i%3)*80+"ms";o.observe(f)});}
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.classList.toggle("on",x===b));
  const k=b.dataset.f;fs.forEach(f=>f.hidden=!(k==="all"||f.dataset.s===k));
  document.querySelectorAll(".grp").forEach(g=>g.hidden=![...g.querySelectorAll(".f")].some(f=>!f.hidden));}));

document.querySelectorAll("[data-pimg]").forEach(el=>{const u=IMAGES[el.dataset.pimg];if(u)el.innerHTML='<img src="'+u+'" alt="Portal preview">';});

const fc=document.querySelector("#ayla .face");
if(fc&&IMAGES.aylaFace) fc.innerHTML='<img src="'+IMAGES.aylaFace+'" alt="Ayla">';
