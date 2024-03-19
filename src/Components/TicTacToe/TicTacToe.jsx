import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross-small.png';

let data = ["", "", "", "", "", "", "", "",""];
const TicTacToe = () => {

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false);
    let titleRef = useRef(null);
    let playRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9];


    const toggle = (e,num) => {
        if (lock || data[num] !== "") {
            return 0;
        }
        if (count%2===0){
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = "x";
            setCount(++count);
            playRef.current.innerHTML = `C'est à <img src="${circle_icon}"> de jouer` ;
        }else{
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = "o";
            setCount(++count);
            playRef.current.innerHTML = `C'est à <img src="${cross_icon}"> de jouer` ;
        }
        checkWin();
    }

    const checkWin = () => {
        // Vérification des lignes, colonnes et diagonales
        for (let i = 0; i < 3; i++) {
            // Vérification des lignes
            if (data[i * 3] === data[i * 3 + 1] && data[i * 3 + 1] === data[i * 3 + 2] && data[i * 3 + 2] !== "") {
                won(data[i * 3 + 2]); // Le joueur a gagné sur une ligne
            }

            // Vérification des colonnes
            if (data[i] === data[i + 3] && data[i + 3] === data[i + 6] && data[i + 6] !== "") {
                won(data[i + 6]); // Le joueur a gagné sur une colonne
            }
        }

        // Vérification des diagonales
        if (
            (data[0] === data[4] && data[4] === data[8] && data[8] !== "") ||
            (data[2] === data[4] && data[4] === data[6] && data[6] !== "")
        ) {
            won(data[4]); // Le joueur a gagné sur une diagonale
        }

        // Aucune condition de victoire n'a été remplie
    }

    const won = (winner) => {
        setLock(true);
        playRef.current.innerHTML = "";
        if (winner==="x") {
            titleRef.current.innerHTML = `Félicitation: <img src="${cross_icon}"> gagne` ;
        }else{
            titleRef.current.innerHTML = `Félicitation: <img src="${circle_icon}"> gagne`;
        }
    }

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "",""];
        titleRef.current.innerHTML = "Tic Tac Toe Jeu en <span>React</span>";
        box_array.map((e) => {
            e.current.innerHTML = "";
        })
    }

  return (
    <div className='container'>
        <h1 className="title" ref={titleRef}>Tic Tac Toe Jeu en <span>React</span></h1>
        <div className="board">
            <div className="row1">
                <div className="boxes" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
                <div className="boxes" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
                <div className="boxes" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
            </div>
            <div className="row2">
                <div className="boxes" ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
                <div className="boxes" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
                <div className="boxes" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
            </div>
            <div className="row3">
                <div className="boxes" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
                <div className="boxes" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
                <div className="boxes" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
            </div>
        </div>
        <div className="tourDeJeu" ref={playRef}></div>
        <button className="reset" onClick={()=>{reset()}}>Recommencer</button>
    </div>
  )
}

export default TicTacToe