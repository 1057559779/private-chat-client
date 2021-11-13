/**
 * 两个数组做对比，相交元素的set集合
 */
export const sameValSet =(arr1,arr2)=>{
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    let intersect = new Set([...set1].filter(x => set2.has(x)));
    return intersect
}