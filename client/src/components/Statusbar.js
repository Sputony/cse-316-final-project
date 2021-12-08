import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let currentView = null;
    if (auth.loggedIn && (store.currentView === "Your Lists")) {
        currentView = 
        <div id="top5-statusbar">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
        </div>
    }
    else if (store.currentView === "All Lists") {
        if (store.searchQuery === "") {
            currentView =
        <div id="top5-statusbar">
            <Typography variant="h2">{store.currentView}</Typography>
        </div>
        }
        else {
            currentView =
        <div id="top5-statusbar">
            <Typography variant="h2">{store.searchQuery + " Lists"}</Typography>
        </div>
        }
    }
    else if (store.currentView === "User Lists") {
        if (store.searchQuery === "") {
            currentView =
        <div id="top5-statusbar">
            <Typography variant="h2">{store.currentView}</Typography>
        </div>
        }
        else {
            currentView =
        <div id="top5-statusbar">
            <Typography variant="h2">{store.searchQuery + " Lists"}</Typography>
        </div>
        }
    }
    else if (store.currentView === "Community Lists") {
        currentView =
        <div id="top5-statusbar">
            <Typography variant="h2">{store.currentView}</Typography>
        </div>
    }
    return (
        currentView
    );
}

export default Statusbar;