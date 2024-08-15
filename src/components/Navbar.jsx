import React from 'react'
import styled from 'styled-components'
import { logo } from '../utils/constants'
import { useGlobalContext } from '../Context'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const context = useGlobalContext()
    const { searchWord, handleClick, handleChange, handleKeyPress } = context
    return (
        <Container>
            <Link to='/' ><Logo src={logo} /></Link>
            <Wrrapper>
                <InputText onChange={handleChange} value={searchWord} onKeyUp={handleKeyPress} placeholder="Search For Video" />
                <Link to={searchWord !== "" ? '/search' : '/'} style={{display:"flex"}}><Icon  onClick={handleClick} /></Link>
            </Wrrapper>
        </Container>
    )
}

export default Navbar
const Icon = styled(SearchIcon)` 
color :red ;
`
const Wrrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    padding-inline: 10px;
    background-color: #fff;
    border-radius: 5px;
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
    >div{
        position: absolute;
        left: 50%;
        width:40%;
        transform: translateX(-50%);
    }
`
const Logo = styled.img`
    cursor: pointer;
    width: 50px;
    height: 40px;
    margin-left: 20px;
`
const InputText = styled.input`
    border: none;
    outline:none;
    height: 26px;
    width: 100%;
    font-size: 12px;
    padding-left: 5px;
    color:red;
`