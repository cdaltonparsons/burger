$(function() {
    $(".devour-btn").on("click", function(event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };

    $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
    }).then(
        function() {
            console.log("changed devoured to", newDevoured);
            //Reload the page to get the updated list
            location.reload();
        });
        });

        $(".create-form").on("submit", function(event) {
            event.preventDefault();

            var newBurger = {
                name: $("#burger").val().trim(),
                devoured: false
            };

            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(function() {
                console.log("Created new burger");
                location.reload();
            });
        });
    });
