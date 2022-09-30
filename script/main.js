
let background = document.querySelector("#background");
let silhouette1 = document.querySelector("#silhouette1");
let silhouette2 = document.querySelector("#silhouette2");
let items1 = document.querySelector("#items1");
let items2 = document.querySelector("#items2");
let downarrow = document.querySelector("#downarrow");
// let light = document.querySelector("#light");

silhouette1.style.top = '150px'
silhouette2.style.top = '200x'

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  let filters1 = `saturate(1.2) brightness(1.05) blur(0px)`
  let filters2 = `saturate(1.5) brightness(0.95) blur(7px)`
  console.log(value)

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
