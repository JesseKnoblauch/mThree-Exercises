$(document).ready(function () {

  getWeather();

});

var key = "b5083a2495021cb27091be1cd910f50e";

function getWeather() {
    $("#weatherButton").click(function(event) {
        getCurrent();
        getForecast();
    })
}

function getCurrent() {
    var elements = $("input, select")

    var haveValidationErrors = checkAndDisplayValidationErrors($('#weatherForm').find(elements));

    if(haveValidationErrors) {
        return false;
    }

    var zip = $("#zip").val();
    var units = $("#unitsInput").val();

    var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=" + units + "&appid=" + key

    var distanceUnit;
    var weatherUnit;
    if(units == "imperial") {
        distanceUnit = "miles";
        weatherUnit = "F";
    } else {
        distanceUnit = "km";
        weatherUnit = "C";
    }

    $.ajax({
        type: 'GET',
        url: url,
        success: function(data, status) {
            showCurrent();
            $("#currentHeader").text("Current Conditions in " + data.name);
            $("#currentMain").text(data.weather[0].main + ": " + data.weather[0].description);
            $("#currentIcon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $("#temp").text("Temperature: " + data.main.temp + " " + weatherUnit);
            $("#humidity").text("Humidity: " + data.main.humidity + "%");
            $("#wind").text("Wind: " + data.wind.speed + " " + distanceUnit + "/hour");
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
        }
    })
}

function getForecast() {
    $("#forecastContent").empty();
    var elements = $("input, select")

    var haveValidationErrors = checkAndDisplayValidationErrors($('#weatherForm').find(elements));

    if(haveValidationErrors) {
        return false;
    }

    var zip = $("#zip").val();
    var units = $("#unitsInput").val();

    var url = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",us&units=" + units + "&appid=" + key;
    var distanceUnit;
    var weatherUnit;
    if(units == "imperial") {
        distanceUnit = "miles";
        weatherUnit = "F";
    } else {
        distanceUnit = "km";
        weatherUnit = "C";
    }

    var counter = 0;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(data, status) {
            $.each(data.list, function(index, day) {
                if(counter == 7) {
                    console.log(day);
                    var date = getDayMonth(day.dt_txt);
                    var img = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
                    var main = day.weather[0].main;
                    var high = "H " + day.main.temp_max + " " + weatherUnit + " - ";
                    var low = "L " + day.main.temp_min + " " + weatherUnit;

                    var day = "<div class='col-md-2 text-center'>";

                        day += "<div class='row'>";
                        day += "<span class='col-md-12'>" + date + "</span>";
                        day += "</div>";

                        day += "<div class='row'>";
                            day += "<div class='col-md-12'>";
                                day += "<img src='" + img + "' alt=''>";
                                day += "<span>" + main + "</span>";
                            day += "</div>";
                        day += "</div>";

                        day += "<div class='row'>";
                            day += "<div class='col-md-12'>";
                                day += "<span>" + high + "</span>";
                                day += "<span>" + low + "</span>";
                            day += "</div>";
                        day += "</div>";

                    day += "</div>";

                    $("#forecastContent").append(day);
                }
                counter ++;
                if(counter == 8) {
                    counter = 0;
                }
            })
        },
        error: function(err) {
            if(err.status == 404) {
                $("#errorMessages").empty;
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Zipcode: Please enter a 5-digit zip code.'));
                return false;
            } else {
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
            }

        }
    })
}

function getDayMonth(date) {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var monthNum = parseInt(date.slice(5, 7));

    var monthWord = months[monthNum];

    var dayNum = parseInt(date.slice(8, 10));

    return dayNum + " " + monthWord;
}


function showCurrent() {
    $("#currentWeather").show();
}

function showForecast() {
    $("#forecastWeather").show();
}

function checkAndDisplayValidationErrors(input) {
    $('#errorMessages').empty();

    var errorMessages = [];

    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message) {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}
