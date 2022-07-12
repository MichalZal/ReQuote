import { useState, useEffect, useCallback } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import { getAllComments } from "../../lib/api";

import useHttp from "../../hooks/use-http";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const match = useRouteMatch();
	const params = useParams();

	const {
		sendRequest,
		status,
		data: loadedComments,
	} = useHttp(getAllComments);

	const pathWithoutComments = match.url.slice(0, 28);

	const { quoteId } = params;

	useEffect(() => {
		sendRequest(quoteId);
	}, [quoteId, sendRequest]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId]);

	let comments;
	if (status === "pending") {
		comments = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (
		status === "completed" &&
		(!loadedComments || loadedComments.length > 0)
	) {
		comments = <CommentsList comments={loadedComments} />;
	}

	if (
		status === "completed" &&
		(!loadedComments || loadedComments.length === 0)
	) {
		comments = <p className="centered">No comments set</p>;
	}

	return (
		<section className={classes.comments}>
			<Link className="btn--flat" to={pathWithoutComments}>
				cancel
			</Link>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quoteId={quoteId}
					onAddedComment={addedCommentHandler}
				/>
			)}
			{comments}
		</section>
	);
};

export default Comments;
