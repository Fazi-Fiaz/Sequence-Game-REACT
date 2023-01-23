import { maxPlayers } from "../../../Constants"

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
