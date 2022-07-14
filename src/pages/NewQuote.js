import React, { useEffect } from 'react'
import useHttp from '../hooks/use-http'
import{ addQuote } from '../lib/api'

import QuoteForm from '../components/quotes/QuoteForm'

const NewQuote = () => {
  const {sendRequest, status} = useHttp(addQuote)

  useEffect(() => {

  }, [])

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData)
  }
  
  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
  )
}

export default NewQuote