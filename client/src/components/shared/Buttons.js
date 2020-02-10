import React from 'react';
import { Container, Button, ButtonToolbar } from 'react-bootstrap';
import './Buttons.css';

/**
 * Buttons - creates component to display buttons on the app pages.
 * @param {Object} - props - an object with call back functions to use by buttons.
                   - plus showDataTableButton props which helps
                   - hide or show data table on the GeoData page.
 * @return {any} - a React component with Bootstrap buttons.
 */
const Buttons = (props) => {

  console.log('props in Buttons: ', props);

  return (
    <Container className="buttonContainer align-items-center">
      <h5 className="title">Click to remove / add data</h5>
      <ButtonToolbar className="justify-content-center button align-items-center">
        <Button
          className="button buttonImpressions size='sm' "
          onClick={props.onClickImpressions}
        >Impressions</Button>
        <Button
          className="button buttonRevenue size='sm'"
          onClick={props.onClickRevenue}
        >Revenue</Button>
        <Button
          className="button buttonClicks size='sm'"
          onClick={props.onClickClicks}
        >Clicks</Button>
        <Button
          className="button buttonEvents size='sm'"
          onClick={props.onClickEvents}
        >Events</Button>
        { props.showDataTableButton &&
          <Button
            className="button buttonMapTable size='sm'"
            onClick={props.onClickTable}
          >Data Table</Button>
        }
      </ButtonToolbar>
    </Container>
  )
};

export default Buttons;
