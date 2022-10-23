import { NumericFormat } from "react-number-format"

type PriceInputProps = {
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const PriceInput = (props: PriceInputProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replaceAll("€", "");
        if (props.onChange)
            props.onChange(e);
    }

    return <NumericFormat
        type="text"
        name="price"
        value={props.value}
        onChange={handleChange}
        thousandsGroupStyle="thousand"
        decimalSeparator="."
        displayType="input"
        allowNegative={false}
        suffix="€"
        decimalScale={2}
        fixedDecimalScale={true} />
}
export default PriceInput;