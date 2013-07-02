var zeropad = function (num) {
  return ((num < 10) ? '0' : '') + num;
};
var iso8601 = function (date) {
  return date.getUTCFullYear()
    + "-" + zeropad(date.getUTCMonth()+1)
    + "-" + zeropad(date.getUTCDate())
    + "T" + zeropad(date.getUTCHours())
    + ":" + zeropad(date.getUTCMinutes())
    + ":" + zeropad(date.getUTCSeconds()) + "Z";
};

function prepareDynamicDates() {
  $('abbr.loaded').attr("title", iso8601(new Date()));
  $('abbr.modified').attr("title", iso8601(new Date(document.lastModified)));
}

function loadNumbers() {
  jQuery.timeago.settings.strings.numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
}
function unloadNumbers() {
  jQuery.timeago.settings.strings.numbers = [];
}

function loadCutoffSetting() {
	jQuery.timeago.settings.cutoff = 7*24*60*60*1000;
}

function unloadCutoffSetting() {
	jQuery.timeago.settings.cutoff = 0;
}

function loadPigLatin() {
  jQuery.timeago.settings.strings = {
    suffixAgo: "ago-hay",
    suffixFromNow: "omNow-fray",
    seconds: "ess-lay an-thay a-hay inute-may",
    minute: "about-hay a-hay inute-may",
    minutes: "%d inutes-may",
    hour: "about-hay an-hay hour-hay",
    hours: "about-hay %d hours-hay",
    day: "a-hay ay-day",
    days: "%d ays-day",
    month: "about-hay a-hay onth-may",
    months: "%d onths-may",
    year: "about-hay a-hay ear-yay",
    years: "%d years-yay",
    weekdaynames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthnames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
}

function loadRussian() {
  (function() {
    function numpf(n, f, s, t) {
      // f - 1, 21, 31, ...
      // s - 2-4, 22-24, 32-34 ...
      // t - 5-20, 25-30, ...
      var n10 = n % 10;
      if ( (n10 == 1) && ( (n == 1) || (n > 20) ) ) {
        return f;
      } else if ( (n10 > 1) && (n10 < 5) && ( (n > 20) || (n < 10) ) ) {
        return s;
      } else {
        return t;
      }
    }

    jQuery.timeago.settings.strings = {
      prefixAgo: null,
      prefixFromNow: "через",
      suffixAgo: "назад",
      suffixFromNow: null,
      seconds: "меньше минуты",
      minute: "минуту",
      minutes: function(value) { return numpf(value, "%d минута", "%d минуты", "%d минут"); },
      hour: "час",
      hours: function(value) { return numpf(value, "%d час", "%d часа", "%d часов"); },
      day: "день",
      days: function(value) { return numpf(value, "%d день", "%d дня", "%d дней"); },
      month: "месяц",
      months: function(value) { return numpf(value, "%d месяц", "%d месяца", "%d месяцев"); },
      year: "год",
      years: function(value) { return numpf(value, "%d год", "%d года", "%d лет"); }
    };
  })();
}

function loadMillis() {
  var millisSubstitution = function(number, millis) { return millis + " milliseconds"; };
  jQuery.timeago.settings.strings = {
    suffixAgo: "ago",
    suffixFromNow: "from now",
    seconds: millisSubstitution,
    minute: millisSubstitution,
    minutes: millisSubstitution,
    hour: millisSubstitution,
    hours: millisSubstitution,
    day: millisSubstitution,
    days: millisSubstitution,
    month: millisSubstitution,
    months: millisSubstitution,
    year: millisSubstitution,
    years: millisSubstitution,
    weekdaynames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthnames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
}

function loadNoSpaces() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    minutes: "%dminutes",
    wordSeparator: ""
  });
}

function loadNullSpaces() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    minutes: "%dminutes",
    wordSeparator: null
  });
}

function loadYoungOldYears() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    years: function(value) { return (value < 21) ? "%d young years" : "%d old years"; }
  });
}

function loadCustomRange() {
  var getSeconds = function(milis) {return Math.abs(milis) / 1000};
  var getMinutes = function(milis) {return getSeconds(milis) / 60};
  var getHours = function(milis) {return getMinutes(milis) / 60};
  var getDays = function(milis) {return getHours(milis) / 24};
  var getYears = function(milis) {return getDays(milis) / 365};

  jQuery.timeago.settings.customRanges = [
    {max:3600, substitute:function(number, millis) { // < 1 hour
      return jQuery.timeago.settings.strings.hour;
    }},
    {max:86400, substitute:function(number, millis) { // < 1 day
      var hours = getHours(millis);
      return hours == 1 ? jQuery.timeago.settings.strings.hour : jQuery.timeago.settings.strings.hours;
    }, getNumber:function(millis) {
      return getHours(millis);
    }},
    {max:604800, noSuffix:true, substitute:function(number, millis) { // < 1 week
      var date = new Date(new Date().getTime() - millis);
      return jQuery.timeago.settings.strings.weekdaynames[date.getDay()];
    }},
    {max:0, noSuffix:true, substitute:function(number, millis) { // else
      var date = new Date(new Date().getTime() - millis);
      return jQuery.timeago.settings.strings.monthnames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
    }}
  ];
}

function unloadCustomRange() {
  jQuery.timeago.settings.customRanges = null;
}