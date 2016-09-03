//calendarView - docelowy
//dpost - lista danych
//postdate - dane w formie arraya [m,d]

$(function() {
  var months = [
    [8, new Array(31)
    .join().split(',')
    .map(function(item, index){ return ++index;})],
    [9, new Array(30)
    .join().split(',')
    .map(function(item, index){ return ++index;})],
    [10, new Array(31)
    .join().split(',')
    .map(function(item, index){ return ++index;})],
    [11, new Array(30)
    .join().split(',')
    .map(function(item, index){ return ++index;})]
  ];

  var dates = []
  $('.dpost').each(function(i, p) {
    dates.push(p.getAttribute("postdate"));
  });

  var postsNumber = {};

  months.forEach(function(month) {
    for (var i = 1; i <= month[1].length; i++) {
      var value = month[0]+"."+i;
      postsNumber[value] = dates.reduce(function(n, val) {
        return n + (val === value);
      }, 0);
    }
  });

  for(var p in postsNumber) {
    string = "<div class='"

    if (postsNumber[p] == 0) {
      string += "date'></div>"
    } else if (postsNumber[p] == 1) {
      string += "date one'></div>"
    } else if (postsNumber[p] == 2) {
      string += "date two'></div>"
    } else if (postsNumber[p] == 3) {
      string += "date three'></div>"
    } else {
      string += "date more'></div>"
    }

    if (parseInt(p) == 8) {
    $( "#august" ).append( string );
    } else if (parseInt(p) == 9) {
     $( "#september" ).append( string );
    } else if (parseInt(p) == 10) {
     $( "#october" ).append( string );
    } else {
     $( "#november" ).append( string );
    }
  }

});
