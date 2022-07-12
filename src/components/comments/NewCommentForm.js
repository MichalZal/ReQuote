import { useRef, useState, useEffect } from "react";
import classes from "./NewCommentForm.module.css";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
	const [validity, setValidity] = useState();
  const commentTextRef = useRef();

  const { onAddedComment } = props
  
  useEffect(() => {
    if( status === 'completed' && !error) {
      onAddedComment()
    }
  }, [error, status, onAddedComment])
  
  
	const submitFormHandler = (event) => {
		event.preventDefault();

		// optional: Could validate here
		const enteredText = commentTextRef.current.value;
		if (enteredText < 8) {
			setValidity("entered text must be at least 8 characters long");
			return;
		}

		setValidity();
		// send comment to server
		sendRequest({ commentData: { text: enteredText}, quoteId: props.quoteId} );
    commentTextRef.current.value = '';
	};

	return (
		<form className={classes.form} onSubmit={submitFormHandler}>
			{status === "pending" && (
				<div className="centered">
					<LoadingSpinner />
				</div>
			)}
			<div className={classes.control} onSubmit={submitFormHandler}>
				<label htmlFor="comment">Your Comment</label>
				{validity && <div className="error">{validity}</div>}
				<textarea id="comment" rows="5" ref={commentTextRef}></textarea>
			</div>
			<div className={classes.actions}>
				<button className="btn">Add Comment</button>
			</div>
		</form>
	);
};

export default NewCommentForm;
