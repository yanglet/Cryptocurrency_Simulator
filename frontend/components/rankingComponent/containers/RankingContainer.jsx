import React from 'react';
import { useContext } from 'react';
import { RankingContext } from '../../../contexts/Ranking';
import RankingList from '../components/RankingList';

function RankingContainer(props) {
    const content = useContext(RankingContext)
    console.log(content)
    return (
        <div>
            <RankingList content={content} />
        </div>
    );
}

export default RankingContainer;