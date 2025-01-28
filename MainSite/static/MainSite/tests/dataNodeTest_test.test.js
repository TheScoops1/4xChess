
const game_ai = require("../game_ai");

let node_tree_length = 20

let data_to_add = 0

game_ai.createParentNode(data_to_add)

let parent_node_name = "0"

for (let i = 0; i <= node_tree_length; i++) {
  data_to_add = data_to_add + 1
  let data_tree = game_ai.dataTreeReturn()

  console.log(data_tree)

  if ((i % 2) === 0) {
    game_ai.addNodeToTree(data_to_add, data_tree[parent_node_name], 0)
  } else if ((i % 2) === 1) {
    game_ai.addNodeToTree(data_to_add, data_tree[parent_node_name], 1)
    parent_node_name = parent_node_name.concat("0")
  }

  if (parent_node_name.length === 1) {
  } else {
    if (parent_node_name[-1] === "0") {
      parent_node_name[-1] === "1"
    } else if (parent_node_name[-1] === "1") {
      parent_node_name[-1] === "0"
    }
  }

  test("checkin to see fi the binary tree actually gives the correcdt data back", () => {
    expect(game_ai.accessDataNode(parent_node_name).data).tobe(data_to_add - 1)
  });

}
