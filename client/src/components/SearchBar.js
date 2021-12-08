import { React, useContext, useState  } from 'react';
import GlobalStoreContext from '../store'
import TextField from '@mui/material/TextField';

export default function SearchBar() {
    const { store } = useContext(GlobalStoreContext);
    const [ text, setText ] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.setSearchQuery(text);
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