const left = document.querySelector('.left-side')
const right = document.querySelector('.right-side')
const down = document.getElementById('down')
const up = document.getElementById('up')
const slidesLength = right.querySelectorAll('div').length
const sliderContainer = document.querySelector('.slider-container')
console.log(slidesLength);
let activeSlideIndex = 0

// left.style.top = `-${(slidesLength - 1) * 100}vh`
console.log(`-${(slidesLength - 1) * 100}vh`);

up.addEventListener('click', () => changeSlide('up'))
down.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    
    const sliderHeight = sliderContainer.clientHeight
 
    if(direction === 'up') {
        console.log('up');
        activeSlideIndex++
        if(activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0
        }
    } else if(direction === 'down') {
        console.log('down');
        activeSlideIndex--
        if(activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1
        }
    }

    right.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    left.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
}

