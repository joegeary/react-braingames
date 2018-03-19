import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IconButton } from 'material-ui-next';
import ArrowBackIcon from 'material-ui-icons-next/ArrowBack';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import LayoutBody from '../layout/LayoutBody';

import games from '../../games';

const GameRules = ({ match }) => {
    const key = match.params.game;
    const game = games.filter(g => g.key === key)[0];

    const appBarLeft = (
        <IconButton component={Link} to={`/${key}`}>
            <ArrowBackIcon />
        </IconButton>
    );

    return (
        <ViewContainer>
            <LayoutAppBar
                title={`${game.title} - How To Play`}
                iconElementLeft={appBarLeft}
            />
            <LayoutBody>
                <ReactMarkdown source={game.rules} />
            </LayoutBody>
        </ViewContainer>
    );
}

export default GameRules;