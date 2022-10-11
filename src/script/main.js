
let background = document.querySelector("#background");
let silhouette1 = document.querySelector("#silhouette1");
let silhouette2 = document.querySelector("#silhouette2");
let items1 = document.querySelector("#items1");
let items2 = document.querySelector("#items2");
let downarrow = document.querySelector("#downarrow");

let gridbox = document.querySelectorAll(".content");
let logos = document.querySelector("#logos");

silhouette1.style.top = '150px'
silhouette2.style.top = '200x'

const isNotMobile = !window.matchMedia("(max-width: 1024px)").matches

// hero scroll animation
if(isNotMobile){
  window.addEventListener("scroll", () => {
    let value = window.scrollY;

    let filters1 = `saturate(1.2) brightness(1.05) blur(0px)`
    let filters2 = `saturate(1.5) brightness(0.95) blur(7px)`

    text.style.top = value * 0.7 + "px";

    silhouette1.style.top = -value * 0.2 + 150 + "px";
    silhouette2.style.top = -value * 0.15 + 200 + "px";
    background.style.top = value * 0.5 + "px";

    items1.style.top = -value * 0.5 + 200 + "px";
    items2.style.top = -value * 0.6 + 330 + "px";

    downarrow.style.top = value * 0.5+70 + "%";


    if(value < 400) {
      items1.style.filter = "blur(7px)";
      items2.style.filter = "blur(5px)";
      background.style.filter = filters1;
    } else {
      items1.style.filter = "blur(0px)";
      items2.style.filter = "blur(2px)";
      background.style.filter = filters2;
    }
  })
} else {
  window.addEventListener("scroll", () => {
    if(window.pageYOffset > 20) {
      downarrow.style.top = "100%";
    } else {
      downarrow.style.top = "70%";
    }
  })
}

// hover effect for mobile grid items
gridbox.forEach((box) => {

  window.addEventListener("scroll", (e) => {


    let position = box.getBoundingClientRect().top;

    if(position < 300) {
      box.children[0].classList.add("auto-hover-image");
      box.children[1].classList.add("auto-hover-name");
      box.classList.add("auto-hover-content");
    } else {
      box.children[0].classList.remove("auto-hover-image");
      box.children[1].classList.remove("auto-hover-name");
      box.classList.remove("auto-hover-content");
    }
  })

})

// hero arrow scroll to content
downarrow.addEventListener("click", () => {
  window.scrollTo(0, window.innerHeight-38)
})

// helper functions
let lastPosition = 0;
function isScrollingUp() {
  let isScrollingUp = false;
  
    let position = window.pageYOffset;
    if(position < lastPosition) {
      isScrollingUp = true;
    } 
    lastPosition = position;
    
  return isScrollingUp;
}