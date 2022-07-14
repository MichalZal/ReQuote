import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Quotes from "./pages/Quotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import Comments from './components/comments/Comments'

function App() {
	return (
		<Layout>
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
		</Layout>
	);
}

export default App;
