// @flow
import React from 'react';
import Radium from 'radium';
import { ProjectCard } from 'components';
import { SQUID, AMBAPO } from 'constants';

type Props = {
  history: any
};

const HomePage = ({ history }: Props) => {
  return (
    <div style={styles.home}>
      <div style={styles.cardWrapper}>
        <ProjectCard
          description={SQUID.description}
          logo={require('img/logos/Squid.svg')}
          width={300}
          height={300}
          onClick={() => history.push('/squid')}
        />
        <ProjectCard
          description={AMBAPO.description}
          logo={require('img/logos/Ambapo.svg')}
          width={300}
          height={300}
          onClick={() => history.push('/ambapo')}
        />
      </div>
    </div>
  );
};

const styles = {
  home: {
    height: '100%'
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};

export default Radium(HomePage);
