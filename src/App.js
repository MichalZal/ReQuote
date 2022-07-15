import React, { Suspense } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Comments = React.lazy(() => import('./components/comments/Comments'))
const Quotes = React.lazy(() => import('./pages/Quotes'))

function App() {
	return (
		<Layout>
      <Suspense fallback={<div className="centered"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/quotes" />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/:quoteId" element={<QuoteDetail />} >
            <Route
              path=""
              element={
                <div className="centered">
                  <Link className="btn--flat" to={`comments`}>
                    load Comments
                  </Link>
                </div>
              }
            />
            <Route path={'comments'} element={<Comments />}/>
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
		</Layout>
	);
}

export default App;
