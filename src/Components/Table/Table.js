import React, {useState, useMemo} from "react";
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import json from '../../utils/data.json'
import { COLUMNS } from "./columns";
import { Filter } from "./Filter/Filter";
import './Table.css'

let idCounter = 18

export const Table = ()=>{

    const [userData, setUserData] = useState(json)
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userLink, setUserLink] = useState('')
    const [userPayable, setUserPayable] = useState(false)

    const userFirstNameHandler = (event) =>{
        setUserFirstName(event.target.value)
    }
    const userLastNameHandler = (event) =>{
        setUserLastName(event.target.value)
    }
    const userEmailHandler = (event) =>{
        setUserEmail(event.target.value)
    }
    const userLinkHandler = (event) =>{
        setUserLink(event.target.value)
    }
    const userNameHandler = (event) =>{
        setUserName(event.target.value)
    }
    const userPayableHandler = (event) =>{
        setUserPayable(event.target.checked)
    }

    const addNewUser = (e) =>{
    e.preventDefault()
        const newUser = {
            "id": idCounter,
            "email": userEmail,
            "first_name": userFirstName,
            "pay_status": userPayable,
            "last_name": userLastName,
            "username": userName,
            "profile_link": userLink
        }
        setUserData([...userData, newUser])
        idCounter++
    }
   

    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>userData, [userData])

    const tableInstance = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy )

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = tableInstance

    const {globalFilter} = state


    return (
        <>
        <form onSubmit={addNewUser}>
            <input value={userFirstName} onChange={userFirstNameHandler} placeholder={'User first name...'}/>
            <input value={userLastName} onChange={userLastNameHandler} placeholder={'User last name...'}/>
            <input value={userEmail} onChange={userEmailHandler} placeholder={'User email...'}/>
            <input value={userName} onChange={userNameHandler} placeholder={'Username...'}/>
            <input value={userLink} onChange={userLinkHandler} placeholder={'User link...'}/>
            <label htmlFor="check">Payable?</label>
            <input is="check" type='checkbox' value={userPayable} onChange={userPayableHandler}/>
            <button type="submit">ADD USER</button>
        </form>
        <Filter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
              <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ⇓'
                        : ' ⇑'
                      : ''}
                  </span>
              </th>
              
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
    )
}