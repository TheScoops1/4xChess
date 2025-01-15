
const game_logic = require("../gamelogic");


let white_bishop_zero = {
  color: "white",
  piece: "bishop",
  cordinates: { x: 4, y: 4 },
  point_value: 3,
  piece_count: 0,
  first_turn: true
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    test('Checks determineLegalBishopMoves', () => {
      expect(game_logic.determineLegalBishopMove(white_bishop_zero, { x: j, y: i })).toBe(true);
    })
  }
}
