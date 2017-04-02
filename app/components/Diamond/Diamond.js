import React from 'react'
import { createDiamondImage, ballsCount, strikesOutsCount } from 'helpers/diamondFns'
import { diamondContainer, baseballFieldContainer, baseballField, otherInfo,
  bsoContainer, bso, bsoHeading, bsoData, runnersOnBase, hitterPitcher } from './styles.css'

export default function Diamond({ balls, strikes, outs, inningState, runners }) {
  const img = createDiamondImage()
  const config = {
    balls: '0',
    strikes: '0',
    outs: '0',
    inningState: ''
  }
  return (
    <section className={diamondContainer}>
      <div className={baseballFieldContainer}>
        <img className={baseballField} src={`/assets/img/mlb/other/${createDiamondImage(runners)}.svg`} />
      </div>
      <div className={otherInfo}>

        <section className={bsoContainer}>
          <div className={bso}>
            <h2 className={bsoHeading}>{'B:'}</h2>
            <span dangerouslySetInnerHTML={ballsCount(balls, 4, inningState)}></span>
          </div>
          <div className={bso}>
            <h2 className={bsoHeading}>{'S:'}</h2>
            <span dangerouslySetInnerHTML={ballsCount(strikes, 3, inningState)}></span>
          </div>
          <div className={bso}>
            <h2 className={bsoHeading}>{'O:'}</h2>
            <span dangerouslySetInnerHTML={ballsCount(outs, 3, inningState)}></span>
          </div>
        </section>

        <section className={runnersOnBase}></section>
        <section className={hitterPitcher}></section>
      </div>
    </section>
  )
}
