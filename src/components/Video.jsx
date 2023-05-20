import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
const Video = () => {
    const context = useGlobalContext()
    const {relatedVids,videoDetails,handleChannel} = context
    const {videoId} = useParams()
    console.log(videoDetails)
    const relatedVideos = relatedVids?.map((vid,index) => {
        const {snippet} = vid
        const {thumbnails} = snippet
        const {high:{url}} = thumbnails
        return (
          <BoxContainer key={index}>
          <Link to={`/video/${vid.id.videoId}`}  onClick={() => handleChannel(vid.id)}><VideO >
          <VideoImg src={url}/>
          <CardContent>
           <Title>{snippet.title}</Title>
           <ChannelName>{snippet.channelTitle}<CheckCircleOutlineIcon style={{fontSize:"10px",marginLeft:"3px",transform:"translateY(2px)"}}/></ChannelName>
          </CardContent>
     </VideO></Link>
     </BoxContainer>
        )
        
  })
  return (
    <>
    <VideoContainer>
       <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width="90%" height="360px"/>
       <VideoDetails>     
        <VideoName>{videoDetails?.snippet?.title}</VideoName>
        <>
        <LikeCount>{videoDetails?.statistics?.likeCount} likes</LikeCount>
        <ViewCount>{videoDetails?.statistics?.viewCount} views</ViewCount>
        </>
       </VideoDetails>
    </VideoContainer>
    <RelatedVideos>     
       {relatedVideos}
    </RelatedVideos>
    </>
  )
}

export default Video
const VideoContainer = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    position: absolute;
    top: 70px;
    left:0;
    right: 0;
    overflow-x: hidden;
    background-color: #000;
    color:#fff;
   ::-webkit-scrollbar{
    width: 0px;
   }
`
const RelatedVideos = styled.div`
    color:#fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    top: 500px;
    right: 0;
    overflow-x: hidden;
    background-color: #000;
   ::-webkit-scrollbar{
    width: 0px;
   }
`
const VideoName = styled.h1`
  color:#fff;
  font-size:25px;
  font-weight: 600;
`
const LikeCount = styled.p`
    font-size:13px;
    opacity:0.6;
    font-weight: 400;
`
const ViewCount = styled.p`
    font-size:13px;
    opacity:0.6;
    font-weight: 400;
`
const VideoDetails = styled.h1`
  color:#fff;
  font-size:25px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:850px;
`

const BoxContainer = styled.div`
width:240px;
height:290px; 
margin:4px;
`
const VideO = styled.div`
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
  transform:${props => props.channel ? "translateY(4px)" : "translateY(-26px)"}; 
  padding: 7px;
  border-radius: 5px;
`