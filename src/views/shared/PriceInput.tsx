import { NumericFormat } from 'react-number-format'

interface PriceInputProps {
    name?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const PriceInput = (props: PriceInputProps): JSX.Element => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.target.value = e.target.value.replaceAll('€', '')
        if (props.onChange != null) { props.onChange(e) }
    }

    return (
        <NumericFormat
            allowNegative={false}
            decimalScale={2}
            decimalSeparator="."
            displayType="input"
            fixedDecimalScale={true}
            name={props.name}
            onChange={handleChange}
            suffix="€"
            thousandsGroupStyle="thousand"
            type="text"
            value={props.value}
        />
    )
}
export default PriceInput
