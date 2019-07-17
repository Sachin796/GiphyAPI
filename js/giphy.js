window.onload = function(e) {
  console.log(e.target);
  console.log("Page loaded");
};
$("#btn1").on("click", function() {
  var array = [];
  var text = $("#buttondata").val();
  console.log(text);

  var x = $("#buttonadd").append(
    `&nbsp;&nbsp;<button id=${text}>${text}</button>`
  );
  $("button").on("click", function(e) {
    $("#output").empty();
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
          console.log("inside for");
          let div = `<div id=${response.data[i]} >`;
          var divdata = $("<img >");
          divdata.attr("src", response.data[i].images.fixed_height.url);
          divdata.attr("type", "animated");
          let divend = `</div>`;

          $("#output").append(div, divdata, divend);

          $("#output").on("click", function(e) {
            console.log(response);
            console.log($(e.target).attr("type"));
            if ($(e.target).attr("type") === "animated") {
              divdata.attr(
                "src",
                response.data[i].images.fixed_height_still.url
              );
              divdata.attr("type", "static");
            } else if ($(e.target).attr("type") === "static") {
              divdata.attr("src", response.data[i].images.fixed_height.url);
              divdata.attr("type", "animated");
            }
          });
        }
      });
    }
    console.log(document);
  });
});
