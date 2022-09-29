import React, { useState } from 'react'

const ExpenseDetails = (props) => {
    const [title, setTitle] = useState(props.title)
    const [amount, setAmount] = useState(props.amount)
    const callHandler = () => {
        setTitle("Updated")
    }
    const amtHandler = () => {
        setAmount('100')
    }

    return (
        <div className="expense-item__description">
            <h2>{title}</h2>
            <h2>{props.location}</h2>
            <div className="expense-item__price">$ {amount}</div>
            <button onClick={amtHandler}>Change Amount</button>
            <button onClick={callHandler}>Change Title</button>
        </div>
    )
}

export default ExpenseDetails