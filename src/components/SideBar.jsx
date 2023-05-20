import React, { useState } from 'react'
import styled from 'styled-components'
import { categories } from '../utils/constants'
import { useGlobalContext } from '../Context'
import { Link } from 'react-router-dom'
const SideBar = () => {
  const context = useGlobalContext()
    const {setKeyWord,setVideoCategorie} = context
    const newCategories = categories.map((category,index) => (
        <Link to='/' style={{width:"80%"}} key={index}><IconsContainer   onClick={() => {
          setKeyWord(category.name)
          setVideoCategorie(category.name)
          }} >
          <Icon>{category.icon}</Icon><Name>{category.name}</Name>
        </IconsContainer></Link>
    ))
  return (
    <Container>
        { newCategories }
    </Container>
  )
}

export default SideBar
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    position: sticky;
    left: 0px;
    top: 70px;
    background-color: rgb(0, 0, 0);
    border-right: solid;
    border-right-width: 1px;
    border-right-color: #2e2c2c;
    z-index: 100;
    @media screen and (max-width:400px) {
      display:none;
    }
`
const IconsContainer = styled.div`
   box-sizing: border-box;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   border-radius: 10px;
   margin: 3px 0;
   padding: 5px;
   cursor: pointer;
   :hover{
    background-color: red;
    >span{
        color: #fff;
    }
   }
`
const Name = styled.span`
  color: #fff;
  font-size: 15px;
  margin-left: 10px;
`
const Icon = styled.span`
  color: red;
  font-size: 10px;
`