import React from 'react'
import {Link} from 'react-router-dom'

const myLink = props =>{
    const {text,to,style,currentLink,onClick} = props
    
    const isSelected = currentLink === to

    const defaultStyle={
        width:'100%',
        textDecoration:'none',
        display:'inline-block',
        cursor:'pointer',
        whiteSpace:'noWrap',
        color:isSelected ? '#ffff99' :'#ffffff',
        // borderBottom:isSelected ? '1px solid #fff' : 'none',
        fontWeight: isSelected ? 'bold' : null,
    }
    const userStyle = style === undefined ? "" : style
    
    return(
        <Link
        to={to}
        onClick={onClick}
        style={{...defaultStyle,...userStyle}}
        className=" text-center"
        >
            {text}
        </Link>
    )
}

export default myLink;