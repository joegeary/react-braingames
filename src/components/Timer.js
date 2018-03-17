import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Timer extends Component {

    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval || 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getElapsedTime(baseTime, startedAt, stoppedAt = new Date().getTime()) {
        if (!startedAt) 
            return 0;

        return stoppedAt - startedAt + baseTime;
    }

    formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    render() {
        const { baseTime, startedAt, stoppedAt } = this.props;
        const elapsed = this.getElapsedTime(baseTime, startedAt, stoppedAt);

        return (
            <Fragment>{this.formatTime(elapsed)}</Fragment>
        );
    }

};

const mapStateToProps = (state) => {
    const { baseTime, startedAt, stoppedAt } = state.stopwatch;
    return {
        baseTime,
        startedAt,
        stoppedAt
    };
};

export default connect(mapStateToProps)(Timer);