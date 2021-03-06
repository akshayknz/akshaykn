import { createUseStyles } from "react-jss";
import * as React from 'react';
import { NavLink } from "react-router-dom";

export default function RecentBlock() {
  const useStyles = createUseStyles({
    wrap: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridAutoRows: "auto",
      gridColumnGap: "23px",
      gridRowGap: "26px",
      padding: "31px",
      boxSizing: "border-box",
      maxWidth: "900px"
    },
    box: {
      borderRadius: "10px",
      backdropFilter: "blur(15px)",
      cursor: "pointer",
      transition: "all 0.1s",
      textDecoration: "none !important",
      boxShadow:
        "rgb(0 0 0 / 10%) 3px 3px 4px 2px,rgb(255 255 255 / 91%) -3px -3px 4px 2px,inset rgb(255 255 255 / 83%) 0 0 0 0, inset rgb(241 237 237 / 91%) 0 0 0 0",
      "&:hover": {
        boxShadow:
          "rgb(0 0 0 / 10%) 0 0 0 0, rgb(255 255 255 / 91%) 0 0 0 0,inset rgb(255 255 255 / 83%) -3px -3px 4px 2px,inset rgb(241 237 237 / 91%) 3px 4px 4px 2px"
      }
    },
    box1: {
      gridColumnStart: 1,
      gridColumnEnd: 4,
      gridRowStart: 1,
      gridRowEnd: 3
    },
    box2: {
      gridArea: "5/1/3/3",
      '@media (max-width: 600px)': {
        gridArea: "5/1/3/4",
      }
    },
    box3: {
      gridArea: "3/3/4/3",
      '@media (max-width: 600px)': {
        gridArea: "5/1/5/3",
      }
    },
    box4: {
      gridArea: "4/3/4/3",
      '@media (max-width: 600px)': {
        gridArea: "5/3/5/4",
      }
    },
    box5: {
      gridArea: "5/2/7/1",
      '@media (max-width: 600px)': {
        gridArea: "6/4/7/1",
      }
    },
    box6: {
      gridArea: "5/2/7/4",
      '@media (max-width: 600px)': {
        gridArea: "7/1/7/4",
      }
    },
    boxInsideWrap: {
      display: "-webkit-box",
      WebkitLineClamp: "6",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textAlign: "left",
      padding: "0 20px"
    },
    tag: {
      position: "absolute",
      left: "20px",
      bottom: "15px",
      fontSize: "13px",
      fontWeight: "500",
      display: "inline-block",
      background: "#cdcdcd36",
      padding: "3px 10px",
      borderRadius: "100px",
      border: "1px solid #8f8f8f4d",
      cursor: "pointer",
      transition: "all 0.25s",
      "&:hover": {
        background: "#63636336",
        padding: "3px 12px",
        border: "1px solid #0000004d"
      }
    },
    boxWithTag: {
      paddingBottom: "70px"
    },
    center: {
      display: "flex",
      justifyContent: "center"
    }
  });
  const classes = useStyles();
  return (
    <>
    <div className={classes.center}>
        <div className={`reveal ${classes.wrap}`}>
          <NavLink to="/works"
            data-delay="0"
            className={`reveal ${classes.box1} ${classes.box} ${classes.boxWithTag}`}
          >
            <NavLink to="/?tag=work" className={classes.tag}>#work</NavLink>
            <div className={classes.boxInsideWrap}>
              <h2>Works</h2>
              <p>
                The timeline of all the projects I've done and the personal
                projects I've created
              </p>
            </div>
          </NavLink>
          <NavLink to="/blog"
            className={`reveal ${classes.box2} ${classes.box} ${classes.boxWithTag}`}
            data-delay="10"
          >
            <div className={classes.tag}>#blog</div>
            <div className={classes.boxInsideWrap}>
              <h2>How The Metaverse Could Change The World Forever</h2>
              <p>How The Metaverse Could Change The World Forever or How It Could Be The Next Technological Flop.</p>
            </div>
          </NavLink>
          <NavLink to="/about"
            data-delay="10"
            className={`reveal ${classes.box3} ${classes.box}`}
          >
            <div className={classes.boxInsideWrap}>
              <p>Links to the outside</p>
            </div>
          </NavLink>
          <NavLink to="/about"
            data-delay="10"
            className={`reveal ${classes.box4} ${classes.box}`}
          >
            <div className={classes.boxInsideWrap}>
              <p>About.</p>
            </div>
          </NavLink>
          <NavLink to="/blog"
            data-delay="20"
            className={`reveal ${classes.box5} ${classes.box} ${classes.boxWithTag}`}
          >
            <div className={classes.tag}>#blog</div>
            <div className={classes.boxInsideWrap}>
              <p>The blog has a log of all things I've posted.</p>
            </div>
          </NavLink>
          <NavLink to="/blog"
            data-delay="20"
            className={`reveal ${classes.box6} ${classes.box} ${classes.boxWithTag}`}
          >
            <div className={classes.tag}>#blog</div>
            <div className={classes.boxInsideWrap}>
              <h2>Blog</h2>
              <p>The blog has a log of all things I've posted.</p>
            </div>
          </NavLink>
        </div>
    </div>
    </>
  );
}
