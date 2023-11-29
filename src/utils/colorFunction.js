const twcolorString = ["Slate","Gray","Zinc","Neutral","Stone","Red","Orange","Amber","Yellow","Lime",
  "Green","Emerald","Teal","Cyan","Sky","Blue","Indigo","Violet","Purple","Fuchsia","Pink","Rose"]

const twcolorMap = {
  gray:'text-gray-50 bg-gray-500',
  red:'text-red-50 bg-red-500',
  yellow:'text-yellow-50 bg-yellow-500',
  green:'text-green-50 bg-green-500',
  blue:'text-blue-50 bg-blue-500',
  indigo:'text-indigo-50 bg-indigo-500',
  purple:'text-purple-50 bg-purple-500',
  pink:'text-pink-50 bg-pink-500',
  other:"text-slate-50 bg-slate-500"
}
  
function sliceHex(hexString){
  if (hexString.indexOf('#') === 0) {
    hexString = hexString.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hexString.length === 3) {
    hexString = hexString[0] + hexString[0] + hexString[1] + hexString[1] + hexString[2] + hexString[2];
  }
  if (hexString.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  return [hexString.slice(0, 2),hexString.slice(2, 4),hexString.slice(4, 6)]
}

function RGBHex2Dec(hexString){
  if (hexString.indexOf('#') === 0) {
    hexString = hexString.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hexString.length === 3) {
    hexString = hexString[0] + hexString[0] + hexString[1] + hexString[1] + hexString[2] + hexString[2];
  }
  if (hexString.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  return [parseInt(hexString.slice(0, 2),16),parseInt(hexString.slice(2,4),16),parseInt(hexString.slice(4, 6),16)]
}



function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function invertColor(hex) {
  const [R,G,B] = sliceHex(hex)
  // invert color components
  var r = (255 - parseInt(R, 16)).toString(16),
      g = (255 - parseInt(G, 16)).toString(16),
      b = (255 - parseInt(B, 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function getRGBPerceivedBrightness(hex){
  const [R,G,B] = sliceHex(hex)

  return ((parseInt(R,16) * 299) + (parseInt(G,16) * 587) + (parseInt(B,16) * 114)) / 1000
}

function getTextColor(hex){
  if(getRGBPerceivedBrightness(hex)<100){
    return `text-white`
    
  }else{
    return `text-black`
  }
}

function generateRandomTwColor(darkness=400){
  return twcolorString[Math.ceil(Math.random(twcolorString.length))]
}
function generateRandomTwBgnTextColor(){
  const index = Math.floor(Math.random()*twcolorString.length)
  console.log('index',index)
  const color =  twcolorString[index].toLowerCase()
  return [`bg-${color}-400`,`text-${color}-50`]
}
function getRandomColorString(){
  const index = Math.floor(Math.random()*Object.keys(twcolorMap).length)
  console.log('index',index)
  return twcolorMap[Object.keys(twcolorMap)[index]].toLowerCase()
}

export default sliceHex 
export  {
  RGBHex2Dec,
  generateRandomTwColor,
  padZero,
  invertColor,
  getRGBPerceivedBrightness,
  getTextColor,
  generateRandomTwBgnTextColor,
  twcolorMap,
  getRandomColorString
}