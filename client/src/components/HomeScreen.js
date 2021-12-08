import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext  from '../auth'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import SearchBar from './SearchBar'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    function handleYourListView() {
        store.setCurrentView("Your Lists")
    }
    function handleAllListView() {
        store.setCurrentView("All Lists")
    }
    function handleUserListView() {
        store.setCurrentView("User Lists")
    }
    function handleCommunityListView() {
        // TO DO
    }
    function handleSortByNewPublish() {
        store.setSortBy("New Publish");
        handleMenuClose();
    }
    function handleSortByOldPublish() {
        store.setSortBy("Old Publish");
        handleMenuClose();
    }
    function handleSortByViews() {
        store.setSortBy("Views");
        handleMenuClose();
    }
    function handleSortByLikes() {
        store.setSortBy("Likes");
        handleMenuClose();
    }
    function handleSortByDislikes() {
        store.setSortBy("Dislikes");
        handleMenuClose();
    }
    function filterByListView(pair) {
        if (store.currentView === "Your Lists") {
            return pair.ownerEmail === auth.user.email;
        }
        else if (store.currentView === "All Lists") {
            return new Date(pair.publishDate) > new Date('1970-01-01');
        }
        else if (store.currentView === "User Lists") {
            return new Date(pair.publishDate) > new Date('1970-01-01');
        }
        return false;
    }
    function filterBySearchQuery(pair) {
        if (store.currentView === "Your Lists") {
            return pair.name.startsWith(store.searchQuery);
        }
        else if (store.currentView === "All Lists") {
            if (store.searchQuery === "") {
                return true;
            }
            else {
                return pair.name === store.searchQuery;
            }
        }
        else if (store.currentView === "User Lists") {
            return pair.username === store.searchQuery;
        } 
    }
    function sortFunction(a,b) {
        if (store.sortBy === "New Publish") {
            return new Date(a.publishDate) < new Date(b.publishDate);
        }
        else if (store.sortBy === "Old Publish") {
            return new Date(a.publishDate) > new Date(b.publishDate);
        }
        else if (store.sortBy === "Views") {
            return a.views < b.views;
        }
        else if (store.sortBy === "Likes") {
            return a.likeUsernames.length < b.likeUsernames.length;
        }
        else if (store.sortBy === "Dislikes") {
            return a.dislikeUsernames.length < b.dislikeUsernames.length;
        }
    }
    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.filter(pair => filterByListView(pair)).filter(pair => filterBySearchQuery(pair)).sort((a, b) => sortFunction(a,b)).map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <DeleteModal/>
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="home"
                id="home-button"
                onClick={handleYourListView}
            >
                <HomeIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="groups"
                id="groups-button"
                onClick={handleAllListView}
            >
                <GroupsIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="person"
                id="person-button"
                onClick={handleUserListView}
            >
                <PersonIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="functions"
                id="functions-button"
                onClick={handleCommunityListView}
            >
                <FunctionsIcon />
            </Fab>
            <SearchBar/>
            <Typography>SORT BY</Typography>
            <Fab 
                color="primary" 
                aria-label="sort"
                id="sort-button"
                onClick={handleSortMenuOpen}
            >
                <SortIcon />
            </Fab>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="search-menu"
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleSortByNewPublish}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={handleSortByOldPublish}>Publish Date (Oldest)</MenuItem>
                <MenuItem onClick={handleSortByViews}>Views</MenuItem>
                <MenuItem onClick={handleSortByLikes}>Likes</MenuItem>
                <MenuItem onClick={handleSortByDislikes}>Dislikes</MenuItem>
            </Menu>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;