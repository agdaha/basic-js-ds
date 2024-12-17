const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    this.head = addWithin(this.head, data);
    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    if (this.find(data)) {
      return true;
    }
    return false;
  }

  find(data) {
    if (!this.root()) {
      return null;
    }
    let c = this.root();
    let found = null;
    while (c && !found) {
      if (data < c.data) {
        c = c.left;
      } else if (data > c.data) {
        c = c.right;
      } else {
        found = c;
      }
    }
    return found;
  }


  remove(data) {
    this.head = removeNode(this.head, data);
    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
  }


  min() {
    if(!this.root()) return;
    let c = this.root();
    while (c.left) {
      c = c.left;
    }
    return c.data;
  }


  max() {
    if(!this.root()) return;
    let c = this.root();
    while(c.right){
       c = c.right
    }
    return c.data
  }
}

module.exports = {
  BinarySearchTree,
};
