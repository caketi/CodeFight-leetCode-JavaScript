/*
  Given a string containing just the characters '(' and ')', 
  find the length of the longest valid (well-formed) parentheses substring.

  Input: "(()"              Output: 2   "()"
  Input: ")()())"           Output: 4   "()()"
  Input: ")(())))(())())"   Output: 6   "(())()""
  Input: ")()(((())))("     OUtput: 10  "()(((())))"
*/

// Brute Force
function longestValidParenthesesBF(s) {
  if (!s || s.length < 2) return 0;
  let max_str = '';
  for (let i = 0; i <= s.length; i++) {
    for (let j = i + 2 + max_str.length; j <= s.length; j+=2) {
      const str = s.substring(i,j);
      if (isValid(str)) {
        max_str = (max_str.length > j - i) ? max_str : str;
      }
    }
  }
  return max_str.length;
}

function isValid(s) { 
  let bal = 0;
  for (let i=0; i<s.length; i++) {
    if (s[i] === '(') bal++;
    else if (bal > 0) bal--;
    else return false; 
  }
  return bal === 0;
}

//  Dynamic Programming
function longestValidParenthesesDP(s) {
  let max = 0, i = 0;
  const dp = [];
  while ( i < s.length) dp[i++] = 0;
  for (let i=1; i < s.length; i++) {
    if (s[i] === ')') {
      if (s[i-1] === '(') {
        dp[i] = (i >=2 ? dp[i-2] : 0) + 2;
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
      }
      max = Math.max(max, dp[i]);
    }
  }
  return max;
}

//  Using Stack
function longestValidParenthesesStack(s) {
  let max = 0, stack = [-1];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        max = Math.max(max, i - stack[stack.length - 1]);
      }
    }
  }
  return max;
}

s = ")(())))(())())";
s = ")()(((())))(";
s = ")()())";
s = "(()";
strs = ["()", "(()", ")()())", ")()(((())))(", ")(())))(())())", ")(((((()())()()))()(()))(", "(((()(()", "))))))))"]
for (let s of strs) {
  console.log(longestValidParenthesesStack(s));   //  2, 2, 4, 10, 6, 22, 2, 0
}

console.time("BF:")
console.log(longestValidParenthesesBF("((())))()())))(((()()(())))((()(())()((()))())())())()())))))))(((()(())(()))(()()(()()((()))()(())(()(())))))()(())(()()(((()(()()))))((()()))))))()((()())()()))((())()((((()))()()()((()())))())((())))))))(()()((((((()))(((((((()()))((())()(()())()()()(()())(()())(())))()()))))()(((())(())(()())()))()(()))(())((()))))(())))()))((()((()(())(()()()()()))(())())()))))()(()(((())))()()()(((()((()))(()((((((())((()))(()(())(()))(())())))()()))))())(()((()()())()))((((()(()))()()))(()())))((()))(()((((()(())(())()((()))(()))())))(((()(())))((())()(()(((())))())())()()()())((()()))))))(()))(())()(((()))()()((()))(()))(((()))))))))(()(())())(()((())(()()))((())))(()())((((())))(()(()))())(((()(()((()(())((())())(()))(())))()()(())((()()))((()()((()()())())()))())()))())()))())(()(()))(()))()(())))((((())()())()()())((()())(()())(()()))()(())(())))))()()()((()(())(((()(())()()))(()()((()(((()))))))))(((()((()()((()(((((())((()((()((((((((())()))())((())((()((()(()((())(((()(()))()))))))))))))"));
console.timeEnd("BF:")

console.time("DP:")
console.log(longestValidParenthesesDP("((())))()())))(((()()(())))((()(())()((()))())())())()())))))))(((()(())(()))(()()(()()((()))()(())(()(())))))()(())(()()(((()(()()))))((()()))))))()((()())()()))((())()((((()))()()()((()())))())((())))))))(()()((((((()))(((((((()()))((())()(()())()()()(()())(()())(())))()()))))()(((())(())(()())()))()(()))(())((()))))(())))()))((()((()(())(()()()()()))(())())()))))()(()(((())))()()()(((()((()))(()((((((())((()))(()(())(()))(())())))()()))))())(()((()()())()))((((()(()))()()))(()())))((()))(()((((()(())(())()((()))(()))())))(((()(())))((())()(()(((())))())())()()()())((()()))))))(()))(())()(((()))()()((()))(()))(((()))))))))(()(())())(()((())(()()))((())))(()())((((())))(()(()))())(((()(()((()(())((())())(()))(())))()()(())((()()))((()()((()()())())()))())()))())()))())(()(()))(()))()(())))((((())()())()()())((()())(()())(()()))()(())(())))))()()()((()(())(((()(())()()))(()()((()(((()))))))))(((()((()()((()(((((())((()((()((((((((())()))())((())((()((()(()((())(((()(()))()))))))))))))"));
console.timeEnd("DP:")

console.time("Stack:")
console.log(longestValidParenthesesStack("((())))()())))(((()()(())))((()(())()((()))())())())()())))))))(((()(())(()))(()()(()()((()))()(())(()(())))))()(())(()()(((()(()()))))((()()))))))()((()())()()))((())()((((()))()()()((()())))())((())))))))(()()((((((()))(((((((()()))((())()(()())()()()(()())(()())(())))()()))))()(((())(())(()())()))()(()))(())((()))))(())))()))((()((()(())(()()()()()))(())())()))))()(()(((())))()()()(((()((()))(()((((((())((()))(()(())(()))(())())))()()))))())(()((()()())()))((((()(()))()()))(()())))((()))(()((((()(())(())()((()))(()))())))(((()(())))((())()(()(((())))())())()()()())((()()))))))(()))(())()(((()))()()((()))(()))(((()))))))))(()(())())(()((())(()()))((())))(()())((((())))(()(()))())(((()(()((()(())((())())(()))(())))()()(())((()()))((()()((()()())())()))())()))())()))())(()(()))(()))()(())))((((())()())()()())((()())(()())(()()))()(())(())))))()()()((()(())(((()(())()()))(()()((()(((()))))))))(((()((()()((()(((((())((()((()((((((((())()))())((())((()((()(()((())(((()(()))()))))))))))))"));
console.timeEnd("Stack:")
