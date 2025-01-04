

let game_board = []
let game_pieces = {}

let piece_to_move = null
let piece_to_attack = null

let first_turn = true

let turn_ident = true

let whitePointCounter = 0
let blackPointCounter = 0

function startGame(session_token) {

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 16; j++) {

      let game_piece = new Object();
      game_piece = {
        color: "",
        piece: "",
        position: "",
        point_value: 0,
        piece_count: 0
      }

      if (i == 0) {
        game_piece.color = "black";
        if (j == 0 || j == 7) {
          game_piece.piece = "rook";
          game_piece.position = { x: j, y: 0 };
          game_piece.point_value = 5;
          if (j == 0) {
            game_piece.piece_count = 0
          }
          if (j == 7) {
            game_piece.piece_count = 1
          }
        }
        if (j == 1 || j == 6) {
          game_piece.piece = "knight";
          game_piece.position = { x: j, y: 0 };
          game_piece.point_value = 3;
          if (j == 1) {
            game_piece.piece_count = 0
          }
          if (j == 6) {
            game_piece.piece_count = 1
          }
        }
        if (j == 2 || j == 5) {
          game_piece.piece = "bishop";
          game_piece.position = { x: j, y: 0 };
          game_piece.point_value = 3;
          if (j == 2) {
            game_piece.piece_count = 0
          }
          if (j == 5) {
            game_piece.piece_count = 1
          }
        }
        if (j == 3) {
          game_piece.piece = "queen";
          game_piece.position = { x: j, y: 0 };
          game_piece.point_value = 10;
        }
        if (j == 4) {
          game_piece.piece = "king";
          game_piece.position = { x: j, y: 0 };
          game_piece.point_value = 0;
        }
        if (j > 7) {
          let h = j - 8
          game_piece.piece = "pawn";
          game_piece.position = { x: h, y: 1 };
          game_piece.point_value = 1;
          game_piece.piece_count = h
        }
      }

      if (i == 1) {
        game_piece.color = "white"
        if (j == 0 || j == 7) {
          game_piece.piece = "rook"
          game_piece.position = { x: j, y: 7 }
          game_piece.point_value = 5
          if (j == 0) {
            game_piece.piece_count = 0
          }
          if (j == 7) {
            game_piece.piece_count = 1
          }
        }
        if (j == 1 || j == 6) {
          game_piece.piece = "knight"
          game_piece.position = { x: j, y: 7 }
          game_piece.point_value = 3
          if (j == 1) {
            game_piece.piece_count = 0
          }
          if (j == 6) {
            game_piece.piece_count = 1
          }
        }
        if (j == 2 || j == 5) {
          game_piece.piece = "bishop"
          game_piece.position = { x: j, y: 7 }
          game_piece.point_value = 3
          if (j == 2) {
            game_piece.piece_count = 0
          }
          if (j == 5) {
            game_piece.piece_count = 1
          }
        }
        if (j == 4) {
          game_piece.piece = "queen"
          game_piece.position = { x: j, y: 7 }
          game_piece.point_value = 10
        }
        if (j == 3) {
          game_piece.piece = "king"
          game_piece.position = { x: j, y: 7 }
          game_piece.point_value = 0
        }
        if (j > 7) {
          let h = j - 8
          game_piece.piece = "pawn"
          game_piece.position = { x: h, y: 6 }
          game_piece.point_value = 1
          game_piece.piece_count = h
        }
      }
      game_pieces[game_piece.color + " " + game_piece.piece + " " + game_piece.piece_count] = game_piece
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {

      let board_position = new Object();

      board_position = {
        'cordinates': { x: 0, y: 0 },
        'piece': ""
      }

      board_position.cordinates.x = j;
      board_position.cordinates.y = i;

      if ((i == 0) || (i == 7)) {
        if (j == 0 || j == 7) {
          board_position.piece = "rook";
        }
        if (j == 1 || j == 6) {
          board_position.piece = "knight";
        }
        if (j == 2 || j == 5) {
          board_position.piece = "bishop";
        }
        if (j == 3) {
          board_position.piece = "queen";
        }
        if (j == 4) {
          board_position.piece = "king";
        }
      }

      if (i == 1 || i == 6) {
        board_position.piece = "pawn";
      }

      game_board.push(board_position);
    }
  }
  console.log(game_pieces)
  createGameSession(session_token)
}

function getCookie(name) {
  console.log('test cookie token function')
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  console.log(cookieValue)
  return cookieValue;
}

function checkLegalAtacck(pieceAttacking, pieceBeingAttacked, turnMarker) {
}

function checkLegalMove(piece_being_moved, turn_marker) {

}

function checkPossibleMoves(piece_to_check) {
  let possible_moves_to_return = []
  let current_location = piece_to_check.position

  let new_x_position = current_location.x
  let new_y_position = current_location.y

  let new_right_diagonal_x_position = current_location.x
  let new_right_diagonal_y_position = current_location.y

  let new_left_diagonal_x_position = current_location.x
  let new_left_diagonal_y_position = current_location.y


  if (piece_to_check.piece == "rook") {
    for (let i = 0; i < 8; i++) {
      new_x_position = new_x_position + 1
      if (new_x_position > 7) {
        new_x_position = new_x_position - 8
      }
      new_y_position = new_y_position + 1
      if (new_y_position > 7) {
        new_y_position = new_y_position - 8
      }
      possible_moves_to_return.push({ x: new_x_position, y: current_location.y })
      possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
    }
  }
  if (piece_to_check.piece == "bishop") {
    for (let i = 0; i < 8; i++) {
      new_right_diagonal_x_position = new_right_diagonal_x_position - 1
      new_right_diagonal_y_position = new_right_diagonal_y_position + 1

      new_left_diagonal_x_position = new_left_diagonal_x_position + 1
      new_left_diagonal_y_position = new_left_diagonal_y_position + 1

      if (new_right_diagonal_x_position > 7) {
        new_right_diagonal_x_position = new_right_diagonal_x_position - 8
      }
      if (new_right_diagonal_y_position > 7) {
        new_right_diagonal_y_position = new_right_diagonal_y_position - 8
      }
      if (new_left_diagonal_x_position > 7) {
        new_left_diagonal_x_position = new_left_diagonal_x_position - 8
      }
      if (new_left_diagonal_y_position > 7) {
        new_left_diagonal_y_position = new_left_diagonal_y_position - 8
      }

      if ((new_right_diagonal_x_position < 7 && new_right_diagonal_x_position > 0) || (new_right_diagonal_y_position < 7 && new_right_diagonal_y_position > 0)) {
        possible_moves_to_return.push({ x: new_right_diagonal_y_position, y: new_right_diagonal_y_position })
      }

      if ((new_left_diagonal_x_position < 7 && new_left_diagonal_x_position > 0) || (new_left_diagonal_y_position < 7 && new_left_diagonal_y_position > 0)) {
        possible_moves_to_return.push({ x: new_left_diagonal_x_position, y: new_left_diagonal_y_position })
      }

    }
  }
  if (piece_to_check.piece == "pawn") {
    if (piece_to_check.color == "black") {
      let new_y_position = current_location.y
      if (first_turn == true) {
        for (let i = 0; i < 2; i++) {
          new_y_position = new_y_position - 1
          possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
        }
      }
    }

    if (piece_to_check.color == "white") {
      let new_y_position = current_location.y
      if (first_turn == true) {
        for (let i = 0; i < 2; i++) {
          new_y_position = new_y_position - 1
          possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
        }
      } else {
        new_y_position = new_y_position - 1
        possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
      }
    }
  }
  if (piece_to_check.piece == "queen") {
    for (let i = 0; i > 8; i++) {
      new_right_diagonal_x_position = new_right_diagonal_x_position - 1
      new_right_diagonal_y_position = new_right_diagonal_y_position + 1

      new_left_diagonal_x_position = new_left_diagonal_x_position + 1
      new_left_diagonal_y_position = new_left_diagonal_y_position + 1

      new_x_position = new_x_position + 1

      if (new_x_position > 7) {
        new_x_position = new_x_position - 8
      }

      new_y_position = new_y_position + 1

      if (new_y_position > 7) {
        new_y_position = new_y_position - 8
      }

      possible_moves_to_return.push({ x: new_x_position, y: current_location.y })
      possible_moves_to_return.push({ x: current_location.x, y: new_y_position })

      if (new_right_diagonal_x_position > 7) {
        new_right_diagonal_x_position = new_right_diagonal_x_position - 8
      }
      if (new_right_diagonal_y_position > 7) {
        new_right_diagonal_y_position = new_right_diagonal_y_position - 8
      }
      if (new_left_diagonal_x_position > 7) {
        new_left_diagonal_x_position = new_left_diagonal_x_position - 8
      }
      if (new_left_diagonal_y_position > 7) {
        new_left_diagonal_y_position = new_left_diagonal_y_position - 8
      }

      for (let j = 0; j <= possible_moves_to_return.length; j++) {
        let possible_move_to_check = possible_moves_to_return[j]
        if (possible_move_to_check.x == new_right_diagonal_x_position && possible_move_to_check.y == new_right_diagonal_y_position || possible_move_to_check.x == new_left_diagonal_x_position && possible_move_to_check.y == new_left_diagonal_y_position || current_location.x == new_left_diagonal_x_position && current_location.y == new_left_diagonal_y_position || current_location.x == new_right_diagonal_x_position && current_location.y == new_right_diagonal_y_position) {
        } else {
          possible_moves_to_return.push({ x: new_right_diagonal_x_position, y: new_right_diagonal_y_position })
          possible_moves_to_return.push({ x: new_left_diagonal_x_position, y: new_left_diagonal_y_position })
        }
      }
    }
  }
  if (piece_to_check.piece == "king") {
    let spot_one = { x: current_location.x + 1, y: current_location.y + 1 }
    let spot_two = { x: current_location.x - 1, y: current_location.y + 1 }
    let spot_three = { x: current_location.x - 1, y: current_location.y }
    let spot_four = { x: current_location.x - 1, y: current_location.y - 1 }
    let spot_five = { x: current_location.x, y: current_location.y - 1 }
    let spot_six = { x: current_location.x + 1, y: current_location.y - 1 }
    let spot_seven = { x: current_location.x + 1, y: current_location.y }
    let spot_eight = { x: current_location.x + 1, y: current_location.y + 1 }

    if (spot_one.x < 7 || spot_one.x > 0 || spot_one.y < 7 || spot_one.y > 0) {
      possible_moves_to_return.push(spot_one)
    }

    if (spot_two.x < 7 || spot_two.x > 0 || spot_two.y < 7 || spot_two.y > 0) {
      possible_moves_to_return.push(spot_two)
    }

    if (spot_three.x < 7 || spot_three.x > 0 || spot_three.y < 7 || spot_three.y > 0) {
      possible_moves_to_return.push(spot_three)
    }

    if (spot_four.x < 7 || spot_four.x > 0 || spot_four.y < 7 || spot_four.y > 0) {
      possible_moves_to_return.push(spot_four)
    }

    if (spot_five.x < 7 || spot_five.x > 0 || spot_five.y < 7 || spot_five.y > 0) {
      possible_moves_to_return.push(spot_five)
    }

    if (spot_six.x < 7 || spot_six.x > 0 || spot_six.y < 7 || spot_six.y > 0) {
      possible_moves_to_return.push(spot_six)
    }

    if (spot_seven.x < 7 || spot_seven.x > 0 || spot_seven.y < 7 || spot_seven.y > 0) {
      possible_moves_to_return.push(spot_seven)
    }

    if (spot_eight.x < 7 || spot_eimanga chaptersght.x > 0 || spot_eight.y < 7 || spot_eight.y > 0) {
      possible_moves_to_return.push(spot_eight)
    }
  }


  if (piece_to_check.piece == "knight") {
    let left_move_down = { x: current_location.x - 3, y: current_location.y - 1 }
    let left_move_up = { x: current_location.x - 3, y: current_location.y + 1 }

    let up_move_left = { x: current_location.x + 1, y: current_location.y + 3 }
    let up_move_right = { x: current_location.x - 1, y: current_location.y + 3 }

    let right_move_down = { x: current_location.x + 3, y: current_location.y - 1 }
    let right_move_up = { x: current_location.x + 3, y: current_location.y - 1 }

    let down_move_right = { x: current_location.x + 1, y: current_location.y + 3 }
    let down_move_left = { x: current_location.x - 1, y: current_location.y + 3 }

    if (left_move_down.x < 7 || left_move_down.x > 0 || left_move_down.y < 7 || left_move_down.y > 0) {
      possible_moves_to_return.push(left_move_down)
    }
    if (left_move_up.x < 7 || left_move_up.x > 0 || left_move_up.y < 7 || left_move_up.y > 0) {
      possible_moves_to_return.push(left_move_down)
    }
    if (up_move_left.x < 7 || up_move_left.x > 0 || up_move_left.y < 7 || up_move_left.y > 0) {
      possible_moves_to_return.push(up_move_left)
    }
    if (up_move_right.x < 7 || up_move_right.x > 0 || up_move_right.y < 7 || up_move_right.y > 0) {
      possible_moves_to_return.push(up_move_right)
    }
    if (right_move_down.x < 7 || right_move_down.x > 0 || right_move_down.y < 7 || right_move_down.y > 0) {
      possible_moves_to_return.push(right_move_down)
    }
    if (right_move_up.x < 7 || right_move_up.x > 0 || right_move_up.y < 7 || right_move_up.y > 0) {
      possible_moves_to_return.push(right_move_up)
    }
    if (down_move_right.x < 7 || down_move_right.x > 0 || down_move_right.y < 7 || down_move_right.y > 0) {
      possible_moves_to_return.push(down_move_right)
    }
    if (down_move_left.x < 7 || down_move_left.x > 0 || down_move_left.y < 7 || down_move_left.y > 0) {
      possible_moves_to_return.push(down_move_left)
    }
  }

  return possible_moves_to_return
}

function checkIfMoveIsOffBoard(piece_to_check, move_set) {

}

async function sendMoveToDB(session_token) {
  try {
    console.log(session_token);
    console.log(game_board);
    console.log(JSON.stringify(game_board))
    const response = await fetch('/' + String(session_token) + '/test/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(game_board)
      });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data.test, ' Test was succesful');

  } catch (error) {
    console.log('Error:', error);
  }
}

async function testGatherGameSession(session_token) {
  try {
    const response = await fetch('/' + String(session_token) + '/gather_game_session/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log('Error:', error);
  }
}

async function createGameSession(session_token) {
  try {
    const response = await fetch('/' + String(session_token) + '/create_game_session/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(game_pieces)
      });
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }

    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log('Error:', error)
  }
}

async function updateGameBoard(session_token) {
  try {
    const response = await fetch('/' + String(session_token) + "/update_game_board/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(game_pieces)
      });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log('Error:', error);
  }
}

function determineLegalMove(name_of_piece, start_position, end_position, attack) {
  game_piece = game_pieces[name_of_piece]
  if (name_of_piece.includes("pawn")) {
    if (attack) {
    }
  }
}
function pieceToMove(nameOfPiece, session_token) {
  if (piece_to_move == null) {
    piece_to_move = game_pieces[nameOfPiece]
    if (turn_ident == true) {
      if (piece_to_move.color == "white") {
      } else {
        piece_to_move = null
      }
    } else {
      if (piece_to_move.color == "black") {
      } else {
        piece_to_move = null
      }
    }
  } else {
    piece_to_attack = game_pieces[nameOfPiece]
    console.log(piece_to_attack)
    whereToMove({ class: "column_" + piece_to_attack.position.x + " row_" + piece_to_attack.position.y }, session_token)
  }
}

function whereToMove(spot_to_move_to, session_token) {

  let piece_to_move_HTML_element = document.getElementsByClassName(piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count)[0]
  let spot_to_move_to_HTML_element = document.getElementsByClassName(spot_to_move_to.class)[0]

  if (piece_to_attack == null) {
  } else {
    console.log(spot_to_move_to_HTML_element.firstElementChild)
    spot_to_move_to_HTML_element.removeChild(spot_to_move_to_HTML_element.firstElementChild)

    delete game_pieces[piece_to_attack.color + " " + piece_to_attack.piece + " " + piece_to_attack.piece_count]
  }

  spot_to_move_to_HTML_element.append(piece_to_move_HTML_element)
  spot_to_move_to_HTML_element.onclick = ''

  let spot_moved_from_HTML_element = document.getElementsByClassName("column_" + piece_to_move.position.x + " row_" + piece_to_move.position.y)[0]
  let class_name = spot_moved_from_HTML_element.className

  let x_position_for_spot_moved_from = spot_moved_from_HTML_element.className[7]
  let y_spot_for_spot_moved_from = spot_moved_from_HTML_element.className[13]

  spot_moved_from_HTML_element.onclick = function () { whereToMove({ 'class': class_name, 'x': Number(x_position_for_spot_moved_from), 'y': Number(y_spot_for_spot_moved_from) }, session_token) }
  piece_to_move_HTML_element = null

  console.log(game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count])

  game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].position.x = spot_to_move_to.x
  game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].position.y = spot_to_move_to.y

  console.log(checkPossibleMoves(piece_to_move))

  piece_to_move = null
  piece_to_attack = null
  if (turn_ident == true) {
    turn_ident = false
  } else {
    turn_ident = true
  }

  changeTitleHTML()

  updateGameBoard(session_token)

}

function changeTitleHTML() {
  turn_ident_HTML_element = document.getElementsByClassName("turn_ident")[0]
  white_point_counter_HTML_element = document.getElementsByClassName("white_point_counter")[0]
  black_point_counter_HTML_element = document.getElementsByClassName("black_point_counter")[0]

  console.log(turn_ident_HTML_element)
  console.log(white_point_counter_HTML_element)
  console.log(black_point_counter_HTML_element)

  if (turn_ident == true) {
    turn_ident_HTML_element.innerText = "Whites Turn"
  } else {
    turn_ident_HTML_element.innerText = "Blacks Turn"
  }

  white_point_counter_HTML_element = String(whitePointCounter)
  black_point_counter_HTML_element = String(blackPointCounter)
}


