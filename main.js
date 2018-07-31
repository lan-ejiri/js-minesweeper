$(document).ready(function() {
  $("#game-board").hide();
  var numRows, numCols;
var pp=0;
  $("#start").on("click", function() {
    numRows = parseInt($("#numRows").val());
    numCols = parseInt($("#numCols").val());
  });

  $("#sm").on("click", function() {
    numRows = 8;
    numCols = 8;
  });
  $("#md").on("click", function() {
    numRows = 16;
    numCols = 16;
  });
  $("#lg").on("click", function() {
    numRows = 24;
    numCols = 24;
  });

  $(".start-button").on("click", function() {
    $("#board-size-input").hide();
    $("#game-board").show();
    showBoard(numRows, numCols);
  });

  function showBoard(a, b) {
    console.log(a + b);

    for (i = 0; i < numCols; i++) {
      var $gameCol = $("<div>");
      $gameCol.addClass("columnz");
      $gameCol.text(i + 1);
      $("#game-board").append($gameCol);
      for (j = 0; j < numRows; j++) {
          var $gameRow = $("<div>");
          $gameRow.addClass("rowz")
          pp++;
          $gameRow.text(pp)
          $gameCol.append($gameRow);
          
      }
    }
  }
});
