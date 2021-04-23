import React from "react";
import LoadingData, { LoadState } from "./LoadingData";

export default class LoadingComponent<T, U = {}, V = {}> extends React.Component<LoadingData<T> & U, V> {
    renderLoading() {
        return (
            <div>Loading...</div>
        );
    }

    renderNotFound() {
        return (
            <div>Element not found</div>
        );
    }

    renderError() {
        return (
            <div>Error loading</div>
        );
    }

    renderSuccess(t?: T) {
        return (
            <div>Overwrite renderSuccess()</div>
        );
    }


    render() {
        if (this.props.loadState === LoadState.LOADING)
            return this.renderLoading();

        if (this.props.loadState === LoadState.ERROR)
            return this.renderError();

        if (this.props.loadState === LoadState.SUCCESS && !this.props.data)
            return this.renderNotFound();

        return this.renderSuccess(this.props.data);
    }
}