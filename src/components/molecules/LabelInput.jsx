import Label from "../atoms/Label";
import Input from "../atoms/Input";

const LabelInput = ({ labelText, inputId, inputName, inputMax, inputType, placeholder, inputHanler, blurHandler}) => {
    return (
        <div
            style={{ width: 'clamp(220px, 90%, 260px)' }}
        >
            <div>
                <Label  htmlFor={inputId}>
                    {labelText}
                </Label>
            </div>
            <Input name={inputName} id={inputId} type={inputType} max={inputMax} placeholder={placeholder} onChange={inputHanler} onBlur={blurHandler} />
        </div>
    );
}

export default LabelInput;