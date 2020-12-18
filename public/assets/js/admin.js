/*
 * admin common js
 * (c) 2020 Dusizhong.com
 * Released under the MIT License.
 */

$(document).ready(function() {
  // feather icons
  feather.replace();
  // set actived menu
  $('.nav a').removeClass('active');
  $('.nav a').each(function() {
    var url = window.location.href.split('?')[0];
    if($(this)[0].href == url || $(this)[0].href + '/editor' == url) {
      $(this).addClass('active');
    }
  })
  // remain search params
  $("#category").val(getQueryString('category'));
  $("#keyword").val(getQueryString('keyword'));
})

// get url params
function getQueryString(name) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split('=');
    if(pair[0] == name) { return pair[1]; }
  }
  return('');
}

// next page
function nextPage(page) {
  if(parseInt(page) == page) {
    window.location.href = window.location.href.split('?')[0] + '?page=' + page;
  }
}
// go page
$("#goPage").keydown(function(e) {
  if(e.keyCode == 13) {
    var page = $("#goPage").val();
    if(parseInt(page) == page) {
      window.location.href = window.location.href.split('?')[0] + '?page=' + page;
    }
  }
})