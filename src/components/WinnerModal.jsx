export const WinnerModal = ({Winner, ResetGame, Square}) =>{

  if(Winner === null) return null

return(
        <section className='winner'>
           <div className="text">
             <h2>
                 { 
                   Winner === false 
                       ? 'Empate'
                       :  'Ganó:' 
                 }   
             </h2>

             <header className='win'>
                 { Winner && <Square>{ Winner}</Square>}
             </header>

             <footer>
                 <button onClick={ResetGame}>Empezar de nuevo</button>
             </footer>
           </div>
        </section>
    )
}