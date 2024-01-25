import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { useState, useEffect } from "react"
import getApolloLink from "./apollo-link"

const { VITE_AUTH_ACCESS_TOKEN: uri } = import.meta.env

export function ApolloWrapper({ children }) {
  const [client, setClient] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const initApollo = async () => {
    const link = getApolloLink(uri)
    const cache = new InMemoryCache({})

    setClient(new ApolloClient({ link, cache }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) {
      initApollo()
    }
  }, [isLoading])

  if (isLoading) return <div>Loading</div>

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
