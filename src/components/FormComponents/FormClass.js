class FormField{
    constructor(field_name,field_type,required,single,field_value){
        this.field_name = field_name;
        this.field_type = field_type;
        this.required = required;
        this.single = single;
        this.field_value = field_value;
    }
    toObject(){
         
    }
}
class Direction {
    static Up = new Direction('Up');
    static Down = new Direction('Down');
    static Left = new Direction('Left');
    static Right = new Direction('Right');
  
    constructor(name) {
      this.name = name;
    }
    toString() {
      return `Direction.${this.name}`;
    }
  }

Direction.Up()


class SelectField extends FormField{
    constructor(field_name,field_type,required,single,field_value,field_options){
        super(field_name,field_type,required,single,field_value);
        this.field_options= field_options;
    }
    MapData({obj}){
        try{
            return new SelectField(obj.field_name,obj.field_type,obj.required,obj.single,obj.field_value,obj.field_options)
        }catch{
            console.log("failed to map")
            return undefined
        }
    }
    getoptions(){
        return Object.keys(this.field_options)
    }
    getRsOptions(){
        return Object.keys(this.field_options).map(options=>{
            return {label:options,value:options}
        })
    }
}
export default FormField
export {SelectField}