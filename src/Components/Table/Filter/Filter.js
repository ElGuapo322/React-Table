import React from "react";


export const Filter =({filter,setFilter})=>{
    return (
        <div>
        Search:{' '}
        <input value={filter || ''} onChange={e => setFilter(e.target.value)}/>
        
        </div>
    )
}