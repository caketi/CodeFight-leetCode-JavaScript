/*
  Generate all contiguous sequences from an array.

  input = [1,2,3,4]
  output = [  [1],        [2],        [3],      [4],
              [1,2],      [2,3],      [3,4],
              [1,2,3],    [2,3,4],
              [1,2,3,4] ]
*/

function subArray(arr) {
  if (arr.length < 1) return 0;
  if (arr.length < 2) return arr[0];

  result = [];
  for (let i = 0; i < arr.length; i++) {
    const temp = [];
    for (let j = i; j < arr.length; j++) {
      temp.push(arr[j]);
      result.push([...temp]);
    }
  }
  return result
}

L = [1,2,3,4,5,6];
console.log(subArray(L));

function subArrSum(arr) {
  if (arr.length < 1) return 0;
  if (arr.length < 2) return arr[0];

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += (arr.length - i) * (i + 1) * arr[i];
  }
  return sum;
}

console.log(subArrSum(L))
