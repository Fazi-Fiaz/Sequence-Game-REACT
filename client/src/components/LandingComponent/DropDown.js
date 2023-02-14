
export default function DropDown({
    select,
    showHide,
    playerSelection,
    forPlayers
}) {
    return (
        <select className="form-select cus-width" onChange={playerSelection}
            style={{ display: !showHide ? "none" : "block" }}
        >
            <option>{select}</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            {
                forPlayers ?
                    (
                        <>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                            <option value="6">Six</option>
                            <option value="7">Seven</option>
                            <option value="8">Eight</option>
                            <option value="9">Nine</option>
                            <option value="10">Ten</option>
                            <option value="11">Eleven</option>
                            <option value="12">Twelve</option>
                        </>
                    ) : ''
            }
        </select>
    )
}
