import React, { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
	const params = useParams();
	const match = useRouteMatch();

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	const {quoteId} = params;

	useEffect(() => {
		sendRequest(quoteId);
	}, [quoteId, sendRequest]);

	if (status === "pending") {
		return (
			<div className="centered">
				{" "}
				<LoadingSpinner />
			</div>
		);
	}

  if (error) {
    return <p className="centered ">{error}</p>;
  }

	if (!loadedQuote) {
		return <p className="centered">No quote found</p>;
	}

	return (
		<Fragment>
			<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
			<Route exact path={`${match.path}`}>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}/comments`}>
						load Comments
					</Link>
				</div>
			</Route>
		</Fragment>
	);
};

export default QuoteDetail;
