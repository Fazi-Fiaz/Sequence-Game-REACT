function StaticCards() {
    return (
        <>
            <div className="discardCards">
                <div className="placements">
                    <img id="disID" src={require('../../assets/cards/jokar.png')} alt="Discards Cards" />
                </div>
            </div>

            <div className="remianing-deck">
                <div className="placements">
                    <img id="disID" src={require('../../assets/cards/card.jpeg')} alt="" />
                </div>
            </div>
        </>
    )
}

export default StaticCards
