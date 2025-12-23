/*  INDICES
 *
 *
 *                / \
 *       [0,-1] 1/   \0 [1,-1]
 *              /     \
 *             |       |
 *    [-1, 0] 2|       |5 [1,0]
 *             |       |
 *              \     /
 *       [-1,1] 3\   /4 [0,1]
 *                \ /
 *
 */

const hexLocations: [number, number][] = [
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 0],
  [1, -1],
];

export default hexLocations;
