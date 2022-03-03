$(document).ready(function () {
    var hideMain = function() {
      $("#mainInfoDiv").hide();
    }

    var hideAkron = function() {
      $("#akronInfoDiv").hide();
    }

    var hideMinne = function() {
      $("#minneapolisInfoDiv").hide();
    }

    var hideLouis = function() {
      $("#louisvilleInfoDiv").hide();
    }

    var showAkron = function() {
      $("#akronInfoDiv").show();
    }

    var showMinne = function() {
      $("#minneapolisInfoDiv").show();
    }

    var showLouis = function() {
      $("#louisvilleInfoDiv").show();
    }

    var showMain = function() {
      $("#mainInfoDiv").show();
    }

    var toggleAkronWeather = function() {
      $("#akronWeather").toggle();
    }

    var toggleMinneWeather = function() {
      $("#minneapolisWeather").toggle();
    }

    var toggleLouisWeather = function() {
      $("#louisvilleWeather").toggle();
    }

    hideAkron();
    hideMinne();
    hideLouis();

    $("#akronWeather").hide();
    $("#minneapolisWeather").hide();
    $("#louisvilleWeather").hide();

    $("#mainButton").on("click", function () {
      showMain();
      hideAkron();
      hideMinne();
      hideLouis();
    });

    $("#akronButton").on("click", function () {
      hideMain();
      showAkron();
      hideMinne();
      hideLouis();
    });

    $("#minneapolisButton").on("click", function () {
      hideMain();
      hideAkron();
      showMinne();
      hideLouis();
    });

    $("#louisvilleButton").on("click", function () {
      hideMain();
      hideAkron();
      hideMinne();
      showLouis();
    });

    $("#akronWeatherButton").on("click", toggleAkronWeather);
    $("#minneapolisWeatherButton").on("click", toggleMinneWeather);
    $("#louisvilleWeatherButton").on("click", toggleLouisWeather);

    $("tr:not(:first-child)").hover(
      function () {
        $(this).css("background-color", "WhiteSmoke");
      },

      function () {
        $(this).css("background-color", "white");
      }

    );
});
