import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>React Quotes</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink className={(navData) => navData.isActive ? classes.active : ''} to="/quotes">
							ReQuote
						</NavLink>
					</li>
					<li>
						<NavLink className={(navData) => navData.isActive ? classes.active : ''} to="/new-quote">Add Quote</NavLink>
					</li>
					<li>
						<NavLink className={(navData) => navData.isActive ? classes.active : ''} to="/"></NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
