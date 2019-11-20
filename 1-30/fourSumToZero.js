/*
  Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that 
  a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
  The solution set must not contain duplicate quadruplets.

  Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

  A solution set is:  [   [-1,  0, 0, 1],
                          [-2, -1, 1, 2],
                          [-2,  0, 0, 2]    ]
*/

//  Brute Force
function fourSumZero(nums, target) {
  subsets = [];
  const data = nums.map((e,i) => i);
  getSubsets(nums, nums.length, 4, 0, data, 0);
  const result = []
  for (let s of subsets) {
    if (s[0] + s[1] + s[2] + s[3] === target) {
      s.sort();
      let saveIt = true;
      for (let r of result) {
        if (r[0] === s[0] && r[1] === s[1] && r[2] === s[2] && r[3] === s[3]) saveIt = false;
      }
      if (saveIt) {
        result.push(s);
      }
    }
  }
  return result;
}

function getSubsets(arr, n, r, index, data, i) {
  if (index === r) {
    const temp = []
    for (let j=0; j<r; j++) {
      temp.push(data[j]);
    }
    subsets.push(temp)
    return
  }
  if (i >= n) return

  data[index] = arr[i];
  getSubsets(arr, n, r, index+1, data, i+1);
  getSubsets(arr, n, r, index, data, i+1);
}

var fourSum = function(nums, target) {
  if (nums.length < 4) return []
  result = [];
  data = [];
  set = new Set();
  nums = nums.sort((a,b) => a - b);
  makeSubsets(nums, 4, 0, 0, target);
  return result;
}

function makeSubsets(nums, maxCount, count, i, target) {
  if (maxCount === count) {
    if (getSum(data) === target) {
      const key = data.join(':');
      if (!set.has(key)) {
        set.add(key);
        result.push([...data]);
      }
    }
    return;
  }
  if (i >= nums.length) return ;

  data[count] = nums[i];
  makeSubsets(nums, maxCount, count+1, i+1, target);
  makeSubsets(nums, maxCount, count, i+1, target);
}

function getSum(arr) {
  let sum = 0
  arr.forEach(i => sum += i);
  return sum;
}