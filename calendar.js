$(function() {
  //category for subpages
  var cat = $("#calendar").attr("datacat");
  var lang = window.location.pathname.substr(1,2);
  var dt = "";
  var host = window.location.origin;

  //lists
  var dates = [];
  var months = [];

  //counter
  var postsNumber = {};

  //setup
  var month_list =[
                    [8, "#august"],
                    [9, "#september"],
                    [10, "#october"],
                    [11, "#november"]
                  ];
  var year_list = [2016];

  //make an array of all months and their days
  year_list.forEach(function(year) {
    month_list.forEach(function(month){
      months.push(getDaysInMonth(month[0]-1,year));
      var first = getFirstDay(month[0]-1,year);
      if (lang == "pl") {
        if (first > 0) {
          d = first - 1;
        } else {
          d = 6;
        }
        while (d > 0) {
          $(month[1]).append("<div class='date empty'></div>");
          d -= 1;
        }
      } else {
        while (first > 0) {
          $(month[1]).append("<div class='date empty'></div>");
          first -= 1;
        }
      }
    });
  });

  //get all days in a month
  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
   }

   function getFirstDay(month, year) {
     var date = new Date(year, month, 1);
     return date.getDay();
   }

  //get dates from each post
  $('.dpost').each(function(i, p) {
    dates.push(p.getAttribute("postdate"));
  });

  //assign a number to each day of each month
  months.forEach(function(month) {
    month.forEach(function(day) {
      //comparing objects didn't make sense
      //year
      var value = "20" + String(day.getYear()).substr(1,2);

      //month
      m = String(parseInt(day.getMonth()+1));
      if (m < 10) {
        value += "0" + m;
      } else {
        value += m;
      }

      //day
      d = String(parseInt(day.getDate()));
      if (d < 10) {
        value += "0" + d;
      } else {
        value += d;
      }

      postsNumber[value] = dates.reduce(function(n, val) {
        return n + (val === value);
      }, 0);
    });
  });

  //keep in mind the language version
  if (lang == "pl") {
    dt = "/pl/dates/";
  } else {
    dt = "/dates/";
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

    string = "<div title='" + title + "' class='date"

    if (postsNumber[p] == 0) {
      string += "'></div>"
    } else {
        if (postsNumber[p] == 1) {
        string += " one'></div>"
      } else if (postsNumber[p] == 2) {
        string += " two'></div>"
      } else if (postsNumber[p] == 3) {
        string += " three'></div>"
      } else {
        string += " more'></div>"
      }
      string = "<a href='" + host + dt + p + "/" + cat + ".html'>" + string + "</a>"
    }

    month_list.forEach(function(month) {
      if (parseInt(p.substr(4,2)) == month[0]) {
        $(month[1]).append(string);
      }
    });
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
