import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext  from '../auth'
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Box from '@mui/material/Box';

export default function LikeButton(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleLike(event) {
        event.stopPropagation();
        let likeUsernames = props.likeUsernames;
        let dislikeUsernames = props.dislikeUsernames;
        if (!likeUsernames.includes(auth.user.username)) {
            likeUsernames.push(auth.user.username);
        }
        else {
            let index = likeUsernames.indexOf(auth.user.username);
            likeUsernames.splice(index, 1);
        }
        if (dislikeUsernames.includes(auth.user.username)) {
            let index = dislikeUsernames.indexOf(auth.user.username);
            dislikeUsernames.splice(index, 1);
        }
        store.updateListRating(props._id, likeUsernames, dislikeUsernames);
    }

    let button = 
        <Box>
            <IconButton onClick={handleLike} aria-label='like'>
                <ThumbUpOffAltIcon style={{fontSize:'24pt'}} />
                {props.likeUsernames.length}
            </IconButton>
        </Box>;

    if (props.likeUsernames.includes(auth.user.username)) {
        button =
        <Box>
            <IconButton onClick={handleLike} aria-label='like'>
                <ThumbUpAltIcon style={{fontSize:'24pt'}} />
                {props.likeUsernames.length}
            </IconButton>
        </Box>
    }

    return(button);
}