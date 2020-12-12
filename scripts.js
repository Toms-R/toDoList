var divID;

$(document).click(function(event) {
    console.log(event.target);

    //when td element is clicked give it a class .selected
    divID = $(event.target);
    if (divID.is("td")) {
        divID.toggleClass("selected");
    }
    if (divID.className = "selected") {
        //$(".modal").modal();
    }




});





$(document).ready(function() {



    $("#button").click(function() {


        var addedText = $('input[name=checkListItem]').val();
        var MyText = { 'name': 'Janis', 'lastname': 'Uzdevums' };
        //insert 
        var saveData = $.ajax({
            type: 'POST',
            url: "/cdc/create.php",
            data: MyText,
            dataType: "text",
            success: function(resultData) {
                var deita = JSON.parse(resultData);
                console.log(deita.id);
                console.log(resultData);
            }
        });
        //saveData.error(function() { alert("Something went wrong"); });

        $(".list").append('<li class="item" data-id="">' + addedText + "<a class='close'>X</a>" + '</li>');

    });

    $(document).on('click', '.item', function() {
        $(this).css("text-decoration", "line-through");
    });

    $(document).on('click', '.item a', function() {
        $(this).closest("li").fadeOut(1000, function() { $(this).remove(); });
    });


});