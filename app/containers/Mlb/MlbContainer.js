import React, { Component } from 'react'
import { Mlb } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getMlbScores } from 'helpers/api'
import { ref } from 'config/firebase'

class MlbContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      isError: false,
      scores: {},
      cache: {},
      year: '',
      date: '',
      today: ''
    }
  }
  componentDidMount() {
    this.setState({ today: getTodaysDate()  }, () => {
      this.makeRequest(this.props.routeParams.date)
      this.getCache()
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.date !== nextState.date
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    const currentScores = this.state.cache[dt]
    if (dt !== this.state.today && currentScores) {
      const games = currentScores
      this.cleanGameData(games)
      this.setState({
        isLoading: false,
        scores: games,
        year: games.year,
        date: dt
      })
    } else {
      getMlbScores(dt)
        .then((currentScores) => {
          const games = currentScores.data.games
          this.cleanGameData(games)
          this.setState({
            isLoading: false,
            scores: games,
            year: games.year,
            date: dt
          }, () => this.saveScores())
        })
        .catch((error) =>  {
          this.setState({
            isLoading: false,
            isError: true,
            date: dt
          })
          throw new Error(error)
        })
    }
  }
  getCache() {
    ref.once('value', (snapshot) => {
      this.setState({ cache: snapshot.val().mlb.scores })
    })
  }
  saveScores() {
    ref.child(`mlb/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`mlb scores - ${this.state.date} - saved to firebase. . . `))
    const temp = this.state.cache
    temp[this.state.date] = this.state.scores
    this.setState({ cache: temp })
  }
  cleanGameData(scores) {
    if (scores.game !== undefined) {
      if (scores.game[0] === undefined) {
        if (scores.game.linescore === undefined) {
          scores.game.linescore = {
            r: { away: '', home: '' },
            h: { away: '', home: '' },
            e: { away: '', home: '' },
            inning: { 0: { away: '', home: '' },
                      1: { away: '', home: '' },
                      2: { away: '', home: '' },
                      3: { away: '', home: '' },
                      4: { away: '', home: '' },
                      5: { away: '', home: '' },
                      6: { away: '', home: '' },
                      7: { away: '', home: '' },
                      8: { away: '', home: '' }
                    }
          }
        }
        return scores.game
      }
      else {
        scores.game.map((game) => {
          if (game.linescore === undefined) {
            game.linescore = {
              r: { away: '', home: '' },
              h: { away: '', home: '' },
              e: { away: '', home: '' },
              inning: { 0: { away: '', home: '' },
                        1: { away: '', home: '' },
                        2: { away: '', home: '' },
                        3: { away: '', home: '' },
                        4: { away: '', home: '' },
                        5: { away: '', home: '' },
                        6: { away: '', home: '' },
                        7: { away: '', home: '' },
                        8: { away: '', home: '' }
                      }
            }
          }
        })
      }
    }
  }
  render() {
    return <Mlb {...this.state} />
  }
}

export default MlbContainer
