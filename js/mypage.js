
// custom select box
function customSelect(){
  $(".custom-select-con").each(function  () {
      let $selectOpenBtn = $(this).find(".select-trigger");
      let $selectOpenList = $(this).find(".select-option-list");
      $selectOpenBtn.on("click", function (e) {
          $(".select-option-list").not($selectOpenList).hide();
          $selectOpenList.slideToggle();
          $(this).toggleClass("open");
          e.stopPropagation();
          $(document).on('click', function () { 
              $selectOpenList.hide();
              $selectOpenBtn.removeClass("open");
          });		
      });

      $selectOpenList.find(".select-option").click(function  () {
          $selectOpenList.find(".select-option").removeClass('active');
          $(this).addClass('active');
          $selectOpenBtn.addClass("selected").find(".select-txt").text($(this).text());
      });
  });
}

// accordion
function accordion(){
  $(".country-item").each(function  () {
      $(this).children("dt").find(".item-trigger").click(function  () {
          let $faqCon = $(this).parent("dt").siblings();
          if ($faqCon.css("display") == "block") { 
              $(this).parent("dt").siblings().slideUp();
              $(this).parent("dt").parent("dl").removeClass("open"); 
          }else {
              if(!$(this).hasClass("special-trigger")){
                  $(".country-item").children("dd:visible").slideUp(); 
                  $(".country-item").removeClass("open");
              }                    
              $(this).parent("dt").parent("dl").addClass("open");
              $faqCon.slideDown();
          }
      });
  });
}

// country tab
function countryTab(){
  let $cmTabList = $(".country-tab");
  let $cmTabListli = $cmTabList.find("button");
  let $cmTabListData = $cmTabListli.data('country');
  let $selectCon = $cmTabList.find("button.selected").data('country');
  let $countryItem = $('.country-item');

  $countryItem.each(function(){
      if($(this).data('country')== $cmTabListData){
          $(this).show();
      }
  });
  
  $cmTabListli.click(function  () {
      $countryItem.hide();
      $cmTabListli.removeClass('selected');
      $(this).addClass('selected');
      let $clickCountry = $(this).data('country');
      $countryItem.each(function(){
          if($(this).data('country')== $clickCountry){
              $(this).show();
          }
      });
  });
}

// Notice Learn more
function noticeListMore(){
  noticeList(3);

  $(".btn-notice-more").on("click", function () {
      noticeList( 3 ,'.btn-notice-more');
  })
}
function noticeList(cnt, btn) {
  var girls_length = $(".notice-con li:not(.active)").length;
  var girls_total_cnt;
  if (cnt < girls_length) {
      girls_total_cnt = cnt;
  } else {
      girls_total_cnt = girls_length;
      $(btn).hide();
  }
  $(".notice-con li:not(.active):lt(" + girls_total_cnt + ")").addClass("active");
}
  

// popup
$(function () {
  let popup = $('.popup-wrap');
  let contents = popup.find('.popup-detail > ul > li');
  let buttons = $('.btn-popup');
  let content;

  function openPopup() {
      let button = $(this);
      content = contents.eq(button.data('index'));

      popup.data('popup', true);
      popup.data('focus', button);

      content.css({ display: 'block' });
      popup.stop().css({ display: 'block', opacity: 0 });
      $('html').css({ overflow: 'hidden'});

      popup.animate({ opacity: 1 }, 300, function () {
          popup.removeData('popup');
          content.find('.btn-close').focus();
      });
      if (content.data('index') == "04") {
          $(".regi-step.step02").show();
      }
  }

  function closePopup() {
      popup.data('popup', true);
      popup.stop().css({ display: 'block', opacity: 1 });
      popup.animate({ opacity: 0 }, 300, function () {
          contents.css({ display: '' });
          popup.css({ display: '', opacity: '' });

          popup.data('focus').focus();

          popup.removeData('popup');
          popup.removeData('focus');

          $('html').css({ overflow: ''});
          if (content.data('index') == "03") {
              $(".region-select-con ").removeClass('active');
          }else if (content.data('index') == "04") {
              $(".regi-step").hide();
              $('.regi-step form').each(function() {
                  this.reset();
              });
              resiReset();
          }
      });
  }

  buttons.each(function (i) {
      $(this).data('index', i);
  });

  buttons.on('click', openPopup);
  // popup.find('.dimmed').on('click', closePopup);
  $(".btn-close").click(function() {
      if($(this).hasClass("btn-leave")){
          if($(this).parent("li").length > 0){
              $(this).parent("li").addClass('dim');
              $(this).parent("li").find('.modal-dim').show();
          }else{
              $('.pop-regi').addClass('dim');
              $('.pop-regi').find('.modal-dim').show();
          }
          $(this).parent().find('.back__popup__wr').fadeIn('200');
      }else{
          closePopup();
      }
  });
  $(".popup__btn__wr .back").click(function() {
      $('.popup-detail > ul > li').removeClass('dim');
      $('.popup-detail > ul > li').find('.modal-dim').hide();
      $('.back__popup__wr').fadeOut('200');
      closePopup()
  });
      

});


window.addEventListener('load', function () {
  customSelect();
  accordion();
  countryTab();
  noticeListMore();



  //230608 :: notice 공지사항 팝업 내용과 연결 작업
  popupCheck()
  //230608 :: notice 공지사항 팝업 내용과 연결 작업
  
});

// 국가선택 qr popup
$(".region-select-con .btn-qr").on("click", function () {
  $(".region-select-con").addClass("active")
})




// Additional Registration pupup
// grecaptcha
var onloadCallback = function() {
  grecaptcha.render('g-recaptcha', {
      'sitekey' : '6Lcw0VsiAAAAANyd5Ssg5jHuyvcclhhgQZ8Qca6_', // https://qa.semiconductor.samsung.com/event/archive/samsung-foundry-forum-2022/에서 가져온 값
      'callback' : function(response){
          var recaptchaResponse = response;
          $('#g-recaptcha').attr('data-recaptcha-callback', recaptchaResponse);
          console.log('결과값 전달 받는 함수 : response 전달');
      },
  });
};

// next step
$(".regi-step .next-step").on("click", function () {
  $(".regi-step").hide();
  $(this).parent(".regi-step").next().show();
});

// prev step
$(".regi-step .btn-prev").on("click", function () {
  $(".regi-step").hide();
  $('.regi-step form').each(function() {
      this.reset();
  });
  resiReset();
  if($(this).parent().data('regi-step') == "3"){
      $(".regi-step.step02").show();
  }else{
      $(this).parent().prev().show();
  }
})

// 국가선택
$(".regi__list a").on("click", function (a) {
  if ($(this).data('step') === 'next') {            
      if($(this).hasClass("disabled")){
          a.preventDefault();
      }else{
          let $sessionStep = $(this).data("step-country");
          $(".regi-step.step02").hide();
          $(".step-session").each(function(){
              if($(this).data('step-country')== $sessionStep){
                  $(this).show();
              }
          });
      }
  }else{
      $('.pop-regi').addClass('dim');
      $('.pop-regi').find('.modal-dim').show();
      $('.coming__popup__wr').find('.coming_msg .name').text($(this).attr('data-modal-name'));
      $('.coming__popup__wr').fadeIn('100');
  }
})

// comming soon popup
$(".close__wr").on("click", function () {
  $('.coming__popup__wr').fadeOut('200');
  $('.back__popup__wr').fadeOut('200');
  $('.popup-detail > ul > li').removeClass('dim');
  $('.popup-detail > ul > li').find('.modal-dim').hide();
});

// session radio option
$('.step-session .btn__regi__wr').on('change', '[type="radio"]', function(){
  $(".day_form").hide();
  if($(this).attr('data-radio-type') == 'option'){
      let activeOption = $(this).data('id');
      $(".day_form").each(function  () {
          if($(this).data('id')==activeOption){
              $(this).show();
          }
      });
  }
});



$(".regi-step.step04").each(function(){

  // 개인정보 입력폼
  $(this).find('.btn__submit').click(function(){
      if($(this).parent().find("input[name='email_address']").val() == ''){
          alert("Please enter your email address.");
          $(this).parent().find("input[name='email_address']").focus();
  
          return false;
      }
      if($(this).parent().find("input[name='password']").val() == ''){
          alert("Please enter a password.");
          $(this).parent().find("input[name='password']").focus();
          return false;
      }
      if($(this).parent().find("input[name='password_confirm']").val() == ''){
          alert("Please enter a password.");
          $(this).parent().find("input[name='password_confirm']").focus();
          return false;
      }
      if($(this).parent().find("input[name='country']").val() == ''){
          alert("Please select a country.");
          $(this).parent().find("input[name='country']").focus();
          return false;
      }
      if($(this).parent().find("input[name='first_name']").val() == ''){
          alert("Please enter your First Name.");
          $(this).parent().find("input[name='first_name']").focus();
          return false;
      }
      if($(this).parent().find("input[name='last_name']").val() == ''){
          alert("Please enter your Last Name.");
          $(this).parent().find("input[name='last_name']").focus();
          return false;
      }
      if($(this).parent().find("input[name='company_name']").val() == ''){
          alert("Please enter your Company Name.");
          $(this).parent().find("input[name='company_name']").focus();
          return false;
      }
      if($(this).parent().find("input[name='job']").val() == ''){
          alert("Please enter your job.");
          $(this).parent().find("input[name='job']").focus();
          return false;
      }
      if(!$(this).parent().find("input[name='agree_01']").is(':checked')){
          alert("Please click 'I agree' to the Terms and Conditions.");
          return false;
      }
      if(!$(this).parent().find("input[name='agree_02']").is(':checked')){
          alert("Please click ‘I agree’ to the Policy Policy and the Collection of Personal Information.");
          return false;
      }
      if($(this).parent().find("input[name='agree_03']").length){
          if(!$(this).parent().find("input[name='agree_03']").is(':checked')){
              alert("Please click 'I agree' to the Collection of Personal Information (KR SFF&SAFE 2023)");
              return false;
          }
        }
        
  
      $('.regi-step.step04').hide();
      $('.regi-step.step05').show();
  });



  function email_check(email) {
      var regex=/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      return (email != '' && email != 'undefined' && regex.test(email));
  }
  
  $(this).find(".regi__form__03 input[type=email]").change(function(){
      var email = $(this).val();
      if( email == '' || email == 'undefined') return;
      if(! email_check(email) ) {
          $(this).next(".result__email").show().text('Not in email format.');
          $(this).focus();
          return false;
      }else {
          $(".result__email").text('').hide();
      }
  });
  
  
  $(this).find("#password").change(function(){
      if(!/^(?=.*[a-zA-Z])(?=.*[0-9]).{5,25}$/.test($(this).val())){
          $(this).next(".result__password").show().text('Please enter at least 5 letters using a combination of English + numbers.');
          $('#password').focus();
          return false;
      } else {
          $(".result__password").text('').hide();
      }

  });


  $(this).find('#password').keyup(function(){$('.result__confirmpassword').hide().text('');});
  
  $(this).find('#confirm_password').keyup(function(){
      if($(this).parent().parent().find('#password').val() != $(this).val()){
          $(this).next(".result__confirmpassword").show().text('Passwords do not match.');
      } else{
          $(".result__confirmpassword").hide().text('');
      }
  });
  


  $('.agree__popup__wr03 .input_checkbox input').click(function(){agreeChk();});

  $('.personal-submit').click(function(){
      if($(this).hasClass('agree__close__wr')){
          $(this).parents('.agree__popup__wr').fadeOut('100');
          $('.pop-regi').css("overflow-y",""); 
          $('.pop-regi').removeClass('dim');
          $('.pop-regi').find('.modal-dim').hide();
      }
  });

  /* 230427 정보동의 필수 체크 수정 */
  function agreeChk() {
      if($("input[id='personal_agree1']").is(':checked') || $("input[name='personal_agreeAll']").is(':checked')){
          $('.personal-submit').addClass('agree__close__wr');
          $("input:checkbox[name='agree_03']").prop("checked", true);
      }else{
          $('.personal-submit').removeClass('agree__close__wr');
          $("input:checkbox[name='agree_03']").prop("checked", false);
      }
  }
  /* //230427 정보동의 필수 체크 수정 */
  
  function selectAll(selectAll)  {
    const checkboxes 
         = document.getElementsByName('personal_agree');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }
  $("#personal_agreeAll").click(function() {
          if($("#personal_agreeAll").is(":checked")) $("input[name=personal_agree]").prop("checked", true);
          else $("input[name=personal_agree]").prop("checked", false);
      });
  
      $("input[name=personal_agree]").click(function() {
          var total = $("input[name=personal_agree]").length;
          var checked = $("input[name=personal_agree]:checked").length;
  
          if(total != checked) $("#personal_agreeAll").prop("checked", false);
          else $("#personal_agreeAll").prop("checked", true); 
      });

});





function resiReset(){
  $(".result__email").text('').hide();
  $(".result__password").text('').hide();
  $(".result__confirmpassword").hide().text('');
  $(".day_form").hide();
}

// Edit Profile 정보변경
let $updateItem = $(".page-mypage .popup-wrap .popup-detail > ul > li").eq(1);
let state1 = false;
let state2 = false;
function updateState(){
  if(state1 == true || state2 == true){
      $updateItem.find(".btn-close").addClass('btn-leave');
      $updateItem.find('.update-btn').removeClass('disabled');
  }else{
      $updateItem.find(".btn-close").removeClass('btn-leave');
      $updateItem.find('.update-btn').addClass('disabled');
  }
}
$("#updateForm input").each(function(){
  let oldVal = $(this).val();
  $(this).on("propertychange change paste input", function() {
      let currentVal = $(this).val();
      if(currentVal != oldVal) {
          state1 = true;
      }else{
          state1 = false;
      }
      updateState()
  });
});

$("#updateForm .select-option-list").each(function(){
  let oldVal2 = $(this).find('.active').text();
  $(this).find(".select-option").click(function  () {
      let currentVal2 = $(this).text();
      if(currentVal2 != oldVal2) { 
          state2 = true;
      }else{
          state2 = false;
      }
      updateState()
  });
});

$("#updateForm .update-btn").on("click", function (a) {
  if($(this).hasClass("disabled")){
      a.preventDefault();
  }
});

$('.popup__open__btn').click(function(){
  $('.pop-regi').scrollTop(0);
  $('.pop-regi').css("overflow-y","hidden"); 
  $('.pop-regi').addClass('dim');
  $('.pop-regi').find('.modal-dim').show();
  $('[data-modal-value="' + $(this).attr('data-modal-key') + '"]').fadeIn('100');
});
$('.agree__popup__wr .agree__close__wr').click(function(){
  $('.pop-regi').css("overflow-y",""); 
  $('.pop-regi').removeClass('dim');
  $('.pop-regi').find('.modal-dim').hide();
  $(this).parents('.agree__popup__wr').fadeOut('100');
});

function initMap() {
  // Location, Dinner map
  function singleMap(mapId){
      let elems = document.querySelectorAll(mapId);
      let $elems = [].slice.call(elems);

      $elems.map((elem) => { 
          var preNode = elem.previousElementSibling;
          var coords = preNode.innerText.split(',');
          
          var latlng = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
          var myOptions = {
              zoom: parseFloat(coords[2]),
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: false,
              mapTypeControl: true,
              zoomControl: true,
              zoomControlOptions: {
                  style: google.maps.ZoomControlStyle.SMALL
              }
          };
          var map = new google.maps.Map(elem, myOptions);
          var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              label: {
                  text: coords[3],
                  className: 'marker-label',  
              },
              icon: {
                  url: "https://image.semiconductor.samsung.com/content/samsung/p6/semiconductor/common/icon-bold-action-bookmark-select.svg",
                  labelOrigin: new google.maps.Point(-70, 20),
              }
          });

          marker.addListener("click", () => {
              // toggleBounce();
          });


          function toggleBounce() {
              if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
              } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
              }
          }
      });
  }

  singleMap("#locationMap");
  singleMap("#locationMapKr");
  
  // Dinner Map
  // singleMap("#dinnerMap");
  // singleMap("#dinnerMap02");
  // singleMap("#dinnerMapKr");
  

  // Accomodation map
  const elemsAccom = document.querySelectorAll('#accommodationMap');
  const $elemsAccom = [].slice.call(elemsAccom);

  $elemsAccom.map((elemAccom) => { 
      var preNodeAccom = elemAccom.previousElementSibling;
      var coordsAccom = preNodeAccom.innerText.split(',');
      
      var latlng = new google.maps.LatLng(parseFloat(coordsAccom[0]), parseFloat(coordsAccom[1]));
      var myOptions = {
          zoom: parseFloat(coordsAccom[2]),
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: false,
          mapTypeControl: true,
          zoomControl: true,
          zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
          }
      };
      var map = new google.maps.Map(elemAccom, myOptions);

      var marker, i;
      const accoms = [
          [{ lat: 37.33463737505819, lng: -121.89502724528589 }, "Hotel De Anza - <br>Destination by Hyatt", -100, 50],
          [{ lat: 37.3310442753481, lng: -121.88750084232726 }, "The Westin <br>San Jose", 80, 55],
          [{ lat: 37.33310310742715, lng: -121.88889302194987 }, "Signia by Hilton <br>San Jose", 90, 40],
          [{ lat: 37.32110775073713, lng: -121.94807741644992 }, "Hotel Valencia <br>Santana Row", -85, 55],
          [{ lat: 37.26252948780564, lng: -121.82079716063393 }, "Hayes Mansion San Jose, <br>Curio Collection by Hilton", -115, 55]
      ];

      // Create the markers.
      const infoWindow = new google.maps.InfoWindow();
      accoms.forEach(([position, title, titleX, titleY], i) => {

          const marker = new google.maps.Marker({
              position,
              map,
              optimized: false,
              icon: {
                  url: "https://image.semiconductor.samsung.com/content/samsung/p6/semiconductor/common/icon-bold-action-bookmark-select.svg",
              }
          });
          
          // Add a click listener for each marker, and set up the info window.
          marker.addListener("click", () => {
              infoWindow.close();
              infoWindow.setOptions({
                  content: `<div class="info-tit">${title}</div>`,
                  pixelOffset: { height: titleY, width: titleX}
              });
              infoWindow.open(marker.getMap(), marker);
              setTimeout(() => {
                  document.getElementsByClassName('gm-ui-hover-effect')[0].remove();
                  var x = document.getElementsByClassName('gm-style-iw-a');
                  for(var j=0; j< x.length; j++){
                      x[j].classList.add('active');
                  }
              }, 10);
          });
      });
  });

  // KR Accomodation map
  const elemsAccomKr = document.querySelectorAll('#accommodationMapKr');
  const $elemsAccomKr = [].slice.call(elemsAccomKr);

  $elemsAccomKr.map((elemAccomKr) => { 
      var preNodeAccom = elemAccomKr.previousElementSibling;
      var coordsAccom = preNodeAccom.innerText.split(',');
      
      var latlng = new google.maps.LatLng(parseFloat(coordsAccom[0]), parseFloat(coordsAccom[1]));
      var myOptions = {
          zoom: parseFloat(coordsAccom[2]),
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: false,
          mapTypeControl: true,
          zoomControl: true,
          zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
          }
      };
      var map = new google.maps.Map(elemAccomKr, myOptions);

      var marker, i;
      var accoms = [
          [{ lat: 37.510219, lng: 127.058604 }, "Intercontinental <br>Seoul Coex", -90, 55],
          [{ lat: 37.511117, lng: 127.058086 }, "Oakwood Premier <br>Coex Center Seoul", 95, 55],
          [{ lat: 37.509061, lng: 127.060814 }, "Grand Intercontinental <br>Seoul Parnas", -110, 55],
          [{ lat: 37.515631, lng: 127.060034 }, "Hotel in 9", -70, 45],
          [{ lat: 37.508707, lng: 127.064178 }, "Park Hyatt Seoul", 90, 45]
      ];
      
      const infoWindow = new google.maps.InfoWindow();
      accoms.forEach(([position, title, titleX, titleY], i) => {

          const marker = new google.maps.Marker({
              position,
              map,
              optimized: false,
              icon: {
                  url: "https://image.semiconductor.samsung.com/content/samsung/p6/semiconductor/common/icon-bold-action-bookmark-select.svg",
              }
          });
          
          // Add a click listener for each marker, and set up the info window.
          marker.addListener("click", () => {
              infoWindow.close();
              infoWindow.setOptions({
                  content: `<div class="info-tit">${title}</div>`,
                  pixelOffset: { height: titleY, width: titleX}
              });
              infoWindow.open(marker.getMap(), marker);
              setTimeout(() => {
                  document.getElementsByClassName('gm-ui-hover-effect')[0].remove();
                  var x = document.getElementsByClassName('gm-style-iw-a');
                  for(var j=0; j< x.length; j++){
                      x[j].classList.add('active');
                  }
              }, 10);
          });
      });
  });
}
initMap();
