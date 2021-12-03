import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <Typography variant="h2" color="black">Welcome to the <br/>
            Top 5 Lister!</Typography>
            <Typography variant="body1" color="black">The Top 5 Lister is a simple application for creating and publishing top 5 lists for other users to view, comment, and upvote! <br/>
            Lists created with the same topic are aggregated to settle once and for all the top 5 anything! <br/>
            So what are waiting for? Share your opinion with the internet!</Typography>
            <Typography variant="body2" color="black">Get started today by clicking here!</Typography>
            <Button variant="contained" color="success"><Link to='/register/'>Create New Account</Link></Button>
            <Typography variant="body2" color="black">Returning user? Click here!</Typography>
            <Button variant="contained" color="success"><Link to='/login/'>Login</Link></Button>
            <Typography variant="body2" color="black">Don't want to make an account yet? Click here to view as a guest!</Typography>
            <Button variant="contained" color="success">Continue as Guest</Button>
            <Typography variant="body2" color="black" align="right">Created by Anthony Tran</Typography>
        </div>
    )
}