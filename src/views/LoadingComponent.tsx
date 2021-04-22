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

    renderSuccess(t: T | undefined) {
        return (
            <div>Overwrite renderSuccess()</div>
        );
    }


    render() {
        switch (this.props.loadState) {
            case LoadState.LOADING:
                return this.renderLoading();
            case LoadState.ERROR:
                return this.renderError();
            case LoadState.SUCCESS:
                if (this.props.data) {
                    return this.renderSuccess(this.props.data);
                }
                else {
                    return this.renderNotFound();
                }

        }
    }
}