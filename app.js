$(document).ready(function() {
  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $(".slide-"+curSlide).css('width','50%');
      $(".slide-"+curSlide).css('height','50%');
      $(".slide-"+curSlide).css('left','25%');
      $(".slide-"+curSlide).css('top','100%');
      if(curSlide == 0){
        $(".slide-3 .slide__bg").animate({"width": "50%", 'height':"50%", 'left':'25%', 'top':'25%'}, 'slow', function(){
          $(".slide-3").animate({'top':"-100%"},'slow');
          $(".slide-"+curSlide).addClass("animating");
          $(".slide-"+ curSlide).animate({'top':'25%'},'slow', function(){
            animating = false;
            $(".slide-3").removeClass("animating");
            $(".slide-"+ curSlide).animate({'top':"0%", 'width':'100%', 'height':'100%', 'left':'0%'},'slow');
            $(".slide-3 .slide__bg").css('top','0%');
            $(".slide-3 .slide__bg").css('left','0%');
            $(".slide-3 .slide__bg").css('width','100%');
            $(".slide-3 .slide__bg").css('height','100%');
          });
        });
      }else{
        $(".slide-"+ (curSlide-1) + " .slide__bg").animate({"width": "50%", 'height':"50%", 'left':'25%', 'top':'25%'}, 'slow', function(){
          $(".slide-"+ (curSlide-1)).animate({'top':"-100%"},'slow');
          $(".slide-"+curSlide).addClass("animating");
          $(".slide-"+ curSlide).animate({'top':'25%'},'slow', function(){
            animating = false;
            if(curSlide == 0){
              $(".slide-3").removeClass("animating");
            }else{
              $(".slide-"+(curSlide-1)).removeClass("animating");
            }
            $(".slide-"+ (curSlide)).animate({'top':"0%", 'width':'100%', 'height':'100%', 'left':'0%'},'slow');
            $(".slide-"+ (curSlide-1) + " .slide__bg").css('top','0%');
            $(".slide-"+ (curSlide-1) + " .slide__bg").css('left','0%');
            $(".slide-"+ (curSlide-1) + " .slide__bg").css('width','100%');
            $(".slide-"+ (curSlide-1) + " .slide__bg").css('height','100%');
          });
        });
      }
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
    }
    window.clearTimeout(autoSlideTimeout);
    diff = 0;
    autoSlide();
  }
  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--
    else curSlide=numOfSlides;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++
    else curSlide= 0;
    changeSlides();
  }
  
    $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
});