
let data_tree = {}

function createMoveTreNode(data, parent_node_name, direction) {
  let node = {
    data: data,
    name: String(parent_node_name + String(direction)),
    left: 0,
    right: 1,
  }

  return node
}

function simulateGameMove(game_board, turn_indicator) {

}

function dataTreeReturn() {
  return data_tree
}

function createParentNode(data) {

  console.log("Creating the node tree")
  let node = {
    data: data,
    name: "0",
    left: 0,
    right: 1
  }

  data_tree[node.name] = node
}

function showTreeRow(binary) {

  let list_to_return = [] < ScrollWheelUp >
  for (i = 1; i < binary.length; i++) {

  }
}

function addNodeToTree(data, parent_node, direction) {

  console.log("adding new node to the tree")
  let new_node = createMoveTreNode(data, parent_node.name, direction)

  data_tree[new_node.name] = new_node

}

function accessDataNode(binary) {
  return data_tree[String(binary)]
}

function accessAboveDataNode(binary, size) {
  return data_tree[String(binary.slice(0, size))]
}

function accessDirectlyBelowDataNodes(binary) {
  return data_tree(String(binary + 1)), data_tree(String(binary + 0))
}

function accessMultipleBelowDataNodes(binary, directions) {
  if (directions == List) {
    let data_list = []

    for (let i = 0; i < directions.length; i++) {
      data_list.push(data_tree[String(binary + directions[i])])
    }

  }
}

module.exports = { dataTreeReturn, createParentNode, createMoveTreNode, addNodeToTree, accessDataNode, accessAboveDataNode, accessDirectlyBelowDataNodes, accessMultipleBelowDataNodes }
