function SubmitQueryData(n, t,formid) {
  debugger;
  var sourcename='';
  var message=$('#'+formid).find('[name="message"]');

  debugger;
  var c = HiddenValues.vCity,
      l = HiddenValues.vCountry,
      s = HiddenValues.vIP,
      a = n.vURL + "{device=" + HiddenValues.iqGuid + "}",
      v = contains.call(blockedIP, s),
      o, i, r, u, f, e, h;
  if (!v) {
      if (o = $('#'+formid).find('input[name="name"]').val(), checkempty(o)) return invalid_data_msg($('#'+formid).find('input[name="name"]'), "Please enter a valid name to submit your query!"), $('#'+formid).find('input[name="name"]').focus(), !1;
      if (invalid_data_msg($('#'+formid).find('input[name="name"]'), ""), i = "", checkempty(t.SenderControlCountryCodeID)) i = HiddenValues.vCountryCode;
      else if (i = $("#" + t.SenderControlCountryCodeID).val(), i == undefined) i = HiddenValues.vCountryCode;
      else {
          if (checkempty(i)) return invalid_data_msg($("#" + t.SenderControlCountryCodeID), "Please enter a valid country-code to submit your query!"), $("#" + t.SenderControlCountryCodeID).focus(), !1;
          invalid_data_msg($("#" + t.SenderControlCountryCodeID), "")
      }
      if (r = $('#'+formid).find('input[name="number"]').val(), checkempty(r)) return invalid_data_msg($('#'+formid).find('input[name="number"]'), "You have entered an invalid mobile number. Please try again."), $('#'+formid).find('input[name="number"]').focus(), !1;
      if (is_numeric(r)) {
          if (HiddenValues.vCountryCode == "+91" && r.length != 10) return invalid_data_msg($('#'+formid).find('input[name="number"]'), "Please enter a valid 10 digit mobile number."), $('#'+formid).find('input[name="number"]').focus(), !1;
          invalid_data_msg($('#'+formid).find('input[name="number"]'), "")
      } else return invalid_data_msg($('#'+formid).find('input[name="number"]'), "You have entered an invalid mobile number. Please try again."), $('#'+formid).find('input[name="number"]').focus(), !1;
      if (u = $('#'+formid).find('input[name="email"]').val(), checkempty(u)) return invalid_data_msg($('#'+formid).find('input[name="email"]'), "You have entered an invalid e-mail address. Please try again."), $('#'+formid).find('input[name="email"]').focus(), !1;
      if (validate_email(u)) invalid_data_msg($('#'+formid).find('input[name="email"]'), "");
      else return invalid_data_msg($('#'+formid).find('input[name="email"]'), "You have entered an invalid e-mail address. Please try again."), $('#'+formid).find('input[name="email"]').focus(), !1;
      if (qMessage = message.val()+sourcename, checkempty(qMessage)) return invalid_data_msg(message, "Please provide some information about your query!"), message.focus(), !1;
      invalid_data_msg(message, "");
      f = $("#" + t.SenderControlTimeID).val();
      f === undefined && (f = "");
      e = $("#" + t.SenderControlBudgetRangeID).val();
      checkempty(e) && (e = "Any");
      setProjectQueryData(n.vAgentID, o, i, f, r, u, qMessage, l, c, s, a, n.vProject, e);
      $('#'+formid).find('input[name="name"]').val("");
      $('#'+formid).find('input[name="number"]').val("");
      $('#'+formid).find('[name="message"]').val("");
      $('#'+formid).find('input[name="email"]').val("");
      window.location.href=n.thankspageurl;

      message.val("");
      $("#" + t.SenderControlTimeID).prop("selectedIndex", 0);
      h = window.open(n.thankspageurl, "popupWindow", "popupWindow", "width=359,height=365,top=150,left=500,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
      setTimeout(function() {
          h.close()
      }, 3e3)
  }
  return !0
}

function setProjectQueryData(n, t, i, r, u, f, e, o, s, h, c, l, a) {
  var v;
  v = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
  v.onreadystatechange = function() {
      v.readyState == 4 && v.status == 200
  };
  v.open("GET", "https://api2.gtftech.com/AjaxHelper/AgentInstantQuerySetter.aspx?qAgentID=" + n + "&qSenderName=" + t + "&qMobileNo=" + u + "&qEmailID=" + f + "&qCountryCode=" + i + "&qTimeslot=" + r + "&qQueryMessage=" + e + "&qCountry=" + o + "&qCityName=" + s + "&qIP=" + h + "&micrositeurl=" + c + "&qProjectName=" + l + "&qBudgetRange=" + a + "", !0);
  v.send()
}

function isNumberKey(n) {
  var t = n.which ? n.which : event.keyCode;
  return t > 31 && (t < 48 || t > 57) ? !1 : !0
}

function emailValidator(n) {
  return n.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) ? !0 : (alert("Invalid E-mail Address! Please re-enter ?"), n.focus(), !1)
}

function validate_email(n) {
  var t = !1;
  return n.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) != null && (t = !0), t
}

function is_numeric(n) {
  return /^[0-9-+]+$/.test(n) ? !0 : !1
}

function checkempty(n) {
  return n == null || n == undefined || n == "undefined" || n == "" || n.length == 0 ? !0 : !1
}

function getCookie(n) {
  for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
      for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1);
      if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
  }
  return ""
}

function setCookie(n, t, i) {
  var r = new Date,
      u;
  r.setTime(r.getTime() + i * 864e5);
  u = "expires=" + r.toUTCString();
  document.cookie = n + "=" + t + ";" + u + ";path=/"
}

function randomValueGenerator(n, t) {
  for (var r = "", u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", f = u.length, i = 0; i < n; i++) i != 0 && i % t == 0 && i - 1 != n && (r += "-"), r += u.charAt(Math.floor(Math.random() * f));
  return r
}
var HiddenValues = {
      vCity: "",
      vIP: "",
      vCountry: "",
      vCountryCode: "",
      iqGuid: ""
  },
  blockedIP = ["180.151.11.118", "219.90.110.197", "49.248.15.74", "103.174.87.30", "122.176.28.132", "49.36.139.148", "49.36.136.174", "49.204.92.150"],
  contains = function(n) {
      var t = n !== n,
          i;
      return i = t || typeof Array.prototype.indexOf != "function" ? function(n) {
          for (var i = -1, u = -1, r, i = 0; i < this.length; i++)
              if (r = this[i], t && r !== r || r === n) {
                  u = i;
                  break
              } return u
      } : Array.prototype.indexOf, i.call(this, n) > -1
  },
  invalid_data_msg = function(n, t) {
      checkempty(t) ? ($(n).attr("data-exists", "false"), $(n).next(".invalid-data").remove()) : ($(n).attr("data-exists", "true"), $(n).next(".invalid-data").remove(), $(n).after("<label class='invalid-data existingCheck' style='color:red; width:100%;padding-left: 10px;background-color: #ffffff;'> " + t + "<\/label>"))
  };
$(document).on("keypress", ".number-only", function(n) {
  var t = isNumberKey(n);
  t ? invalid_data_msg(this, "") : ($(this).focus(), invalid_data_msg(this, "You have entered an invalid mobile number. Please try again."))
});
$(document).on("focusout", ".number-only", function() {
  var n = $(this).val(),
      t;
  checkempty(n) ? invalid_data_msg(this, "") : (t = is_numeric(n), t ? invalid_data_msg(this, "") : ($(this).focus(), invalid_data_msg(this, "You have entered an invalid mobile number. Please try again.")))
});
$(document).on("focusout", ".email-address", function() {
  var n = $(this).val(),
      t;
  checkempty(n) ? invalid_data_msg(this, "") : (t = validate_email(n), t ? invalid_data_msg(this, "") : ($(this).focus(), invalid_data_msg(this, "You have entered an invalid e-mail address. Please try again.")))
});
$(document).ready(function() {
  var n = getCookie("IQDGUID"),
      t, i;
  checkempty(n) && (t = randomValueGenerator(24, 24), setCookie("IQDGUID", t, 2), n = getCookie("IQDGUID"));
  i = "https://api2.gtftech.com/ip/visits?user_did=" + n + "&url=" + n.vURL + "&project=" + n.vProject + "&query_id=0&event_type=Page Load&agent_id=" + n.vAgentID + "";
  $.ajax({
      url: i,
      type: "GET",
      success: function(t) {
          HiddenValues.vCity = t[0].city;
          HiddenValues.vCountry = t[0].country;
          HiddenValues.vIP = t[0].ip;
          HiddenValues.vCountryCode = "+" + t[0].callingCode;
          HiddenValues.iqGuid = n;
          var i = contains.call(blockedIP, t[0].ip);
          i && $('input[type="submit"]').css("display", "none");
      },
      error: function(n) {
          console.log(n)
      }
  })
});


function formValidation(e,name,redirect,vURL=''){
  e.preventDefault();
  debugger;
  var formid=e.target.id;
        var AgentInfo = {
              "vAgentID": "4807",
              "vProject": name,
              "vURL": vURL,
              "thankspageurl": redirect,
          };
          var FormInfo = {
          "SenderControlID": "name",
             "SenderControlMobileID": "number",
             "SenderControlEmailID": "email",
             "SenderControlMsgID": "message",
             "source": "source",

         };
  SubmitQueryData(AgentInfo,FormInfo, formid);
}