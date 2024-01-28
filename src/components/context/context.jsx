import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { Provider } from 'react'

const pieces = {
    king : {
        scr:process.env.PUBLIC_URL + '/pics/Bking.png',
        piece:"king",
        color:"black"
    },
    queen : {
        scr:process.env.PUBLIC_URL + '/pics/BQueen.png',
        piece:"queen",
        color:"black"
    },
    rook : {
        scr:process.env.PUBLIC_URL + '/pics/BRook.png',
        piece:"rook",
        color:"black"
    },
    bishop : {
        scr:process.env.PUBLIC_URL + '/pics/BBishop.png',
        piece:"bishop",
        color:"black"
    },
    pawn : {
        scr:process.env.PUBLIC_URL + '/pics/BPawn.png',
        piece:"pawn",
        color:"black"
    },
    knight : {
        scr:process.env.PUBLIC_URL + '/pics/BKnight.png',
        piece:"knight",
        color:"black"
    },
    Wking : {
        scr:process.env.PUBLIC_URL + '/pics/Wking.png',
        piece:"king",
        color:"white"
    },
    Wqueen : {
        scr:process.env.PUBLIC_URL + '/pics/WQueen.png',
        piece:"queen",
        color:"white"
    },
    Wrook : {
        scr:process.env.PUBLIC_URL + '/pics/WRook.png',
        piece:"rook",
        color:"white"
    },
    Wbishop : {
        scr:process.env.PUBLIC_URL + '/pics/WBishop.png',
        piece:"bishop",
        color:"white"
    },
    Wpawn : {
        scr:process.env.PUBLIC_URL + '/pics/WPawn.png',
        piece:"pawn",
        color:"white"
    },
    Wknight : {
        scr:process.env.PUBLIC_URL + '/pics/WKnight.png',
        piece:"knight",
        color:"white"
    },
}

let playerGo = 'white'

const initialState = {
    king : {
        scr:process.env.PUBLIC_URL + '/pics/Bking.png',
        piece:"king"
    },
    queen : {
        scr:process.env.PUBLIC_URL + '/pics/BQueen.png',
        piece:"queen"
    },
    rook : {
        scr:process.env.PUBLIC_URL + '/pics/BRook.png',
        piece:"rook"
    },
    bishop : {
        scr:process.env.PUBLIC_URL + '/pics/BBishop.png',
        piece:"bishop"
    },
    pawn : {
        scr:process.env.PUBLIC_URL + '/pics/BPawn.png',
        piece:"pawn"
    },
    knight : {
        scr:process.env.PUBLIC_URL + '/pics/BKnight.png',
        piece:"knight"
    },
    Wking : {
        scr:process.env.PUBLIC_URL + '/pics/Wking.png',
        piece:"king"
    },
    Wqueen : {
        scr:process.env.PUBLIC_URL + '/pics/WQueen.png',
        piece:"queen"
    },
    Wrook : {
        scr:process.env.PUBLIC_URL + '/pics/WRook.png',
        piece:"rook"
    },
    Wbishop : {
        scr:process.env.PUBLIC_URL + '/pics/WBishop.png',
        piece:"bishop"
    },
    Wpawn : {
        scr:process.env.PUBLIC_URL + '/pics/WPawn.png',
        piece:"pawn"
    },
    Wknight : {
        scr:process.env.PUBLIC_URL + '/pics/WKnight.png',
        piece:"knight"
    },
}

const ThemeContext = React.createContext(initialState)

function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={pieces }>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
