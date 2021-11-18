const initState = 0;
export default function countReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case 'increment': // 如果是加
      return preState + data;
    case 'decrement': // 如果是减
      return preState - data;
    default:
      return preState;
  }
}
