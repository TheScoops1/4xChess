
const game_ai = require("../game_ai");

let node_tree_length = 4

let data_to_add = 0

game_ai.createParentNode(data_to_add)

let parent_node_name = "0"

let created_nodes = ['0']

let temp_node_count_list = created_nodes.length

let data_tree = game_ai.dataTreeReturn()

for (let i = 0; i < node_tree_length; i++) {
  data_tree = game_ai.dataTreeReturn()

  console.log(data_tree)

  //if ((i % 2) === 0) {
  // game_ai.addNodeToTree(data_to_add, data_tree[parent_node_name], 0)
  //} else if ((i % 2) === 1) {
  // game_ai.addNodeToTree(data_to_add, data_tree[parent_node_name], 1)
  //}


  for (let h = 0; h < temp_node_count_list; h++) {

    console.log(created_nodes)

    if (data_tree[created_nodes[h] + data_tree[created_nodes[h]].left] !== undefined) {
    } else {
      data_to_add = data_to_add + 1
      game_ai.addNodeToTree(data_to_add, data_tree[created_nodes[h]], 0)
      created_nodes.push(data_tree[created_nodes[h]].name + '0')
    }

    if (data_tree[created_nodes[h] + data_tree[created_nodes[h]].right] !== undefined) {
    } else {
      data_to_add = data_to_add + 1
      game_ai.addNodeToTree(data_to_add, data_tree[created_nodes[h]], 1)
      created_nodes.push(data_tree[created_nodes[h]].name + '1')
    }
  }
  temp_node_count_list = created_nodes.length
}

data_tree = game_ai.dataTreeReturn()

console.log(data_tree)

test("checkin to see fi the binary tree actually gives the correcdt data back", () => {
  expect(game_ai.accessDataNode(parent_node_name).data).toBe(0)
});

