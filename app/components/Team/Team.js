import React, { PropTypes } from 'react'
import { teamContainer, teamLogo, asgLogo, teamInfo, teamName,
  teamRecord, teamScore, tiny, small } from './styles.css'
import teamColors from './colors.css'

const propTypes = {
  name: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  ls: PropTypes.string.isRequired,
  ws: PropTypes.string.isRequired,
  runs: PropTypes.string,
  img: PropTypes.string,
}

export default function Team({name, sport, code, ls, ws, runs, img='svg'}) {
  return (
    <div className={teamColors[`${code}_${sport}`]}>
      <img className={img === 'png' ? asgLogo : teamLogo} src={`assets/img/${sport}/teams/${code}.${img}`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 10 ? <small className={tiny}>{name}</small> : name.length > 7 ? <small className={small}>{name}</small> : name}</span>
        <span className={teamRecord}>{`(${ws}-${ls})`}</span>
      </div>
      {runs ? <span className={teamScore}>{runs}</span> : null}
    </div>
  )
}

Team.propTypes = propTypes
