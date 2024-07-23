import { io } from 'socket.io-client'

// const URL = 'https://live-polling-backend-1.onrender.com/'
const URL = 'http://localhost:3000'

export const socket = io(URL, {
  autoConnect: false,
})
