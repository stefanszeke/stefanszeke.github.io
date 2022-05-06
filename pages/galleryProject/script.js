console.log("script.js reporting in ")

const thumbnailsBox = document.querySelector(".thumbnails");
let currentImageIndex = 0

// list of images
const imageList = [
    {
        name: "Image 2 blue sky",
        url: "./images/gallery/img1.jpg",
        description: "this is img1 weeeeee "
    },
    {
        name: "Morning sun",
        url: "./images/gallery/img2.jpg",
        description: "this is img2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Miami afternoon",
        url: "./images/gallery/img3.jpg",
        description: "not actually miami"
    },
    {
        name: "img4",
        url: "./images/gallery/img4.jpg",
        description: "Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "img5",
        url: "./images/gallery/img5.jpg",
        description: "Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "img6",
        url: "./images/gallery/img6.jpg",
        description: "Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "img7",
        url: "./images/gallery/img7.jpg",
        description: "Erat imperdiet sed euismod nisi"
    },
    {
        name: "img8",
        url: "./images/gallery/img8.jpg",
        description: "Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut.mollis aliquam ut."
    },
]

//adding the main photo
const mainPhoto = document.querySelector(".mainPhoto");
mainPhoto.setAttribute("src",imageList[currentImageIndex].url)

// creating thumbnails from the image list
imageList.forEach(image => {
    const thumbnail = document.createElement("div");
    const img = document.createElement("img")
    const textBox = document.createElement("div")
    const imageContainer = document.createElement("div")

    thumbnail.classList.add("thumbnail");
    imageContainer.classList.add("imageContainer")
    textBox.classList.add("textBox")
    textBox.innerHTML = image.name

    img.setAttribute("src",image.url)
    
    thumbnailsBox.append(thumbnail)
    imageContainer.append(img)
    thumbnail.append(imageContainer)
    thumbnail.append(textBox)
})

// selecting the newly created thumbnail
const thumbnails = document.querySelectorAll(".thumbnail .imageContainer")

// clicking logic on thumbnails
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", f = () => {

        beforeIndexSet()

        currentImageIndex = index

        afterIndexSet()

    })
})

// clicking on arrows
const leftButton = document.querySelector(".leftButton")
const rightButton = document.querySelector(".rightButton")

//left button
leftButton.addEventListener("click", f = () => {
    beforeIndexSet()

    if (currentImageIndex === 0 ) {
        currentImageIndex = thumbnails.length-1
    } else {
        currentImageIndex -= 1
    }

    afterIndexSet()
})
//Right button
rightButton.addEventListener("click", f = () => {

    beforeIndexSet();
    
    if (currentImageIndex === thumbnails.length-1 ) {
        currentImageIndex = 0
    } else {
        currentImageIndex += 1
    }
    
    afterIndexSet()

})

// main photo description
const descriptionName = document.querySelector(".description h2");
const descriptionText = document.querySelector(".description p");
descriptionName.innerHTML=imageList[currentImageIndex].name;
descriptionText.innerHTML=imageList[currentImageIndex].description;
thumbnails[currentImageIndex].classList.add("selected")

// functions for clicking:

//1. remove selected class from the element before selection change
function beforeIndexSet() {
    thumbnails[currentImageIndex].classList.remove("selected")
}

//2. add selected class to the element after selection change
// setting the main photo and the description
function afterIndexSet() {
    thumbnails[currentImageIndex].classList.add("selected");
    mainPhoto.setAttribute("src",imageList[currentImageIndex].url);

    descriptionName.innerHTML=imageList[currentImageIndex].name;
    descriptionText.innerHTML=imageList[currentImageIndex].description;
}





