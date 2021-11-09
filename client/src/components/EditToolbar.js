import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    let undoClass = "top5-button-disabled";
    let redoClass = "top5-button-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    if (store.canUndo()) {
        undoClass = "top5-button";
    }
    if (store.canRedo()) {
        redoClass = "top5-button";
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }  
    return (
        <div id="edit-toolbar">
            <Button 
                disable={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disable={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoClass}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;