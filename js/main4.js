// INITIALIZE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { getDatabase, set, get, child, ref as ref1 } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'

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

function writeUserData(userId, imageUrl) {
    const db = getDatabase();
    set(ref1(db, 'users/' + userId), {
        profile_picture: imageUrl
    });
}

// ------ 輪播圖1 ---------

//firebase json抓取
const dbRef = ref1(getDatabase());
const db = getDatabase();
const target = "target";
var imgarray = new Array()
var imgurl = [];
var imgcount = 0
var temp = [];
var catching = 60;
var ttt = 0;

const target2 = "target";
var imgarray2 = new Array()
var imgurl2 = [];
var imgcount2 = 0
var temp2 = []
var catching2 = 60;
var ttt2 = 0;

const target3 = "target";
var imgarray3 = new Array()
var imgurl3 = [];
var imgcount3 = 0
var temp3 = []
var catching3 = 60;
var ttt3 = 0;

const target4 = "target";
var imgarray4 = new Array()
var imgurl4 = [];
var imgcount4 = 0
var temp4 = []
var catching4 = 60;
var ttt4 = 0;

get(child(dbRef, `WebCam04/${target}`)).then((snapshot) => {
    if (snapshot.exists()) {
        //console.log(snapshot.val());
        if (snapshot.val() != null) {
            var dataarray = snapshot.val();
            //console.log(dataarray);
            //console.log("data:"+dataarray.length)//總共Firebase裡面資料數量
            ttt = imgarray.length
                //console.log(dataarray.length-1)
                //console.log(dataarray.length-10)
            for (var i = dataarray.length - 1; i >= dataarray.length - catching; i--) {
                imgarray[dataarray.length - i - 1] = dataarray[i]
            }
            //console.log(dataarray)
            //console.log(imgarray)
            //console.log(imgarray)
            for (var i = 0; i < imgarray.length; i++) {
                // console.log(imgarray[i])
                getDownloadURL(ref(storage, '/WebCam04/' + imgarray[i])).then((url) => {
                    // console.log(url)
                    temp.push(url)
                        // console.log(temp)
                    imgcount++
                }).catch((error) => {
                    // console.log("error:" + error)
                    imgcount++
                })
            }
        }
        // console.log(imgarray[4])
    } else {
        // console.log("No data available");
    }
}).catch((error) => {
    // console.error(error);
});

var timetest = setInterval(change, 1000);

function change() {
    if (imgcount != catching) {
        if (imgcount >= ttt) {
            imgcount = catching
        }
    } else {
        for (var i = 0; i < catching; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching; j++) {
                // url 對imgarray進行全體掃秒
                var te = temp[i] //url : https://asdasdasdasd%20Webcam
                    //var tw = imgarray[j].replace(/ /g, "%20")
                try { var tw = imgarray[j].replace(/ /g, "%20") } catch { console.log("change 出現無法接收的東西") }
                if (temp[i] != undefined) {
                    if (te.includes(tw)) {
                        imgurl[j] = temp[i]
                    }
                }
            }
            if (temp[i] == undefined) {
                imgurl[i] = "./image/blank/lost.jpg"
                    // console.log(imgurl[i])
            }
        }
        // console.log(imgurl)
        for (var i = 0; i < catching; i++) {
            //console.log(imgurl[i])
            var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];
            test_img.src = imgurl[i]
            clearInterval(timetest)
        }
        var undecheckarray = document.getElementsByClassName("grid-item");
        for (var i = 0; i < catching; i++) {
            var undechesrc = undecheckarray[i].getElementsByTagName("img")[0].src
                //console.log(undechesrc)
            if (undechesrc == "https://a5052106a.github.io/Snooper/image/blank/blank00.jpg") {
                // console.log("abcdefg")
            } else {
                // console.log(ttt)
                // page1 : on click go to page2
                //測試所有class進行動作
                var test1 = document.getElementsByClassName('grid-item')
                for (var k = 0; k < ttt; k++) {
                    if (test1[k].getElementsByTagName("img")[0].src != "https://a5052106a.github.io/Snooper/image/blank/blank00.jpg") {
                        test1[k].addEventListener('click', function(event) {
                            document.getElementsByClassName('window_header_close')[0].style.zIndex = "1";
                            document.getElementById("page2").style.zIndex = "5";
                            // document.getElementById("grid").style.opacity = "0";
                            var userNum = this.dataset.user
                                // console.log(imgurl2[userNum])
                            var user_photo2 = document.getElementsByClassName("user_photo2")[0].getElementsByTagName("img")[0]
                            if (imgurl2[userNum] == undefined) {
                                imgurl2[userNum] = "/image/blank/lost.jpg"
                            }
                            user_photo2.src = imgurl2[userNum]
                            var user_photo3 = document.getElementsByClassName("user_photo3")[0].getElementsByTagName("img")[0]
                            if (imgurl3[userNum] == undefined) {
                                imgurl3[userNum] = "/image/blank/lost.jpg"
                            }
                            user_photo3.src = imgurl3[userNum]

                            var user_photo4 = document.getElementsByClassName("user_photo4")[0].getElementsByTagName("img")[0]
                            if (imgurl4[userNum] == undefined) {
                                imgurl4[userNum] = "/image/blank/lost.jpg"
                            }
                            user_photo4.src = imgurl4[userNum]

                            var name = qa_array[userNum].name
                            if (name == '-') {
                                name = '拒絕回答！'
                            }
                            var phone_number = qa_array[userNum].phone_number
                            if (phone_number == '-') {
                                phone_number = '拒絕回答！'
                            }
                            var address = qa_array[userNum].address
                            if (address == '-') {
                                address = '拒絕回答！'
                            }
                            var hobby = qa_array[userNum].hobby
                            if (hobby == '-') {
                                hobby = '拒絕回答！'
                            }
                            var angle = qa_array[userNum].angle
                            if (angle == '-') {
                                angle = '拒絕回答！'
                            } else if (angle == '檔案遺失') {
                                angle = angle
                            } else if (angle == 'x') {
                                angle = angle
                            } else {
                                angle = angle + "公斤"
                            }
                            document.getElementById("qa_name").innerText = "血型：" + name
                            document.getElementById("qa_number").innerText = "最喜歡的五官：" + phone_number
                            document.getElementById("qa_add").innerText = "年齡：" + address
                            document.getElementById("qa_hobby").innerText = "性別：" + hobby
                            document.getElementById("qa_angle").innerText = "體重：" + angle
                            setTimeout(function() {
                                document.getElementById("carousel_window").style.opacity = "1";
                            }, 10);

                            var classvideo = this.dataset.video;
                            var classcontent = this.dataset.content;
                            var classbackimg = this.getElementsByTagName('img')[0].src
                            var user_photo = document.getElementsByClassName("user_photo")[0].getElementsByTagName("img")[0]
                            user_photo.src = classbackimg
                                // if (k >= 0 && k < test1.length) {
                                // }
                            var classarray = document.getElementsByClassName("testclass_img");
                            // for (k in classarray - 1) {
                            //     classarray[k].src = classbackimg
                            // }
                            for (k = 0; k <= classarray.length - 1; k++) {
                                // console.log(classbackimg)
                                classarray[k].src = classbackimg
                                    // console.log(classbackimg)
                            }
                            console.log(k)
                        });
                    }
                }
            }
        }
    }
}


// ------ 輪播圖2 ---------

get(child(dbRef, `WebCam03/${target2}`)).then((snapshot) => {
    if (snapshot.exists()) {
        if (snapshot.val() != null) {
            var dataarray2 = snapshot.val();
            ttt2 = dataarray2.length

            for (var i = dataarray2.length - 1; i >= dataarray2.length - catching2; i--) {
                imgarray2[dataarray2.length - i - 1] = dataarray2[i]
            }
            console.log(dataarray2.length)
            console.log(imgarray2.length)
            for (var i = 0; i < imgarray2.length; i++) {
                // console.log(imgarray2[i])
                getDownloadURL(ref(storage, '/WebCam03/' + imgarray2[i])).then((url) => {
                    temp2.push(url)
                    imgcount2++
                }).catch((error) => {
                    imgcount2++
                })
            }
        }
    } else {}
}).catch((error) => {});
var timetest2 = setInterval(change2, 1000);

function change2() {
    if (imgcount2 != catching2) {
        if (imgcount2 >= ttt2) {
            imgcount2 = catching2
        }
    } else {
        for (i = 0; i < catching2; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching2; j++) {
                // url 對imgarray進行全體掃秒
                var te2 = temp2[i] //url : https://asdasdasdasd%20Webcam
                try { var tw2 = imgarray2[j].replace(/ /g, "%20") } catch { console.log("change2 出現無法接收的東西") }
                if (temp2[i] != undefined) {
                    if (te2.includes(tw2)) {
                        imgurl2[j] = temp2[i]
                    }
                }
            }
            if (temp2[i] == undefined) {
                imgurl2[i] = "/image/blank/blank00.jpg"
            }
        }
        clearInterval(timetest2)
    }

}


// ------ 輪播圖3 ---------

get(child(dbRef, `WebCam02/${target3}`)).then((snapshot) => {
    if (snapshot.exists()) {
        if (snapshot.val() != null) {
            var dataarray3 = snapshot.val();
            ttt3 = dataarray3.length
            for (var i = dataarray3.length - 1; i >= dataarray3.length - catching3; i--) {
                imgarray3[dataarray3.length - i - 1] = dataarray3[i]
            }
            for (var i = 0; i < imgarray3.length; i++) {
                getDownloadURL(ref(storage, '/WebCam02/' + imgarray3[i])).then((url) => {
                    temp3.push(url)
                    imgcount3++
                }).catch((error) => {
                    imgcount3++
                })
            }
        }
    } else {}
}).catch((error) => {});
var timetest3 = setInterval(change3, 1000);

function change3() {
    if (imgcount3 != catching3) {
        if (imgcount3 >= ttt3) {
            imgcount3 = catching3
        }
    } else {
        for (i = 0; i < catching3; i++) {
            for (var j = 0; j < catching3; j++) {
                var te3 = temp3[i]
                try { var tw3 = imgarray3[j].replace(/ /g, "%20") } catch { console.log("change3 出現無法接收的東西") }
                if (temp3[i] != undefined) {
                    if (te3.includes(tw3)) {
                        imgurl3[j] = temp3[i]
                    }
                }
                if (temp3[i] == undefined) {
                    imgurl3[i] = "/image/blank/blank00.jpg"
                }
            }
        }
        clearInterval(timetest3)
    }
}
// ------ 輪播圖4 ---------

get(child(dbRef, `WebCam01/${target4}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val())
        if (snapshot.val() != null) {
            var dataarray4 = snapshot.val();
            ttt4 = dataarray4.length
            for (var i = dataarray4.length - 1; i >= dataarray4.length - catching4; i--) {
                imgarray4[dataarray4.length - i - 1] = dataarray4[i]
            }
            for (var i = 0; i < imgarray4.length; i++) {
                getDownloadURL(ref(storage, '/WebCam01/' + imgarray4[i])).then((url) => {
                    temp4.push(url)
                    imgcount4++
                }).catch((error) => {
                    imgcount4++
                })
            }
        }
    } else {}
}).catch((error) => {});
var timetest4 = setInterval(change4, 1000);

function change4() {
    if (imgcount4 != catching4) {
        if (imgcount4 >= ttt4) {
            imgcount4 = catching4
        }
    } else {
        for (i = 0; i < catching4; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching4; j++) {
                // url 對imgarray進行全體掃秒
                var te4 = temp4[i]
                try { var tw4 = imgarray4[j].replace(/ /g, "%20") } catch { console.log("change4 出現無法接收的東西") }
                if (temp4[i] != undefined) {
                    if (te4.includes(tw4)) {
                        imgurl4[j] = temp4[i]
                    }
                }
                if (temp4[i] == undefined) {
                    imgurl4[i] = "/image/blank/blank00.jpg"
                }
            }
        }
        clearInterval(timetest4)
    }
}

// -----------------------    QA DATA Catching    ----------------------------
const data_qa = "target";
var qa_array = new Array()
var qa_catahing = 60;
get(child(dbRef, `QA/${data_qa}`)).then((snapshot) => {
    if (snapshot.exists()) {
        if (snapshot.val() != null) {
            var data_array_qa = snapshot.val();
            for (var i = data_array_qa.length - 1; i >= data_array_qa.length - qa_catahing; i--) {
                qa_array[data_array_qa.length - i - 1] = data_array_qa[i]
            }
        }
    }
})



//-----------loading
setTimeout(timer1, 8000);

function timer1() {
    document.getElementById("loading-bg").style.opacity = "0";
    document.getElementById("loading-bg").style.zIndex = "-10";
}
var randa = Math.random() * 1000;
document.getElementsByClassName("loading-gif")[0].src = "image/loading6.gif?" + randa



//click about square  -------------------------------------------------
document.getElementsByClassName('introduce-item')[1]
    .addEventListener('click', function(event) {
        // console.log(document.getElementsByClassName('window_header_close'));
        document.getElementsByClassName('window_header_close')[3].style.zIndex = "-1";
        //document.getElementsByClassName('window_header_close')[3].style.zIndex="-1";
        document.getElementsByClassName('window_header_close')[1].style.zIndex = "1";
        document.getElementsByClassName('window_header_close')[2].style.zIndex = "1";
        document.getElementById("about1_window").style.zIndex = "1";
        document.getElementById("about2_window").style.zIndex = "1";
        document.getElementById("page2").style.zIndex = "5";
        document.getElementsByClassName('testclass_img')[0].src = "image/about/about.jpg";
        var bg_about = document.getElementsByClassName('testclass_img');
        // console.log("b")
        for (i in bg_about) {
            bg_about[i].src = "image/about/about.jpg"
        }


    })
    //click video square  -------------------------------------------------
document.getElementsByClassName('introduce-item')[2]
    .addEventListener('click', function(event) {
        document.getElementsByClassName('window_header_close')[3].style.zIndex = "1";
        document.getElementsByClassName('window_header_close')[1].style.zIndex = "-1";
        document.getElementsByClassName('window_header_close')[2].style.zIndex = "-1";
        document.getElementById("video_window").style.zIndex = "1";
        document.getElementById("page2").style.zIndex = "5";
        document.getElementsByClassName('testclass_img')[0].src = "image/video/video3.jpg";
        var bg_about = document.getElementsByClassName('testclass_img');
        document.getElementsByClassName("video")[0].play();
        for (i in bg_about) {
            bg_about[i].src = "image/video/video3.jpg"
        }

    })
    //------- page2 : close_button on click
document.getElementsByClassName('window_header_close')[0]
    .addEventListener('click', function(event) {
        document.getElementById("page2").style.zIndex = "-1";
        document.getElementById("carousel_window").style.opacity = "0";
        // document.getElementById("grid").style.opacity = "1";
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
        document.getElementsByClassName("testclass_img").src = "";

        //關閉按鈕之後設定輪流撥放器初始為第一張圖片
        //先取得輪播器內的carousel-item數量
        var hatest = document.getElementsByClassName("carousel-item").length;
        //hatest.className+=" active";
        //根據上面取到的數量進行for迴圈處理
        for (var check = 0; check < hatest; check++) {
            //設置變數haatest為每一個carousel-item
            var haatest = document.getElementsByClassName("carousel-item")[check];
            //判斷每一個carousel-item中是否含有atvive以及目前是否是第一張圖片正在被active
            if ((haatest.className.includes("active")) && (check != 0)) {
                //設定str變數為原本的classname
                var str = haatest.className;
                //利用replace把原本str中的active設為空白
                var str1 = str.replace("active", " ")
                    //再將原本的className更換為替換後的className讓他不要為active
                haatest.className = str1
                    //再將第一張的classname以同樣的方式替換className
                str = document.getElementsByClassName("carousel-item")[0];
                str1 = str.className + " active";
                str.className = str1;
            }
        }
    });
document.getElementsByClassName('window_header_close')[1]
    .addEventListener('click', function(event) {
        document.getElementById("page2").style.zIndex = "-1";
        document.getElementById("about1_window").style.zIndex = "-1";
        document.getElementById("about2_window").style.zIndex = "-1";
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
        document.getElementsByClassName("testclass_img").src = "";
    });
document.getElementsByClassName('window_header_close')[2]
    .addEventListener('click', function(event) {
        document.getElementById("page2").style.zIndex = "-1";
        document.getElementById("about1_window").style.zIndex = "-1";
        document.getElementById("about2_window").style.zIndex = "-1";
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
        document.getElementsByClassName("testclass_img").src = "";
    });
document.getElementsByClassName('window_header_close')[3]
    .addEventListener('click', function(event) {
        document.getElementById("page2").style.zIndex = "-1";
        document.getElementById("video_window").style.zIndex = "-1";
        document.getElementsByClassName("video")[0].load();
        var showback = document.getElementsByClassName("testclass")[0];
        showback.style = "display:grid;background:none;"
        document.getElementsByClassName("testclass_img").src = "";
    });


//---------css----------//
var btn = document.getElementsByClassName("carousel-control-next");
var arrow = document.getElementById("carousel-control-prev-icon");
for (var i = 0; i < btn.length; i++) {
    btn.onmouseover = function() {
        arrow.style.scale = "1.5";
    };
    btn.onmouseout = function() {
        arrow.style.scale = "";
    };
}
// var myCarousel = document.querySelector('#myCarousel')
// var carousel = new bootstrap.Carousel(myCarousel, {

//     pause: true
// })
