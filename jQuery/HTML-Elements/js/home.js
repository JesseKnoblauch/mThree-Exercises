$(document).ready(function () {
      $("h1, h2").addClass("text-center");

      $(".myBannerHeading").removeClass("myBannerHeading").addClass("page-header");

      $("#yellowHeading").text("Yellow Team");

      $(".yellow").css("background-color", "yellow");

      $(".red").css("background-color", "red");

      $(".blue").css("background-color", "blue");

      $(".orange").css("background-color", "orange");

      $("#yellowTeamList").append("<li>Joseph Banks</li>", "<li>Simon Jones</li>");

      $("#oops").hide();

      $("#footerPlaceholder").remove();

      $("#footer").append("<p id='contact-details'></p>");

      $("#contact-details").css("font-family", "Courier");

      $("#contact-details").css("font-size", "24px");

      $("#contact-details").text('NAME: Jesse Knoblauch EMAIL: jesatlas@gmail.com');

      
});
