import { ApolloWrapper } from "./apollo-wrapper"
import App from "./App"

export const AuthenticatedApp = () => {
  return (
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  )
}
