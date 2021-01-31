import React from 'react'
import styles from './Inputs.module.css'

const Input = props => {

    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    function isInvalid({ valid, touched, shouldValidate }) {
        return !valid && touched && shouldValidate
    }

    return (
        <div className={styles.Input_block}>
            <label
                htmlFor={htmlFor}
                className={styles.Input_label}
            >
                {props.label}
            </label>
            <input
                id={htmlFor}
                onChange={props.onChange}
                className={styles.Input}
                placeholder={props.placeholder}
                value={props.value}
            />
            <div className={styles.Input_valid}>
                {
                    isInvalid(props)
                        ? <span className={styles.Input_err}>{props.errorMessage}</span>
                        : null
                }
            </div>
        </div>
    )
}

export default Input