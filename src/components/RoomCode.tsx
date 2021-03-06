import '../styles/room-code.scss'
import copyImg from '../assets/images/copy.svg'

type RoomCodeProps = {
  code: string
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}
