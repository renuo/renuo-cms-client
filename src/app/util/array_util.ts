class ArrayUtil {
  static from(iterable:NamedNodeMap):Attr[] {
    let arr:any[] = [];
    for (let i = 0; i < iterable.length; ++i) {
      arr.push(iterable.item(i));
    }
    return arr;
  }
}
