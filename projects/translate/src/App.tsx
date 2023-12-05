
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE  } from './constants';
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from './components/icons.tsx';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce.ts';


function App() {
  const {fromLanguage,loading, fromText, result, toLanguage, interterchangeLanguage, setFromLanguage, setToLanguage, setFromText, setResult} = useStore()
  const debousedFromText = useDebounce(fromText, 250)

  useEffect(() => {

    if (fromText === '') return

   

    translate({fromLanguage, toLanguage, text: debousedFromText})
    .then((result) => {
      if(result == null) return
      setResult(result)
    })
    .catch(() => setResult('Error')
      
    )

  },[debousedFromText,fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }


  return (
    <Container fluid>

      <h2 style={{textAlign:'center',marginBottom:'5rem'}}>Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}/>
           <TextArea 
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
            
           />
          </Stack>
        
        </Col>
         
        <Col xs = 'auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interterchangeLanguage}><ArrowIcon/></Button>
        </Col>
        <Col >
          <Stack gap={2}>
          <LanguageSelector 
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}/>
            <div style={{position:'relative'}}>
            <TextArea 
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading = {loading}
              />
              <div style={{position:'absolute', right:0, bottom:0, display:'flex'}} >
                <Button variant='link' 
                  onClick={handleClipboard}>
                  <ClipboardIcon/> 
                </Button>
                
                <Button variant='link' 
                  onClick={handleSpeak}>
                  <SpeakerIcon/> 
                </Button>
              </div>

            </div>
          </Stack>
        </Col>
      </Row>

    </Container>
    
    
  )
}

export default App
