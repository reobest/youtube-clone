import React from 'react'
import styled from 'styled-components'
import { logo } from '../utils/constants'
import { useGlobalContext } from '../Context'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const context = useGlobalContext()
    const {searchWord,handleClick,handleChange} = context
  return (
    <Container>
        <Link to='/' ><Logo src={logo}/></Link>      
        <InputText onChange={handleChange} value={searchWord} placeholder="Search For Video"/>
        <Link to={searchWord!="" ? '/search' : '/'}><Icon sx={{
            position: "absolute",
            right: "300px",
            color: "red",
            bottom:"22px",
        }}  onClick={handleClick}/></Link>
    </Container>
  )
}

export default Navbar
const Icon = styled(SearchIcon)`   
    @media screen and (max-width:400px) {
                margin-right: -280px;
     }
`
const Container = styled.div`
    position:sticky;
    top:0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background-color: #000;
    z-index:119;
`
const Logo = styled.img`
    cursor: pointer;
    width: 50px;
    height: 40px;
    margin-left: 20px;
`
const InputText = styled.input`
    border: none;
    height: 26px;
    width: 300px;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    font-size: 12px;
    padding-left: 5px;
    margin-right: 20px;
    color:red;
`