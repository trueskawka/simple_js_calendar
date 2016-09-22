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
          first = first - 1;
        } else {
          first = 6;
        }
      }
      while (first > 0) {
        $(month[1]).append("<div class='date empty'></div>");
        first -= 1;
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
      var value = String(day.getFullYear());

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
    var val = postsNumber[p];
    var dday = p.substr(6,2);
    var dmonth = p.substr(4,2);
    var dyear = p.substr(0,4);

    if (val == 1) {
      pp = " post ";
    } else if ([2,3,4].indexOf(val) > -1 && lang == "pl") {
      pp = " posty ";
    } else if (lang == "pl") {
      pp = " postów ";
    } else {
      pp = " posts ";
    }

    if (lang == "pl") {
      title = val + pp + "- " + dday + "." + dmonth + "." + dyear;
    } else {
      title = val + pp + "- " + dmonth + "/" + dday + "/" + dyear;
    }

    string = "<div title='" + title + "' class='date"

    if (val == 0) {
      string += "'></div>"
    } else {
        if (val == 1) {
        string += " one'></div>"
      } else if (val == 2) {
        string += " two'></div>"
      } else if (val == 3) {
        string += " three'></div>"
      } else {
        string += " more'></div>"
      }
      //blog host + languge version + date + category
      string = "<a href='" + host + dt + p + "/" + cat + ".html'>" + string + "</a>"
    }

    month_list.forEach(function(month) {
      if (parseInt(dmonth) == month[0]) {
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
