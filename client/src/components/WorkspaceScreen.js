import { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (text === "save") {
            store.saveList(store.currentList._id, [formData.get('firstItem'),formData.get('secondItem'),formData.get('thirdItem'),formData.get('fourthItem'),formData.get('fifthItem')], formData.get('listName'))
        }
        if (text === "publish") {
            store.publishList(store.currentList._id,
                [formData.get('firstItem'),formData.get('secondItem'),formData.get('thirdItem'),formData.get('fourthItem'),formData.get('fifthItem')],
                formData.get('listName'),
                new Date())
        }
    };

    function handleSave(event) {
        setText("save");
    }
    function handlePublish(event) {
        setText("publish");
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="listName"
                                    required
                                    fullWidth
                                    id="listName"
                                    label="List Name"
                                    autoFocus
                                    defaultValue={store.currentList.name}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>1.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstItem"
                                    label="First Item"
                                    name="firstItem"
                                    defaultValue={store.currentList.items[0]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>2.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    fullWidth
                                    id="secondItem"
                                    label="Second Item"
                                    name="secondItem"
                                    defaultValue={store.currentList.items[1]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>3.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    fullWidth
                                    id="thirdItem"
                                    label="Third Item"
                                    name="thirdItem"
                                    defaultValue={store.currentList.items[2]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>4.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fourthItem"
                                    label="Fourth Item"
                                    name="fourthItem"
                                    defaultValue={store.currentList.items[3]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>5.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fifthItem"
                                    label="Fifth Item"
                                    name="fifthItem"
                                    defaultValue={store.currentList.items[4]}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handlePublish}
                        >
                            Publish
                        </Button>
            </Box>
        </div>
    )
}

export default WorkspaceScreen;