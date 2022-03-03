$(document).ready(function () {

    loadDVDs();
    addDVD();
    updateDVD();
    searchDVD();

});

function loadDVDs() {
    clearTable();

    var contentRows = $("#contentRows");

    $.ajax({
        type: "GET",
        url: "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds",
        success: function(dvdArray) {
            $.each(dvdArray, function(index, dvd){
                var title = dvd.title;
                var release = dvd.releaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var notes = dvd.notes;
                var dvdId = dvd.id;

                var row = '<tr>';
                row += '<td>' + title + '</td>';
                row += '<td>' + release + '</td>';
                row += '<td>' + director + '</td>';
                row += '<td>' + rating + '</td>';
                row += '<td><button onclick="showEditForm(' + dvdId + ')" type="button" class="btn btn-info">Edit</button></td>';
                row += '<td><button onclick="deleteDVD(' + dvdId + ')" type="button" class="btn btn-danger">Delete</button></td>';
                row += '</tr>';

                contentRows.append(row);
            })
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
        }
    })
}

function clearTable() {
    $("#contentRows").empty();
}

function addDVD() {
    $("#addButton").click(function(event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#editForm').find('input'));

        if(haveValidationErrors) {
          return false;
        }

        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd',
           data: JSON.stringify({
                title: $('#addTitle').val(),
                releaseYear: $('#addRelease').val(),
                director: $('#addDirector').val(),
                rating: $('#addRating').val(),
                notes: $('#addNotes').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#addTitle').val('');
               $('#addRelease').val('');
               $('#addDirector').val('');
               $('#addRating').val('');
               $('#addNotes').val('');
               hideAddForm();
               showTable();
               loadDVDs();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
           }
        })
    })
}

function searchDVD() {
    $("#searchButton").click(function(event) {
        if($("#inputSearch").val().length < 1) {
            loadDVDs();
            return false;
        }
        console.log($("#inputSearch").val());

        var url = "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/" +
            $("#categorySelect").val() +
            "/" +
            $("#inputSearch").val();

        console.log(url);

        clearTable();

        var contentRows = $("#contentRows");

        $.ajax({
            type: "GET",
            url: url,
            success: function(dvdArray) {
                $.each(dvdArray, function(index, dvd){
                    var title = dvd.title;
                    var release = dvd.releaseYear;
                    var director = dvd.director;
                    var rating = dvd.rating;
                    var notes = dvd.notes;
                    var dvdId = dvd.id;

                    var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + release + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><button onclick="showEditForm(' + dvdId + ')" type="button" class="btn btn-info">Edit</button></td>';
                    row += '<td><button onclick="deleteDVD(' + dvdId + ')" type="button" class="btn btn-danger">Delete</button></td>';
                    row += '</tr>';

                    contentRows.append(row);
                })
            },
            error: function() {
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
            }
        })
    })
}

function showAddForm() {
    $("#errorMessages").empty();
    $("#addFormDiv").show();
    $("#editFormDiv").hide();
    $("#dvdTableDiv").hide();
}

function showEditForm(dvdId) {
    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/" + dvdId,
        success: function(data, status) {
            $('#editTitle').val(data.title);
            $('#editRelease').val(data.releaseYear);
            $('#editDirector').val(data.director);
            $('#editRating').val(data.rating);
            $('#editNotes').val(data.notes);
            $('#editDVDId').val(data.id);
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
        }
    })

    $("#errorMessages").empty();
    $("#addFormDiv").hide();
    $("#editFormDiv").show();
    $("#dvdTableDiv").hide();
}

function showTable(dvdId) {
    loadDVDs();
    $("#errorMessages").empty();
    $("#addFormDiv").hide();
    $("#editFormDiv").hide();
    $("#dvdTableDiv").show();
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

function updateDVD(dvdId) {
    $('#editButton').click(function(event) {
      var haveValidationErrors = checkAndDisplayValidationErrors($('#editForm').find('input'));

      if(haveValidationErrors) {
          return false;
      }

        $.ajax({
            type: 'PUT',
            url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + $('#editDVDId').val(),
            data: JSON.stringify({
                id: $('#editDVDId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editRelease').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'success': function() {
                showTable();
            },
            'error': function(err) {
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
            }
        })
    })
}

function deleteDVD(dvdId) {
  $.ajax({
    type: "DELETE",
    url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
    success: function() {
      loadDVDs();
    }
  })
}
