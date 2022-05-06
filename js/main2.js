// INITIALIZE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { getDatabase, set, get, child, ref as ref1 } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

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


// firebase.initializeApp(firebaseConfig);
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
get(child(dbRef, `WebCam04/${target}`)).then((snapshot) => {
    if (snapshot.exists()) {
        //console.log(snapshot.val());
        if (snapshot.val() != null) {
            var dataarray = snapshot.val();
            //console.log(dataarray);
            //console.log("data:"+dataarray.length)//總共Firebase裡面資料數量
            ttt = dataarray.length
                //console.log(dataarray.length-1)
                //console.log(dataarray.length-10)
            for (var i = dataarray.length - 1; i >= dataarray.length - catching; i--) {
                imgarray[dataarray.length - i - 1] = dataarray[i]
            }
            for (var i = 0; i < dataarray.length; i++) {
                getDownloadURL(ref(storage, '/WebCam04/' + imgarray[i])).then((url) => {
                    // console.log(url)
                    temp.push(url)
                        // console.log(temp)
                    imgcount++
                }).catch((error) => {
                    console.log("error:" + error)
                    imgcount++
                })
            }
        }
        // console.log(imgarray[4])
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

var timetest = setInterval(change, 1000);

function change() {
    if (imgcount != catching) {
        if (imgcount >= ttt) {
            // console.log("get OK")
            // console.log(temp)
            imgcount++
        }
    } else {
        //console.log(temp)
        //console.log(imgarray)
        //console.log(temp)
        //console.log(imgarray.replace(/ /g, "%20"))
        for (var i = 0; i < catching; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching; j++) {
                // url 對imgarray進行全體掃秒
                var te = temp[i] //url : https://asdasdasdasd%20Webcam
                    //var tw = imgarray[j].replace(/ /g, "%20")
                try { var tw = imgarray[j].replace(/ /g, "%20") } catch { console.log("出現無法接收的東西") }
                if (temp[i] != undefined) {
                    if (te.includes(tw)) {
                        imgurl[j] = temp[i]
                    }
                }
                //console.log(temp[8]);
                //console.log(temp[8]===undefined)
                //Webcam 02 ->Webcam%2002
                /*if(temp[i]!=undefined){
                       if(te.includes(tw)){
                           imgurl[j]=temp[i]  
                       }
                }*/
            }
            if (temp[i] == undefined) {
                imgurl[i] = "./image/blank/blank00.jpg"
                console.log(imgurl[i])
            }
        }
        console.log(imgurl)
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
            if (undechesrc == "./image/blank/blank00.jpg") {
                console.log("abcdefg")
            } else {
                console.log(ttt)
                    // page1 : on click go to page2
                    //測試所有class進行動作
                var test1 = document.getElementsByClassName('grid-item')
                for (var k = 0; k < ttt; k++) {
                    if (test1[k].getElementsByTagName("img")[0].src != "./image/blank/blank00.jpg") {
                        test1[k].addEventListener('click', function(event) {
                            document.getElementsByClassName('window_header_close')[0].style.zIndex = "1";
                            document.getElementById("page2").style.zIndex = "5";
                            // document.getElementById("grid").style.opacity = "0";

                            // console.log(imgurl2[1])
                            var userNum = this.dataset.user
                            console.log(imgurl2[userNum])

                            var user_photo2 = document.getElementsByClassName("user_photo2")[0].getElementsByTagName("img")[0]

                            if (imgurl2[userNum] == undefined) {
                                imgurl2[userNum] = "/image/blank/blank00.jpg"
                            }
                            console.log(user_photo2)

                            user_photo2.src = imgurl2[userNum]
                            var user_photo3 = document.getElementsByClassName("user_photo3")[0].getElementsByTagName("img")[0]
                            if (imgurl3[userNum] == undefined) {
                                imgurl3[userNum] = "/image/blank/blank00.jpg"
                            }
                            user_photo3.src = imgurl3[userNum]

                            var user_photo4 = document.getElementsByClassName("user_photo4")[0].getElementsByTagName("img")[0]
                            if (imgurl4[userNum] == undefined) {
                                imgurl4[userNum] = "/image/blank/blank00.jpg"
                            }
                            user_photo4.src = imgurl4[userNum]

                            var name = qa_array[userNum].name
                            if (name == 'x') {
                                name = '拒絕回答！'
                            }
                            var phone_number = qa_array[userNum].phone_number
                            if (phone_number == 'x') {
                                phone_number = '拒絕回答！'
                            }
                            var address = qa_array[userNum].address
                            if (address == 'x') {
                                address = '拒絕回答！'
                            }
                            var hobby = qa_array[userNum].hobby
                            if (hobby == 'x') {
                                hobby = '拒絕回答！'
                            }
                            var angle = qa_array[userNum].angle
                            if (angle == 'x') {
                                angle = '拒絕回答！'
                            } else {
                                angle = angle + "公斤"
                            }
                            console.log(qa_array[userNum])
                            document.getElementById("qa_name").innerText = "血型：" + name
                            document.getElementById("qa_number").innerText = "最喜歡的五官：" + phone_number
                            document.getElementById("qa_add").innerText = "年齡：" + address
                            document.getElementById("qa_hobby").innerText = "性別：" + hobby
                            document.getElementById("qa_angle").innerText = "體重：" + angle

                            // if (angarray[userNum] == '拒絕回答！') {
                            //     user_QA_angle.innerText = "最喜歡的拍照角度：" + angel
                            // } else {
                            //     user_QA_angle.innerText = "最喜歡的拍照角度：" + angel + "º"
                            // }

                            //
                            // setTimeout(function() {
                            //     document.getElementById("about1_window").style.opacity = "1";
                            // }, 300);
                            // setTimeout(function() {
                            //     document.getElementById("qa_window").style.opacity = "1";
                            // }, 100);
                            // setTimeout(function() {
                            //     document.getElementById("video_window").style.opacity = "1";
                            // }, 500);

                            setTimeout(function() {
                                document.getElementById("carousel_window").style.opacity = "1";
                            }, 10);
                            var classbackimg = this.getElementsByTagName('img')[0].src
                                // var num = this.getElementsByClassName("grid-item")[0].dataset.user
                                //alert(classbackimg)
                                // console.log(classbackimg)
                            var classvideo = this.dataset.video;
                            var classcontent = this.dataset.content;
                            var user_photo = document.getElementsByClassName("user_photo")[0].getElementsByTagName("img")[0]
                                //console.log(test1[i]["data-user"])
                            user_photo.src = classbackimg
                            if (k >= 0 && k < test1.length) {
                                // console.log(test1.length)
                                // console.log(test1[i].dataset.user)
                            }

                            var classarray = document.getElementsByClassName("testclass_img");
                            //console.log(classarray.length)
                            for (k in classarray) {
                                //console.log(classbackimg)
                                classarray[k].src = classbackimg
                            }


                        });
                    }



                }

            }
        }

    }
    //document.getElementsByClassName('grid-item')[0]
}


// ------ 輪播圖2 ---------

const target2 = "target";
var imgarray2 = new Array()
var imgurl2 = [];
var imgcount2 = 0
var temp2 = []
var catching2 = 60;
get(child(dbRef, `WebCam03/${target2}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val())
        if (snapshot.val() != null) {
            var dataarray2 = snapshot.val();
            // console.log(dataarray2);
            // console.log(dataarray2.length - 1)
            // console.log(dataarray2.length - 10)
            for (var i = dataarray2.length - 1; i >= dataarray2.length - catching2; i--) {
                imgarray2[dataarray2.length - i - 1] = dataarray2[i]
            }
            for (var i = 0; i < imgarray2.length; i++) {
                getDownloadURL(ref(storage, '/WebCam03/' + imgarray2[i])).then((url) => {
                    // console.log(url)
                    temp2.push(url)
                    imgcount2++
                    // console.log(imgcount2)
                }).catch((error) => {
                    imgcount2++
                })
            }
        }
        // console.log(imgarray2[4])
        // console.log(temp2)
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
var timetest2 = setInterval(change2, 1000);

function change2() {
    if (imgcount2 != catching2) {
        // console.log(imgcount2)
        // console.log(catching2)
        // console.log(temp2)
    } else {
        // console.log(temp2)
        for (i = 0; i < catching2; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching2; j++) {
                // url 對imgarray進行全體掃秒
                var te2 = temp2[i] //url : https://asdasdasdasd%20Webcam
                var tw2 = imgarray2[j].replace(/ /g, "%20")
                    //Webcam 02 ->Webcam%2002
                    // console.log(tw2)
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
            // console.log(imgarray2[0])
            // console.log(imgurl2[0])

        // for (var i = 0; i < catching2; i++) {
        //     console.log(imgurl[i])
        //     var carousel_img = document.getElementsByClassName("user_photo2")[i].getElementsByTagName("img")[0];
        //     carousel_img.src = imgurl2[i]
        //     clearInterval(timetest)
        // }
    }
    //document.getElementsByClassName('grid-item')[0]

}


// ------ 輪播圖3 ---------

const target3 = "target";
var imgarray3 = new Array()
var imgurl3 = [];
var imgcount3 = 0
var temp3 = []
var catching3 = 60;
get(child(dbRef, `WebCam02/${target3}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val())
        if (snapshot.val() != null) {
            var dataarray3 = snapshot.val();
            // console.log(dataarray2);
            // console.log(dataarray2.length - 1)
            // console.log(dataarray2.length - 10)
            for (var i = dataarray3.length - 1; i >= dataarray3.length - catching3; i--) {
                imgarray3[dataarray3.length - i - 1] = dataarray3[i]
            }
            for (var i = 0; i < imgarray3.length; i++) {
                getDownloadURL(ref(storage, '/WebCam02/' + imgarray3[i])).then((url) => {
                    // console.log(url)
                    temp3.push(url)
                    imgcount3++
                    // console.log(imgcount2)
                }).catch((error) => {
                    imgcount3++
                })
            }
        }
        // console.log(imgarray2[4])
        // console.log(temp2)
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
var timetest3 = setInterval(change3, 1000);

function change3() {
    if (imgcount3 != catching3) {
        // console.log(imgcount2)
        // console.log(catching2)
        // console.log(temp2)
    } else {
        // console.log(temp2)
        for (i = 0; i < catching3; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching3; j++) {
                // url 對imgarray進行全體掃秒
                var te3 = temp3[i] //url : https://asdasdasdasd%20Webcam
                var tw3 = imgarray3[j].replace(/ /g, "%20")
                    //Webcam 02 ->Webcam%2002
                    // console.log(tw2)
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
            // console.log(imgarray2[0])
            // console.log(imgurl2[0])

        // for (var i = 0; i < catching2; i++) {
        //     console.log(imgurl[i])
        //     var carousel_img = document.getElementsByClassName("user_photo2")[i].getElementsByTagName("img")[0];
        //     carousel_img.src = imgurl2[i]
        //     clearInterval(timetest)
        // }
    }
    //document.getElementsByClassName('grid-item')[0]
}
// ------ 輪播圖4 ---------

const target4 = "target";
var imgarray4 = new Array()
var imgurl4 = [];
var imgcount4 = 0
var temp4 = []
var catching4 = 60;
get(child(dbRef, `WebCam01/${target4}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val())
        if (snapshot.val() != null) {
            var dataarray4 = snapshot.val();
            // console.log(dataarray2);
            // console.log(dataarray2.length - 1)
            // console.log(dataarray2.length - 10)
            for (var i = dataarray4.length - 1; i >= dataarray4.length - catching4; i--) {
                imgarray4[dataarray4.length - i - 1] = dataarray4[i]
            }
            for (var i = 0; i < imgarray4.length; i++) {
                getDownloadURL(ref(storage, '/WebCam01/' + imgarray4[i])).then((url) => {
                    // console.log(url)
                    temp4.push(url)
                    imgcount4++
                    // console.log(imgcount2)
                }).catch((error) => {
                    imgcount4++
                })
            }
        }
        // console.log(imgarray2[4])
        // console.log(temp2)
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
var timetest4 = setInterval(change4, 1000);

function change4() {
    if (imgcount4 != catching4) {
        // console.log(imgcount2)
        // console.log(catching2)
        // console.log(temp2)
    } else {
        // console.log(temp2)
        for (i = 0; i < catching4; i++) {
            //URL temp 進行10次
            for (var j = 0; j < catching4; j++) {
                // url 對imgarray進行全體掃秒
                var te4 = temp4[i] //url : https://asdasdasdasd%20Webcam
                var tw4 = imgarray4[j].replace(/ /g, "%20")
                    //Webcam 02 ->Webcam%2002
                    // console.log(tw2)
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
            // console.log(imgarray2[0])
            // console.log(imgurl2[0])

        // for (var i = 0; i < catching2; i++) {
        //     console.log(imgurl[i])
        //     var carousel_img = document.getElementsByClassName("user_photo2")[i].getElementsByTagName("img")[0];
        //     carousel_img.src = imgurl2[i]
        //     clearInterval(timetest)
        // }
    }
    //document.getElementsByClassName('grid-item')[0]
}

//----------- QA DATA first catch-----------
{
    // const data_name = "name";
    // var namearray = new Array()
    // var namecatching = 5;
    // get(child(dbRef, `QA/${data_name}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         if (snapshot.val() != null) {
    //             var dataarrayname = snapshot.val();
    //             console.log(dataarrayname);
    //             for (var i = dataarrayname.length - 1; i >= dataarrayname.length - namecatching; i--) {
    //                 if (dataarrayname[i] == 'x') {
    //                     namearray[dataarrayname.length - i - 1] = '拒絕回答！'
    //                 } else {
    //                     namearray[dataarrayname.length - i - 1] = dataarrayname[i]
    //                 }

    //             }
    //             console.log(namearray)
    //             console.log(namearray[0])
    //         }
    //     }
    // })

    //----------- QA DATA NUMBER-----------
    // const data_num = "phone_number";
    // var numarray = new Array()
    // var numcatching = 5;
    // get(child(dbRef, `QA/${data_num}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         if (snapshot.val() != null) {
    //             var dataarraynum = snapshot.val();
    //             for (var i = dataarraynum.length - 1; i >= dataarraynum.length - numcatching; i--) {
    //                 if (dataarraynum[i] == 'x') {
    //                     numarray[dataarraynum.length - i - 1] = '拒絕回答！'
    //                 } else {
    //                     numarray[dataarraynum.length - i - 1] = dataarraynum[i]
    //                 }

    //             }
    //         }
    //     }
    // })

    //----------- QA DATA ADD-----------
    // const data_add = "address";
    // var addarray = new Array()
    // var addcatching = 5;
    // get(child(dbRef, `QA/${data_add}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         if (snapshot.val() != null) {
    //             var dataarrayadd = snapshot.val();
    //             for (var i = dataarrayadd.length - 1; i >= dataarrayadd.length - addcatching; i--) {
    //                 if (dataarrayadd[i] == 'x') {
    //                     addarray[dataarrayadd.length - i - 1] = '拒絕回答！'
    //                 } else {
    //                     addarray[dataarrayadd.length - i - 1] = dataarrayadd[i]
    //                 }
    //             }

    //         }
    //     }
    // })

    //----------- QA DATA HOBBY-----------
    // const data_hob = "hobby";
    // var hobarray = new Array()
    // var hobcatching = 5;
    // get(child(dbRef, `QA/${data_hob}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         if (snapshot.val() != null) {
    //             var dataarrayhob = snapshot.val();
    //             for (var i = dataarrayhob.length - 1; i >= dataarrayhob.length - hobcatching; i--) {
    //                 if (dataarrayhob[i] == 'x') {
    //                     hobarray[dataarrayhob.length - i - 1] = '拒絕回答！'
    //                 } else {
    //                     hobarray[dataarrayhob.length - i - 1] = dataarrayhob[i]
    //                 }
    //             }
    //         }
    //     }
    // })

    //----------- QA DATA ANGLE-----------
    // const data_ang = "angle";
    // var angarray = new Array()
    // var angcatching = 5;
    // get(child(dbRef, `QA/${data_ang}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         if (snapshot.val() != null) {
    //             var dataarrayang = snapshot.val();
    //             for (var i = dataarrayang.length - 1; i >= dataarrayang.length - angcatching; i--) {
    //                 if (dataarrayang[i] == 'x') {
    //                     angarray[dataarrayang.length - i - 1] = '拒絕回答！'
    //                 } else {
    //                     angarray[dataarrayang.length - i - 1] = dataarrayang[i]
    //                 }
    //             }
    //         }
    //     }
    // })
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
        console.log(qa_array)
        console.log(qa_array[2])
    }
})

//------ 單張照片抓取 -------
{
    // const database = getDatabase(app);

    //test database 
    // const starCountRef = ref(database, 'posts/' + postId + '/starCount');
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     updateStarCount(postElement, data);
    // });

    // function addItemsToList(WebCam01, WebCam02) {
    //     var ul = document.getElementById("database_test");

    //     var _WebCam01 = document.createElement("li");
    //     var _WebCam02 = document.createElement("li");

    //     _WebCam01.innerHTML = "CourseName: " + WebCam01;
    //     _WebCam02.innerHTML = "Institute: " + WebCam02;

    //     ul.appendChild(_WebCam01);
    //     ul.appendChild(_WebCam02);
    // }

    // function FetchAllData() {
    //     firebase
    //         .database()
    //         .ref("database_test")
    //         .once("value", function(snapshot) {
    //             snapshot.forEach(function(ChildSnapshot) {
    //                 let WebCam01 = ChildSnapshot.val().WebCam01;
    //                 let WebCam02 = ChildSnapshot.val().WebCam02;
    //                 addItemsToList(WebCam01, WebCam02);
    //             });
    //         });
    // }
    // window.onload(FetchAllData());



    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_10.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[7].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_11.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[8].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_12.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[9].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_13.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[10].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_14.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[11].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_15.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[12].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_16.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[13].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_17.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[14].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_18.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[15].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_19.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[16].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_20.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[17].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_21.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[18].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_22.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[19].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_23.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[20].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_24.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[21].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_25.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[22].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_26.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[23].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_27.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[24].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_28.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[25].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_29.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[26].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_30.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[27].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_31.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[28].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_32.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[29].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_33.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[30].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_34.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[31].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_35.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[32].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_36.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[33].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_37.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[34].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_38.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[35].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_39.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[36].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_40.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[37].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_41.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[38].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_42.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[39].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_43.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[40].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_44.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[41].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_45.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[42].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_46.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[43].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_47.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[44].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_48.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[45].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_49.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[46].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_7.png')).then((url) => { //07----07
    //     document.getElementsByClassName("grid-item")[47].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_8.png')).then((url) => { //07----08
    //     document.getElementsByClassName("grid-item")[48].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_9.png')).then((url) => { //07----09
    //     document.getElementsByClassName("grid-item")[49].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_56.png')).then((url) => { //07----56
    //     document.getElementsByClassName("grid-item")[50].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_57.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[51].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_58.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[52].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_59.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[53].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/07 March 2022_Webcam01_60.png')).then((url) => { //07----60
    //     document.getElementsByClassName("grid-item")[54].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/05 March 2022_Webcam01_94.png')).then((url) => { //05----94
    //     document.getElementsByClassName("grid-item")[55].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/05 March 2022_Webcam01_95.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[56].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/05 March 2022_Webcam01_96.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[57].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/05 March 2022_Webcam01_97.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[58].getElementsByTagName("img")[0].src = url
    // })
    // getDownloadURL(ref(storage, '/WebCam01/05 March 2022_Webcam01_98.png')).then((url) => {
    //     document.getElementsByClassName("grid-item")[59].getElementsByTagName("img")[0].src = url
    // })



    ///WebCam01 / 06 March 2022 _Webcam01_0.png 檔名 ０～６

    // for (var i = 0; i < 7; i++) {
    //     getDownloadURL(ref(storage, '/WebCam01/06 March 2022_Webcam01_' + i + '.png')).then((url) => {
    //         console.log(url)
    //         var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];
    //         test_img.src = url
    //     })
    // }

    //   ---------------Delay Time 初始--------------------  //
    // var vurl = [];
    // var count = 0
    // for (var i = 0; i < 7; i++) {
    //     console.log(i)
    //     getDownloadURL(ref(storage, "/WebCam01/06 March 2022_Webcam01_" + i + ".png")).then((url) => {
    //         //var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];                                                    
    //         //test_img.src=url
    //         vurl.push(url)
    //         console.log("get")
    //         console.log(vurl)
    //         count++
    //     })
    // }
    // var timetest = setInterval(change, 1000);

    // function change() {

    //     if (count != 7) {

    //     } else {
    //         for (var i = 0; i < 7; i++) {
    //             console.log(vurl[i])
    //             var test_img = document.getElementsByClassName("grid-item")[i].getElementsByTagName("img")[0];
    //             test_img.src = vurl[i]
    //             clearInterval(timetest)
    //         }
    //     }
    // }

    //黃色貓貓
    // var Img29 = document.getElementsByClassName("grid-item")[8].getElementsByTagName("img")[0];
    // Img29.src = "https://firebasestorage.googleapis.com/v0/b/snooper-ab1f9.appspot.com/o/z.jpg?alt=media&token=1bb43514-20ba-4a9e-bcaa-fcaa7a9586d7"

    //-----------loading
    setTimeout(timer1, 1000 * 30);

    function timer1() {
        document.getElementById("loading-bg").style.opacity = "0";
        document.getElementById("loading-bg").style.zIndex = "-10";
    }


    // setInterval(timer2, 1000);

    // function timer2() {
    //     document.getElementById("about1_window").style.opacity = "1";
    // }
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
//click about square  -------------------------------------------------
document.getElementsByClassName('introduce-item')[1]
    .addEventListener('click', function(event) {
        console.log(document.getElementsByClassName('window_header_close'));
        document.getElementsByClassName('window_header_close')[3].style.zIndex = "-1";
        //document.getElementsByClassName('window_header_close')[3].style.zIndex="-1";
        document.getElementsByClassName('window_header_close')[1].style.zIndex = "1";
        document.getElementsByClassName('window_header_close')[2].style.zIndex = "1";
        document.getElementById("about1_window").style.zIndex = "1";
        document.getElementById("about2_window").style.zIndex = "1";
        document.getElementById("page2").style.zIndex = "5";
        document.getElementsByClassName('testclass_img')[0].src = "image/about/about.jpg";
        var bg_about = document.getElementsByClassName('testclass_img');
        console.log("b")
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
// document.getElementsByClassName('window_header_close')[1]
//     .addEventListener('click', function(event) {
//         document.getElementById("content").style.zIndex = "-1";
//         document.getElementById("grid").style.opacity = "1";
//         // document.getElementById("about1_window").style.opacity = "0";
//         // document.getElementById("qa_window").style.opacity = "0";
//         document.getElementById("video_window").style.zIndex = "0"
//         var showback = document.getElementsByClassName("testclass")[0];
//         showback.style = "display:grid;background:none;"
//     });
// document.getElementsByClassName('window_header_close')[2]
//     .addEventListener('click', function(event) {
//         document.getElementById("content").style.zIndex = "-1";
//         document.getElementById("grid").style.opacity = "1";
//         document.getElementById("about1_window").style.opacity = "0";
//         document.getElementById("qa_window").style.opacity = "0";
//         document.getElementById("video_window").style.opacity = "0";
//     });
// document.getElementsByClassName('window_header_close')[3]
//     .addEventListener('click', function(event) {
//         console.log("close")
//         document.getElementById("content").style.zIndex = "-1";
//         document.getElementById("grid").style.opacity = "1";
//         document.getElementById("about1_window").style.opacity = "0";
//         document.getElementById("qa_window").style.opacity = "0";
//         document.getElementById("video_window").style.opacity = "0";
//         document.getElementsByClassName("testclass_img").src = "";
//     });

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
var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel, {
        // interval: 2000,
        // wrap: false,
        // cycle: false
        pause: true
    })
    // test function

// function test() {
//     var element = document.getElementById("test");
//     element.style.opacity = "0.5";
// alert(userNum); //get grid-item 的 data-user"01"
// document.getElementsByClassName('grid-item');
//}


//data-* det setting

// var userNum = document.getElementsByClassName('grid-item')[0].dataset.user
// console.log(userNum);




// function content(){
//     var element = document.getElementsById("test");
//     element.style.opacity = "0";
//     alert('hello');
// }





// Imagez = document.getElementsByClassName('test_img')[0];
// console.log(Imagez);
