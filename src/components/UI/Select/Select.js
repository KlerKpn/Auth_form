import React, { useState, useEffect } from 'react'
import styles from './Select.module.css'

const Select = props => {
    const [show, setShow] = useState(false)
    const [active, setActive] = useState(null)
    const [touched, setTouched] = useState(false)

    useEffect(() => {
        if (props.data.data.length !== 4) {
            alert('Форма принимает в себя только 4 опции!')
        }
    }, [])

    const changeShow = () => setShow(!show)
    const selectOption = el => { setActive(el); changeShow(); props.onClick(el) }
    const touchHandler = () => { setTouched(true) }

    let cls = [styles.Select_title]
    if (touched) {
        cls.push(styles.touched)
    }

    return (
        <div className={styles.Select_block} onClick={changeShow}>
            <div className={styles.Select_label}>
                {props.data.default}
            </div>
            <div className={styles.Select}>

                <div
                    className={cls.join(' ')}
                    onClick={touchHandler}

                >
                    {active || props.data.default}
                </div>

                {
                    show
                        ? <div className={styles.Select_option_case}>
                            {
                                props.data.data.map((el, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.Select_option}
                                            onClick={() => selectOption(el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        : null
                }
            </div>
        </div>
    )
}

export default Select