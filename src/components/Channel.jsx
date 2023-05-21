import React from 'react'
import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useGlobalContext } from '../Context'
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
const Channel = () => {
    const context = useGlobalContext()
    const {channelDetails,channelPage,handleChannel} = context
    const channelVideos = channelPage?.map((vid,index) => {
        const {snippet} = vid
      const {thumbnails} = snippet
      const {high:{url}} = thumbnails
        return (vid.id.videoId && <Link to={`/video/${vid.id.videoId}`}  onClick={() => handleChannel(vid.id)}><Video key={index}>
            <VideoImg src={url}/>
            <CardContent>
             <Title>{snippet.title}</Title>
             <ChannelName>{snippet.channelTitle}<CheckCircleOutlineIcon style={{fontSize:"10px",marginLeft:"3px",transform:"translateY(2px)"}}/></ChannelName>
            </CardContent>
       </Video></Link>)
})
  return (
    <>
    <SideBar/>
    <ChannelContainer>
         <BackGround></BackGround>
         <Channell>
          <ChannelImg src={channelDetails?.snippet?.thumbnails?.high?.url}/>
          <ChannelContent>
           <ChannelTitle>{channelDetails?.snippet.title}<CheckCircleOutlineIcon style={{fontSize:"10px",marginLeft:"3px",transform:"translateY(2px)"}}/></ChannelTitle>
           <Subscriptions>{channelDetails?.statistics?.subscriberCount} Subscribers</Subscriptions>
         </ChannelContent>
        </Channell>
        <ChannelVideoS>
        {channelVideos}
        </ChannelVideoS>
    </ChannelContainer>
    </>
  )
}

export default Channel
const ChannelVideoS = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    position:absolute;
    left:0;
    right:0;
    top:350px;
    bottom:0;
`
const ChannelContainer = styled.div`
    position: absolute;
    color:#fff;
    top: 70px;
    left: 150px;
    height: 700px;
    right: 0;
    overflow-x: hidden;
    background-color: #000;
   ::-webkit-scrollbar{
    width: 0px;
   }
   @media screen and (max-width:400px) {
     left:0;
    }
`
const BackGround = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    height: 180px;
    right: 0;
    background: linear-gradient(90deg,rgba(0,238,247,1) 0%,rgba(206,3,184,1) 100%,rgba(0,212,255,1) 100%);
`
const Channell = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top: 280px;
    text-align: center;
    cursor: pointer;
    position:relative;
    z-index:11;
`

const ChannelImg = styled.img`
    border-radius: 50%;
    height: 160px;
    width: 160px;
    top: -190px;
    position: absolute;
`
const ChannelContent = styled.div`
  box-sizing: border-box;
  width: 230px;
  height: 106px;
  background-color: transparent;
  transform: translateY(-20px);
  padding: 7px;
  border-radius: 5px;
`
const ChannelTitle = styled.p`
  margin: 0;
  color: #fff;
  font-size: 15px;
`
const Subscriptions = styled.div`
    font-size:15px;
    font-weight:300;
    opacity:0.7;
    margin-top:4px;
`


const Video = styled.div`
  margin: 5px;
  cursor: pointer;
`
const ChannelName = styled.p`
  color: #fff;
  opacity: 0.4;
  font-size: 10px;

`
const VideoImg = styled.img`
  height: 180px;
  width:230px;
  @media screen and (max-width:400px) {
    width:${props => props.channel ? "250px" : "330px"};
    height: ${props => props.channel ? "200px" : "230px"};
  }
`
const Title = styled.p`
  margin: 0;
  color: #fff;
  font-size: 12px;
`
const CardContent = styled.div`
  box-sizing: border-box;
  width: 230px;
  height: 106px;
  background-color: #1e1e1e;
  transform: translateY(-26px);
  padding: 7px;
  border-radius: 5px;
  @media screen and (max-width:400px) {
    width:330px;
  } 
`