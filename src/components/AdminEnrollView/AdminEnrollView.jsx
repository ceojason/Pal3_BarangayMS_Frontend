import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import { Col, Row } from 'react-bootstrap';
import CollapsiblePortlet from '../base/CollapsiblePortlet/CollapsiblePortlet';

class AdminEnrollView extends Component {
  constructor(props) {
    super(props);
  }

  getAdminEnrollView = () => {
    const { data, isView, isConfirm, isAck } = this.props;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          <CollapsiblePortlet
            headerData={data.adminFullNm}
            headerDataLabel={'System Administrator Information'}
            buttonLabel={'Enrollment Details'}
            showPanel={true}>
              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Gender'}
                    value={data.genderDscp}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Birthday'}
                    value={data.bdayDscp}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Home Address'}
                    value={data.homeAddress}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Mobile Number'}
                    value={data.mobileNo}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Email Address (DepEd Provided)'}
                    value={data.emailAddress}
                  />
                </Col>
              </Row>
          </CollapsiblePortlet>
        </ViewPortlet>
      </Fragment>
    );
  };

  render() {
    return this.getAdminEnrollView();
  };
};

AdminEnrollView.contextType = StoreContext;

export default observer(AdminEnrollView);
