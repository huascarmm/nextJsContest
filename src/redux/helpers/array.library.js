let array = [];
export function groupBy(prop) {
  return array.reduce((groups, item) => {
    const val = item[prop];
    Object.assign(groups, { [val]: groups[val] || [] });
    groups[val].push(item);
    return groups;
  }, {});
}

export function Array(T) {
  array = T;
  return { groupBy };
}
