$(document).ready(function() {
  $("#game-board").hide();

  //CHOOSING SIZE OF BOARD
  // =================================================================
  var numRows, numCols;
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
  // ====================================================================

  // WHEN ANY START BUTTON IS CLICKED
  // ====================================================================
  $(".start-button").on("click", function() {
    showBoard(numRows, numCols);
  });
  //=====================================================================

  //SHOWING THE ACTUAL BOARD, INPUTTING CLASSES TO EACH BOX
  //================================================================
  function showBoard(a, b) {
    $("#board-size-input").hide();
    $("#game-board").show();
    $("#numRows").val("");
    $("#numCols").val("");
    $("#game-board").empty();
    for (let i = 0; i < a; i++) {
      const $row = $("<div>").addClass("rowz");
      for (let j = 0; j < b; j++) {
        const $col = $("<div>")
          .addClass("eachbox unclicked")
          .attr("i", i)
          .attr("j", j);
        if (Math.random() > 0.86) {
          $col.addClass("mine");
        }
        $row.append($col);
      }
      $("#game-board").append($row);
    }
  }
  // =====================================================================

  //WHAT HAPPENS WHEN A BOX IS CLICKED
  // ======================================================================
  $("#game-board").on("click", ".eachbox.unclicked", function() {
    const $cell = $(this);
    const thei = $cell.attr("i");
    const thej = $cell.attr("j");

    //checking if has mine
    if ($cell.hasClass("mine")) {
      var restart = confirm(":c u exploded. play again?");

      if (restart == true) {
        $("#board-size-input").show();
        $("#game-board").hide();
      } else {
        console.log("DO NOTHIN I GUESS");
      }
    } else {
      showneighbors(thei, thej);
    }
  });

  function showneighbors(initiali, initialj) {
    const seen = {};
    function helper(ani, anj) {
      if (ani >= numRows || anj >= numCols || ani < 0 || anj < 0) {
        return;
      }
      const key = `${ani} ${anj}`;
      console.log("key", key);
      if (seen[key]) return;
      const $cell = $(`.eachbox.unclicked[i=${ani}][j=${anj}]`);
      const mineCount = getMineCount(ani, anj);
      if (!$cell.hasClass("unclicked") || $cell.hasClass("mine")) {
        return;
      }

      $cell.removeClass("unclicked");

      if (mineCount) {
        $cell.text(mineCount);
        return;
      }

      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          helper(di + parseInt(ani), dj + parseInt(anj));
        }
      }
    }

    helper(initiali, initialj);
  }

  function getMineCount(i, j) {
    let pp = 0;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const newi = i + di;
        const newj = j + dj;
        if (newi >= numRows || newj >= numCols || newj < 0 || newi < 0)
          continue;
        const $cell = $(`.eachbox.unclicked[i=${newi}][j=${newj}]`);
        if ($cell.hasClass("mine")) pp++;
      }
    }
    return pp;
  }
});
