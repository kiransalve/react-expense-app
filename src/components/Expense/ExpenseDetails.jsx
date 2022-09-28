import React from 'react'

const ExpenseDetails = (props) => {
    let title = props.title
    const callHandler = () => {
        title = "Updated"
        console.log(title)
    }
    const deleteHandler = () => {
        title = "delete button clicked..!!!"
        console.log(title)
    }
    return (
        <div className="expense-item__description">
            <h2>{title}</h2>
            <h2>{props.location}</h2>
            <div className="expense-item__price">$ {props.amount}</div>
            <button onClick={callHandler}>Change Title</button>
            <button onClick={deleteHandler}>Delete Title</button>
        </div>
    )
}

export default ExpenseDetails