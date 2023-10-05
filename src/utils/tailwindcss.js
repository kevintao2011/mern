// const colorArray = ["slate","gray","zinc","neutral","lime","green","cyan","stone","red","orange","amber","yellow","emerald","teal","sky","blue","indigo","violet","purple","fuchsia","pink","rose"]

const colorArray = ["slate","green","red","orange","yellow","blue","purple","pink"]

function pickRadomColor(value){
    const i = Math.ceil(Math.random()*colorArray.length)
    const color = colorArray[i]
    
    return `bg-${color}-${value*100}`
}

export default colorArray
export {pickRadomColor}