import { Card, IconButton, List, ListItem, ListItemText, Stack, Typography, ListItemButton} from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { type Question as QuestionType } from "../types"
import SyntaxHighLighter from "react-syntax-highlighter"
import {gradientDark} from "react-syntax-highlighter/dist/esm/styles/hljs"
import { useQuestionStore } from "../store/questions"
import { Footer } from "./Footer"


const Question = ({info}: {info:QuestionType})=>{
    const selectAnswer = useQuestionStore(state => state.selectAnswer)   
  
    const handleClick = (answerIndex:number)=>()=>{
        selectAnswer(info.id,answerIndex )

    }
    
    const getBackgroundColor = (index:number)=>{
        const {userSelectedAnswer,correctAnswer} = info 
        if(userSelectedAnswer == null) return 'transparent'
        if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        if(index === correctAnswer) return 'green'
        if(index === userSelectedAnswer) return 'red'

        return 'transparent'
    }  

    return(
        <Card variant="outlined" sx={{bgcolor:'#222',p:2 ,textAlign:'left', marginTop:4}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighLighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>
            <List sx={{bgcolor:'#333',fontWeight:'bold'}} disablePadding >
                {info.answers.map((answer,index)=>(
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                        disabled={info.userSelectedAnswer != null}
                        sx={{bgcolor:getBackgroundColor(index)}}
                        onClick={handleClick(index)}>
                            <ListItemText primary={answer} sx={{textAlign:'center'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>    
        </Card>  
    )
}

export function Game (){
    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
    const goPrevQuestion = useQuestionStore(state => state.goPreviousQuestion)  


    const questionInfo = questions[currentQuestion] 

    return(

        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0} > 
                    <ArrowBackIosIcon />
                </IconButton>       
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1} > 
                   <ArrowForwardIosIcon />
                </IconButton>     
            </Stack>    

            <Question info = {questionInfo}/>

            <Footer />  
            
        </>


    )
}