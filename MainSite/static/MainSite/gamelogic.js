

let game_board = []
let game_pieces = {}

let piece_to_move = null
let piece_to_attack = null

let turn_ident = true

let whitePointCounter = 0
let blackPointCounter = 0

function startGame() {

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
  console.log(game_board)
}

function checkPossibleMove() {

}

function pieceToMove(nameOfPiece) {
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
    whereToMove({ class: "column_" + piece_to_attack.position.x + " row_" + piece_to_attack.position.y })
  }
}

function whereToMove(spot_to_move_to) {

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

  spot_moved_from_HTML_element.onclick = function () { whereToMove({ 'class': class_name, 'x': Number(x_position_for_spot_moved_from), 'y': Number(y_spot_for_spot_moved_from) }) }
  piece_to_move_HTML_element = null

  game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].position.x = spot_to_move_to.x
  game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].position.y = spot_to_move_to.y

  piece_to_move = null
  piece_to_attack = null
  if (turn_ident == true) {
    turn_ident = false
  } else {
    turn_ident = true
  }

  changeTitleHTML()

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



