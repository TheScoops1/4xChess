

const game_logic = require("../gamelogic");


let piece_to_test = {
  color: "white",
  piece: "pawn",
  cordinates: { x: 4, y: 4 },
  point_value: 1,
  piece_count: 0,
  first_turn: true
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    test('Checks determineLegalPawnMove', () => {
      expect(game_logic.determineLegalPawnMove(piece_to_test, { x: j, y: i })).toBe(true);
    })
  }
}
