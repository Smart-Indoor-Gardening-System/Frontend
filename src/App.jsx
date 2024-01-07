import './App.css'
import { ChakraProvider } from '@chakra-ui/react'

import WebSocketComponent from './Ws'

function App() {

 
  return (
	<ChakraProvider>
      <h1>FloraVision</h1>
	<WebSocketComponent/>
   </ChakraProvider>
  )
}

export default App
