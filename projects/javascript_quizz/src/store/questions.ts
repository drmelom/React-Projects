import {create} from 'zustand';
import {Question} from '../types';
import confetti from 'canvas-confetti'; 
import { persist } from 'zustand/middleware';   

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId:number,answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}

export const useQuestionStore = create<State>()(persist((set,get) => {
    return{
        loading:false,
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json');
            const json = await res.json();

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({questions})
        },
        selectAnswer:(questionId:number,answerIndex: number) =>{
            const{questions} = get()
            const newQuestions = structuredClone(questions)
            const questionIndex =newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex  
            if(isCorrectUserAnswer)confetti()
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({questions: newQuestions})
        },

        goNextQuestion: () => { 
            const {questions, currentQuestion} = get()
            if(currentQuestion < questions.length -1){
                set({currentQuestion: currentQuestion + 1})
            }
        },
        goPreviousQuestion: () => {
            const {currentQuestion} = get()
            if(currentQuestion > 0){
                set({currentQuestion: currentQuestion - 1})
            }
        },
        reset: () => {  
            set({questions: [], currentQuestion: 0})
        }
    }



}, {name: 'questions'}))