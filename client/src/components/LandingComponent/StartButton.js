
export default function StartButton({ startButton, submitValues }) {
    return (
        <div className="custom-btn">
            <button type="button" className="btn btn-light" disabled={startButton} onClick={submitValues}>
                Start Game
            </button>
        </div>
    )
}
