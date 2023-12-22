import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './components/JavascriptLogo'
import { Start } from './components/Start'
import { useQuestionStore } from './store/questions'
import { Game } from './components/Game'

function App() {
  const questions = useQuestionStore(state => state.questions)
  const state = useQuestionStore(state => state)

  console.log(state)
  

  return (
 
      <main>
        <Container maxWidth='sm'>
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center' >
            <JavaScriptLogo />
            <Typography variant='h2' component='h1'>
              JavaScript Quizz
            </Typography>
          </Stack>
          {questions.length === 0 && <Start/>}
          {questions.length > 0 && <Game/>}
        </Container>
      </main>
        
   
  )
}

export default App
