const Node = (data, left = null, right = null) => {
    return { data, left, right };
};

// Tree factory function
const Tree = (array) => {
    // Recursive function to construct BST
    function buildTree(arr, start, end) {
        if (start > end) return null;

        // Find the middle element
        let mid = start + Math.floor((end - start) / 2);

        // Create root node
        let root = Node(arr[mid]);

        // Create left subtree
        root.left = buildTree(arr, start, mid - 1);

        // Create right subtree
        root.right = buildTree(arr, mid + 1, end);

        return root;
    };

    // Insert function for BST
    function insert(node, value) {
        if (node === null) return Node(value);

        if (value < node.data) {
            node.left = insert(node.left, value);
        } else if (value > node.data) {
            node.right = insert(node.right, value);
        }

        return node;
    };

    // Remove function for BST
    function remove(root, value) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = remove(root.left, value);
        }

        else if (value > root.data) {
            root.right = remove(root.right, value);
        }
        
        else {
            if (root.left === null && root.right === null) {
                return null;
            }
            else if (root.left === null) {
                return root.right;
            }
            else if (root.right === null) {
                return root.left;
            }
            else {
                let minNode = findMin(root.right);
                root.data = minNode.data;
                root.right = remove(root.right, minNode.data);
            }
        }
        return root;
    }

    function findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

     // Function to find a node by its value
     function find(root, value) {
        if (root === null) return null;

        if (value === root.data) return root;

        if (value < root.data) return find(root.left, value);

        return find(root.right, value);
    }

    // Sort and remove duplicates, then build the tree
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    let root = buildTree(sortedArray, 0, sortedArray.length - 1);

    return {
        root,
        insert(value) {
            root = insert(root, value);
        },
        remove(value) {
            root = remove(root, value);
        },
        find(value) {
            return find(root, value);
        }
    };
};

// Pre-order traversal function
function preOrder(root) {
    if (root === null) return;
    console.log(root.data);
    preOrder(root.left);
    preOrder(root.right);
}

// Pretty print function
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

// Example usage
const arr = [1, 2, 3, 4, 5, 6, 11, 12];
const tree = Tree(arr);

console.log("Pre-order traversal:");
preOrder(tree.root);

console.log("Tree Structure:");
prettyPrint(tree.root);

// Inserting new values
tree.insert(10);
tree.insert(8);

console.log("Updated Tree Structure after Insertions:");
prettyPrint(tree.root);

// Removing a value
tree.remove(10);

console.log("Updated Tree Structure after Removal:");
prettyPrint(tree.root);
