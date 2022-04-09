var body = document.getElementsByTagName("BODY")[0];
const slides = document.querySelectorAll('.slide')
const left = document.getElementById('left')
const right = document.getElementById('right')


let activeSlide = 0

right.addEventListener('click', ()=>{
    console.log('left')
    activeSlide++

    if(activeSlide >= slides.length){
        activeSlide = 0
    }

    setBodyBg();
    setActiveSlide();
})
left.addEventListener('click', ()=>{
    console.log('right')
    activeSlide--

    if(activeSlide<0){
        activeSlide = slides.length-1
    }

    setBodyBg();
    setActiveSlide();
})

function setBodyBg(){
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide(){
    console.log(activeSlide)
    slides.forEach((slide)=>slide.classList.remove('active'))
    slides[activeSlide].classList.add('active')
}