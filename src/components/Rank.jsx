import React from "react";

const Rank = ({ username, entries }) => {
    let display = (entries === '1') ? `1 face` : `${entries} faces`
    return <div className="pt2 tc">
        <div className="white f3">
            {`${username}, your have detected`}
        </div>
        <div className="white f1">
            {display}
        </div>
    </div>

}

export default Rank;