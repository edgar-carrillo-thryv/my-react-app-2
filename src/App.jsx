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
      notifId
      type
    }
  }
`

function App() {
  const [notifications, setNotifications] = useState([])

  const { data: subscriptionAlert } = useSubscription(
    NOTIFICATIONS_SUBSCRIPTION
  )

  const addNotification = (notif) => {
    const newNotifs = notifications.slice()
    const notifsIds = notifications.map((notif) => notif.notifId)
    if (!notifsIds.includes(notif.notifId)) {
      newNotifs.push(notif)
      setNotifications(newNotifs)
    }
  }

  useEffect(() => {
    if (subscriptionAlert) {
      addNotification(subscriptionAlert.notificationAdded)
    }
  }, [subscriptionAlert])

  console.log("DATA: ", subscriptionAlert)

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="!text-4xl pb-5">Center 2</h1>
        <div className="w-full h-[45px]">
          {notifications.map((notif, i) => (
            <div className="mb-5" key={i}>
              <NotificationBar
                variant={
                  (notif.type === "staff-delete" && "success") ||
                  (notif.type === "cc-cancel" && "error") ||
                  (notif.type === "cc-downgrade" && "information")
                }
                content={
                  <div className="text-center">
                    <p>{notif.message}</p>
                    <br></br>
                    <p>Primary Key: {notif.notifId}</p>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
