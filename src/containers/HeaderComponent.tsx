import React from 'react';

import { Row, Col } from '../components/common';
import SearchComponent from '../components/header/SearchComponent';
import SortComponent from '../components/header/SortComponent';
import './HeaderComponent.scss';

const HeaderComponent: React.FC = () => {
    return (
        <Row justifyContent="space-between" rowClassName="header-wrapper">
            <Col flexBasis={'20%'} maxWidth={'20%'}>
                <SortComponent />
            </Col>
            <Col flexBasis={'76%'} maxWidth={'76%'}>
                <SearchComponent />
            </Col>
        </Row>
    );
};

export default HeaderComponent;