export default interface LoadingDataState<T> {
    loadState: LoadState;
    data: T | undefined;
}

export enum LoadState {
    LOADING,
    SUCCESS,
    ERROR
}
