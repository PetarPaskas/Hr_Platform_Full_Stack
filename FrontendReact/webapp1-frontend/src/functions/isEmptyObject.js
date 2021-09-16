export default function isEmptyObject(object){
    return object && Object.keys(object).length === 0;
}