import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { userUsers } from "../hooks/useUsers";
import { useState } from "react";

export function CreateNewUser() {
    const {addUser}  = userUsers()
    const [result , setResult] = useState <'ok' | 'ko' | null>(null)
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResult(null)
        const form = e.target
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        if(!name || !email || !github){
            return setResult('ko')
        }
        addUser({name, email, github})
        setResult('ok')
        console.log(result)
        form.reset()
    }
  return (
    <Card style={{marginTop:'16px'}}>
      <Title>Crear nuevo usuario</Title>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'16px'}} action="">
            <TextInput
                name="name"
                placeholder="Nombre"
            />
              <TextInput
                name="email"
                placeholder="Email"
            />
              <TextInput
                name="github"
                placeholder="Usuario de github"
            />

            <div>
                <Button
                    type="submit"
                    style={{marginTop:'16px'}}
                >
                    Crear usuario
                </Button>
                <span>
                    {result === 'ok' && <Badge color='green'>Creado correctamente</Badge>}
                    {result === 'ko' && <Badge color='red'>Error al crear</Badge>}
                </span>
            </div>
            
                
           
        </form>
    </Card>
  );
}