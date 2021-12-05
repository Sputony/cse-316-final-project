import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleLike(event) {
        event.stopPropagation();
        // TO DO
    }
    function handleDislike(event) {
        event.stopPropagation();
        // TO DO
    }
    function handleExpand(event) {
        event.stopPropagation();
        // TO DO
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
            <Box sx= {{ flexGrow:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleLike} aria-label='like'>
                                <ThumbUpOffAltIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>{0}</Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleDislike} aria-label='dislike'>
                                <ThumbDownOffAltIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>{0}</Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ p: 1 }} sx={{fontSize:'24pt'}}>{'By: Kano'}</Box>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Box sx={{ p: 1 }} sx={{fontSize:'24pt'}} onClick={(event) => {handleLoadList(event, idNamePair._id)}} color="red">{"Edit"}</Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }} sx={{fontSize:'24pt'}}>{"Views: "}</Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ p: 1 }} sx={{fontSize:'24pt'}}>{0}</Box>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleExpand} aria-label='expand'>
                                <ExpandMoreIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;