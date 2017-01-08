declare module "lodash.memoize" {
    const memoize: (func: Function, resolver?: Function) => Function;
    export = memoize;
}
