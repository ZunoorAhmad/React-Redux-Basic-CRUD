import React from 'react'

const ChildComponent = ({ boolVariable, setBooleanVariable }) => {
    return (
        <>
            <div>ChildComponent</div>
            <h1>Boolean Value in Child Component : {boolVariable.toString()}</h1>
            <button className="btn btn-secondary me-2" onClick={() => setBooleanVariable(false)}>Set Boolean State to False</button>
        </>
    )
}

export default ChildComponent