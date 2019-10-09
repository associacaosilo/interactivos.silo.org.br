$(document).ready(function() {
  categoryDisplay();
  generateContent();
  backToTop();
});

function fixFooterInit() {
  var footerHeight = $('footer').outerHeight();
  var footerMarginTop = getFooterMarginTop() - 0;
  fixFooter(footerHeight, footerMarginTop);
  $(window).resize(function() {
    fixFooter(footerHeight, footerMarginTop);
  });
}

function fixFooter(footerHeight, footerMarginTop) {
  var windowHeight = $(window).height();
  var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;

  if (contentHeight < windowHeight) {
    $('footer').addClass('navbar-fixed-bottom');
  } else {
    $('footer').removeClass('navbar-fixed-bottom');
  }

  $('footer').show(400);
}

function getFooterMarginTop() {
  var margintop = $('footer').css('marginTop');
  var patt = new RegExp("[0-9]*");
  var re = patt.exec(margintop);
  return re[0];
}

function categoryDisplay() {
  $('.post-list-body>div[post-cate!=All]').hide();
  $('.categories-list-item').click(function() {
    var cate = $(this).attr('cate'); //get category's name
    $('.post-list-body>div[post-cate!=' + cate + ']').hide(250);
    $('.post-list-body>div[post-cate=' + cate + ']').show(400);
  });
}


function backToTop() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $("#top").fadeIn(500);
    } else {
      $("#top").fadeOut(500);
    }
  });

  $("#top").click(function() {
    $("body").animate({
      scrollTop: "0"
    }, 500);
  });

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

function generateContent() {
  if (typeof $('#markdown-toc').html() === 'undefined') {
    $('#content').hide();
    $('#myArticle').removeClass('col-sm-9').addClass('col-sm-12');
  } else {
    $('#content .content-text').html('<ul>' + $('#markdown-toc').html() + '</ul>');
  }
}
