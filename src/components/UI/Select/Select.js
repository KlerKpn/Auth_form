import React from 'react'
import styles from './Select.module.css'

const Select = props => {

    return (
        <div>
            <div className={styles.label}>Язык</div>
            <select className={styles.Select} select={1}>
                <option className={styles.Select_option} value={1} hidden='true'>Язык</option>
                <option className={styles.Select_option} value={2}>Русский</option>
                <option className={styles.Select_option} value={3}>Английский</option>
                <option className={styles.Select_option} value={4}>Китайский</option>
                <option className={styles.Select_option} value={5}>Испанский</option>
            </select>
        </div>
    )
}

export default Select