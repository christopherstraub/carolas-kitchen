import React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';
import BurgerMenuIcon from '../icons/burger-menu-icon';
import SearchIcon from '../icons/search-icon';

export default function Header() {
  return (
    <header>
      <BurgerMenuIcon />
      <span>
        <Link to="/">{useSiteMetadata().title}</Link>
      </span>
      <Link to="/search">
        <SearchIcon />
      </Link>
    </header>
  );
}
