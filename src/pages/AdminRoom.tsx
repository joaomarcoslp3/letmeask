import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import '../styles/room.scss'
import { useAuth, useRoom } from '../hooks'
import { database } from '../services/firebase'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { Button, RoomCode, Question } from '../components'

type RoomParams = {
  id: string
}

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  },
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

export const AdminRoom = () => {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const history = useHistory()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)

  const handleCheckQuestionAnswered = async (questionId: string) => {
    database.ref(`/rooms/${roomId}/questions/${questionId}`).update({ isAnswered: true })
  }

  const handleHighlightQuestion = async (questionId: string) => {
    database.ref(`/rooms/${roomId}/questions/${questionId}`).update({ isHighlighted: true })
  }

  const handleEndRoom = async () => {
    database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })

    history.push('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala </Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>{title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>
          )}
        </div>

        <div className='question-list'>
          {questions.map(question => (
            <Question 
              key={question.id} 
              content={question.content} 
              author={question.author} 
              isHighlighted={question.isHighlighted}
              isAnswered={question.isAnswered}
            >
              {!question.isAnswered && (
                <>
                  <button type='button' onClick={() => handleCheckQuestionAnswered(question.id)}>
                    <img src={checkImg} alt='Marcar pergunta como respondida' />
                  </button>
                  <button type='button' onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt='Dar destaque à pergunta' />
                  </button>
                </>
              )}
              <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt='Remover pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}
