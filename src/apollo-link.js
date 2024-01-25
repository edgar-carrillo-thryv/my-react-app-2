import { ApolloLink, HttpLink, split } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link"

const { VITE_BASE_API_URL: uri } = import.meta.env

const getApolloLink = (accessToken) => {
  const httpLink = new HttpLink({
    uri: (operation) => `${uri}?${operation.operationName}`,
  })
  const lambdalink = ApolloLink.from([
    createSubscriptionHandshakeLink(
      {
        url: uri,
        region: "us-east-1",
        auth: {
          type: "AWS_LAMBDA",
          token: `Bearer ${accessToken}`,
        },
      },
      httpLink
    ),
  ])
  const link = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return forward(operation)
  })
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      )
    },
    lambdalink,
    link.concat(httpLink)
  )
}

export default getApolloLink
