

let game_board = []
let game_pieces = {}

let piece_to_move = null
let piece_to_attack = null

let turn_ident = true

let whitePointCounter = 0
let blackPointCounter = 0

function startGame(session_token, test) {
  console.log("starting game")

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 16; j++) {

      let game_piece = new Object();
      game_piece = {
        color: "",
        piece: "",
        cordinates: "",
        point_value: 0,
        piece_count: 0,
        first_turn: true
      }

      if (i === 0) {
        game_piece.color = "black";
        if (j === 0 || j === 7) {
          game_piece.piece = "rook";
          game_piece.cordinates = { x: j, y: 0 };
          game_piece.point_value = 5;
          if (j === 0) {
            game_piece.piece_count = 0
          }
          if (j === 7) {
            game_piece.piece_count = 1
          }
        }
        if (j === 1 || j === 6) {
          game_piece.piece = "knight";
          game_piece.cordinates = { x: j, y: 0 };
          game_piece.point_value = 3;
          if (j === 1) {
            game_piece.piece_count = 0
          }
          if (j === 6) {
            game_piece.piece_count = 1
          }
        }
        if (j === 2 || j === 5) {
          game_piece.piece = "bishop";
          game_piece.cordinates = { x: j, y: 0 };
          game_piece.point_value = 3;
          if (j === 2) {
            game_piece.piece_count = 0
          }
          if (j === 5) {
            game_piece.piece_count = 1
          }
        }
        if (j === 3) {
          game_piece.piece = "queen";
          game_piece.cordinates = { x: j, y: 0 };
          game_piece.point_value = 10;
        }
        if (j === 4) {
          game_piece.piece = "king";
          game_piece.cordinates = { x: j, y: 0 };
          game_piece.point_value = 0;
        }
        if (j > 7) {
          let h = j - 8
          game_piece.piece = "pawn";
          game_piece.cordinates = { x: h, y: 1 };
          game_piece.point_value = 1;
          game_piece.piece_count = h
        }
      }

      if (i === 1) {
        game_piece.color = "white"
        if (j === 0 || j === 7) {
          game_piece.piece = "rook"
          game_piece.cordinates = { x: j, y: 7 }
          game_piece.point_value = 5
          if (j === 0) {
            game_piece.piece_count = 0
          }
          if (j === 7) {
            game_piece.piece_count = 1
          }
        }
        if (j === 1 || j === 6) {
          game_piece.piece = "knight"
          game_piece.cordinates = { x: j, y: 7 }
          game_piece.point_value = 3
          if (j === 1) {
            game_piece.piece_count = 0
          }
          if (j === 6) {
            game_piece.piece_count = 1
          }
        }
        if (j === 2 || j === 5) {
          game_piece.piece = "bishop"
          game_piece.cordinates = { x: j, y: 7 }
          game_piece.point_value = 3
          if (j === 2) {
            game_piece.piece_count = 0
          }
          if (j === 5) {
            game_piece.piece_count = 1
          }
        }
        if (j === 4) {
          game_piece.piece = "queen"
          game_piece.cordinates = { x: j, y: 7 }
          game_piece.point_value = 10
        }
        if (j === 3) {
          game_piece.piece = "king"
          game_piece.cordinates = { x: j, y: 7 }
          game_piece.point_value = 0
        }
        if (j > 7) {
          let h = j - 8
          game_piece.piece = "pawn"
          game_piece.cordinates = { x: h, y: 6 }
          game_piece.point_value = 1
          game_piece.piece_count = h
        }
      }
      game_pieces[game_piece.color + " " + game_piece.piece + " " + game_piece.piece_count] = game_piece
    }
  }

  for (let i = 0; i < 8; i++) {
    let new_row = []
    for (let j = 0; j < 8; j++) {

      let board_position = new Object();

      board_position = {
        'cordinates': { x: 0, y: 0 },
        'piece': ""
      }

      board_position.cordinates.x = j;
      board_position.cordinates.y = i;

      if ((i === 0) || (i === 7)) {
        if (j === 0 || j === 7) {
          board_position.piece = "rook";
        }
        if (j === 1 || j === 6) {
          board_position.piece = "knight";
        }
        if (j === 2 || j === 5) {
          board_position.piece = "bishop";
        }
        if (j === 3) {
          board_position.piece = "queen";
        }
        if (j === 4) {
          board_position.piece = "king";
        }
      }

      if (i === 1 || i === 6) {
        board_position.piece = "pawn";
      }

      new_row.push(board_position);
    }
    game_board.push(new_row)
  }
  if (test === true) {
    console.log(game_board)
  } else {
    console.log(game_pieces)
    createGameSession(session_token)
  }
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


function determineLegalMove(piece_to_check, spot_to_move_to, attacking) {

  let legal_move_check = false
  if (piece_to_check.piece === "pawn") {
    legal_move_check = determineLegalPawnMove(piece_to_check, spot_to_move_to, attacking)
    console.log(legal_move_check)
  }

  if (piece_to_check.piece === "queen") {
    legal_move_check = determineLegalQueenMove(piece_to_check, spot_to_move_to, attacking)
  }

  if (piece_to_check.piece === "king") {
    legal_move_check = determineLegalKingMove(piece_to_check, spot_to_move_to, attacking)
  }

  if (piece_to_check.piece === "rook") {
    legal_move_check = determineLegalRookMove(piece_to_check, spot_to_move_to, attacking)
  }

  if (piece_to_check.piece === "knight") {
    legal_move_check = determineLegalKnightMove(piece_to_check, spot_to_move_to)
  }

  if (piece_to_check.piece === "bishop") {
    legal_move_check = determineLegalBishopMove(piece_to_check, spot_to_move_to, attacking)
  }

  return legal_move_check
}

function determineLegalPawnMove(piece_to_check, spot_to_move_to, attacking) {
  console.log("determining legal Pawn Move ", piece_to_check, " ", spot_to_move_to, " ", attacking)
  let cordinates_to_check = {x: piece_to_check.cordinates.x, y: piece_to_check.cordinates.y}
  let return_bool = false

  if (((cordinates_to_check.x + 1) === spot_to_move_to.x || (cordinates_to_check.x - 1) === spot_to_move_to.x) && attacking === true) {
    if (piece_to_check.color === "black") {
      if (cordinates_to_check.y + 1 === spot_to_move_to.y) {
        return_bool = true
      }
    } else {
      if (cordinates_to_check.y - 1 === spot_to_move_to.y) {
        return_bool = true
      }
    }

  } else if (attacking === false) {
    if (piece_to_check.color === "black") {
      if (cordinates_to_check.y + 2 === spot_to_move_to.y && cordinates_to_check.x === spot_to_move_to.x && piece_to_check.first_turn === true) {
        return_bool = true
        piece_to_check.first_turn = false
      } else if (cordinates_to_check.y + 1 === spot_to_move_to.y && cordinates_to_check.x === spot_to_move_to.x) {
        return_bool = true
        piece_to_check.first_turn = false
      }
    } else {
      if (cordinates_to_check.y - 2 === spot_to_move_to.y && cordinates_to_check.x === spot_to_move_to.x && piece_to_check.first_turn === true){
        return_bool = true
        piece_to_check.first_turn = false
      } else if (cordinates_to_check.y - 1 === spot_to_move_to.y && cordinates_to_check.x === spot_to_move_to.x) {
        return_bool = true
        piece_to_check.first_turn = false
      }
    }
  }
  if (return_bool === true) {
    console.log(cordinates_to_check, " ", return_bool, " ", spot_to_move_to)
  }
  return return_bool
}

function determineLegalQueenMove(piece_to_check, spot_to_move_to, attacking) {
  let return_bool = false
  let cordinates_to_check = {x: piece_to_check.cordinates.x, y: piece_to_check.cordinates.y}
  let check_count = Number

  if ((cordinates_to_check.x < spot_to_move_to.x && cordinates_to_check.y > spot_to_move_to.y) || (cordinates_to_check.x > spot_to_move_to.x && cordinates_to_check.y < spot_to_move_to.y)){
    check_count = Math.max(cordinates_to_check.x, spot_to_move_to.x) - Math.min( cordinates_to_check.x, spot_to_move_to.x)
  } else {
    check_count = Math.max(spot_to_move_to.x, spot_to_move_to.y, piece_to_check.cordinates.x, piece_to_check.cordinates.y) - Math.min(spot_to_move_to.x, spot_to_move_to.y, piece_to_check.cordinates.x, piece_to_check.cordinates.y)
  }


  let same_y_axis_check = false
  let same_x_axis_check = false

  if (spot_to_move_to.x === cordinates_to_check.x) {
    same_x_axis_check = true
  }
  if (spot_to_move_to.y === cordinates_to_check.y){
    same_y_axis_check = true
  }

  for (let i = 0; i < check_count; i++) {
    if (same_x_axis_check === false) {
      if (spot_to_move_to.x > piece_to_check.cordinates.x) {
        cordinates_to_check.x = cordinates_to_check.x + 1
      } else {
        cordinates_to_check.x = cordinates_to_check.x - 1
      }
    }

    if (same_y_axis_check === false) {
      if (spot_to_move_to.y > piece_to_check.cordinates.y) {
        cordinates_to_check.y = cordinates_to_check.y + 1
      } else {
        cordinates_to_check.y = cordinates_to_check.y - 1
      }
    }

    if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== '' && spot_to_move_to.x === cordinates_to_check.x && spot_to_move_to.y === cordinates_to_check.y && attacking === false){
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("returning false on possible piece")
      return false
    } else if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== '' && spot_to_move_to.x === cordinates_to_check.x && spot_to_move_to.y === cordinates_to_check.y && attacking === true){
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("attacking is true")
      attacking = false
    } else if (i === (check_count - 1) && (cordinates_to_check.x !== spot_to_move_to.x || cordinates_to_check.y !== spot_to_move_to.y)) {
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("turning return_bool false.")
      return_bool = false
    } else if (i === (check_count - 1) && (cordinates_to_check.x === spot_to_move_to.x || cordinates_to_check.y === spot_to_move_to.y)) {
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("turning return_bool true.")
      return_bool = true
    }
  }
  if (spot_to_move_to.x === piece_to_check.cordinates.x && spot_to_move_to.y === piece_to_check.cordinates.y){
      return false
  } else {
    console.log(return_bool, " on ", cordinates_to_check)
    return return_bool
  }
}

function determineLegalKnightMove(piece_to_check, spot_to_move_to) {
  let correct_possible_cordinates = { x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y - 2 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 2, y: piece_to_check.cordinates.y - 1 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 2, y: piece_to_check.cordinates.y + 1 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x + 1, y: piece_to_check.cordinates.y + 2 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }

  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 1, y: piece_to_check.cordinates.y + 2 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 2, y: piece_to_check.cordinates.y + 1 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 2, y: piece_to_check.cordinates.y - 1 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }


  correct_possible_cordinates = { x: piece_to_check.cordinates.x - 1, y: piece_to_check.cordinates.y - 2 }

  if (spot_to_move_to.x === correct_possible_cordinates.x && spot_to_move_to.y === correct_possible_cordinates.y) {
    return true
  }

  return false
}

function determineLegalRookMove(piece_to_check, spot_to_move_to, attacking) {
  let cordinates_to_check = { x: piece_to_check.cordinates.x, y: piece_to_check.cordinates.y }
  let return_bool = false
  let cordinate_difference = 0

  if (cordinates_to_check.x === spot_to_move_to.x) {
    cordinate_difference = Math.max(piece_to_check.cordinates.y, spot_to_move_to.y) - Math.min(piece_to_check.cordinates.y, spot_to_move_to.y)
  } else if (cordinates_to_check.y === spot_to_move_to.y) {
    cordinate_difference = Math.max(piece_to_check.cordinates.x, spot_to_move_to.x) - Math.min(piece_to_check.cordinates.x, spot_to_move_to.x)
  }

  console.log(cordinate_difference, " ", spot_to_move_to)
  for (let i = 0; i < cordinate_difference; i++) {
    if (piece_to_check.cordinates.y === spot_to_move_to.y) {
    } else if (piece_to_check.cordinates.y < spot_to_move_to.y) {
      cordinates_to_check.y = cordinates_to_check.y + 1
    } else if (piece_to_check.cordinates.y > spot_to_move_to.y) {
      cordinates_to_check.y = cordinates_to_check.y - 1
    }

    if (piece_to_check.cordinates.x === spot_to_move_to.x){
    } else if (piece_to_check.cordinates.x < spot_to_move_to.x) {
      cordinates_to_check.x = cordinates_to_check.x + 1
    } else if (piece_to_check.cordinates.x > spot_to_move_to.x) {
      cordinates_to_check.x = cordinates_to_check.x - 1
    }

    console.log(cordinates_to_check, " ", game_board[cordinates_to_check.y][cordinates_to_check.x].piece)

    if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== "" && attacking === false) {
      console.log("false on: ", cordinates_to_check)
      return_bool = false
    } else if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== "" && attacking === true) {
      console.log("true on: ", cordinates_to_check, " and attacking is true")
      return_bool = true
      attacking = false
    } else if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece === "" && game_board[cordinates_to_check.y][cordinates_to_check.x].cordinates.x === spot_to_move_to.x && game_board[cordinates_to_check.y][cordinates_to_check.x].cordinates.y === spot_to_move_to.y){
      console.log("true on: ", cordinates_to_check)
      return_bool = true
    }
  }

  return return_bool
}

function determineLegalKingMove(piece_to_check, spot_to_move_to) {
  if (spot_to_move_to.x === piece_to_check.cordinates.x && spot_to_move_to.y === piece_to_check.cordinates.y) {
  } else if (spot_to_move_to.x === (piece_to_check.cordinates.x + 1) || spot_to_move_to.x === (piece_to_check.cordinates.x - 1) || spot_to_move_to.x === piece_to_check.cordinates.x) {
    if (spot_to_move_to.y === (piece_to_check.cordinates.y + 1) || spot_to_move_to.y === (piece_to_check.cordinates.y - 1) || spot_to_move_to.y === piece_to_check.cordinates.y) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function determineLegalBishopMove(piece_to_check, spot_to_move_to, attacking) {
  let cordinates_to_check = {x:piece_to_check.cordinates.x, y: piece_to_check.cordinates.y}
  let check_count = Number
  let return_bool = false

  if ((cordinates_to_check.x < spot_to_move_to.x && cordinates_to_check.y > spot_to_move_to.y) || (cordinates_to_check.x > spot_to_move_to.x && cordinates_to_check.y < spot_to_move_to.y)){
    check_count = Math.max(cordinates_to_check.x, spot_to_move_to.x) - Math.min( cordinates_to_check.x, spot_to_move_to.x)
  } else {
    check_count = Math.max(spot_to_move_to.x, spot_to_move_to.y, piece_to_check.cordinates.x, piece_to_check.cordinates.y) - Math.min(spot_to_move_to.x, spot_to_move_to.y, piece_to_check.cordinates.x, piece_to_check.cordinates.y)
  }

  for (let i = 0; i < check_count; i++) {
      if (spot_to_move_to.x > piece_to_check.cordinates.x) {
        cordinates_to_check.x = cordinates_to_check.x + 1
      } else {
        cordinates_to_check.x = cordinates_to_check.x - 1
      }

      if (spot_to_move_to.y > piece_to_check.cordinates.y) {
        cordinates_to_check.y = cordinates_to_check.y + 1
      } else {
        cordinates_to_check.y = cordinates_to_check.y - 1
      }

    if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== '' && spot_to_move_to.x === cordinates_to_check.x && spot_to_move_to.y === cordinates_to_check.y && attacking === false){
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("returning false on possible piece")
      return false
    } else if (game_board[cordinates_to_check.y][cordinates_to_check.x].piece !== '' && spot_to_move_to.x === cordinates_to_check.x && spot_to_move_to.y === cordinates_to_check.y && attacking === true){
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("attacking is true")
      attacking = false
    } else if (i === (check_count - 1) && (cordinates_to_check.x !== spot_to_move_to.x || cordinates_to_check.y !== spot_to_move_to.y)) {
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("turning return_bool false.")
      return_bool = false
    } else if (i === (check_count - 1) && (cordinates_to_check.x === spot_to_move_to.x || cordinates_to_check.y === spot_to_move_to.y)) {
      console.log(game_board[cordinates_to_check.y][cordinates_to_check.x], " ", cordinates_to_check, " ", spot_to_move_to, " ", piece_to_check.cordinates, " ", check_count, " ", return_bool)
      console.log("turning return_bool true.")
      return_bool = true
    }

  }

  if (spot_to_move_to.x === piece_to_check.cordinates.x || spot_to_move_to.y === piece_to_check.cordinates.y){
      return false
  } else {
    console.log(return_bool, " on ", cordinates_to_check)
    return return_bool
  }
}

function determineIfSpotHasPiece(spot_to_move_to, attacking) {
  for (let i = 0; i < game_board.length; i++) {
    if (game_board[i].piece !== "" && spot_to_move_to.x === game_board.cordinates.x && spot_to_move_to.y === game_board.cordinates.y) {
      return true
    } else if (game_board[i].piece !== "" && spot_to_move_to.x === game_board.cordinates.x && spot_to_move_to.y === game_board.cordinates.y && attacking === true) {
    }
    return false
  }
}

module.exports = { determineLegalKnightMove, determineLegalBishopMove, determineLegalKingMove, determineLegalRookMove, determineLegalQueenMove, determineLegalPawnMove, startGame }

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
  if (piece_to_move === null) {
    piece_to_move = game_pieces[name_of_piece]


    if (turn_ident === true) {
      if (piece_to_move.color === "white") {
      } else {
        piece_to_move = null
      }
    } else {
      if (piece_to_move.color === "black") {
      } else {
        piece_to_move = null
      }
    }
  } else if (piece_to_move.color === game_pieces[name_of_piece].color) {
    piece_to_move = game_pieces[name_of_piece]
  } else {
    piece_to_attack = game_pieces[name_of_piece]
    whereToMove({ class: "column_" + piece_to_attack.position.x + " row_" + piece_to_attack.position.y }, session_token)
  }
}

function whereToMove(spot_to_move_to, session_token) {

  let attacking = false

  console.log(attacking)

  if (piece_to_attack !== null) {
    attacking = true
  }
  let legal_move_check = determineLegalMove(piece_to_move, spot_to_move_to, attacking)
  if (legal_move_check === false) {
    changeInvalidMoveHTML(false)
  } else if (legal_move_check === true) {

    let piece_to_move_HTML_element = document.getElementsByClassName(piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count)[0]
    let spot_to_move_to_HTML_element = document.getElementsByClassName(spot_to_move_to.class)[0]

    changeInvalidMoveHTML(true)

    if (piece_to_attack === null) {
    } else {
      console.log(spot_to_move_to_HTML_element.firstElementChild)
      spot_to_move_to_HTML_element.removeChild(spot_to_move_to_HTML_element.firstElementChild)

      delete game_pieces[piece_to_attack.color + " " + piece_to_attack.piece + " " + piece_to_attack.piece_count]
    }

    spot_to_move_to_HTML_element.append(piece_to_move_HTML_element)
    spot_to_move_to_HTML_element.onclick = ''

    let spot_moved_from_HTML_element = document.getElementsByClassName("column_" + piece_to_move.cordinates.x + " row_" + piece_to_move.cordinates.y)[0]
    let class_name = spot_moved_from_HTML_element.className

    let x_position_for_spot_moved_from = spot_moved_from_HTML_element.className[7]
    let y_spot_for_spot_moved_from = spot_moved_from_HTML_element.className[13]

    spot_moved_from_HTML_element.onclick = function () {
      whereToMove({
        'class': class_name,
        'x': Number(x_position_for_spot_moved_from),
        'y': Number(y_spot_for_spot_moved_from)
      }, session_token)
    }
    piece_to_move_HTML_element = null


    game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].cordinates.x = spot_to_move_to.x
    game_pieces[piece_to_move.color + " " + piece_to_move.piece + " " + piece_to_move.piece_count].cordinates.y = spot_to_move_to.y

    game_board[y_spot_for_spot_moved_from][x_position_for_spot_moved_from].piece = ""
    game_board[spot_to_move_to.y][spot_to_move_to.x].piece = piece_to_move.piece

    console.log(game_board)

    piece_to_move = null
    piece_to_attack = null
    if (turn_ident === true) {
      turn_ident = false
    } else {
      turn_ident = true
    }

    changeTitleHTML()

    updateGameBoard(session_token)
  }
}

function changeTitleHTML() {
  turn_ident_HTML_element = document.getElementsByClassName("turn_ident")[0]
  white_point_counter_HTML_element = document.getElementsByClassName("white_point_counter")[0]
  black_point_counter_HTML_element = document.getElementsByClassName("black_point_counter")[0]

  console.log(turn_ident_HTML_element)
  console.log(white_point_counter_HTML_element)
  console.log(black_point_counter_HTML_element)

  if (turn_ident === true) {
    turn_ident_HTML_element.innerText = "Whites Turn"
  } else {
    turn_ident_HTML_element.innerText = "Blacks Turn"
  }

  white_point_counter_HTML_element = String(whitePointCounter)
  black_point_counter_HTML_element = String(blackPointCounter)
}

function changeInvalidMoveHTML(invalidBoolean) {
  invalidMoveElement = document.getElementsByClassName("invlaidMoveDisplay")[0]

  if (invalidBoolean === true) {
    invalidMoveElement.innerText =  ""
  } else if (invalidBoolean === false) {
      invalidMoveElement.innerText =  "Invliad Move, Please pick a valid move"
  }

}



