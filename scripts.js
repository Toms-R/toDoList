var divID;

$(document).click(function(event) {
    console.log(event.target);


    divID = $(event.target);
    if (divID.is("td")) {
        divID.addClass("selected");
    }



});

function GetScope() {
    console.log($(".table").find('th').text());
}


$(document).ready(function() {

    $("#button").click(function() {
        var addedText = $('input[name=checkListItem]').val();
        $(".list").append('<li class="item">' + addedText + "<a class='close'>X</a>" + '</li>');
    });

    $(document).on('click', '.item', function() {
        $(this).css("text-decoration", "line-through");
    });

    $(document).on('click', '.item a', function() {
        $(this).closest("li").fadeOut(1000, function() { $(this).remove(); });
    });


});