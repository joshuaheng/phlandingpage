var userEmail = '';

$(document).ready(function(){

  $(document).pngFix();
  
  var emailText = 'Your email address';
  var titleText = '(title)';
  var orgText = '(company/school)';
  var toolTipTextDefault = 'Please enter a valid email address';
    
  var refEmailNotify = $('#email');
  var refTitleNotify = $('#title');
  var refOrgNotify = $('#organisation');

  $('#header-featured a').tipsy({title: 'tooltip', fade: true});
  $('a.email, a.facebook, a.twitter').tipsy({title: 'tooltip', fade: true, gravity: 's'});
  $('.sdevices-s').tipsy({title: 'tooltip', fade: true, gravity: 'n'});

  // hint text for email notify input
  refEmailNotify.val(emailText);
  refEmailNotify.focus(function() {
    var value = $(this).val();
    if (value == emailText) $(this).val('');
  }).blur(function () {
    var value = $(this).val();
    if (value == '') $(this).val(emailText);
  });
  
  // hint text for title notify input
  refTitleNotify.val(titleText);
  refTitleNotify.focus(function() {
    var value = $(this).val();
    if (value == titleText) $(this).val('');
  }).blur(function () {
    var value = $(this).val();
    if (value == '') $(this).val(titleText);
  });
  
  // hint text for organisation notify input
  refOrgNotify.val(orgText);
  refOrgNotify.focus(function() {
    var value = $(this).val();
    if (value == orgText) $(this).val('');
  }).blur(function () {
    var value = $(this).val();
    if (value == '') $(this).val(orgText);
  });
    
  // process email notify form submit
  refEmailNotify.tipsy({trigger: 'manual', title: 'tooltip', fade: true});
  $('#form-notify').submit(function (e) {
    e.preventDefault();
    var $email = $('#email'), 
        email  = $email.val();
    if(email && /^.*@.*\..*$/.test(email)){
      refEmailNotify.tipsy("hide");

      $.post(http+'includes/ajax/notify.php',{
        format: 'json',
        email: email
      }, function(d){
        if(d.status == '1'){
          refEmailNotify.attr('tooltip','Thank you! Stay in touch. :)');
          refEmailNotify.tipsy("show");
          userEmail = email;
          $('#launchlist').animate({height:'250px'}, 600, 'swing', function () {
            $('#name').focus();
          });
        } else {
          refEmailNotify.attr('tooltip',d.msg);
          refEmailNotify.tipsy("show");
        }
        refEmailNotify.attr('tooltip',toolTipTextDefault);
      }, 'json');
    } else {
      refEmailNotify.tipsy("show");
      refEmailNotify.trigger("focus");
      return false;
    }
  });
  
  // process notify form step2 submit
  $('#form-notify2').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: http+'includes/ajax/notify2.php',
      data: 'email='+encodeURIComponent(userEmail)+'&'+$("#form-notify2").serialize(),
      dataType: 'json',
      cache: false,
      type: 'post',
      success: function (r) {
        if(r.status == '1'){
          refEmailNotify.attr('tooltip','Thanks for sharing more about yourself! We\'ll be in touch. :)');
          refEmailNotify.tipsy("show");
          $('#launchlist').animate({height:'85px'}, 600, 'swing');
        } else {
          refEmailNotify.attr('tooltip',r.msg);
          refEmailNotify.tipsy("show");
        }
      }
    });
  });
  
  $('#header-scroller div').marquee('pointer').mouseover(function () {
    $(this).trigger('stop');
  }).mouseout(function () {
    $(this).trigger('start');
  }).mousemove(function (event) {
    if ($(this).data('drag') == true) {
      this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
    }
  }).mousedown(function (event) {
    $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
  }).mouseup(function () {
    $(this).data('drag', false);
  });

  $(".videooverview").fancybox({
    'transitionIn' : 'elastic',
    'padding' : 0,
    'autoScale' : false,
    'transitionOut' : 'fade',
    'width' : 680,
    'height' : 410,
    'type' : 'swf'
  });
  
  $("a#header-hiring").fancybox({
    'autoDimensions': false,
    'width': 500,
    'height': 350
	});

});