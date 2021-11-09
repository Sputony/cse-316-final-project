import { useContext, useState  } from 'react';
import GlobalStoreContext from '../store'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal() {
  const { store } = useContext(GlobalStoreContext);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  if (store.listMarkedForDeletion !== null && !open) {
      setOpen(true);
      setText(store.listMarkedForDeletion.name)
  }
  const handleClose = () => {
    store.unmarkListForDeletion();
    setOpen(false);
  }
  const handleDelete = () => {
    store.deleteMarkedList();
    store.unmarkListForDeletion();
    setOpen(false);
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete the Top 5 {text} List?
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleDelete} variant="contained" color="success">
              Confirm
            </Button>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}