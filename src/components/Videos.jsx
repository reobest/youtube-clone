import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
const Videos = () => {
  const context = useGlobalContext()
  const { youtube, handleChannel, videoCategorie } = context
  const filteredVideos = youtube?.filter((video) => (video.id.videoId || video.id.channelId))
  const youTubeVideos = filteredVideos.map((vid, index) => {
    const { snippet } = vid
    const { thumbnails } = snippet
    const { high: { url } } = thumbnails
    
    return (
      <BoxContainer key={index}>
        {vid.id.playlistId && <h1>rayan bilal</h1>}
        {vid.id.videoId && <Link to={`/video/${vid.id.videoId}`} onClick={() => handleChannel(vid.id)}><Video >
          <VideoImg src={url} />
          <CardContent>
            <Title>{snippet.title}</Title>
            <ChannelName>{snippet.channelTitle}<CheckCircleOutlineIcon style={{ fontSize: "10px", marginLeft: "3px", transform: "translateY(2px)" }} /></ChannelName>
          </CardContent>
        </Video></Link>}
        {vid.id.channelId && <Link to={`/channel/${vid.id.channelId}`} onClick={() => handleChannel(vid.id)}><Video >
          <VideoImg src={url} channel />
          <CardContent channel>
            <Title>{snippet.title}</Title>
            <ChannelName>{snippet.channelTitle}<CheckCircleOutlineIcon style={{ fontSize: "10px", marginLeft: "3px", transform: "translateY(2px)" }} /></ChannelName>
          </CardContent>
        </Video></Link>}
      </BoxContainer>
    )

  })
  return (
    <Wrapper>
      <SideBar />
      <VideosContainer>
        <VideoName>{videoCategorie || "Videos"}</VideoName>
        {youTubeVideos}
      </VideosContainer>
    </Wrapper>
  )
}

export default Videos
const Wrapper = styled.div`
  height:auto;
  width:100%;
  background-color:#000;
`
const VideoName = styled.h1`
   position:relative;
   color:red;
   width:100%;
   left:35px;
   font-size:35px;
   @media screen and (max-width:400px) {
    width: 0;
    height: 0;
  }
`
const VideosContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    position: absolute;
    top: 77px;
    left: 150px;
    right: 0;
    height: 700px;
    overflow-x: hidden;
    background-color: #000;
    @media screen and (max-width:400px) {
     left:0;
    }
`
const BoxContainer = styled.div`
width:240px;
height:290px; 
margin:5px;
:hover{
  p{
    color:#ff1515;
  }
}
@media screen and (max-width:400px) {
    margin:20px;
    margin-top: 90px;
  }
`
const Video = styled.div`
  margin: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ChannelName = styled.p`
  color: #fff;
  opacity: 0.4;
  font-size: 10px;

`
const VideoImg = styled.img`
  height: ${props => props.channel ? "150px" : "180px"};
  width:${props => props.channel ? "150px" : "230px"};
  border-radius:${props => props.channel ? "50%" : "0px"};
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
  height: 125px;
  background-color: #1e1e1e;
  transform:${props => props.channel ? "translateY(4px)" : "translateY(-26px)"}; 
  padding: 7px;
  border-radius: 5px;
 @media screen and (max-width:400px) {
    width:330px;
  } 
`

