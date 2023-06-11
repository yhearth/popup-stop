

let isNotice = false;
const notice = $(".notice-con .notice-list li");
let titArr = []
let contentArr = []
let pcimgSrcArr = []
let moimgSrcArr = []
let imgSrcArr = []

const popup =$(".notic-popup");
const popupWrap =$(".notic-popup .notice-pop-slide ul");
const popXbtn = $('.notic-popup .close-btn');
const popAlldayXbtn = $('.notic-popup .btn-all-day');

// 날짜 : 내용 tab 두칸씩


var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}
var setCookie = function (cname, cvalue, exminutes) {
    var todayDate = new Date();
   // todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
    todayDate.setTime(todayDate.getTime() + (exminutes * 60 * 1000));
    var expires = "expires=" + todayDate.toUTCString(); // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie가 설정 됩니다.
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function couponClose(){
    setCookie("close","Y",1);//기간( ex. 1은 하루, 7은 일주일)
    console.log("팝업 숨어");
    popup.animate({ opacity: 0 }, 300, function () {popup.css({ display: 'none', opacity: '0' });});
    $('html').css({ overflow: ''});
}

function popupCheck(){
    var cookiedata = document.cookie;
    if(cookiedata.indexOf("close=Y")<0){
        console.log("팝업 나와");
        noticeCheck();
    }else{
        console.log("팝업 숨어");
        popup.css({ display: 'none', opacity: '0' });
        $('html').css({ overflow: ''});
    }
    popAlldayXbtn.click(function(){
        couponClose();
    });
}





//공지사항 확인 여부 
function noticeCheck(){
 
    if(notice.length > 0){
        isNotice = true;
        onNoticPopup();
        popUpChange();
    }else{
        console.log('공지사항 없음')
    }

}


// 공지사항 띄우기
function onNoticPopup(){
  if(isNotice){
      popup.css({display : 'block', opacity : '1' ,visibility : 'visible'})
      $('html').css({ overflow: 'hidden'});
  }
}


//공지사항 내용 연동
function popUpChange(){
    let activeLi = $(".notice-con li.active");
    pushArr(activeLi);
    popupListAdd(activeLi)
 }


//활성화 된 공지사항 변수에 넣기
function pushArr(li){
    let noticTit = li.find(".cm-tit");
    let noticContent = li.find(".notice-txt");
    let noticPcImg = li.find(`picture source[media="(min-width: 768px)"]`);
    let noticMoImg = li.find(`picture source[media="(min-width: 0px) and (max-width: 767px)"]`);
    let noticImg = li.find("picture img");

    //제목 가져오기
    noticTit.each(function(i , el){
        let tit = $(el).text();
        titArr.push(tit);
    })
    //내용 가져오기
    noticContent.each(function(i , el){
        let content = $(el).text();
        contentArr.push(content);
    })
    //이미지 pc 소스 가져오기
    noticPcImg.each(function(i , el){
        let pcimgSrc = $(el).attr("srcset");
        moimgSrcArr.push(pcimgSrc);
    })
    //이미지 mo 소스 가져오기
    noticMoImg.each(function(i , el){
        let moimgSrc = $(el).attr("srcset");
        pcimgSrcArr.push(moimgSrc);
    })
    //이미지 가져오기
    noticImg.each(function(i , el){
        let imgSrc = $(el).attr("src");
        imgSrcArr.push(imgSrc);
    })

}


//공지사항 갯수만큼 팝업창에 양식 넣기
function popupListAdd(index){
    for(let i = 0 ; i < index.length; i++){
        if(imgSrcArr[i] == undefined){//이미지가 없는 경우
            let popupHtml = `
            <li class="swiper-slide">
                <div class="pop-inner">
                    <strong class="top-tit">Notice</strong>
                    <h3 class="tit">${titArr[i]}</h3>
                    <p class="desc">${contentArr[i]}</p>
                    <a href="#NoticeContents${i + 1}" class="basic-btn light-bg detail-btn notic-btn">공지사항 자세히보기</a>
                </div>
            </li>
            `
            popupWrap.append(popupHtml);
        }else{//이미지가 있는 경우
            let popupHtml = `
            <li class="swiper-slide">
                <div class="pop-inner">
                    <strong class="top-tit">Notice</strong>
                    <h3 class="tit">${titArr[i]}</h3>
                    <p class="desc">${contentArr[i]}</p>
                    <picture>
                        <source media="(min-width: 768px)"srcset="${pcimgSrcArr[i]}">
                        <source media="(min-width: 0px) and (max-width: 767px)" srcset="${moimgSrcArr[i]}">
                        <img src="${imgSrcArr[i]}" alt="">
                    </picture>
                    <a href="#NoticeContents${i + 1}" class="basic-btn light-bg detail-btn notic-btn">공지사항 자세히보기</a>
                </div>
            </li>
            `
            popupWrap.append(popupHtml);
        }
    } 
    noticBtnClick()
}


//양식 넣은 후 팝업 버튼 클릭시
function noticBtnClick(){
    //x 버튼
    popXbtn.click(function(){
        popup.stop().css({ display: 'block', opacity: 1 });
        popup.animate({ opacity: 0 }, 300, function () {
            popup.css({ display: 'none', opacity: '0' });
        });
        $('html').css({ overflow: ''});
    })

    //공지사항 바로 가기
    detailBtn = $('.notic-popup .detail-btn');
    detailBtn.click(function(){
        popup.stop().css({ display: 'block', opacity: 1 });
        popup.animate({ opacity: 0 }, 300, function () {
            popup.css({ display: 'none', opacity: '0' });
        });
        $('html').css({ overflow: ''});
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    })

}


var swiper = new Swiper(".notice-pop-slide", {
    autoHeight: true,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});




//삭제
// function popupReplace(){
//     for (var i = 0; i < popupTit.length; i++){
//         $(popupTit[i]).text(titArr[i]);
//     }
//     for (var i = 0; i < popupDesc.length; i++){
//         $(popupDesc[i]).text(contentArr[i]);
//     }
//     for (var i = 0; i < popupPcImg.length; i++){
//         if (popupPcImg[i].nodeName === "SOURCE") {
//             $(popupPcImg[i]).attr("srcset", pcimgSrcArr[i]);
//           }
//     }
//     for (var i = 0; i < popupMoImg.length; i++){
//         if (popupMoImg[i].nodeName === "SOURCE") {
//             $(popupMoImg[i]).attr("srcset", moimgSrcArr[i]);
//           }
//     }
//     for (var i = 0; i < popupImg.length; i++) {
//         if (popupImg[i].nodeName === "IMG") {
//           $(popupImg[i]).attr("src", imgSrcArr[i]);
//         }
//       }



// }
