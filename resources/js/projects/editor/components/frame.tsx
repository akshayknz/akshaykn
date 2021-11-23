import React, {FunctionComponent, useRef, useState,useEffect } from 'react';
import withStyles, { createUseStyles } from "react-jss";
import nested from 'jss-plugin-nested';
import { AppProps } from "myModule";
import Hammer from "hammerjs";
import ReactDOM from 'react-dom';
import Dropper from "./dropper";
import Texter from "./texter";
import Control from "./control";
import Slider from '@mui/material/Slider';
import { VscArrowRight, VscActivateBreakpoints, VscTrash, VscDebugStepBack, VscMove } from "react-icons/vsc";
import { BiImage, BiFontColor, BiMinusFront } from "react-icons/bi";
import { RiDownloadLine } from "react-icons/ri";
import html2canvas from 'html2canvas';
type JSSStyles = { [keys: string]: React.CSSProperties | JSSStyles };

interface ComponentProps {
    classes: any,
    type: string
  }
interface MyState {
    height?: Number,
    width?: Number,
    showComponent?: boolean,
    controlToDropper?: boolean,
    textColor?: String | undefined,
    textBackColor?: String | undefined
}
const styles:JSSStyles = {
      box: {
          border: "2px solid rgb(122 122 122 / 10%)",
          borderRadius: "5px",
          height: "162px",
          width: "200px",
          backdropFilter: "blur(10px)",
          '&:hover': {
            backgroundColor: 'rgb(122 122 122 / 10%)'
          },
      },
      handle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: '0',
        transition: "opacity 0.1s",
        "&:hover $handleHeight": {
          transform: "scale(1.1)",
          width: "74px"
        },
        "&:hover $handleWidth": {
          transform: "scale(1.1)",
          height: "64px"
        }
      },
      styleFix: {
        overflowY: "clip"
      },
      handleHeight: {
        background: "#040404",
        width: "70px",
        height: "10px",
        position: "relative",
        top: "-6px",
        borderRadius: "10px",
        transition: "all 0.2s",
        cursor: "n-resize"
      },
      handleWidth: {
        background: "#040404",
        width: "10px",
        height: "60px",
        position: "relative",
        transition: "all 0.2s",
        left: "-6px",
        borderRadius: "10px",
        cursor: "e-resize"
      },
      one: {
        display: "flex",
        flexWrap: "nowrap",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        '&:hover $handle': {
          opacity: '1'
        },
        '&:hover $box': {
          border: "2px solid rgb(122 122 122 / 100%)",
        },
        '&:hover $controls': {
          opacity: "1",
        },
        '&:hover $controlsRight': {
          right: "-55px",
        },
        '&:hover $controlsBottom': {
          bottom: "-48px",
        }
      },
      controls: {
        position: "absolute",
        opacity: "0",
        transition: "opacity 0.2s, bottom 0.2s, right 0.2s",
        display: "flex"
      },
      controlsRight: {
        bottom: "0px",
        right: "-45px",
        width: "50px",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
      },
      controlsBottom: {
        justifyContent: "right",
        width: "100%",
        bottom: "-35px",
        height: "41px",
      },
      icons: {
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        background: "#ff000026",
        borderRadius: "5px",
        transition: "all 0.2s",
        margin: "2px 6px",
        cursor: "pointer",
        "&:hover": {
          background: "#ff000045",
          transform: "scale(1.05)"
        },
        "&:active": {
          background: "#ff000061",
          transform: "scale(0.95)"
        }
      },
      hidden: {
        opacity: 0,
        zIndex: -10
      },
      iconsUndo: {
        animation: "disappear 2.5s none 0.1s 1 normal",
        height: "40px",
        opacity: 0,
        position: "absolute",
        left: "10px",
        bottom: "10px",
        width: "90px",
        fontSize: "13px",
        zIndex: -10
      },
      sliderBottom: {
        width: "100%",
        margin: "-12px 4px 0px 0px",
        height: "37px !important"
      },
      sliderRight: {
        minHeight: "60px",
        height: "100%",
        width: "10px",
        margin: "0 0 7px 11px",
      },
      noEvents: {
        pointerEvents: "none"
      },
      events: {
        pointerEvents: "all"
      },
      colorInput: {
        opacity: "0",
        width: "0",
        height: "0",
        padding: "0"
      },
      downloader: {
        backdropFilter: 'none'
      }
  };
  function hasParentWithMatchingSelector (target:Node, selector:string) {
    const allSubMenus : NodeListOf<Element> = document.querySelectorAll(selector) 
    let myArray = Array.from(allSubMenus)
    return [...myArray].some(el =>
      el !== target && el.contains(target)
    )
  }
class Frame extends React.Component<ComponentProps, MyState> {
    constructor(props: ComponentProps | Readonly<ComponentProps>) {
        super(props);
        this.state = {
          height: 0,
          width: 0,
          showComponent: true,
          controlToDropper: false,
          textColor: 'red',
          textBackColor: 'transparent'
        };
      }
    
    masterRef = React.createRef<HTMLInputElement>();
    heightRef = React.createRef<HTMLInputElement>();
    widthRef = React.createRef<HTMLInputElement>();
    downloader = React.createRef<HTMLInputElement>();
    componentDidMount(){
        const stage = this.masterRef.current as HTMLElement;
        const widthstage = this.widthRef.current as HTMLElement;
        const heightstage = this.heightRef.current as HTMLElement;
        const height = stage.offsetHeight;
        this.setState({ height: height });
        const width = stage.offsetWidth;
        this.setState({ width: width }); 
        let mc = new Hammer.Manager(stage);
        let Pan = new Hammer.Pan({});
        mc.add(Pan);
        let lastPosX = 0;
        let lastPosY = 0;
        let isDragging = false;
        mc.on('pan', function(e) {
          // return false
          if(e.target.classList.contains('disableHammer')) return false
          if(hasParentWithMatchingSelector(e.target, '.disableHammer')) return false
          if(!Boolean(Number(localStorage.getItem('control')))) return false
          if ( ! isDragging ) {
              isDragging = true;
          }
          let posX = e.deltaX + lastPosX;
          let posY = e.deltaY + lastPosY;
          if (e.isFinal) {
              isDragging = false;lastPosX = posX;
              lastPosY = posY;
          }else{
              stage.style.transform = 'translate('+posX+'px,'+posY+'px)';
              widthstage.style.transform = 'translate('+posX+'px,'+posY+'px)';
              heightstage.style.transform = 'translate('+posX+'px,'+posY+'px)';
          }
        });

        let heightmc = new Hammer.Manager(heightstage);
        let heightPan = new Hammer.Pan({});
        heightmc.add(heightPan);
        let heightlastPosX = height;
        let heightlastPosY = height;
        let heightisDragging = false;
        heightmc.on('pan', (e) => {
            e.srcEvent.stopPropagation()
            if ( ! heightisDragging ) {
                heightisDragging = true;
            }
            let posX = e.deltaX + heightlastPosX;
            let posY = e.deltaY + heightlastPosY;
            if (e.isFinal) {
                heightisDragging = false;heightlastPosX = posX;
                heightlastPosY = posY;
                lastPosX = lastPosX;
                lastPosY = lastPosY;
            }
            let el = this.masterRef.current as HTMLElement;
            el.style.height=posY+"px";
            this.setState({ height: posY });
        });

        let widthmc = new Hammer.Manager(widthstage);
        let widthPan = new Hammer.Pan({});
        widthmc.add(widthPan);
        let widthlastPosX = width;
        let widthlastPosY = width;
        let widthisDragging = false;
        widthmc.on('pan', (e) => {
            if ( ! widthisDragging ) {
                widthisDragging = true;
            }
            let posX = e.deltaX + widthlastPosX;
            let posY = e.deltaY + widthlastPosY;
            if (e.isFinal) {
                widthisDragging = false;widthlastPosX = posX;
                widthlastPosY = posY;
            }
            let el = this.masterRef.current as HTMLElement;
            el.style.width=posX+"px";
            this.setState({ width: posX });
        });
        const downloader = this.downloader.current as HTMLElement;
        setTimeout(() => {
          html2canvas(downloader,{
            useCORS: true,
          }).then(function(canvas) {
            document.body.appendChild(canvas);
            var myImage = canvas.toDataURL("image/png");
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.setAttribute("href", myImage);
            link.setAttribute("download", 'yoo.png');
            link.click();
          });
        }, 1000);
        
    }
    
    toggleShowComponentState = () => {
      this.setState({ showComponent: this.state.showComponent? false : true });
    }
    toggleControlToDropper = () => {
      this.setState({ controlToDropper: this.state.controlToDropper? false : true });
      localStorage.setItem('control', (this.state.controlToDropper? '1':'0'));
    }
    handleFontColorChange = (event:React.FormEvent<HTMLInputElement>) => {
      this.setState({ textColor: event.currentTarget.value });
    }
    handleBackgroundColorChange = (event:React.FormEvent<HTMLInputElement>) => {
      this.setState({ textBackColor: event.currentTarget.value });
    }
    render(): JSX.Element {
      const {classes, children} = this.props;
      return(
        <>
        <div ref={this.downloader} className={classes.one + ' ' + ((this.state.showComponent)? null:classes.hidden)}>
            <div>
                <div ref={this.masterRef} className={classes.box + ' ' + (this.props.type == "downloader" && classes.downloader)}>
                {this.props.type == "text" &&
                <Texter color={this.state.textColor} background={this.state.textBackColor} />
                }
                {this.props.type == "downloader" &&
                <>aaaa</>
                }
                {this.props.type == "image" &&
                  <Dropper control={this.state.controlToDropper} />
                }
                <div className={classes.controls+' '+classes.controlsRight}>
                  {this.props.type == "text" &&
                    <>
                      <div className={classes.icons}><VscActivateBreakpoints /></div> {/* Color Picker */}
                      <label className={classes.icons}><BiFontColor /><input onChange={this.handleFontColorChange} type="color" className={classes.colorInput}></input></label> {/* Background */}
                      <label className={classes.icons}><BiImage /><input onChange={this.handleBackgroundColorChange} type="color" className={classes.colorInput}></input></label> {/* Background */}
                    </>
                  }
                  {this.props.type == "downloader" &&
                    <>
                      <div className={classes.icons}><RiDownloadLine /></div> {/* Color Picker */}
                    </>
                  }
                  <div className={classes.icons}><BiMinusFront /></div> {/* Bring to front */}
                </div>
                <div className={classes.controls+' '+classes.controlsBottom}>
                  {this.props.type == "image" &&
                    <>
                    <Control ev={this.toggleControlToDropper}><VscMove /></Control>
                    {/* <input className={classes.sliderBottom + " disableHammer"} type="range" min="1" max="100" defaultValue="50"></input> */}
                    </>
                  }
                  {/* Slider */}
                  <Control ev={this.toggleShowComponentState}><VscTrash /></Control>{/* Delete */}
                </div>  
                </div>
                <div ref={this.heightRef} style={ { width: `${ this.state.width }px` } } className={classes.handle}><div className={classes.handleHeight}></div></div>
            </div>
            <div ref={this.widthRef} style={ { height: `${ this.state.height }px` } } className={classes.handle + ' ' + classes.styleFix}><div className={classes.handleWidth}></div></div>
        </div>
        { this.state.showComponent ? null : 
          <div className={classes.iconsUndo}>
            {/* Somehow derive values like {50% 50%} from an input 
            method for adding to background-position style */}
            <Control ev={this.toggleShowComponentState}><VscDebugStepBack /> Undo</Control>{/* Delete */}
          </div> 
        }
        </>
      )
  }
}

  export default withStyles(styles)(Frame);
