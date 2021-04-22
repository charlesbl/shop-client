export default interface LoadingData<T> {
    loadState: LoadState;
    data: T | undefined;
}

export enum LoadState {
    LOADING,
    SUCCESS,
    ERROR
}
