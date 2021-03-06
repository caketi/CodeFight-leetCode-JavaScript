/*
  Given a linked list, swap every two adjacent nodes and return its head.
  You may not modify the values in the list's nodes, only nodes itself may be changed.

  Given 1->2->3->4, you should return the list as 2->1->4->3.
*/

class LinkedNode {
  constructor(value, next=null) {
    this.value = value;
    this.next = next;
  }
}

function swapPairs(head) {
  if (!head || !head.next) return head;
    
  const root = head.next;
  head.next = root.next;
  root.next = head;
  if (head.next != null) realSwap(head, head.next, head.next.next)
  return root;
};

function realSwap(curr, first, second) {
  if (!second) return;
  const temp = second.next;
  curr.next = second;
  second.next = first;
  first.next = temp;
  curr = first;
  if (!curr.next) realSwap(curr, null, null);
  else realSwap(curr, curr.next, curr.next.next);
}

node = new LinkedNode(1, new LinkedNode(2, new LinkedNode(3, new LinkedNode(4))));
console.log(swapPairs(node));

function swapPairsUsingArray(head) {
  if (!head || !head.next) return head;

  const list = [];
  let curr = head;
  while (curr) {
    const node = curr;
    curr = curr.next;
    node.next = null;
    list.push(node);
  }

  const root = list[1];
  curr = list[0];
  root.next = curr;
  if (list.length === 2) return root;

  for (let i=2; i<list.length; i+=2) {
    if (i === list.length - 1) {
      curr.next = list[i];
      break;
    }
    curr.next = list[i+1];
    curr.next.next = list[i];
    curr = list[i];
  }
  return root;
}

node = new LinkedNode(1, new LinkedNode(2, new LinkedNode(3, new LinkedNode(4, new LinkedNode(5)))));
console.log(swapPairsUsingArray(node));

//  Simple Recursion.
function swapTwo(head) {
  if (!head || !head.next) return head;

  const left = head;
  const right = head.next;
  const temp = head.next.next;
  head = right;
  right.next = left;
  left.next = temp ? swapTwo(temp) : null;

  return head;
}

var swapPairs = function(head) {
  if (!head || !head.next) return head;
  let first = head;
  let second = head.next;
  let third = second.next;
  second.next = first;
  head = second;
  first.next = third;
  while (third && third.next) {
    const last = first;
    first = third;
    second = third.next;
    third = third.next.next;
    last.next = second; 
    second.next = first;
    first.next = third;
  }
  return head;
}
