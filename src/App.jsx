import { useEffect, useState } from "react"
import { NotificationBar } from "@thryvlabs/maverick"
import "./index.css"
import { gql, useSubscription } from "@apollo/client"
import { Buffer } from "buffer"
window.Buffer = Buffer

const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription notificationAdded {
    notificationAdded {
      message
    }
  }
`

export const SUBSCRIPTION_FOR_MESSAGE_CREATED = gql`
  subscription onMessageCreated {
    onMessageCreated {
      sk1
      pk1
    }
  }
`

function App() {
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState(0)

  const { data: subscriptionAlert } = useSubscription(
    NOTIFICATIONS_SUBSCRIPTION
  )

  const addNotification = (message) => {
    const newNotifs = notifications.slice()
    newNotifs.push(message)
    setNotifications(newNotifs)
  }

  useEffect(() => {
    if (subscriptionAlert) {
      addNotification(subscriptionAlert.notificationAdded.message)
    }
  }, [subscriptionAlert])

  console.log("DATA: ", subscriptionAlert)

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-[45px]">
          {notifications.map((message, i) => (
            <NotificationBar
              key={i}
              variant="success"
              content={<p>{message}</p>}
            />
          ))}
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
