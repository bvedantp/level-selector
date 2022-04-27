/* eslint-disable no-restricted-globals */
import React from "react";

const fullData = [
    {
        "level": 1,
        "totUsers": 15,
        "totStake": 391084.0742706849
    },
    {
        "level": 2,
        "totUsers": 2,
        "totStake": 333064.77614772215
    },
    {
        "level": 3,
        "totUsers": 0,
        "totStake": 0
    },
    {
        "level": 4,
        "totUsers": 1,
        "totStake": 400853.04164684564
    }
]

export default function Viewport(props) {
    const [totalData, setTotalData] = React.useState([]) //array of obj
    const [allDataState, setAllDataState] = React.useState(fullData)
    const [toggleState, setToggleState] = React.useState(true)

    function updateTotalData(event) {
        if(event.target.value == 0) {
            setToggleState(true)
            return;
        }
        let users = props.mainData.filter(item => item.level == event.target.value)
        let staked = users.reduce((prevValue, currValue) => {
            return Number(currValue.total_staked) + prevValue;
        }, 0)
        setToggleState(false)
        setTotalData([{level: Number(event.target.value), totUsers: users.length, totStake: staked}])
    }

    const displayTable = totalData.map(item => {
        return(
            <ul key={item.level}>
                <li>{item.level}</li>
                <li>{item.totUsers}</li>
                <li>{item.totStake}</li>
            </ul>
        )
    })

    const initialDisplayTable = allDataState.map(item => {
        return(
            <ul key={item.level}>
                <li>{item.level}</li>
                <li>{item.totUsers}</li>
                <li>{item.totStake}</li>
            </ul>
        )
    })

    return(
        <div>
            <select onClick={()=> updateTotalData(event)} >
                <option value="0">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
            </select>
            {toggleState ? initialDisplayTable : displayTable}
        </div>
    )
}