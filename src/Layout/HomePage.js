import DeckList from "../Decks/DeckList.js"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {listDecks} from "../utils/api/index.js";

export default function HomePage(){
    const [decks,setDecks] = useState([]);
    
    //Gets list of decks from API to send to DeckList
    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDecks(){
            const decks = await listDecks(abortController.signal);
            setDecks(decks);
        }
        fetchDecks();
    }, []);

    //The Home page
    return (
        <React.Fragment>
        <div>
            <Link to="/decks/new">
                <button type="button" className="oi oi-plus ml-3 mr-3 mb-3 btn btn-primary"> Create Deck</button>
            </Link>
            <DeckList decks={decks} setDecks={setDecks}></DeckList>
        </div>
        </React.Fragment>
    )

}