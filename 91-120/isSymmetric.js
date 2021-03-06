/*
  Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
  For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

      1
     / \
    2   2
   / \ / \
  3  4 4  3

  But the following [1,2,2,null,3,null,3] is not:

      1
     / \
    2   2
     \   \
      3    3

  Note:
  Bonus points if you could solve it both recursively and iteratively.
*/

//  Iterative
function isSymmetricIterative(root) {
  if (!root) return true;
  const left = root.left;
  const right = root.right; 
  if (!left && !right) return true;
  if (!left || !right) return false;
  if (left.val != right.val) return false;

  L = [left], R = [right];
  while (L.length > 0 && R.length > 0) {
    const VL = [], VR = []
    const TL = [...L], TR = [...R];
    L = [];
    R = [];
    for (let l of TL) {
      if (l.left)  L.push(l.left);
      if (l.right) L.push(l.right);
      
      VL.push((l.left ? l.left.val : 'x'));
      VL.push((l.right ? l.right.val : 'x'));
    }

    for (let r of TR) {
      if (r.left)  R.push(r.left);
      if (r.right) R.push(r.right);
      
      VR.push((r.left ? r.left.val : 'x'));
      VR.push((r.right ? r.right.val : 'x'));
    }

    if (!checkValues(VL, VR)) return false;
  }
  return true;
}

function checkValues(L, R) {
  if (L.length != R.length) return false;
  for (let i = 0; i < L.length; i++) {
    if (L[i] != R[R.length-i-1]) return false;
  }
  return true;
}

//  Recursive
function isSymmetric(root) {
  return isMirror(root, root);
}

function compareRec(L, R) {
  if (!L && !R) return true;
  if (!L || !R) return false;
  if (L.val != R.val) return false;
  return isMirror(L.left, R.right) && isMirror(L.right, R.left);
}

function isSymmetricStack(root) {
  if (!root) return true;
  let stack = [root], arr = [];
  while (stack.length > 0) {
    const temp = [...stack];
    stack = [];
    arr = [];
    for (let t of temp) {
      if (!t.left) {
          arr.push(null);
      } else {
          arr.push(t.left.val);
          stack.push(t.left)
      }
      if (!t.right) {
          arr.push(null);
      } else {
          arr.push(t.right.val);
          stack.push(t.right)
      }
    }
    if (!checkArr(arr)) return false;
  }
  return true;
}
