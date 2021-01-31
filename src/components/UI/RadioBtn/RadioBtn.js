import React from 'react'
import styles from './RadioBtn.module.css'


const RadioBtn = props => {
    // const ref = useRef(null)
    // function isChecked(){
    //     console.log(ref.current)
    // }
    const id = Math.random()
    return (
        <div className={styles.RadioBtn}>
            <input
                id={id}
                className={styles.RadioBtn_input}
                type='checkbox'
                onClick={event => props.onChangeRadio(event.target)}
            />
            <label
                htmlFor={id}
                className={styles.RadioBtn_title}
            >Принимаю <a href='#'>условия</a> пользования
             </label>
        </div>
    )
}

export default RadioBtn