let count = 0; // Biến toàn cục được lưu vào trong server. Chỉ khi server tắt thì mới khởi tạo lại được
const createTree = (arr, parentId = "") => {
  const tree = [];
    arr.forEach(item => {
      if(item.parent_id === parentId) {
        count++;
        const newItem = item;
        newItem.index = count;
        const children = createTree(arr, item.id);
        if(children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
}

module.exports.tree = (arr, parentId = "") => {
  count = 0;
  const Tree = createTree(arr, parentId = "");
  return Tree;
}