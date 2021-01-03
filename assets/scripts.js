window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

window.onload = function() {
    var cookieValue = window.getCookie("Theme");
    if (typeof cookieValue !== 'undefined') {
        console.log(window.getCookie("Theme"));
        document.getElementById("theme-color").value == cookieValue;

        if (cookieValue == "light") {
            document.getElementById("theme-color").classList.remove("dark-mode");
        }

        if (cookieValue == "dark") {
            var bodyClass = document.getElementById("theme-color");
            bodyClass.classList.add("dark-mode");
        }
    }
}

function changed() {
    var theme = document.getElementById("themeSelector").value;
    console.log(theme);
    if (theme == "dark") {
        var bodyClass = document.getElementById("theme-color");
        bodyClass.classList.add("dark-mode");
    }

    if (theme == "light") {
        document.getElementById("theme-color").classList.remove("dark-mode");
    }
    document.cookie = "Theme=" + theme + "; expires=Sat, 30 Jan 2021 01:00:00 UTC;";
    console.log(document.cookie);
}

var divID;
$(document).ready(function() {

    //generate table 

    // var topRow = ['Laiks', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena'];
    // var times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', ];

    // topRowLength = topRow.length;
    // timesLength = times.length;

    //generate header text

    // headerText = "<tr>";
    // for (i = 0; i < topRowLength; i++) {
    //     headerText += "<th  scope='col'>" + topRow[i] + "</th>";
    // }
    // headerText += "</tr>";

    // rowText = "";
    // for (j = 0; j < timesLength; j++) {

    //     rowText += "<tr>" + "<th scope='row'>" + times[j] + "</th>" + "<td></td><td></td><td></td><td></td><td></td><td></td><td></td>" + "</tr>";
    // }
    // rowText += "";

    //write Header text
    //document.getElementById("tHeader").innerHTML = headerText;

    //write times
    // document.getElementById("tBody").innerHTML = rowText;

    // Create task
    function createTask(id, text) {
        $(".list").append("<li class='item' contenteditable='true' data-id=" + id + ">" + text + "<a class='close'>X</a><span id='floppy'><i class='fa fa-floppy-o' aria-hidden='true'></i></span></li>");
    };

    //GET all tasks
    myTasks = {};
    $.ajax({
        type: 'GET',
        url: "api/read_tasks.php",
        data: myTasks,
        dataType: "text",
        success: function(resultTasks) {
            var deitaRead = JSON.parse(resultTasks);

            deitaRead.data.forEach(function(item) {
                createTask(item.id, item.uzdevums);
            });
        }
    });

    $("#button").click(function() {

        var addedText = $('input[name=checkListItem]').val();
        var MyText = { 'uzdevums': addedText };
        //insert 
        var saveData = $.ajax({
            type: 'POST',
            url: "api/create_task.php",
            data: MyText,
            dataType: "text",
            success: function(resultData) {
                var deita = JSON.parse(resultData);
                createTask(deita.id, addedText);
                $('input[name=checkListItem]').val('');
            }
        });
    });

    //TODO implement done functionality
    // $(document).on('click', '.item', function() {
    //     //$(this).css("text-decoration", "line-through");
    // });

    $(document).on('click', '.item a', function() {

        var task = $(this).closest("li");
        var teskId = task.data("id");
        var myTask = { "id": teskId };
        $.ajax({
            type: 'DELETE',
            url: "api/delete_task.php?id=" + teskId,
            data: myTask,
            dataType: "text",
            success: function() {
                task.fadeOut(1000, function() { $(this).remove(); });
            }
        });
    });

    //Update task


    $(document).on('click', '.item', function() {
        var task = $(this);
        var teskId = task.data("id");
        var actualTask = task.text();
        $("#floppy", task).css('display', 'block');
        task.css("color", "red");
    });

    $(document).on('blur', '.item', function() {
        var task = $(this);
        var teskId = task.data("id");
        var actualTask = task.text().replace('X', '');
        var selectedTask = { "id": teskId, "uzdevums": actualTask };
        // Don't allow user to leave if all data is not saved.
        // window.onbeforeunload = confirmExit;

        // function confirmExit() {
        //     return "You have attempted to leave this page. Are you sure?";
        // }

        $("#floppy", task).click(function() {
            $.ajax({
                type: 'PUT',
                url: "api/update_task.php",
                data: selectedTask,
                dataType: "text",
                success: function() {
                    $("#floppy", task).css('display', 'none');
                    console.log('clickeded');
                    task.css("color", "");
                    $("#successModal").fadeTo(2000, 500).slideUp(500, function() {
                        $("#successModal").modal('hide');
                    });
                },
                error: function() {
                    $("#errorModal").fadeTo(2000, 500).slideUp(500, function() {
                        $("#errorModal").modal('hide');
                    });
                }
            });
        });
    });

    $(document).click(function(event) {
        //when td element is clicked give it a class .selected
        divID = $(event.target);
        if (divID.is("td")) {
            divID.toggleClass("selected");
        }

        if (divID.className = "selected") {
            //$(".modal").modal();
        }
    });
});