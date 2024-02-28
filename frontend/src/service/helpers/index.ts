export function arraysAreEqual(arr1: any, arr2: any) {
  // If arrays have different lengths, they are not equal
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Compare each element of the arrays
  for (let i = 0; i < arr1.length; i++) {
    // If any elements are different, arrays are not equal
    const obj1String = JSON.stringify(arr1[i]);
    const obj2String = JSON.stringify(arr2[i]);
    if (obj1String !== obj2String) {
      return false;
    }
  }

  // If all elements are equal, arrays are equal
  return true;
}

export function getSortedObject(obj: any): object {
  const sortedKeys = Object.keys(obj).sort();

  // Construct a new object with sorted key-value pairs
  const sortedObj: any = {};
  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
}

export function areAllCharsInString(charArray: any, str: string) {
  // Iterate over each character in the charArray
  for (const char of charArray) {
    // If the character is not found in the string, return false
    if (!str.includes(char)) {
      return false;
    }
  }
  // If all characters are found in the string, return true
  return true;
}
