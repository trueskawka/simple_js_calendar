$(function() {
  //category for subpages
  var cat = $("#calendar").attr("datacat");
  var host = window.location.origin;
  var dates = []
  var postsNumber = {};
  var dates;
  var lang = window.location.pathname.substr(1,2)

  //mockup first 4 months
  var months = [
    [8, new Array(31)
    .join().split(',')
    .map(function(item, index){ return ++index; })],
    [9, new Array(30)
    .join().split(',')
    .map(function(item, index){ return ++index; })],
    [10, new Array(31)
    .join().split(',')
    .map(function(item, index){ return ++index; })],
    [11, new Array(30)
    .join().split(',')
    .map(function(item, index){ return ++index; })]
  ];

  //get dates from each post
  $('.dpost').each(function(i, p) {
    dates.push(p.getAttribute("postdate"));
  });

  //assign a number to each day of each month
  months.forEach(function(month) {
    for (var i = 1; i <= month[1].length; i++) {
      var value = "2016"
      if (month[0] < 10) {
        value += "0" + month[0];
      } else {
        value += month[0];
      }
      if (i < 10) {
        value += "0" + i;
      } else {
        value += i;
      }

      postsNumber[value] = dates.reduce(function(n, val) {
        return n + (val === value);
      }, 0);
    }
  });

  //remember about the language version
  if (lang == "pl") {
    dates = "/pl/dates/";
  } else {
    dates = "/dates/";
  }

  //create divs for every date and push them to months
  for(var p in postsNumber) {
    var pp;

    if (postsNumber[p] == 1) {
      pp = " post ";
    } else if ([2,3,4].indexOf(postsNumber[p]) > -1 && lang == "pl") {
      pp = " posty ";
    } else if (lang == "pl") {
      pp = " postów ";
    } else {
      pp = " posts ";
    }

    if (lang == "pl") {
      title = postsNumber[p] + pp + "- " + p.substr(6,2) + "." + p.substr(4,2) + "." + p.substr(0,4);
    } else {
      title = postsNumber[p] + pp + "- " + p.substr(4,2) + "/" + p.substr(6,2) + "/" + p.substr(0,4);
    }

    string = "<div title='" + title + "' class='"

    if (postsNumber[p] == 0) {
      string += "date'></div>"
    } else if (postsNumber[p] == 1) {
      string += "date one'></div>"
      string = "<a href='" + host + dates + p + "/" + cat + ".html'>" + string + "</a>"
    } else if (postsNumber[p] == 2) {
      string += "date two'></div>"
      string = "<a href='" + host + dates + p + "/" + cat + ".html'>" + string + "</a>"
    } else if (postsNumber[p] == 3) {
      string += "date three'></div>"
      string = "<a href='" + host + dates + p + "/" + cat + ".html'>" + string + "</a>"
    } else {
      string += "date more'></div>"
      string = "<a href='" + host + dates + p + "/" + cat + ".html'>" + string + "</a>"
    }

    if (parseInt(p.substr(4,2)) == 8) {
      $( "#august" ).append( string );
    } else if (parseInt(p.substr(4,2)) == 9) {
      $( "#september" ).append( string );
    } else if (parseInt(p.substr(4,2)) == 10) {
      $( "#october" ).append( string );
    } else {
      $( "#november" ).append( string );
    }
  }

  $('.date').hover(
     function () {
        $(this).css({"box-shadow":"0 0 0.5pt 0.5pt"});
     },
     function () {
        $(this).css({"box-shadow":"none"});
     }
  );
});
