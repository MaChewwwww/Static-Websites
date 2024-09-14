/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "175px";
    var navButton = document.querySelector('.navbutton');
    navButton.classList.add('clicked'); // Add the 'clicked' class to trigger the vanishing effect


}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    var navButton = document.querySelector('.navbutton');
    navButton.classList.remove('clicked'); // Remove the 'clicked' class to bring back the nav button
}

var img = document.getElementById('img');

var slides = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg',
    'images/7.jpg', 'images/8.jpg', 'images/9.jpg', 'images/10.jpg', 'images/lounge.jpg', 'images/garden.jpg',
    'images/p12.jpg'];

var Start = 0;

function slider() {
    if (Start < slides.length) {
        Start = Start + 1;
    }
    else {
        Start = 1;
    }
    console.log(img);
    img.innerHTML = "<img src=" + slides[Start - 1] + ">";

}
slider();
setInterval(slider, 2000);

