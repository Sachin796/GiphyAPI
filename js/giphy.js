//window.onload = function(e) {};
//onclick of add button


$("#btn1").on("click", function() {
  
  //  var array = [];
  var text = $("#buttondata").val(); //getting value of the entered text

  $("#buttonadd").append(`&nbsp;&nbsp;<button id=${text} type="button" class="btn btn-primary">${text} </button>`); //creating new button element and adding to the div
  $("button").on("click", function(e) {
    $("#output").empty();
    $("#buttondata").val("");
    if (e.target.id != "btn1") {
      var queryurl =
        "https://api.giphy.com/v1/gifs/search?q=" +
        e.target.id +
        "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
        url: queryurl,
        method: "GET"
      }).then(function(response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          let div = `<div id=${response.data[i]} >`;
          var divdata = $("<img >");
          divdata.attr("src", response.data[i].images.fixed_height.url);
          divdata.attr("type", "animated");
          divdata.attr("height", "150px");
          divdata.attr("width", "150px");
         // divdata.attr("margin-top","20px");
          divdata.attr("id", response.data[i].id);
          divdata.attr(
            "style",
            "margin-left:45%;border-radius:30%;margin-top:30px;border:2px solid red"
          );
          let divend = `</div>`;

          $("#output").append(div, divdata, divend);
        }
        $("#output").on("click", function(e) {
          for (var j = 0; j < 10; j++) {
            if (response.data[j].id === $(e.target).attr("id")) {
              if ($(e.target).attr("type") === "animated") {
                console.log("Inside change");
                $(e.target).attr(
                  "src",
                  response.data[j].images.fixed_height_still.url
                );
                $(e.target).attr("type", "static");
              } else if ($(e.target).attr("type") === "static") {
                $(e.target).attr(
                  "src",
                  response.data[j].images.fixed_height.url
                );
                $(e.target).attr("type", "animated");
              }
            }
          }
        });
      });
    }
  });
 
  $("#buttondata").val("");
});

