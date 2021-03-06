import {  Checkbox, Divider, List,  ListItem,  ListItemIcon,  ListItemText,  SwipeableDrawer } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch   } from 'react-router-dom';
import { userData } from '../config/data';
import { UserState } from '../context';

const Sidebar = ({openSideBar,setOpenSideBar,userName,userAvatar,isDoneFilter,setIsDoneFilter,setAdminPanel,setUserPath}) => {

    var anchor = 'left';//assigning side for swipeable drawer

    const {isAdmin} = UserState();

    let { path } = useRouteMatch();
    
    const [state, setState] = useState({
        left: openSideBar
      });
      
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
          
        ) {
          return;
        }        
        setOpenSideBar(false)
        setState({ ...state, [anchor]: open });
      };

      const setAdminRoute = (id) => {
        setAdminPanel(id)
        
      }
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, true)}
          onKeyDown={toggleDrawer(anchor, true)}
        >
          <List>
            
              <ListItem button >
                <ListItemIcon>
                    <img src={userAvatar} alt="" style={{borderRadius : '10rem',height:'2.6rem',width: 'auto'}}/>
                </ListItemIcon>
                <ListItemText primary={`Hello, ${userName}`} />
              </ListItem>
              <Divider />
              <ListItem >
                      <ListItemText primary="Filters" />
              </ListItem>   
              <ListItem sx={{marginTop : -2}}>                 
                      <ListItemText primary="Done Tasks" />
                      <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} />                                        
              </ListItem>            
          </List>
          <Divider />
          <List style={{display : isAdmin ? 'block' : 'none'}}>
          <ListItem >
              <ListItemText primary="Users" />
              </ListItem>  
              {userData.map((user) => (
                <React.Fragment key={user.id}>

                  <Link to={`${path}/${user.first_name}`} style={{textDecoration:'none'}}>
                      <ListItem sx={{ cursor:'pointer'}}  onClick={(e) => {setAdminRoute(user.id)
                                                                                          setUserPath(`${path}/${user.first_name}`)}  }>                 
                      <ListItemIcon>
                          <img src={user.avatar} alt="" style={{borderRadius : '10rem',height:'2.6rem',width: 'auto'}}/>
                      </ListItemIcon>
                      <ListItemText primary={user.first_name} />                                    
                    </ListItem>  
                  </Link>                  

                </React.Fragment>
              ))
              }
               
          </List>
         
        </Box>
      );

      const toggleSideBar = (value) => {
        setState({ ...state, left : {value} });
      }
      
      useEffect(() => {
        toggleSideBar(openSideBar) 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openSideBar]) 
     
     if(openSideBar){        
            return (       
                <>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
                </>            
            )
     }else{
         return(<>
                
         </>)
     }
}

export default Sidebar
