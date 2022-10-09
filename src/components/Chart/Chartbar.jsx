import React from 'react'
import "./Chartbar.css"

const Chartbar = (props) => {
    let barfillHeight = "0%"

    if (props.maxValue > 0) {
        barfillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
    }

    return (
        <div className="chart-bar">
            <div className="chart-bar_inner">
                <div className="chart-bar_fill" style={{ height: barfillHeight }}></div>
            </div>
            <div className="chart-bar_label">{props.label}</div>

        </div>
    )
}

export default Chartbar