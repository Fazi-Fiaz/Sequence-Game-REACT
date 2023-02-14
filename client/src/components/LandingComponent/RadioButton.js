
function RadioButton({ id, value, handleRadioClick, heading, defaultChecked }) {
    return (
        <div className="form-check form-check-inline" id={id}>
            <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value={value}
                onClick={handleRadioClick}
                defaultChecked={defaultChecked}
            />
            <label className="form-check-label" htmlFor={id}>
                {heading}
            </label>
        </div>
    );
}

export default RadioButton;
