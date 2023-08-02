import { useEffect, useRef, useState } from "react";
import styles from "./main.module.css";
import { TbEraser } from 'react-icons/tb'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let canvasContext: any
  let newImg = canvasRef.current?.toDataURL('image/png')
  const newImgRef = useRef<HTMLImageElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  let isDrawing = false
  let color = 'black'
  let strokeSize = 4

  let x = 0
  let y = 0
  let offsetX: any
  let offsetY: any

  useEffect(() => {
    canvasContext = canvasRef?.current?.getContext('2d')

    if (canvasContext){
      canvasContext.lineWidth = strokeSize;
      canvasContext.strokeStyle = color;
    }
    
  }, [])
  
  const handleMouseUp = () => {
    isDrawing = false

  }

  const handleMouseDown = (event: any) => {
    isDrawing = true
    x = event.nativeEvent.offsetX
    y = event.nativeEvent.offsetY
  }

  const drawLine = (ctx: any, x1: any, y1: any, x2: any, y2: any) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = strokeSize
    ctx.lineJoin = 'round'
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
  }

  const handleMouseMove = (event: any) => {

    if (isDrawing){
      if (canvasContext){
        drawLine(canvasContext, x, y, event.nativeEvent.offsetX, event.nativeEvent.offsetY)
        x = event.nativeEvent.offsetX
        y = event.nativeEvent.offsetY
      }
    } else {
      return
    }

  }


  return (
    <>
      <main className={styles.main}>
        <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={1400}
        height={800}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        />
        <div className={styles.canvas_options}>
          <div className={styles.color_selector}>
            <div className={`${styles.color_black!} ${styles.color_choice!}`} onClick={() => color = 'black'}></div>
            <div className={`${styles.color_red!} ${styles.color_choice!}`} onClick={() => color = 'red'}></div>
            <div className={`${styles.color_green!} ${styles.color_choice!}`} onClick={() => color = 'green'}></div>
            <div className={`${styles.color_blue!} ${styles.color_choice!}`} onClick={() => color = 'blue'}></div>
            <div className={styles.color_choice} onClick={() => color = 'white'}><TbEraser className={styles.eraser_icon}/></div>
          </div>

          <div className={styles.size_selector}>
            <div className={`${styles.size_choice!} ${styles.size_choice_small!}`} onClick={() => strokeSize = 4}></div>
            <div className={`${styles.size_choice!} ${styles.size_choice_medium!}`} onClick={() => strokeSize = 8}></div>
            <div className={`${styles.size_choice!} ${styles.size_choice_large!}`} onClick={() => strokeSize = 12}></div>
            <div className={`${styles.size_choice!} ${styles.size_choice_xlarge!}`} onClick={() => strokeSize = 16}></div>
          </div>
        </div>

        <button className={styles.save_button} onClick={() => {
            if (newImgRef.current != undefined) {
                newImg = canvasRef.current?.toDataURL('image/png')
                newImgRef.current.src = newImg!
                dialogRef.current?.showModal()
            }
          }
        }>save</button>

        <dialog className={styles.dialog} ref={dialogRef}>
          <div className={styles.inner_dialog}>
            <div className={styles.img_container}>
              <img ref={newImgRef} src={newImg}/>
            </div>
            <button onClick={() => dialogRef.current?.close()}>close</button>
          </div>
        </dialog>

      </main>
    </>
  );
}

export default App
