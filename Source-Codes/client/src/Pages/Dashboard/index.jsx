import React from 'react';
import { useState, useEffect } from "react";
import styles from './styles.module.css';
import Slider from '../../Components/Slider';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderIcons from '../../Components/HeaderIcons';
import SearchBar from '../../Components/SearchBar';
import DashNavbar from '../../Components/DashNavbar';
import ElevyChat from '../../Components/ElevyChat';
import Stocks from '../../Components/Stocks';
import StockHistory from '../../Components/StockHistory';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, removeUserData } from "../../Slices/User/AuthSlice/authSlice";
import { useSignoutMutation, useSaveConversationMutation, useCheckPythonQuery } from "../../Slices/User/UserSlice/userApiSlice";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Box} from '@mui/material';
import { useGetRecommendedStocksQuery } from '../../Slices/StockSlice/stockApiSlice';


const Dashboard = ({ filteredData }) => {

const { data: pyResponse, error } = useCheckPythonQuery();    
const name1 = useSelector((state) => state.auth.name);
const [modifiedName, setModifiedName] = useState('');
const [pyRunning, setPyRunning] = useState(0);
const [loading, setLoading] = useState(true)
const dispatch = useDispatch();
const [signout] = useSignoutMutation();
const [getRec] = useGetRecommendedStocksQuery()

const [menuClicked, setMenuClicked] = useState(false);
const isMobile = useMediaQuery('(max-width:900px)');

const handleMenuClick = () => {
  setMenuClicked(!menuClicked);
  console.log(isMobile);
};

useEffect(() => {
  if (!isMobile) {
      setMenuClicked(false);
  }
}, [isMobile]);


useEffect(() => {
  const timer = setTimeout(() => {
    if (pyResponse !== undefined || error !== undefined) {
      if (error) {
        if (error.status === 500) {
          setPyRunning(-1);
          console.log("py not running");
        } 
      } else {
        setPyRunning(1);
        console.log("py running");
      }
      // End the initial loading phase
      setLoading(false);
    }
  }, 1500); // 2 second delay

  return () => clearTimeout(timer); // Cleanup timeout on unmount
}, [pyResponse, error]);


  useEffect(() => {
    const names = name1.split(' ');
    let modified = names[0];

    if (names.length > 1) {
      modified += ' ' + names.slice(1).map(name => name.charAt(0) + '.').join(' ');
    }
    setModifiedName(modified);
  }, [name1]);


    return (
        
      <Box sx={{ flexGrow: 1 }}>
        <Grid container className={styles.container}>

        <Grid item xs={12} className={styles.navbar}>
            <DashNavbar name="Dashboard" onClick={handleMenuClick}/>
        </Grid>

        <Grid item container columns={{ xs: 4, md: 12 }} className={styles.panelContainer}> 

        {((isMobile && menuClicked) || (!isMobile && !menuClicked)) && 
          <Grid item xs={12} md={2.5} className={styles.leftContainer}>
              <Grid container spacing={0}>
                <Grid item xs={8} md={10}>
                  <div className={styles.sliderContainer}>
                    <Slider name={modifiedName} />
                  </div>
                </Grid>
              </Grid>
          </Grid>
        }
          

          <Grid item xs={12} md={9.5} 
          className={`${styles.rightContainer} ${menuClicked ? styles.blurRightContainer : ''}`}
          >

            <Grid container spacing={6} className={styles.rightColumns}>
              <Grid item xs={11} md={4.5}>
                <div className={styles.col1}>
                  {!isMobile &&
                  <div className={styles.headerContainer}>
                   <HeaderTitle name="Dashboard" /> 
                  </div>
                  }
                  
                  <div className={styles.searchBarContainer}>
                    <SearchBar pyRunning={pyRunning}/> 
                  </div> 
                  <div className={styles.stocksContainer}>
                    <Stocks pyRunning={pyRunning} />
                  </div>
                  <div className={styles.stocksHistoryContainer}>
                    <StockHistory pyRunning={pyRunning} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={11} md={7}>
                <div className={styles.col2}>
                  {!isMobile &&
                  <div className={styles.iconsContainer}>
                    <HeaderIcons /> 
                  </div>
                  }
                  <div className={styles.elevyContainer}>
                    <ElevyChat pyRunning={pyRunning}/>
                  </div>
                </div>
              </Grid>
              
              </Grid>
            </Grid>
            
            
            </Grid>
          </Grid>
          </Box>
        
      
     
  );
};
export default Dashboard;