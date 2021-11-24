// 该文件专门为 count 文件生成action对象
export const createIncrementAction = data => ({ type: 'increment', data: data });
export const createDecrementAction = data => ({ type: 'decrement', data: data });
export const createIncrementAsyncAction = data => ({ type: 'incrementAsync', data: data });
