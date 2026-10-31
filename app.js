document.querySelectorAll("[data-video]").forEach(el=>{
  const u=VIDEOS[el.dataset.video]; if(!u) return;
  el.innerHTML=/\.(mp4|webm)$/i.test(u)?'<video controls playsinline preload="metadata" src="'+u+'"></video>':'<iframe src="'+u+'" allowfullscreen loading="lazy" title="Demo video"></iframe>';
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
