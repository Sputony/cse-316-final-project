import { React, useContext, useState  } from 'react';
import GlobalStoreContext from '../store'
import AuthContext  from '../auth'
import TextField from '@mui/material/TextField';

export default function SearchBar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ text, setText ] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addListComment(props._id, {"commentUsername": auth.user.username, "commentString": text})
            setText("");
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value );
    }
    return (
        <TextField
                id="search-textfield"
                label="Add Comment"
                // margin="normal"
                fullWidth
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                value={text}
            />
    );
}