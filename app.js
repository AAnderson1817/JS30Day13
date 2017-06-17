//So that our checkSlide function doesn't trigger like crazy, we use debounce to limit the number of times a call can be made over a certain timeframe. Currently, any function wrapped in debounce can only fire once every 20 ms, as defined by the 'wait' argument.
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in')

function checkSlide(e){
  sliderImages.forEach(sliderImage => {
    //Halfway through the image
    const slideInAt =(window.scrollY + window.innerHeight) - sliderImage.height / 2;
    //Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if(isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else{
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
