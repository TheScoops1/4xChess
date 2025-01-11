

let game_board = []
let game_pieces = {}

let piece_to_move = null
let piece_to_attack = null

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
        piece_count: 0,
        first_turn: true
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
      if (piece_to_check.first_turn == true) {
        for (let i = 0; i < 2; i++) {
          new_y_position = new_y_position - 1
          possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
          piece_to_check.first_turn = false
        }
      } else {
        new_y_position = new_y_position - 1
        possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
      }
    }

    if (piece_to_check.color == "white") {
      let new_y_position = current_location.y
      if (piece_to_check.first_turn == true) {
        for (let i = 0; i < 2; i++) {
          new_y_position = new_y_position - 1
          possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
        }
      } else {
        new_y_position = new_y_position - 1
        possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
        piece_to_check.first_turn = false
      }
    }
  }

  if (piece_to_check.piece == "queen") {
    for (let i = 0; i < 7; i++) {

      new_x_position = new_x_position + 1

      if (new_x_position > 7) {
        new_x_position = new_x_position - 8
      }

      new_y_position = new_y_position + 1

      if (new_y_position > 7) {
        new_y_position = new_y_position - 8
      }

      if (new_y_position < 0) {
        new_y_position = new_y_position + 8
      }

      if (new_x_position < 0) {
        new_x_position = new_x_position + 8
      }

      if (new_x_position !== current_location.x) {
        possible_moves_to_return.push({ x: new_x_position, y: current_location.y })
      }

      if (new_y_position !== current_location.y) {
        possible_moves_to_return.push({ x: current_location.x, y: new_y_position })
      }
    }

    for (let i = 0; i < 7; i++) {

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


      if (new_right_diagonal_x_position < 0) {
        new_right_diagonal_x_position = new_right_diagonal_x_position + 8
      }
      if (new_right_diagonal_y_position < 0) {
        new_right_diagonal_y_position = new_right_diagonal_y_position + 8
      }
      if (new_left_diagonal_x_position < 0) {
        new_left_diagonal_x_position = new_left_diagonal_x_position + 8
      }
      if (new_left_diagonal_y_position < 0) {
        new_left_diagonal_y_position = new_left_diagonal_y_position + 8
      }

      if (new_right_diagonal_y_position !== current_location.y || new_right_diagonal_x_position !== current_location.x) {
        possible_moves_to_return.push({ x: new_right_diagonal_x_position, y: new_right_diagonal_y_position })
      }

      if (new_left_diagonal_x_position !== current_location.x || new_left_diagonal_y_position !== current_location.y) {
        possible_moves_to_return.push({ x: new_left_diagonal_x_position, y: new_left_diagonal_y_position })
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

    if (spot_eight.x < 7 || spot_eight.x > 0 || spot_eight.y < 7 || spot_eight.y > 0) {
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

  console.log(possible_moves_to_return)
  possible_moves_to_return = determineLegalMoves(possible_moves_to_return, piece_to_check.position)

  return possible_moves_to_return
}

function determineLegalMoves(moves_to_check, piece_to_check_current_cordiantes) {
  for (let i = 0; i <= moves_to_check.length; i++) {
    for (let j = 0; j <= game_board.length; j++) {
      if (game_board[j] == undefined || moves_to_check[i] == undefined) {
      } else if (game_board[j].piece !== "" && moves_to_check[i].x == game_board[j].cordinates.y && moves_to_check[i].x == game_board[j].cordinates.y) {

        if (moves_to_check[i].x > piece_to_check_current_cordiantes.x && moves_to_check[i].y > piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x > moves_to_check[i].x && moves_to_check[k].y > moves_to_check[i].y) {
              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x > piece_to_check_current_cordiantes.x && moves_to_check[i].y == piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x > moves_to_check[i].x && moves_to_check[k].y == moves_to_check[i].y) {
              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x < piece_to_check_current_cordiantes.x && moves_to_check[i].y < piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x < moves_to_check[i].x && moves_to_check[k].y < moves_to_check[i].y) {
              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x == piece_to_check_current_cordiantes.x && moves_to_check[i].y < piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x == moves_to_check[i].x && moves_to_check[k].y < moves_to_check[i].y) {

              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x > piece_to_check_current_cordiantes.x && moves_to_check[i].y < piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x < moves_to_check[i].x && moves_to_check[k].y < moves_to_check[i].y) {
              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x == piece_to_check_current_cordiantes.x && moves_to_check[i].y > piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x == moves_to_check[i].x && moves_to_check[k].y > moves_to_check[i].y) {

              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x < piece_to_check_current_cordiantes.x && moves_to_check[i].y > piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x > moves_to_check[i].x && moves_to_check[k].y < moves_to_check[i].y) {

              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        if (moves_to_check[i].x < piece_to_check_current_cordiantes.x && moves_to_check[i].y == piece_to_check_current_cordiantes.y) {
          for (let k = 0; k <= moves_to_check.length; k++) {
            if (moves_to_check[k] == undefined) {
            } else if (moves_to_check[k].x < moves_to_check[i].x && moves_to_check[k].y == moves_to_check[i].y) {

              console.log("splicing: ", moves_to_check[k])
              moves_to_check.splice(k, 1)
            }
          }
        }

        moves_to_check.splice(i, 1)

        console.log("splicing i : ", moves_to_check[i])
      }
    }
  }

  return moves_to_check
}

function determineLegalMove(piece_to_check, spot_to_move_to) {

}

function determineLegalPawnMove(piece_to_check, spot_to_move_to) {
  let legal_moves_to_return = []

  if (piece_to_check.first_turn == true) {
    legal_moves_to_return.push({ x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y + 1 })
    legal_moves_to_return.push({ x: piece_to_check.cordinates.x + 2, y: piece_to_check.cordinates.y + 2 })
  } else if (piece_to_check.first_turn == false) {
    legal_moves_to_return.push({ x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y + 1 })
  }

  return legal_moves_to_return
}

function determineLegalQueenMove(piece_to_check, spot_to_move_to, attacking) {
  if (spot_to_move_to.x < piece_to_check.cordinates.x && spot_to_move_to.y < piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x > piece_to_check.cordinates.x && spot_to_move_to.y < piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x > piece_to_check.cordinates.x && spot_to_move_to.y > piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x > piece_to_check.cordinates.x && spot_to_move_to.y < piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x == piece_to_check.cordinates.x && spot_to_move_to.y < piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x > piece_to_check.cordinates.x && spot_to_move_to.y == piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x == piece_to_check.cordinates.x && spot_to_move_to.y > piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }

  if (spot_to_move_to.x < piece_to_check.cordinates.x && spot_to_move_to.y == piece_to_check.cordinates.y) {
    let cordinates_to_check = { x: spot_to_move_to.x, y: spot_to_move_to.y }
    for (let i = 0; i <= game_board.length; i++) {
      if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.x == cordinates_to_check.y && attacking == false && game_board[i].piece == "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && attacking == true && game_board[i] != "") {
        cordinates_to_check.x = cordinates_to_check.x - 1
        cordinates_to_check.y = cordinates_to_check.y - 1
        attacking = false
      } else if (game_board[i].cordinates.x == cordinates_to_check.x && game_board[i].cordinates.y == cordinates_to_check.y && game_board[i].piece != "") {
        return false
      }
      return true
    }
  }
}

function determineLegalKnightMove(piece_to_check, spot_to_move_to, attacking) {
  let correct_possible_cordinates = { x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y - 3 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 3, y: piece_to_check.cordinates.y - 1 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 3, y: piece_to_check.cordinates.y + 1 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y + 3 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 1, y: piece_to_check.cordinates.y + 3 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 3, y: piece_to_check.cordinates.y + 1 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 3, y: piece_to_check.cordinates.y - 1 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 1, y: piece_to_check.cordinates.y - 3 }

  if (spot_to_move_to.x == correct_possible_cordinates.x && spot_to_move_to.y == correct_possible_cordinates.y) {
    return true
  }

  return false
}

function determineLegalRookMove(piece_to_check, spot_to_move_to, attacking) {
  let cordinates_to_check = { x: piece_to_check.cordinates.x, y: piece_to_check.cordinates.y }
  if (piece_to_check.cordinates.x == spot_to_move_to.x) {
    let cordinate_difference = Math.max(piece_to_check.cordinates.y, spot_to_move_to.y) - Math.min(piece_to_check.cordinates.y, spot_to_move_to.y)
    for (let i = 0; i < cordinate_difference; i++) {

      if (piece_to_check.cordinates.y < spot_to_move_to.y) {
        cordinates_to_check.y = cordinates_to_check.y + 1
      } else if (piece_to_check.cordinates.y > spot_to_move_to.y) {
        cordinates_to_check.y = cordinates_to_check.y - 1
      }

      for (let j = 0; j < game_board.length; j++) {
        if (game_board[j].piece != "" && cordinates_to_check == game_board.cordinates) {
          return false
        } else if (game_board[j].piece != "" && cordinates_to_check == game_board.cordinates && attacking == true) {
          return true
        } else if (game_board[j].piece != "" && spot_to_move_to == game_board.cordinates) {
          return true
        }
      }
    }
  }


  if (piece_to_check.cordinates.y == spot_to_move_to.y) {
    let cordinate_difference = Math.max(piece_to_check.cordinates.x, spot_to_move_to.x) - Math.min(piece_to_check.cordinates.x, spot_to_move_to.x)
    for (let i = 0; i < cordinate_difference; i++) {

      if (piece_to_check.cordinates.y < spot_to_move_to.y) {
        cordinates_to_check.x = cordinates_to_check.x + 1
      } else if (piece_to_check.cordinates.y > spot_to_move_to.y) {
        cordinates_to_check.x = cordinates_to_check.x - 1
      }

      for (let j = 0; j < game_board.length; j++) {
        if (game_board[j].piece != "" && cordinates_to_check == game_board.cordinates) {
          return false
        } else if (game_board[j].piece != "" && cordinates_to_check == game_board.cordinates && attacking == true) {
          return true
        } else if (game_board[j].piece != "" && spot_to_move_to == game_board.cordinates) {
          return true
        }
      }
    }
  }
}

function determineLegalKingMove(piece_to_check, spot_to_move_to) {
  if (spot_to_move_to.x == piece_to_check.cordinates.x + 1 || spot_to_move_to.x == piece_to_check.cordinates.x - 1) {
    if (spot_to_move_to.y == piece_to_check.cordinates.y - 1 || spot_to_move_to.y == piece_to_check.cordinates.y + 1) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function determineLegalBishopMove(piece_to_check, spot_to_move_to, attacking) {
  let cordinate_difference_x = Math.max(piece_to_check.cordinates.x, spot_to_move_to.x) - Math.min(piece_to_check.cordinates.x, spot_to_move_to.x)
  let cordinate_difference_y = Math.max(piece_to_check.cordinates.y, spot_to_move_to.y) - Math.min(piece_to_check.cordinates.y, spot_to_move_to.y)

  if (cordinate_difference_x != cordinate_difference_y) {
    return false
  } else {
    if (piece_to_check.cordinates.x > spot_to_move_to.x) {
      if (piece_to_check.cordinates.y > spot_to_move_to.y) {
        let y_change = -1
        let x_change = -1
      } else {
        let y_change = 1
        let x_change = -1
      }
    } else {
      if (piece_to_check.cordinates.y > spot_to_move_to.y) {
        let y_change = -1
        let x_change = 1
      } else {
        let y_change = 1
        let x_change = 1
      }
    }

    let possible_cordinates = { x: piece_to_check.cordinates.x, y: piece_to_check.cordinates.y }

    for (let i = 0; i < cordinate_difference_y; i++) {
      possible_cordinates.x = possible_cordinates.x + x_change
      possible_cordinates.y = possible_cordinates.y + y_change
      for (let j = 0; j < game_board.length; j++) {
        if (game_board[j].piece != "" && game_board[j].cordinates.x == possible_cordinates.x && game_board[j].cordinates.y == possible_cordinates.y) {
          return false
        }
      }
    }
    return true
  }
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

function pieceToMove(name_of_piece, session_token) {
  if (piece_to_move == null) {
    piece_to_move = game_pieces[name_of_piece]

    console.log(checkPossibleMoves(piece_to_move))

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
  } else if (piece_to_move.color == game_pieces[name_of_piece].color) {
    piece_to_move = game_pieces[name_of_piece]
    console.log(checkPossibleMoves(piece_to_move))
  } else {
    piece_to_attack = game_pieces[name_of_piece]
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


