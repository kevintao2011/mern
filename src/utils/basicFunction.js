function TestBasicFuntionLibrary(){
    console.log("Basic Function lib exists!")
}

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }
  function classifyValue(value) {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return 'array';
      } else if (value instanceof File || value instanceof Blob) {
        if (isImageFile(value)) {
          return 'image';
        } else {
          return 'file';
        }
      } else {
        return 'object';
      }
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else if (typeof value === 'string') {
      return 'string';
    } else {
      return 'unknown';
    }
  }
  
  function isImageFile(file) {
    // Check the file's extension or MIME type to determine if it is an image
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp'];
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
  
    const hasValidExtension = imageExtensions.some(extension => fileName.endsWith(extension));
    const hasValidMimeType = imageMimeTypes.includes(fileType);
  
    return hasValidExtension || hasValidMimeType;
  }
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepEqual(val1, val2) ||!areObjects && val1 !== val2) {
          return false;
        }
    }

    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

function isDuplicated(arr,element){
  if(arr.includes(element)){
    return true
  }else{
    return false
  }
}

function shallowCopy(originalObj){
  return JSON.parse(JSON.stringify(originalObj))
}

function findCombinations(arrays) { 
  function backtrack(currCombination, remainingArrays) {
      if (remainingArrays.length === 0) {
      combinations.push(currCombination.join(' '));//join('_')
      return;
      }
  
      const currentArray = remainingArrays[0];
      for (let i = 0; i < currentArray.length; i++) {
      const element = currentArray[i];
      backtrack(currCombination.concat(element), remainingArrays.slice(1));
      }
  }
  
  const combinations = [];
  backtrack([], arrays);
  // const data = {}
  // combinations.forEach(C=>{
  //     data[C]={
  //         quantity:0,
  //         price:0,
  //     }
  // })
  // update("data",data)
  return combinations;
}

function IntToFixDisgitString(integer,digit){
  console.log("fn to fix",integer.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false}))
  return integer.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false})
}

function findNextIndexString(ArrOfString){
  const digit = ArrOfString[0].length
  const nIndex = Math.max(...ArrOfString.map(str=> parseInt(str)))+1
  if (nIndex < 10^digit){
    return nIndex.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false})
  }else{
    throw console.error("overflow");
  }
  
}

function findNextIndex(ArrOfString){
  const digit = ArrOfString[0].length
  const nIndex = Math.max(...ArrOfString.map(str=> parseInt(str)))+1
  if (nIndex < 10^digit){
    return nIndex
  }else{
    throw console.error("overflow");
  }
  
}

export default TestBasicFuntionLibrary
export {
  shallowEqual,
  deepEqual,
  isObject,
  isDuplicated,
  shallowCopy,
  findCombinations,
  IntToFixDisgitString,
  findNextIndexString,
  findNextIndex,
  classifyValue,
  isImageFile
}


