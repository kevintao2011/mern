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

function generateRandomColor(){

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
    return `white`
    
  }else{
    return `black`
  }
}

export default sliceHex 
export  {
  RGBHex2Dec,
  generateRandomColor,
  padZero,
  invertColor,
  getRGBPerceivedBrightness,
  getTextColor
}