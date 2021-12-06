import { useContext} from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext  from '../auth'
import IconButton from '@mui/material/IconButton';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Box from '@mui/material/Box';

export default function DislikeButton(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleDislike(event) {
        event.stopPropagation();
        let dislikeUsernames = props.dislikeUsernames;
        let likeUsernames = props.likeUsernames;
        if (!dislikeUsernames.includes(auth.user.username)) {
            dislikeUsernames.push(auth.user.username);
        }
        else {
            let index = dislikeUsernames.indexOf(auth.user.username);
            dislikeUsernames.splice(index, 1);
        }
        if (likeUsernames.includes(auth.user.username)) {
            let index = likeUsernames.indexOf(auth.user.username);
            likeUsernames.splice(index, 1);
        }
        store.updateListRating(props._id, likeUsernames, dislikeUsernames);
    }

    let button = 
        <Box>
            <IconButton onClick={handleDislike} aria-label='like'>
                <ThumbDownOffAltIcon style={{fontSize:'24pt'}} />
                {props.dislikeUsernames.length}
            </IconButton>
        </Box>;

    if (props.dislikeUsernames.includes(auth.user.username)) {
        button =
        <Box>
            <IconButton onClick={handleDislike} aria-label='like'>
                <ThumbDownAltIcon style={{fontSize:'24pt'}} />
                {props.dislikeUsernames.length}
            </IconButton>
        </Box>
    }

    return(button);
}