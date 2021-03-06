/*
  A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
  The robot can only move either down or right at any polet in time. 
  The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

  Now consider if some obstacles are added to the grids. How many unique paths would there be?
  An obstacle and empty space is marked as 1 and 0 respectively in the grid.

  Note: m and n will be at most 100.

  Input:  [ [0,0,0],
            [0,1,0],
            [0,0,0] ]         Output: 2
  Explanation:  There is one obstacle in the middle of the 3x3 grid above.
                There are two ways to reach the bottom-right corner:
                1. Right -> Right -> Down -> Down
                2. Down -> Down -> Right -> Right
*/

function uniquePathsWithObstacles(obstacleGrid) {

  // No paths to the destination if the starting cell has an obstacle.
  if (obstacleGrid[0][0] == 1) return 0;

  let R = obstacleGrid.length;
  let C = obstacleGrid[0].length;

  // Number of ways of reaching the starting cell = 1.
  obstacleGrid[0][0] = 1;

  // Filling the values for the first column
  for (let i = 1; i < R; i++) {
    obstacleGrid[i][0] = (obstacleGrid[i][0] == 1 || obstacleGrid[i - 1][0] == 0) ? 0 : 1;
  }

  // Filling the values for the first row
  for (let i = 1; i < C; i++) {
    obstacleGrid[0][i] = (obstacleGrid[0][i] == 1 || obstacleGrid[0][i - 1] == 0) ? 0 : 1;
  }

  // Starting from cell(1,1) fill up the values
  // 0 for obstacles, the others cell[i][j] = cell[i - 1][j] + cell[i][j - 1]
  for (let i = 1; i < R; i++) {
    for (let j = 1; j < C; j++) {
      obstacleGrid[i][j] = (obstacleGrid[i][j] == 1) ? 0 : obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
    }
  }

  // Return value stored in rightmost bottommost cell. That is the destination.
  return obstacleGrid[R - 1][C - 1];
}

matrix = [
  [0,0,0,0],
  [0,0,0,0],
  [0,1,0,0],
  [0,0,0,0],
  [0,0,0,0],
]
console.log(uniquePathsWithObstacles(matrix));        //  17
matrix = [[1,0]];
console.log(uniquePathsWithObstacles(matrix));        //   0
matrix = [[0,1],[0,0]];
console.log(uniquePathsWithObstacles(matrix));        //   1
matrix = [[0,1],[1,0]];
console.log(uniquePathsWithObstacles(matrix));        //   0
matrix = [[0,0],[1,1],[0,0]]
console.log(uniquePathsWithObstacles(matrix));        //   0
matrix = [[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,1],[0,0],[0,0],[1,0],[0,0],[0,0],[0,1],[0,0],[0,0],[0,0],[0,0],[0,0]];
console.log(uniquePathsWithObstacles(matrix));        //   0

// Using table
var uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
    
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) obstacleGrid[r][c] = -1;
    }
  }

  let stayZero = false;
  for (let r = 0; r < m; r++) {
    if (obstacleGrid[r][0] < 0) stayZero = true;
    else if (!stayZero) obstacleGrid[r][0] = 1;
  }
  stayZero = false;
  for (let c = 0; c < n; c++) {
    if (obstacleGrid[0][c] < 0) stayZero = true;
    else if (!stayZero) obstacleGrid[0][c] = 1;
  }
    
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (obstacleGrid[r][c] < 0) continue;
      obstacleGrid[r][c] = obstacleGrid[r-1][c] + obstacleGrid[r][c-1];
      if (obstacleGrid[r-1][c] < 0 || obstacleGrid[r][c-1] < 0) obstacleGrid[r][c] += 1;
    }
  }
  return obstacleGrid[m-1][n-1] < 0 ? 0 : obstacleGrid[m-1][n-1];
}