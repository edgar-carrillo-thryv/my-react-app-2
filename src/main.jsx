import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { AuthenticatedApp } from "./authenticated-app.jsx"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

// Adds messages only in a dev environment
loadDevMessages()
loadErrorMessages()

ReactDOM.render(
  <React.StrictMode>
    <AuthenticatedApp />
  </React.StrictMode>,
  document.getElementById("root")
)
