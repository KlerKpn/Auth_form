import React from 'react'
import styles from './Button.module.css'

const Button = props => (
    <button
        disabled={props.disabled}
        className={styles.Button}
    >
        {props.label}
    </button>
)


export default Button