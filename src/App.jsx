import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import { NotificationBar } from "@thryvlabs/maverick"
import "./index.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-[45px]">
          <NotificationBar
            variant="success"
            content={<p>Example of success notification</p>}
          />
        </div>

        <button
          onClick={() => setCount((count) => count + 1)}
          className="p-4 border-black border w-[100px]"
        >
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
