

const game_logic = require("../gamelogic");


let white_king_zero = {
  color: "white",
  piece: "king",
  cordinates: { x: 4, y: 4 },
  point_value: 0,
  piece_count: 0,
  first_turn: true
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    test('Checks determineLegalKingMoves', () => {
      expect(game_logic.determineLegalKingMove(white_king_zero, { x: j, y: i })).toBe(true);
    })
  }
}
