// export const mockExec = {
//   exec() {
//     return Promise.resolve();
//   }
// };

export function mockExec(retrunData) {
  return {
    exec() {
      return Promise.resolve(retrunData);
    }
  };
}
