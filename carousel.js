const carouselItems = $(".carousel-item");
let currentIndex = 0;
const step = 1;
const intervalTime = 2000;
let interval;

function showItems() {
  carouselItems.each(function(index) {
    if (index >= currentIndex && index < currentIndex + step) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

function nextItem() {
  if (currentIndex + step < carouselItems.length) {
    currentIndex += step;
  } else {
    currentIndex = 0;
  }
  showItems();
}

function startAutoPlay() {
  interval = setInterval(nextItem, intervalTime);
}

function stopAutoPlay() {
  clearInterval(interval);
}

startAutoPlay();

carouselItems.on('mouseenter', stopAutoPlay);
carouselItems.on('mouseleave', startAutoPlay);

showItems();
