// 该文件专门为 count 文件生成action对象
// 同步action，就是指action的值为object类型的一般对象
// import store from './store';
export const createIncrementAction = data => ({ type: 'increment', data: data });
export const createDecrementAction = data => ({ type: 'decrement', data: data });
// 所谓的异步action，就是指action的值为函数
// 异步action中一般都会调用同步action
// 异步action不是一定要用的
export const createIncrementAsyncAction = (data, time) => {
  return () => {
    setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, time);
  };
};
