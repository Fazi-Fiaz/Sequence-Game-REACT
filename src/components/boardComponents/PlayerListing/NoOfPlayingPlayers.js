import { maxPlayers } from "../../../constants"

function NoOfPlayingPlayers() {
    return (
        <>
            <div className="bold">Playing Players
                <div>
                    '{maxPlayers}'
                </div>
            </div>
        </>
    )
}

export default NoOfPlayingPlayers
