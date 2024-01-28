import React, { createElement, useRef } from "react";
import './board.css'
import { useContext } from "react";
import { ThemeContext } from "../context/context";
import { useState } from "react";

function Board() {
    const pieces = React.useContext(ThemeContext)
    let board = useRef()
    const width = 8
    const [playerGo , setPlayer] = useState('black')
    const [info , setInfo] = useState('')
    let square = useRef(0)

    



    const startPieces = [
        pieces.rook,pieces.knight,pieces.bishop,pieces.queen,pieces.king,pieces.bishop,pieces.knight,pieces.rook,
        pieces.pawn,pieces.pawn,pieces.pawn,pieces.pawn,pieces.pawn,pieces.pawn,pieces.pawn,pieces.pawn,
        '', '', '', '', '', '', '', '', 
        '', '', '', '', '', '', '', '', 
        '', '', '', '', '', '', '', '', 
        '', '', '', '', '', '', '', '', 
        pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,pieces.Wpawn,
        pieces.Wrook,pieces.Wknight,pieces.Wbishop,pieces.Wqueen,pieces.Wking,pieces.Wbishop,pieces.Wknight,pieces.Wrook,
    ]

    function playerChange() {
        if (playerGo == 'white') {
            revertIds()

            setPlayer('black')
        }else{
            reverseIds()
            setPlayer('white')
        }
    }

    function reverseIds() {
        let squares = document.querySelectorAll('.square')
        squares.forEach((sq,i) => {
            sq.setAttribute('id', (width * width - 1) - i)
        })
    }

    function revertIds() {
        let squares = document.querySelectorAll('.square')
        squares.forEach((sq,i) => {
            sq.setAttribute('id', i)
        })
    }

    let startPosition
    let draggedElement
    let finalSquare

    function dragstart(ths) {
        startPosition = ths.target.parentElement.parentElement.id
        draggedElement = ths.target.parentNode
    }

    function dragover(ths){
        ths.preventDefault()
    }

    function dragdrop(ths) {
        ths.stopPropagation()
        let taken
        let correctGo

        if (ths.target.className == 'pic') {
            finalSquare = ths.target.parentNode.parentNode
        }else{
            finalSquare = ths.target
        }

        if(draggedElement.className == `piece ${playerGo}`){
            correctGo = true
        }else{
            correctGo = false
        }

        const opponentGo = playerGo === 'white' ? 'black' : 'white'

        let takenByOpponent
        if (ths.target.parentElement?.className == `piece ${opponentGo}`) {
            takenByOpponent = true
        }else{
            takenByOpponent = false
        }

        if (ths.target.parentElement.className == `piece ${playerGo}`) {
            taken = true
        }else{
            taken = false
        }


        let valid

        
            valid = checkIfValid(ths.target)
            console.log(draggedElement.id);
        
        

        if (correctGo) {
            if (takenByOpponent && valid) {
                let targetSquare = ths.target.parentNode.parentElement
                ths.target.parentNode.remove()
                targetSquare.append(draggedElement)
                checkForWin()
                playerChange()
                return
            }else
            if (taken && ! takenByOpponent) {
                return
            }else if (valid) {
                finalSquare.append(draggedElement)
                playerChange()
                return
            }
            
        }

        checkForWin()
    }

    function checkIfValid(target) {
        const targetId = Number(finalSquare.id)
        const startId = Number(startPosition)
        const piece = draggedElement.id

        switch(piece) {
            case 'pawn':
                const starterRow = [8,9,10,11,12,13,14,15]
                if (starterRow.includes(startId)
                    && startId + width * 2 == targetId 
                    || startId + width == targetId
                    || startId + width - 1 == targetId && document.getElementById(`${startId + width - 1}`).firstChild 
                    || startId + width + 1 == targetId && document.getElementById(`${startId + width + 1}`).firstChild) {
                    return true
                }
                break;
            case 'knight':
                if(
                    startId + width * 2 + 1 === targetId ||
                    startId + width * 2 - 1 === targetId ||
                    startId + width - 2 === targetId ||
                    startId + width + 2 === targetId ||
                    startId - width * 2 + 1 === targetId ||
                    startId - width * 2 - 1 === targetId ||
                    startId - width - 2 === targetId ||
                    startId - width + 2 === targetId
                ){
                    return true
                }
                break;
            case 'bishop':
                if (
                    startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 3 + 3 === targetId && !document.getElementById(`${startId + width * 2 + 2}`).firstChild && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 4 + 4 === targetId && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 5 + 5 === targetId && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 6 + 6 === targetId && !document.getElementById(`${startId + width * 5 + 5}`).firstChild && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 7 + 7 === targetId && !document.getElementById(`${startId + width * 6 + 6}`).firstChild && !document.getElementById(`${startId + width * 5 + 5}`).firstChild && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||

                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 3 - 3 === targetId && !document.getElementById(`${startId - width * 2 - 2}`).firstChild && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 4 - 4 === targetId && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 5 - 5 === targetId && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 6 - 6 === targetId && !document.getElementById(`${startId - width * 5 - 5}`).firstChild && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 7 - 7 === targetId && !document.getElementById(`${startId - width * 6 - 6}`).firstChild && !document.getElementById(`${startId - width * 5 - 5}`).firstChild && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||

                    startId + width - 1 === targetId ||
                    startId + width * 2 - 2 === targetId && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 3 - 3 === targetId && !document.getElementById(`${startId + width * 2 - 2}`).firstChild && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 4 - 4 === targetId && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 5 - 5 === targetId && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 6 - 6 === targetId && !document.getElementById(`${startId + width * 5 - 5}`).firstChild && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 7 - 7 === targetId && !document.getElementById(`${startId + width * 6 - 6}`).firstChild && !document.getElementById(`${startId + width * 5 - 5}`).firstChild && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||

                    startId - width + 1 === targetId ||
                    startId - width * 2 + 2 === targetId && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 3 + 3 === targetId && !document.getElementById(`${startId - width * 2 + 2}`).firstChild && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 4 + 4 === targetId && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 5 + 5 === targetId && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 6 + 6 === targetId && !document.getElementById(`${startId - width * 5 + 5}`).firstChild && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 7 + 7 === targetId && !document.getElementById(`${startId - width * 6 + 6}`).firstChild && !document.getElementById(`${startId - width * 5 + 5}`).firstChild && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild 
                ) {
                    return true
                }
                break;
            case 'rook':
                if (
                    startId + width === targetId ||
                    startId + width * 2 === targetId && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 3 === targetId && !document.getElementById(`${startId + width * 2}`).firstChild && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 4 === targetId && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 5 === targetId && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 6 === targetId && !document.getElementById(`${startId + width * 5}`).firstChild && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 7 === targetId && !document.getElementById(`${startId + width * 6}`).firstChild && !document.getElementById(`${startId + width * 5}`).firstChild && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||

                    startId - width === targetId ||
                    startId - width * 2 === targetId && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 3 === targetId && !document.getElementById(`${startId - width * 2}`).firstChild && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 4 === targetId && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 5 === targetId && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 6 === targetId && !document.getElementById(`${startId - width * 5}`).firstChild && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 7 === targetId && !document.getElementById(`${startId - width * 6}`).firstChild && !document.getElementById(`${startId - width * 5}`).firstChild && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||

                    startId + 1 === targetId ||
                    startId + 2 === targetId && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 3 === targetId && !document.getElementById(`${startId + 2}`).firstChild && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 4 === targetId && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 5 === targetId && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 6 === targetId && !document.getElementById(`${startId + 5}`).firstChild && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 7 === targetId && !document.getElementById(`${startId + 6}`).firstChild && !document.getElementById(`${startId + 5}`).firstChild && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||

                    startId - 1 === targetId ||
                    startId - 2 === targetId && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 3 === targetId && !document.getElementById(`${startId - 2}`).firstChild && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 4 === targetId && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 5 === targetId && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 6 === targetId && !document.getElementById(`${startId - 5}`).firstChild && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 7 === targetId && !document.getElementById(`${startId - 6}`).firstChild && !document.getElementById(`${startId - 5}`).firstChild && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild 
                    
                ) {
                    return true;
                }
                break;
            case 'queen':
                if (
                    startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 3 + 3 === targetId && !document.getElementById(`${startId + width * 2 + 2}`).firstChild && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 4 + 4 === targetId && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 5 + 5 === targetId && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 6 + 6 === targetId && !document.getElementById(`${startId + width * 5 + 5}`).firstChild && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||
                    startId + width * 7 + 7 === targetId && !document.getElementById(`${startId + width * 6 + 6}`).firstChild && !document.getElementById(`${startId + width * 5 + 5}`).firstChild && !document.getElementById(`${startId + width * 4 + 4}`).firstChild && !document.getElementById(`${startId + width * 3 + 3}`).firstChild && !document.getElementById(`${startId + width * 2 + 2}`).firstChild  && !document.getElementById(`${startId + width + 1}`).firstChild ||

                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 3 - 3 === targetId && !document.getElementById(`${startId - width * 2 - 2}`).firstChild && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 4 - 4 === targetId && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 5 - 5 === targetId && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 6 - 6 === targetId && !document.getElementById(`${startId - width * 5 - 5}`).firstChild && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||
                    startId - width * 7 - 7 === targetId && !document.getElementById(`${startId - width * 6 - 6}`).firstChild && !document.getElementById(`${startId - width * 5 - 5}`).firstChild && !document.getElementById(`${startId - width * 4 - 4}`).firstChild && !document.getElementById(`${startId - width * 3 - 3}`).firstChild && !document.getElementById(`${startId - width * 2 - 2}`).firstChild  && !document.getElementById(`${startId - width - 1}`).firstChild ||

                    startId + width - 1 === targetId ||
                    startId + width * 2 - 2 === targetId && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 3 - 3 === targetId && !document.getElementById(`${startId + width * 2 - 2}`).firstChild && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 4 - 4 === targetId && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 5 - 5 === targetId && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 6 - 6 === targetId && !document.getElementById(`${startId + width * 5 - 5}`).firstChild && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||
                    startId + width * 7 - 7 === targetId && !document.getElementById(`${startId + width * 6 - 6}`).firstChild && !document.getElementById(`${startId + width * 5 - 5}`).firstChild && !document.getElementById(`${startId + width * 4 - 4}`).firstChild && !document.getElementById(`${startId + width * 3 - 3}`).firstChild && !document.getElementById(`${startId + width * 2 - 2}`).firstChild  && !document.getElementById(`${startId + width - 1}`).firstChild ||

                    startId - width + 1 === targetId ||
                    startId - width * 2 + 2 === targetId && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 3 + 3 === targetId && !document.getElementById(`${startId - width * 2 + 2}`).firstChild && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 4 + 4 === targetId && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 5 + 5 === targetId && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 6 + 6 === targetId && !document.getElementById(`${startId - width * 5 + 5}`).firstChild && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||
                    startId - width * 7 + 7 === targetId && !document.getElementById(`${startId - width * 6 + 6}`).firstChild && !document.getElementById(`${startId - width * 5 + 5}`).firstChild && !document.getElementById(`${startId - width * 4 + 4}`).firstChild && !document.getElementById(`${startId - width * 3 + 3}`).firstChild && !document.getElementById(`${startId - width * 2 + 2}`).firstChild  && !document.getElementById(`${startId - width + 1}`).firstChild ||

                    startId + width === targetId ||
                    startId + width * 2 === targetId && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 3 === targetId && !document.getElementById(`${startId + width * 2}`).firstChild && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 4 === targetId && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 5 === targetId && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 6 === targetId && !document.getElementById(`${startId + width * 5}`).firstChild && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||
                    startId + width * 7 === targetId && !document.getElementById(`${startId + width * 6}`).firstChild && !document.getElementById(`${startId + width * 5}`).firstChild && !document.getElementById(`${startId + width * 4}`).firstChild && !document.getElementById(`${startId + width * 3}`).firstChild && !document.getElementById(`${startId + width * 2}`).firstChild  && !document.getElementById(`${startId + width}`).firstChild ||

                    startId - width === targetId ||
                    startId - width * 2 === targetId && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 3 === targetId && !document.getElementById(`${startId - width * 2}`).firstChild && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 4 === targetId && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 5 === targetId && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 6 === targetId && !document.getElementById(`${startId - width * 5}`).firstChild && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||
                    startId - width * 7 === targetId && !document.getElementById(`${startId - width * 6}`).firstChild && !document.getElementById(`${startId - width * 5}`).firstChild && !document.getElementById(`${startId - width * 4}`).firstChild && !document.getElementById(`${startId - width * 3}`).firstChild && !document.getElementById(`${startId - width * 2}`).firstChild  && !document.getElementById(`${startId - width}`).firstChild ||

                    startId + 1 === targetId ||
                    startId + 2 === targetId && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 3 === targetId && !document.getElementById(`${startId + 2}`).firstChild && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 4 === targetId && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 5 === targetId && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 6 === targetId && !document.getElementById(`${startId + 5}`).firstChild && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||
                    startId + 7 === targetId && !document.getElementById(`${startId + 6}`).firstChild && !document.getElementById(`${startId + 5}`).firstChild && !document.getElementById(`${startId + 4}`).firstChild && !document.getElementById(`${startId + 3}`).firstChild && !document.getElementById(`${startId + 2}`).firstChild  && !document.getElementById(`${startId + 1}`).firstChild ||

                    startId - 1 === targetId ||
                    startId - 2 === targetId && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 3 === targetId && !document.getElementById(`${startId - 2}`).firstChild && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 4 === targetId && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 5 === targetId && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 6 === targetId && !document.getElementById(`${startId - 5}`).firstChild && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild ||
                    startId - 7 === targetId && !document.getElementById(`${startId - 6}`).firstChild && !document.getElementById(`${startId - 5}`).firstChild && !document.getElementById(`${startId - 4}`).firstChild && !document.getElementById(`${startId - 3}`).firstChild && !document.getElementById(`${startId - 2}`).firstChild  && !document.getElementById(`${startId - 1}`).firstChild 

                ) {
                    return true;
                }
                break;
            case 'king':
                if (
                    startId + width + 1 === targetId ||
                    startId - width - 1 === targetId ||
                    startId + width - 1 === targetId ||
                    startId - width + 1 === targetId ||
                    startId - 1 === targetId ||
                    startId + 1 === targetId ||
                    startId - width === targetId ||
                    startId + width === targetId 

                ) {
                    return true;
                }
        }
    }

    function checkForWin() {
        const kings = Array.from(document.querySelectorAll("#king"))
        console.log(kings);
        if (!kings.some(king => king.className.includes('white'))) {
            setInfo("Black Won") 
            const allSquares = document.querySelectorAll('.pic')
            allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
        }
        if (!kings.some(king => king.className.includes('black'))) {
            setInfo("white Won")
            const allSquares = document.querySelectorAll('.pic')
            allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
        }
    }
    

    
    return (
        <div ref={board} id='chessboard'>
            { startPieces.map((pie,i) => {
                const row = Math.floor((63 - i) / 8) + 1
                
                if (pie != '') {
                    if (row % 2 != 0 ) {
                        if (i % 2 === 0) {
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square Black" id={i}>
                                    <div onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart} className={`piece ${pie.color}`} id={`${pie.piece}`} draggable={true}>
                                        <img className="pic" src={pie.scr} alt="" draggable={true}/>
                                    </div>
                                    
                                </div>
                            )
                        }else{
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square White" id={i}>
                                    <div onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart} className={`piece ${pie.color}`} id={`${pie.piece}`} draggable={true}>
                                        <img className="pic" src={pie.scr} alt="" draggable={true}/>
                                        
                                    </div>
                                    
                                </div>
                            )
                        }
                    }
                    else{
                        if (i % 2 === 0) {
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square White" id={i}>
                                    <div onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart} className={`piece ${pie.color}`} id={`${pie.piece}`} draggable={true}>
                                        <img className="pic" src={pie.scr} alt="" draggable={true}/>
                                    </div>
                                    
                                </div>
                            )
                        }else{
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square Black" id={i}>
                                    <div onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart} className={`piece ${pie.color}`} id={`${pie.piece}`} draggable={true}>
                                        <img className="pic" src={pie.scr} alt="" draggable={true}/>
                                    </div>
                                    
                                </div>
                            )
                        }
                    }
                }else{
                    if (row % 2 != 0 ) {
                        if (i % 2 === 0) {
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square Black" id={i}>
                                </div>
                            )
                        }else{
                            return(
                                <div ref={square} onDrop={dragdrop} onDragOver={dragover} onDragStart={dragstart}   className="square White" id={i}>
                                    
                                    
                                </div>
                            )
                        }
                    }
                    else{
                        if (i % 2 === 0) {
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square White" id={i}>
                                    
                                </div>
                            )
                        }else{
                            return(
                                <div ref={square} onDragOver={dragover} onDrop={dragdrop} onDragStart={dragstart}  className="square Black" id={i}>
                                    
                                </div>
                            )
                        }
                    }
                }
            })}
            <p>Go <span id='player '>{playerGo} </span></p> <br/>
            <p id='infoDisplay'> {info}</p>
        </div>
    )
}

export default Board