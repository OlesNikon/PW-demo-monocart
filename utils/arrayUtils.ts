export function compareArrays(
  expectedSortedArray: string[] | number[],
  actualSortedArray: string[] | number[]
): boolean {
  for (let i = 0; i < expectedSortedArray.length; i++) {
    if (expectedSortedArray[i] !== actualSortedArray[i]) {
      return false;
    }
  }
  return true;
}
