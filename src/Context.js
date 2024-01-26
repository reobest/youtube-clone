import React, { useState, useContext,useEffect } from 'react'
import axios from 'axios'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [youtube,setYouTube] = useState([])
    const [relatedVids,setRelatedVids] = useState([])
    const [keyWord,setKeyWord] = useState("")
    const [channelPage,setChannelPage] = useState([])
    const [channelDetails,setChannelDetails] = useState(null)
    const [videoDetails,setVideoDetails] = useState(null)
    const [videoCategorie,setVideoCategorie] = useState("")
    const [searchWord,setSearchWord] = useState("")
    const options = {
      params: {
      maxResults: '50',
      },
      headers: {
        'X-RapidAPI-Key':'542e091ce2msh711e6f2801e38d3p1a487djsn715b3270eab8' ,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    let API_URL,API_URL_VIDEO 
    const handleChange =  (e) => {
      setSearchWord(e.target.value)    
    }
      const getApi = async () => {
        if(keyWord === "") {
           API_URL = `https://youtube-v31.p.rapidapi.com/search?part=snippet`
           const {data} = await axios.get(API_URL,options)
          setYouTube(data.items)
        }if(keyWord !== ""){
          let API_URL_VIDEO =  `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${ keyWord }` 
          const {data} = await axios.get(API_URL_VIDEO,options)
          setYouTube(data.items)
        }
      }
      const handleChannel = async (id) => {
        if(id?.channelId) {
            API_URL = `https://youtube-v31.p.rapidapi.com/channels?part=snippet&id=${id.channelId}`
           API_URL_VIDEO = `https://youtube-v31.p.rapidapi.com/search?channelId=${id.channelId}&part=snippet&order=date`
          const {data} = await axios.get(API_URL,options)
           setChannelDetails(data?.items[0])
           await axios.get(API_URL_VIDEO,options).then((response) => setChannelPage(response.data.items))
        }
        if(id?.videoId) {
           API_URL = `https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=${id.videoId}`
          const {data} = await axios.get(API_URL,options)
          setVideoDetails(data?.items[0])
           API_URL_VIDEO = `https://youtube-v31.p.rapidapi.com/search?&part=snippet&relatedToVideoId=${id.videoId}&type=video`
          await axios.get(API_URL_VIDEO,options).then((response) => setRelatedVids(response.data.items))
        }
      }
      const handleKeyPress = async(event) => {
        if (event.key === 'Enter') {
          API_URL_VIDEO =  `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${ searchWord }` 
          const {data} = await axios.get(API_URL_VIDEO,options)     
          setYouTube(data.items)
          setSearchWord("")       
        }
      };
      const handleClick = async () => {
          API_URL_VIDEO =  `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${ searchWord }` 
          const {data} = await axios.get(API_URL_VIDEO,options)     
          setYouTube(data.items)
          setSearchWord("")
      }

      useEffect(() => {
        getApi()
      }, [keyWord])
      useEffect(() => {
        handleChannel()
      }, [])

        
  return (
    <AppContext.Provider value={{youtube,keyWord,setKeyWord,channelPage,channelDetails,handleChannel,videoCategorie,setVideoCategorie,setYouTube,setSearchWord,searchWord,handleClick,handleChange,videoDetails,relatedVids,handleKeyPress,setRelatedVids,options,API_URL_VIDEO}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }