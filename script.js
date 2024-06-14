
$('.reuniao').hide();
$('.social').hide();


$('.btn-casual').on('click',function () {
    $('.casual').show();
    $('.reuniao').hide();
    $('.social').hide();
});
$('.btn-reuniao').on('click',function () {
    $('.reuniao').show();
    $('.casual').hide();
    $('.social').hide();
});
$('.btn-social').on('click',function () {
    $('.social').show();
    $('.reuniao').hide();
    $('.casual').hide();
})

$('.jeans').hide();
$('.tricots').hide();


$('.btn-casacos').on('click',function () {
    $('.casacos').show();
    $('.jeans').hide();
    $('.tricots').hide();
});
$('.btn-jeans').on('click',function () {
    $('.jeans').show();
    $('.casacos').hide();
    $('.tricots').hide();
});
$('.btn-tricots').on('click',function () {
    $('.tricots').show();
    $('.jeans').hide();
    $('.casacos').hide();
})
function applyDarkMode(isDark) {
    var root = $(':root');
    if (isDark) {
      root.css('--main-color', 'black');
      root.css('--secondary-color', '#e2e2e2');
      root.css('--text-color', '#e2e2e2');
      root.css('--secondary-text-color', 'black');
    } else {
      root.css('--main-color', '#e2e2e2');
      root.css('--secondary-color', 'black');
      root.css('--text-color', 'black');
      root.css('--secondary-text-color', '#e2e2e2');
    }
  }

  // Check local storage for dark mode preference
  var isDarkMode = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(isDarkMode);

  $('.light-dark').on("click",function () {
    isDarkMode = !isDarkMode;
    applyDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  });