import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { searchCities, getResultCity } from '../actions/all'
import _ from 'lodash'
import moment from "moment"
import PropTypes from 'prop-types';

import {Container, Row, Col, Card} from 'react-bootstrap'
import Autocomplete from 'react-autocomplete'
import { Loading } from '../components'

import './style.scss'

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Home = (props) => {
  const { 
    defaultCity, 
    searchCities, 
    listCities, 
    getResultCity, 
    dataCurrentCity, 
    loadingDataCity
  } = props

  const [searchString, setSearchString] = useState('')
  const forecastday = _.get(dataCurrentCity, 'forecast.forecastday') 

  useEffect(() => {
    getResultCity(defaultCity)
  }, [])

  const delayedSearch = useRef(_.debounce(text => searchCities(text || 'a'), 500)).current;

  const onChangeInputSearch = (e) => {
    const text = e.target.value
    setSearchString(text)
    delayedSearch(text);
  }

  const onSelectCity = (value, item) => {
    setSearchString(item.label)
    getResultCity(item.label)
  }
  
  return (
    <Container>
      <h1 className="text-center">Welcome</h1>
      <div className="input-search">
        <label>Search</label>
        <Autocomplete
          items={
            _.map(listCities, item => ({
              id: item.id,
              label: item.name,
              region: item.region
            }))
          }
          getItemValue={item => item.label}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              className="item-search"
            >
              {item.label}
            </div>
          }
          value={searchString}
          onChange={onChangeInputSearch}
          onSelect={onSelectCity}
        />
      </div>
      
      <div className="forecast">
        {loadingDataCity ?
          <Loading text="Loading ..." />
          : (
            <>
            <h3 className="pad-bot-10">{`Name: ${_.get(dataCurrentCity, 'location.name') || ''}`}</h3>
            <h3 className="pad-bot-10">{`Region: ${_.get(dataCurrentCity, 'location.region') || ''}`}</h3>
            {forecastday && forecastday.length > 0 ?
              <Row>
                {_.map(forecastday, item => (
                  <Col md={4} xs={6} key={item.date}>
                    <Card>
                      <Card.Body className="text-center">
                        <Card.Title className="pad-bot-20">{dayList[moment(item.date).day()]}</Card.Title>
                        <Card.Title>{`Max: ${_.get(item, 'day.maxtemp_c') || 'No data'}`}</Card.Title>
                        <Card.Title>{`Min: ${_.get(item, 'day.mintemp_c') || 'No data'}`}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            : (
              <h4>No data</h4>
            )}
            </>
          )}
      </div>
    </Container>
  )
}

Home.propTypes = {
  defaultCity: PropTypes.string, 
  searchCities: PropTypes.func,
  listCities: PropTypes.array,
  getResultCity: PropTypes.func,
  dataCurrentCity: PropTypes.object,
  loadingDataCity: PropTypes.bool
};

const mapStateToProps = ({ all, user }) => {
  return {
    defaultCity: all.toJS().defaultCity,
    dataCurrentCity: all.toJS().dataCurrentCity,
    listCities: all.toJS().listCities,
    loadingDataCity: all.toJS().loadingDataCity,
  }
}

export default connect(mapStateToProps, 
  {
    searchCities,
    getResultCity
  }
)(Home)
