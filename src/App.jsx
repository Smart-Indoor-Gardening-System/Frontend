import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
  import { Button} from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)
 
  return (
	<ChakraProvider>
      <h1>FloraVision</h1>
      <Button colorScheme='blue'>Button</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
   </ChakraProvider>
  )
}

export default App
