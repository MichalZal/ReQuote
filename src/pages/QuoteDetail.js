import React, { Fragment, useEffect } from "react";
import { useParams, Outlet} from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
	const params = useParams();

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
			<Outlet />
		</Fragment>
	);
};

export default QuoteDetail;
