import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'react-typist';

import theme from 'theme';
import { StyledLink } from '../styled';
import Container from './Container';
import Wrapper from './Wrapper';
import Nav from './Nav';
import Logo from './Logo';
import HeaderImage from './Image';
import { TypistWrapper, TypistContent } from './Typist';

class Header extends React.Component {
  state = {
    page: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      if (location.pathname === '/') {
        this.expandHeader();
      } else if (prevProps.location.pathname === '/') {
        this.shortenHeader();
      }
    }
  }

  expandHeader() {
    this.wrapper.animate(
      [
        { height: theme.header.pageHeight },
        { height: theme.header.homeHeight },
      ],
      {
        duration: 225,
        fill: 'forwards',
        easing: 'ease-out',
        iteration: 1,
      },
    );
  }

  shortenHeader() {
    this.wrapper.animate(
      [
        { height: theme.header.homeHeight },
        { height: theme.header.pageHeight },
      ],
      {
        duration: 225,
        fill: 'forwards',
        easing: 'ease-out',
        iteration: 1,
      },
    );
  }

  render() {
    const { location } = this.props;
    const isHome = location.pathname === '/';
    return (
      <Wrapper
        isHome={isHome}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
        <Container isHome={isHome}>
          <Logo>
            <StyledLink to="/">Alex Luong</StyledLink>
          </Logo>
          <Nav>
            <ul>
              <li>
                <StyledLink to="/">Home</StyledLink>
              </li>
              <li>
                <StyledLink to="/about">About</StyledLink>
              </li>
            </ul>
          </Nav>
        </Container>

        <TypistWrapper isHome={isHome}>
          <Typist cursor={{ hideWhenDone: true }}>
            <Typist.Delay ms={500} />
            <TypistContent>Hello World!</TypistContent>
          </Typist>
        </TypistWrapper>

        <HeaderImage />
      </Wrapper>
    );
  }
}

export default Header;
