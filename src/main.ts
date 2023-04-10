/** Init PIXI.js scene when window loaded. */
// imports
import Scene from './Scene'

// import assets
import './full-screen.css'

// constants
const CANVAS_ID = 'renderCanvas'


window.onload = () => {
    // greeting
    console.log('hello')

    // main scene
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement
    new Scene(canvas)
}
