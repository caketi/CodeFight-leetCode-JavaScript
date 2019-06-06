/*
  Given n non-negative integers representing the histogram's bar height 
  where the width of each bar is 1, find the area of largest rectangle in the histogram.

  Input: [2,1,5,6,2,3]      Output: 10    5 + 5
  Input: [2,1,5,6,3,3]      Output: 12    3 + 3 + 3 + 3
  Input: [3,4,3,0,5,6]      Output: 10    3 + 3 + 3 < 5 + 5 
*/

function largestRectangleArea(heights) {
  const len = heights.length;
  if (len < 1) return 0;
  if (len < 2) return heights[0];

  let max_area = 0, area = 0, stack = [], index = 0;
  while (index < len) {
    if (stack.length < 1 || heights[stack[stack.length-1]] <= heights[index]) {
      stack.push(index++);
    } else {
      const top = stack.pop();
      if (stack.length < 1) area = heights[top] * index;
      else area = heights[top] * (index - stack[stack.length-1] - 1);
      max_area = Math.max(max_area, area);
    }
  }
  while (stack.length > 0) {
    const top = stack.pop();
    if (stack.length < 1) area = heights[top] * len;
    else area = heights[top] * (len - stack[stack.length-1] - 1);
    max_area = Math.max(max_area, area);
  }
  return max_area;
}

input = [ [2,1,5,6,2,3], [2,1,5,6,3,3], [3,4,3,0,5,6] ];
for (let ip of input) console.log(largestRectangleArea(ip));
