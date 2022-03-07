// INITIALIZE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyC0JWMkbzlkGgCSCol71_d9q5Bbl8DLfv8",
//     authDomain: "snooper-ab1f9.firebaseapp.com",
//     projectId: "snooper-ab1f9",
//     storageBucket: "snooper-ab1f9.appspot.com",
//     messagingSenderId: "879094901587",
//     appId: "1:879094901587:web:ea55db27cf320565fd8fa6"
// };
const firebaseConfig = {
    apiKey: "AIzaSyD_JVzl9eFNOLoa9lWtyrQGqHKnGXb9HBg",
    authDomain: "snooper-81985.firebaseapp.com",
    databaseURL: "https://snooper-81985-default-rtdb.firebaseio.com",
    projectId: "snooper-81985",
    storageBucket: "snooper-81985.appspot.com",
    messagingSenderId: "780843848511",
    appId: "1:780843848511:web:71932eb7d074d829adf98a"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_10.png')).then((url) => {
    document.getElementsByClassName("grid-item")[7].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_11.png')).then((url) => {
    document.getElementsByClassName("grid-item")[8].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_12.png')).then((url) => {
    document.getElementsByClassName("grid-item")[9].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_13.png')).then((url) => {
    document.getElementsByClassName("grid-item")[10].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_14.png')).then((url) => {
    document.getElementsByClassName("grid-item")[11].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_15.png')).then((url) => {
    document.getElementsByClassName("grid-item")[12].getElementsByTagName("img")[0].src = url
})
getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_16.png')).then((url) => {
    document.getElementsByClassName("grid-item")[13].getElementsByTagName("img")[0].src = url
})


///WebCam01 / 06 March 2022 _Webcam01_0.png 檔名 ０～６

// for (var i = 0; i < 7; i++) {
//     getDownloadURL(ref(storage, '/WebCam01/06 March 2022_Webcam01_' + i + '.png')).then((url) => {
//         console.log(url)
//         var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];
//         test_img.src = url
//     })
// }
var vurl = [];
var count = 0
for (var i = 0; i < 7; i++) {
    console.log(i)
    getDownloadURL(ref(storage, "/WebCam01/06 March 2022_Webcam01_" + i + ".png")).then((url) => {
        //var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];                                                    
        //test_img.src=url
        vurl.push(url)
        console.log("get")
        console.log(vurl)
        count++
    })
}
var timetest = setInterval(change, 1000);

function change() {

    if (count != 7) {

    } else {
        for (var i = 0; i < 7; i++) {
            console.log(vurl[i])
            var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];
            test_img.src = vurl[i]
            clearInterval(timetest)
        }
    }
    //document.getElementsByClassName('grid-item')[0]
}

//黃色貓貓
// var Img29 = document.getElementsByClassName("grid-item")[8].getElementsByTagName("img")[0];
// Img29.src = "https://firebasestorage.googleapis.com/v0/b/snooper-ab1f9.appspot.com/o/z.jpg?alt=media&token=1bb43514-20ba-4a9e-bcaa-fcaa7a9586d7"

//loading
setTimeout(timer1, 3000);

function timer1() {
    document.getElementById("loading-bg").style.opacity = "0";
    document.getElementById("loading-bg").style.zIndex = "-10";
}


// setInterval(timer2, 1000);

// function timer2() {
//     document.getElementById("photo_window").style.opacity = "1";
// }



// page1 : on click go to page2
//測試所有class進行動作
var test1 = document.getElementsByClassName('grid-item')
for (var i = 0; i < test1.length; i++) {
    test1[i].addEventListener('click', function(event) {
        //alert(this.dataset.user)
        document.getElementById("content").style.zIndex = "5";
        document.getElementById("grid").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("photo_window").style.opacity = "1";
        }, 300);
        setTimeout(function() {
            document.getElementById("qa_window").style.opacity = "1";
        }, 100);
        setTimeout(function() {
            document.getElementById("video_window").style.opacity = "1";
        }, 500);
        var classbackimg = this.getElementsByTagName('img')[0].src
            //alert(classbackimg)
            //console.log(classbackimg)
        var classvideo = this.dataset.video;
        var classcontent = this.dataset.content;
        //console.log(test1[i]["data-user"])
        if (i >= 0 && i < test1.length) {
            console.log(test1[i].dataset.user)
        }

        var classarray = document.getElementsByClassName("testclass_img");
        for (i in classarray) {
            classarray[i].src = classbackimg
        }
    });

}

/*document.getElementsByClassName('grid-item')[0]
    .addEventListener('click', function(event) {
        document.getElementById("content").style.zIndex = "5";
        document.getElementById("grid").style.opacity = "0.5";
        var showback = document.getElementsByClassName("testclass")[0];
        //showback.style="display:block;background-image:url('image/f.jpg');"
    });
//貓咪富士山
document.getElementsByClassName('grid-item')[1]
    .addEventListener('click', function(event) {
        // do something
        // alert("hello");
        document.getElementById("content").style.zIndex = "5";
        document.getElementById("grid").style.opacity = "0.5";
        var showback = document.getElementsByClassName("testclass")[0];
        var classarray = document.getElementsByClassName("testclass_img");
        
        var temparray = []
        for(i in classarray){
            classarray[i].src="image/f.jpg"
        }
        //showback.style="display:block;background-image:url('image/f.jpg');"
        //showback.img.src="image/f.jpg";
        // document.getElementById("test").style.opacity = "0.5";
        // document.getElementsByClassName('test').style.opacity = "0";
    });
*/
// page2 : close_button on click

document.getElementsByClassName('window_header_close')[0]
    .addEventListener('click', function(event) {
        // alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
        document.getElementById("photo_window").style.opacity = "0";
        document.getElementById("qa_window").style.opacity = "0";
        document.getElementById("video_window").style.opacity = "0";
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
    });
document.getElementsByClassName('window_header_close')[1]
    .addEventListener('click', function(event) {
        // alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
        document.getElementById("photo_window").style.opacity = "0";
        document.getElementById("qa_window").style.opacity = "0";
        document.getElementById("video_window").style.opacity = "0";
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
    });
document.getElementsByClassName('window_header_close')[2]
    .addEventListener('click', function(event) {
        // alert("close");
        document.getElementById("content").style.zIndex = "-1";
        document.getElementById("grid").style.opacity = "1";
        document.getElementById("photo_window").style.opacity = "0";
        document.getElementById("qa_window").style.opacity = "0";
        document.getElementById("video_window").style.opacity = "0";
    });


// test function

function test() {
    var element = document.getElementById("test");
    element.style.opacity = "0.5";
    alert(userNum); //get grid-item 的 data-user"01"
    // document.getElementsByClassName('grid-item');
}


//data-* det setting

var userNum = document.getElementsByClassName('grid-item')[0].dataset.user
console.log(userNum);




// function content(){
//     var element = document.getElementsById("test");
//     element.style.opacity = "0";
//     alert('hello');
// }





// Imagez = document.getElementsByClassName('test_img')[0];
// console.log(Imagez);