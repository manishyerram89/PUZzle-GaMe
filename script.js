var moves = 0;
var table; 
var rows; 
var columns;
var textMoves;
var arrayForBoard;


var profile_name = localStorage.getItem('name');
var mobile = localStorage.getItem('mobile');
var dob = localStorage.getItem('dob');
var address = localStorage.getItem('address');
var profile_pic = localStorage.getItem('upload');
var html = '<div class="row"><div class="col-12 text-center bg-blue br-top"><img src="'+profile_pic+'" alt="Profile Pic" class="img-fluid profile_pic mt-4"><h5 class="profile_name">'+profile_name+'</h5><p class="profile_dob"><b>DOB:</b> '+dob+'</p></div><div class="col-12 text-left bg-light br-bottom"><p class="profile_mobile mt-3"><b>Mobile :</b>'+mobile+'</p><p class="profile_address"><b>Address:</b> '+address+'</p><a href="./" id="newGame" class="p-2">Logout</a></div></div>';
  

function start()
{
  var button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  details = document.getElementById("details");
  details.innerHTML = html;
  rows = 4;
  columns = 4;
  startNewGame();
}

function startNewGame()
{
  var arrayOfNumbers = new Array();
  var arrayHasNumberBeenUsed;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  rows = document.getElementById("rows").value;
  columns = document.getElementById("columns").value;
  textMoves.innerHTML = moves;
  // Create the proper board size.
  arrayForBoard = new Array(rows);
  for (var i = 0; i < rows; i++)
  {
    arrayForBoard[i] = new Array(columns);
  }
  // Set up a temporary array for
  // allocating unique numbers.
  arrayHasNumberBeenUsed = new Array( rows * columns );
  for (var i = 0; i < rows * columns; i++)
  {
    arrayHasNumberBeenUsed[i] = 0;
  }
 
  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++)
  {
    randomNumber = Math.floor(Math.random()*rows * columns);
    // If our random numer is unique, add it to the board.
    if (arrayHasNumberBeenUsed[randomNumber] == 0) 
    {
      arrayHasNumberBeenUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
	// Our number is not unique. Try again.
    else
    {
      i--;
    }
  }
  
  // Assign numbers to the game board.
  count = 0;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      arrayForBoard[i][j] = arrayOfNumbers[count];
      
      count++;
    }
  }
  showTable();
}

function showTable()
{
    const compare_arr = [];
    var move_arr = [];
    for(var abc = 1; abc < (rows * columns); abc++)
    {
    	compare_arr.push(abc);
    }
    compare_arr.push(0);

  var outputString = "";
  for (var i = 0; i < rows; i++)
  {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++)
    {
        move_arr.push(arrayForBoard[i][j]);
        if (arrayForBoard[i][j] == 0)
        {
            outputString += "<td class=\"blank\"> </td>";
        }
        else
        {
            outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
        }
    } 
	// end for (var j)
    outputString += "</tr>";
  } 
  // end for (var i)
  table.innerHTML = outputString;

    var is_same = compare_arr.length == move_arr.length && compare_arr.every(function(element, index) {
        return element === move_arr[index]; 
    });

    if(is_same)
	{
        success();
    }
}

// Success Alert Box
function success(){
    Swal.fire({
        title: 'Success',
        text: 'Congrats for your Victory',
        icon: 'success',
        allowOutsideClick:false,
        allowEscapeKey:false,
        confirmButtonText: 'Close'
      });
}

function moveThisTile( tableRow, tableColumn)
{
  if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right") )
  {
    incrementMoves();
  }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction)
{
  // The following variables an if else statements
  // make the function work for all directions.
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {
    columnOffset = 1;
  }  
  
  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  )
  {
    if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0)
    {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
      arrayForBoard[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false; 
}

function incrementMoves()
{
  moves++;
  if (textMoves)
  {
    textMoves.innerHTML = moves;
  }
}
window.addEventListener( "load", start, false );






