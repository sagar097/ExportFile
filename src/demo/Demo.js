import { Grid, Typography } from '@material-ui/core';
import AAD_logo from './AAD_logo.png'
import React from 'react';
// import { getFullGenderValue } from '../Webtool/webtoolUtils';
// import i18next from 'i18next';

// const MainLogo = require(`@/${process.env.REGISTRY_DASHBOARD_PAGE_LOGO_FILEPATH}`);

 function PdfDocument(props) {
    return (
        <div style={{ maxWidth: '200mm', marginLeft: '5mm', marginRight: '5mm' }}>
            <Grid style={{ width: '150px' }}>
                <img src={AAD_logo} alt='Logo' id='pdfLogo' />
            </Grid>
            <div id='pdfHeaderInfo'>
                <Grid
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '-25px'
                    }}
                >
                    <Grid>
                        {/* {props.PracticeName} */}
                        <Typography>Practice:abcd </Typography>
                    </Grid>
                    <Grid>
                      {/* {{props.Provider}} */}
                        <Typography>Provider:xyz </Typography>
                    </Grid>
                    <Grid>
                      {/* {{props.Visit}} */}
                        <Typography>Visit Date & Time:12/12/2800 </Typography>
                    </Grid>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid>
                      {/* {{props.Patient}} */}
                        <Typography>Patient:sdfg </Typography>
                    </Grid>
                    {/* {props.SelectedPatient.gender && ( */}
                        <Grid>
                            <Typography>
                                Gender:&nbsp;
                                Male
                                {/* {getFullGenderValue(props.SelectedPatient.gender)} */}
                            </Typography>
                        </Grid>
                    {/* )} */}
                    {/* {props.SelectedPatient.dob && ( */}
                        <Grid>
                          {/* {props.SelectedPatient.dob} */}
                            <Typography>Date of birth:&nbsp;12/12/4500</Typography>
                        </Grid>
                    {/* )} */}
                    {/* {props.SelectedPatient.emailid && ( */}
                        <Grid>
                          {/* {props.SelectedPatient.emailid} */}
                            <Typography>Email ID:&nbsp;abc@xyz.com</Typography>
                        </Grid>
                    {/* )} */}
                </Grid>
            </div>
            {props.data
                ? props.data.map((a, index) => {
                      return (
                          <Grid key={index} className='patient--details__container html-content'>
                              <Grid className='patient--details__content'>
                                  <Grid
                                      container
                                      className='patient--details__grid'
                                      style={{
                                          border: '0.5px solid lightgray',
                                          borderRadius: '5px',
                                          display: 'flex',
                                          marginBottom: '10px'
                                      }}
                                  >
                                      <Grid
                                          item
                                          xs
                                          className='measure-data--visit-number__container'
                                          style={{
                                              background: '#C62828',
                                              borderRadius: '5px 0 0 5px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              flexDirection: 'column',
                                              width: '50px',
                                              maxWidth: '200px',
                                              margin: '-0.5px'
                                          }}
                                      >
                                          <Typography
                                              variant='subheading'
                                              className='measure-data--visit-number__sub-header'
                                              style={{ color: 'white' }}
                                          >
                                              #{index + 1}
                                          </Typography>
                                      </Grid>
                                      <Grid
                                          item
                                          xs
                                          className='measure-data--visit-number__details'
                                          style={{ padding: '15px' }}
                                      >
                                          <Typography
                                              variant='title'
                                              className='measure-datar__title'
                                              style={{ color: '#4194F2', fontSize: '18px' }}
                                          >
                                              {a.DisplayName}
                                          </Typography>
                                          <Typography
                                              variant='body1'
                                              className='measure-data__sub-header'
                                              style={{
                                                  color: '#1D1D1D',
                                                  fontSize: '14px',
                                                  margin: '5px 0 5px 0'
                                              }}
                                          >
                                              {a.MeasureTitle}
                                          </Typography>
                                          <Typography
                                              variant='caption'
                                              className='measure-data__description-header'
                                              style={{ fontSize: '14px' }}
                                          >
                                              <Typography
                                                  variant='caption'
                                                  className='measure-data__description'
                                                  style={{ fontSize: '14px' }}
                                              >
                                                  {/* {i18next.t(
                                                      'Caregap.CaregapMeasureDetails.description'
                                                  )} */}
                                                  &nbsp;
                                                  {a.MeasureDescription}
                                              </Typography>
                                              <div
                                                  className='caregap--details--summary__container'
                                                  style={{
                                                      padding: 0,
                                                      margin: '10px 0',
                                                      width: '100%'
                                                  }}
                                                  dangerouslySetInnerHTML={{
                                                      __html: a.htmlText
                                                  }}
                                              />
                                          </Typography>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                      );
                  })
                : ''}
        </div>
    );
}

PdfDocument.defaultProps = {
  data: [
      {
        DisplayName: 'PDF',
        MeasureTitle:'data for pdf ',
        MeasureDescription:'sample pdf document implementation using jspdf'
      }
  ],
  clickHandlers: null
};

export default PdfDocument;