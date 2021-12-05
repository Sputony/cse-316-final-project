import { React, useContext, useState  } from 'react';
import GlobalStoreContext from '../store'
import TextField from '@mui/material/TextField';

export default function SearchBar() {
    const { store } = useContext(GlobalStoreContext);
    const [ text, setText ] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // Set global state to "text"

            // let sourceId = event.target.id;
            // sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
            // store.addUpdateItemTransaction(sourceId-1, text);
            // toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value );
    }
    return (
        <TextField
                id="search-textfield"
                label="Search"
                // margin="normal"
                fullWidth
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
            />
    );
}