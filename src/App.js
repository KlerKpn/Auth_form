import React, { useState, useEffect } from 'react'
import Input from './components/UI/Input/Input'
import styles from './App.module.css'
import Button from './components/UI/Button/Button'
import Select from './components/UI/Select/Select'
import RadioBtn from './components/UI/RadioBtn/RadioBtn'

function App() {

	function validateName(name) {
		const re = /^[a-z ,.'-]+$/i
		return re.test(name) && name.length > 1
	}

	function validatePhone(phone) {
		const re = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
		return re.test(phone)
	}

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	} // можно также воспользоваться библиотекой is_js для чистоты кода, решил не прегружать из-за одной функции
	const [allValid, setAllValid] = useState(false)
	const [radio, setRadio] = useState(false)
	const [formValid, setFormValid] = useState(false)
	const [option, setOption] = useState(false)
	const [selectData] = useState({
		default: 'Язык',
		data: ['Английский', 'Русский', 'Китайский', 'Испанский']
	})
	const [inputs, setInputs] = useState([
		{
			label: 'Имя',
			placeholder: 'Введите Ваше имя',
			value: '',
			errorMessage: 'Введено не корректное значение',
			type: 'text',
			valid: false,
			touched: false,
			validation: {
				required: true,
				name: true
			}
		},
		{
			label: 'Email',
			placeholder: 'Введите ваш email',
			value: '',
			errorMessage: 'Введено не корректное значение',
			type: 'email',
			valid: false,
			touched: false,
			validation: {
				required: true,
				email: true
			}
		},
		{
			label: 'Номер телефона',
			placeholder: 'Введите номер телефона',
			value: '',
			errorMessage: 'Введено не корректное значение',
			valid: false,
			touched: false,
			validation: {
				required: true,
				phone: true
			}
		}
	])

	const submitHandler = event => {
		event.preventDefault()
	}

	const validateControl = (value, validation) => {
		if (!validation) {
			return true
		}
		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}

		if (validation.name) {
			isValid = validateName(value) && isValid
		}

		if (validation.phone) {
			isValid = validatePhone(value) && isValid
		}
		return isValid
	}

	const onChangeHandler = (event, controlName) => {
		const formControls = { ...inputs }
		const control = { ...formControls[controlName] }

		control.value = event.target.value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		setInputs(prev => prev = formControls)
		setFormValid(isFormValid)
	}

	const renderInputs = () => {
		return Object.keys(inputs).map((controlName, index) => {
			const control = inputs[controlName]
			return (
				<Input
					key={index}
					label={control.label}
					value={control.value}
					placeholder={control.placeholder}
					errorMessage={control.errorMessage}
					type={control.type}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={!!control.validation}
					onChange={event => onChangeHandler(event, controlName)}
				/>
			)
		})
	}

	const onChangeRadio = value => { setRadio(value.checked) }
	const onChangeOption = value => { value !== 'язык' ? setOption(true) : setOption(false) }

	useEffect(() => {
		const bol = [formValid, radio, option].filter(el => el !== true).length > 0
		setAllValid(bol)
	})

	return (
		<form className={styles.App} onSubmit={submitHandler}>

			<div className={styles.reg_title}>
				<div className={styles.reg_title_text}>
					Регистрация
        		</div>
				<div className={styles.reg_title_auth}>
					Уже есть аккаунт? <a href='#'>Войти</a>
				</div>
			</div>

			<div className={styles.Input_container}>

				{renderInputs()}

			</div>

			<Select
				onClick={onChangeOption}
				data={selectData}
			/>

			<RadioBtn
				onChangeRadio={onChangeRadio}
			/>

			<Button
				disabled={allValid}
				label='Зарегистрироваться'
			/>

		</form>
	);
}

export default App;
