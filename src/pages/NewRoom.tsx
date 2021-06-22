import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components'
import { useAuth } from '../hooks'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'

export const NewRoom = () => {
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      history.push('/')
    }
  }, [])

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <strong>Crie slas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <h2>Criar uma nova sala</h2>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}
