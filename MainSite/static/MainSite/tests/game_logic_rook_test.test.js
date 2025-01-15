

const game_logic = require("../gamelogic");


let piece_to_test = {
  color: "white",
  piece: "rook",
  cordinates: { x: 4, y: 4 },
  point_value: 4,
  piece_count: 0,
  first_turn: true
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    game_logic.startGame(1, true)
    test('Checks determineLegalRookMove', () => {
      expect(game_logic.determineLegalRookMove(piece_to_test, { x: j, y: i })).toBe(true);
    })
  }
}
