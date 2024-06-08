import { useState } from "react"
import "./styles.css"

interface InputProps {
	label: string
	onChange: (value: any) => void
	placeholder?: string
	type: string
	style?: string
	showError?: boolean
	prefix?: any
	suffix?: any
	description?: string
	init?: any
}

const InputComponent = (props: InputProps) => {
	const { label, onChange, placeholder, type, style, showError, prefix, suffix, description, init } = props
	const [emptyError, setEmptyError] = useState(false)

	const checkEmpty = (value: any) => {
		if (value === "") setEmptyError(true)
		else setEmptyError(false)
	}

	const onChangeValue = (value: any) => {
		if (value !== "") setEmptyError(false)
		onChange(value)
	}

	return (
		<div className={`app-textbox settings ${style}`}>
			<label>{label}</label>
			<div className='app-textbox-area'>
				{prefix && prefix}
				<input defaultValue={init} onChange={(e) => onChangeValue(e.target.value)} type={type} placeholder={placeholder} onBlur={(e) => checkEmpty(e.target.value)} />
				{suffix && suffix}
			</div>
			{
				description && 
					<p className='mt-2 text-sm text-grey-classic'>
						{description}
					</p>
			}
			{
				emptyError || showError
					? <div className="empty-field-error">Please fill out field</div>
					: <div style={{height: "24px"}}></div>
			}
		</div>
	)
}

export default InputComponent