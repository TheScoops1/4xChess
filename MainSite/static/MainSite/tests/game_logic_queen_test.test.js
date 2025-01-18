
const game_logic = require("../gamelogic");


let white_queen_zero = {
  color: "white",
  piece: "queen",
  cordinates: { x: 4, y: 4 },
  point_value: 5,
  piece_count: 0,
  first_turn: true
}

game_logic.startGame(1, true)
console.log("Attempting test")
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    console.log("attempting test @: ", {x:j, y:i})
    test('Checks determineLegalQueenMoves', () => {
      expect(game_logic.determineLegalQueenMove(white_queen_zero, { x: j, y: i })).toBe(true);
    })
  }
}
