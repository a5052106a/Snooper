// alert('hello!');
// document.querySelector('html').onclick = function() {
//     alert('Ouch! Stop poking me!');
// }

// document.getElementsByClassName('grid-item')[0];

// div.addEventListener('click', function (event) {
//     alert('Hi!');
// });

// page切換

document.getElementsByClassName('grid-item')[0]
    .addEventListener('click', function(event) {
        document.getElementById("content").style.zIndex = "5";
        document.getElementById("grid").style.opacity = "0.5";
        document.getElementById("item01").style.backgroundColor = rgb(0, 0, 0);
    });

document.getElementsByClassName('grid-item')[1]
    .addEventListener('click', function(event) {
        // do something
        alert("hello");
        document.getElementById("content").style.zIndex = "5";
        document.getElementById("grid").style.opacity = "0.5";
        // document.getElementById("test").style.opacity = "0.5";
        // document.getElementsByClassName('test').style.opacity = "0";
    });

// close_button

document.getElementsByClassName('window_header_close')[0]
    .addEventListener('click', function(event) {
        alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
    });
document.getElementsByClassName('window_header_close')[1]
    .addEventListener('click', function(event) {
        alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
    });
document.getElementsByClassName('window_header_close')[2]
    .addEventListener('click', function(event) {
        alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
    });


// test function

function test() {
    var element = document.getElementById("test");
    element.style.opacity = "0.2";
    alert('work');
}

// function content(){
//     var element = document.getElementsById("test");
//     element.style.opacity = "0";
//     alert('hello');
// }