import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context'
import ReactPlayer from 'react-player'
import youtubeimage from '../images/youtube.jpeg'
import { Link } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
const Video = () => {
  const context = useGlobalContext()
  const { relatedVids, videoDetails, handleChannel, setRelatedVids, options } = context
  const { videoId } = useParams()
  const { pathname } = useLocation();
  const relatedVideos = relatedVids?.map((vid, index) => {
    const { snippet } = vid
    const { thumbnails } = snippet
    const url = thumbnails?.high?.url || youtubeimage;
    return (
      <BoxContainer key={index}>
        <Link to={`/video/${vid.id.videoId}`} onClick={() => handleChannel(vid.id)}><VideO >
          <VideoImg src={url} />
          <CardContent>
            <Title>{snippet.title}</Title>
            <ChannelName>{snippet.channelTitle}<CheckCircleOutlineIcon style={{ fontSize: "10px", marginLeft: "3px", transform: "translateY(2px)" }} /></ChannelName>
          </CardContent>
        </VideO></Link>
      </BoxContainer>
    )
  })
  const fetchRelatedVideos = async () => {
    try {
      const API_URL_VIDEO = `https://youtube-v31.p.rapidapi.com/search?&part=snippet&relatedToVideoId=${videoId}&type=video`
      await axios.get(API_URL_VIDEO, options).then((response) => setRelatedVids(response.data.items))
    } catch (error) {
      console.error('Error fetching related videos:', error)
    }
  }
  useEffect(() => {
    fetchRelatedVideos()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <VideoContainer>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width="90%" height="360px" />
        <VideoDetails>
          <VideoName>{videoDetails?.snippet?.title}</VideoName>
          <LikeCount>{videoDetails?.statistics?.likeCount || 500} likes</LikeCount>
          <ViewCount>{videoDetails?.statistics?.viewCount + " views" || "110k views"}</ViewCount>
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
    gap: 20px;
    padding-top: 30px;
    justify-content: center;
    overflow-x: hidden;
    background-color: #000;
   ::-webkit-scrollbar{
    width: 0px;
   }
   @media screen and (max-width:400px) {
    top: 600px;
  }
`
const VideoName = styled.h1`
  color:#fff;
  font-size:25px;
  font-weight: 600;
  @media screen and (max-width:450px) {
    font-size:10px;
    width: 100%;
    text-align: center;
  }
`
const LikeCount = styled.p`
    display: flex;
    justify-content: center;
    width: 100px;
    font-size:13px;
    opacity:0.6;
    font-weight: 400;
`
const ViewCount = styled.p`
    display: flex;
    justify-content: center;
    width: 100px;  
    font-size:13px;
    opacity:0.6;
    font-weight: 400;
`
const VideoDetails = styled.div`
  color:#fff;
  font-size:25px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:90%;
  @media screen and (max-width:450px) {
    width:350px;
    flex-direction:column;
  }
`

const BoxContainer = styled.div`
width:240px;
height:290px; 
margin:4px;
:hover{
  p{
    color:#ff1515;
  }
}
@media screen and (max-width:400px) {
    margin:20px;
  }
`
const VideO = styled.div`
  margin: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width:450px) {
   margin:20px;
  }
`
const ChannelName = styled.p`
  color: #fff;
  opacity: 0.4;
  font-size: 10px;
  @media screen and (max-width:450px) {
    margin: 10px 20px;
  }
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
  @media screen and (max-width:450px) {
    margin: 0px 20px;
  }
`
const CardContent = styled.div`
  box-sizing: border-box;
  width: 230px;
  height: 106px;
  background-color: #1e1e1e;
  transform:${props => props.channel ? "translateY(4px)" : "translateY(-26px)"}; 
  padding: 7px;
  border-radius: 5px;
  @media screen and (max-width:450px) {
    width:330px;
  }
`