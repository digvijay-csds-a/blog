//for the start reading button
const s_read=document.getElementById("startRead");
function changeColor(){
    const s_read=document.getElementById("startRead");
    const width=window.innerWidth;
    s_read.style.cssText="font-family:Arial, Helvetica, sans-serif;font-size:22px;border-radius:120em;width:fit-content"
    if(width<900){
        s_read.classList.add("btn-success");
        s_read.classList.remove("btn-dark");
    }else{
        s_read.classList.add("btn-dark");
    }
    
}
window.addEventListener('resize',changeColor);
s_read.onclick=function(){
    window.location.href="/sign_in";
}

changeColor();
//navbar-button
const get_started = document.querySelector("#navbar-button");
get_started.onclick = function() {
    window.location.href = '/get_started';
};
//footer button--about
const about=document.querySelectorAll(".about");
about.forEach(element=>{
    element.addEventListener("click",function(){
        window.location.href ="/about";
    });
});
//--animation--//

function animateHeading() {
  const headingSpans = document.querySelectorAll("h1 span");
  
  headingSpans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("visible");
    }, 150 * index);

    setTimeout(() => {
      span.classList.remove("visible");
    }, 150 * index + 3300); 
  });
}

document.addEventListener("DOMContentLoaded", function () {
  
  setInterval(animateHeading, 5000);
  
  
  animateHeading();
});

//--help--//
const help=document.querySelector(".help");

help.addEventListener("click",function(){
        window.location.href ="/help";
    });
//--privacy--//
const privacy=document.querySelector(".privacy");

privacy.addEventListener("click",function(){
        window.location.href ="/privacy";
    });
//--terms--//
const terms=document.querySelector(".terms");

terms.addEventListener("click",function(){
        window.location.href ="/terms";;
    });
//--contact_us--//
const contact=document.querySelector(".contact_us");

contact.addEventListener("click",function(){
        window.location.href ="/contact_us";;
    });
//--navbar--button//
const get_start=document.querySelector(".btn.btn-dark.fw-medium");

get_start.addEventListener("click",function(){
        window.location.href ="/sign_in";
    });


