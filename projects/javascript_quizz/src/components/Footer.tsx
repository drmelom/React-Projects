import { Button } from "@mui/material"
import { useQuestionStore } from "../store/questions"

export function Footer() {
    const questions = useQuestionStore(state => state.questions)
    const reset = useQuestionStore(state => state.reset)
    let correct = 0
    let incorrect = 0   
    let unanswered = 0      
    questions.forEach(question=>{
        if(question.userSelectedAnswer == null) unanswered++
        else if(question.userSelectedAnswer === question.correctAnswer) correct++
        else incorrect++
    })
    return(
        <footer style={{margin:'16px'}}>
            <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
            <div style={{ marginTop: '16px' }}>
                <Button onClick={() => reset()}>
                Resetear juego
                </Button>
            </div>

        </footer>
    )
}