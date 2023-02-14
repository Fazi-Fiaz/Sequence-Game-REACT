import "bootstrap/dist/css/bootstrap.min.css"
import RadioButton from "../../components/LandingComponent/RadioButton";
import { useEffect, useState } from "react";
import DropDown from "../../components/LandingComponent/DropDown";
import TextInputField from "../../components/LandingComponent/TextInputField";
import StartButton from "../../components/LandingComponent/StartButton";
import { useNavigate } from 'react-router-dom'

function LandingScreen() {
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [noOfPlayers, setNoOfPlayers] = useState();
    const [noOfTeams, setNoOfTeams] = useState();
    const [startButton, setstartButton] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [gameLink, setGameLink] = useState('');
    const [adminplayer, setadminplayer] = useState(true)

    const handlePlayerName = (e) => {
        setPlayerName(e.target.value);
    };

    const handleRadioClick = (e) => {
        setIsTeamSelected(e.target.value === "Team");
    }
    const playerSelection = (e) => {
        setNoOfPlayers(e.target.value)
    }
    const teamSelection = (e) => {
        setNoOfTeams(e.target.value)
    }

    useEffect(() => {
        if (isTeamSelected) {
            if (noOfPlayers && noOfTeams && playerName) {
                setstartButton(false);
            } else {
                setstartButton(true);
            }
        } else {
            if (noOfPlayers && playerName) {
                setstartButton(false);
            } else {
                setstartButton(true);
            }
        }
    }, [isTeamSelected, noOfPlayers, noOfTeams, playerName]);

    const navigate = useNavigate();
    const submitValues = () => {
        const gameId = Math.random().toString(36).substring(7);
        setGameLink(`https://example.com/game/${gameId}`);
        navigate('/Sequence',
            {
                state:
                {
                    playerName: playerName,
                    noOfPlayers: noOfPlayers,
                    noOfTeams: noOfTeams,
                    gameId: gameId

                }
            }
        );
    }

    return (
        <section className="screen-container">
            <div className="container custom">
                <div className="main-heading">
                    <h1>WELCOME TO SEQUANCE</h1>
                </div>
                <div className="check-box">
                    <RadioButton
                        id="inlineRadio1" value="Single" defaultChecked={true}
                        handleRadioClick={handleRadioClick} heading="Single"
                    />
                    <RadioButton
                        id="inlineRadio2" value="Team"
                        handleRadioClick={handleRadioClick} heading="Team"
                    />
                </div>
                <div className="drop-down" >
                    <DropDown
                        select="No.of players"
                        showHide={true} playerSelection={playerSelection} forPlayers={true}
                    />
                    <DropDown
                        select="No.of Teams"
                        showHide={isTeamSelected} playerSelection={teamSelection}
                    />
                </div>
                <TextInputField handlePlayerName={handlePlayerName} playerName={playerName} />
                <StartButton startButton={startButton} submitValues={submitValues} />
            </div>
        </section >
    );
}

export default LandingScreen
