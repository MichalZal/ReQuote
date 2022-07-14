import { Fragment, useRef } from "react";
import { useNavigate } from 'react-router-dom'

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
	const authorInputRef = useRef();
	const textInputRef = useRef();
  const navigate = useNavigate()

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;

		// optional: Could validate here
		if (enteredAuthor.length === 0 || enteredText.length === 0) {
			return;
		}

		props.onAddQuote({ author: enteredAuthor, text: enteredText });
    navigate('/quotes')
	}


	return (
		<Fragment>

			<Card>
				<form
					className={classes.form}
					onSubmit={submitFormHandler}
				>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="text">Text</label>
						<textarea id="text" rows="5" ref={textInputRef}></textarea>
					</div>
					<div className={classes.actions}>
						<button className="btn">
							Add Quote
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default QuoteForm;
