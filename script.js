const header=document.getElementById("header");
const progress=document.getElementById("progressBar");
const menu=document.getElementById("menuToggle");
const nav=document.getElementById("navLinks");

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>20);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/max*100)+"%";
});

menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=document.querySelectorAll("section[id]");
const links=document.querySelectorAll(".nav-links a");
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));

const counter=document.querySelector("[data-count]");
let counted=false;
const counterObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;let target=Number(counter.dataset.count),n=0;
    const step=Math.ceil(target/35);
    const timer=setInterval(()=>{
      n+=step;if(n>=target){n=target;clearInterval(timer)}
      counter.textContent=n;
    },30);
  }
},{threshold:.4});
if(counter)counterObserver.observe(counter);

document.getElementById("year").textContent=new Date().getFullYear();
