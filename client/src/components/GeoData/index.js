import React, { useState, useEffect } from 'react'
import axiosGet from '../shared/getData'
import { Container, Row, Col } from 'react-bootstrap'
import MapButtons from './MapButtons'
import GeoDataTable from './GeoDataTable'
import GeoDataMap from './GeoDataMap'
import useHideAddData from '../../hooks/useHideAddData'
import Error from '../shared/Error'
import './index.css'
import './MapButtons.css'

/**
 * GeoData - functional React component which displays buttons, table, and map on a page.
 * @return {any} - React component.
 */
const GeoData = () => {
  const URL = process.env.REACT_APP_API_ENDPOINT

  const [state, setState] = useState({
    poi: [],
    dataArrived: false,
    errorMessage: ''
  })

  // get data
  useEffect(() => {
    Promise.resolve(
      axiosGet(`${URL}/poi`)
    ).then(response => {
      console.log('response in Map: ', response);
      setState(prev => ({
        ...state,
        poiData: response.data,
        dataArrived: true
      }))
    }).catch((error) => {
        setState((prev) => ({ ...prev, errorMessage: error.response.data }))
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.response.data)
      })
  }, [])

  // we set and retrieve updated values here
  const {
    showImpressions,
    showRevenue,
    showClicks,
    showEvents,
    showLocations,
    showDataTable,
    hideAddData,
    selectDataOnMap
  } =
    useHideAddData({
      impressions: false,
      revenue: false,
      clicks: false,
      events: false,
      locations: true
    })

  // tell Buttons to show DataTable button.
  const showDataTableButton = true

  // constants used to show different data on the map.
  const SHOWIMPRESSIONS = 'showImpressions'
  const SHOWREVENUE = 'showRevenue'
  const SHOWCLICKS = 'showClicks'
  const SHOWEVENTS = 'showEvents'
  const SHOWDATATABLE = 'showDataTable'

  return (
    <Container>
      { state.errorMessage &&
        <Error errorMessage= { state.errorMessage }/>
      }
      { state.dataArrived &&
        !state.errorMessage &&
        <Row className='bttn-table'>
          <Col>
            <MapButtons
              showDataTableButton={ showDataTableButton }
              onClickImpressions={ () => selectDataOnMap(SHOWIMPRESSIONS) }
              onClickRevenue={ () => selectDataOnMap(SHOWREVENUE) }
              onClickClicks={ () => selectDataOnMap(SHOWCLICKS) }
              onClickEvents={ () => selectDataOnMap(SHOWEVENTS) }
              onClickTable={ () => hideAddData(SHOWDATATABLE) }
            />
          </Col>
          <Col>
            { showDataTable &&
              <GeoDataTable poiData={ state.poiData }/>
            }
          </Col>
        </Row>
      }
      <Row>
        { state.dataArrived &&
          !state.errorMessage &&
          <GeoDataMap
            poiData={ state.poiData }
            /* initially the map shows only locations. */
            showImpressions={ showImpressions }
            showRevenue={ showRevenue }
            showClicks={ showClicks }
            showEvents={ showEvents }
            showLocations={ showLocations }
          />
        }
      </Row>
    </Container>
  )
}

export default GeoData
