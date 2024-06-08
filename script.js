

const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});


var fill = document.querySelector("#fill");
var navimg = document.querySelector("nav img");
var menu = document.querySelector("#menu");
var flag = 0;


menu.addEventListener('click' , function(){
    if(flag == 0){
    fill.style.top = 0;
    navimg.style.opacity = 0;
    menu.style.border = "1px solid black";
    menu.style.color = "black";
    flag  = 1;
    }else{
    fill.style.top = " -100%";
    navimg.style.opacity = 1;
    menu.style.border = "1px solid rgba(156, 155, 155, 0.573)";
    menu.style.color = "rgba(156, 155, 155, 0.573)";
    flag = 0;
}
});

