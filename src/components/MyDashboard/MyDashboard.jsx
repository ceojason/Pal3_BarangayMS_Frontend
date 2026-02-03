import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseImageSlider from '../base/BaseImageSlider/BaseImageSlider';
import BaseAccordion from '../base/BaseAccordion/BaseAccordion';
import QuickActions from '../QuickActions/QuickActions';

class MyDashboard extends Component {
  constructor(props) {
    super(props);
  }

  getMyDashboard = () => {
    return (
      <Fragment>
        {this.dashboardHdr()}
        {this.innerBody()}
      </Fragment>
    );
  };

  dashboardHdr = () => {
    const { SessionStore } = this.context.store;
    let currentUser = SessionStore.currentUser;

    return (
        <div className='body_container'>
          <div className='dashboard_hdr'>

            <div className='left_panel'>
              <div className='dashboard_display_system'>
                <span className='left_main_message'>
                  <i class="bi bi-house-door-fill"/>Welcome back, {currentUser.firstNm}!
                </span>
                <div className='user_badge'>
                  <span>{currentUser!=null ? currentUser.roleDscp : ''}</span>
                </div>
              </div>

              <div className='dashboard_notifs'>
                <span>
                  Manage your account, view announcement, and request barangay documents with eBarangayConnect!
                </span>
              </div>
            </div>

            <div className='right_panel'>
              <div className='dt_time_panel'>
                <span>
                  <i class="bi bi-calendar-event-fill"/>
                  Today is {currentUser.currentDtAndTime}
                </span>
              </div>
            </div>
          </div>
          <div className='dashboard_quick_actions'>
            <QuickActions />
          </div>
        </div>
    );
  };

  innerBody = () => {
    const { data } = this.props;

    return (
      <Fragment>
        <div className="dashboard container-fluid">
          <BaseAccordion
            data={data}
            header={"Today's Announcement Bulletin"}
            noContentMsg={'No announcement found.'}
          />
        </div>

        <div className='dashboard_img_aboutcity_ctr res_dashboard'>
          <div className='dashboard_img_aboutcity_hdr'>
            <span>
              <i class="bi bi-camera-fill"></i>Things About Our City
            </span>
          </div>
          <div className='dashboard_img_aboutcity_body'>
            <div className='grid_ctr'>
              <div className='col_one'>
                {/* <DashboardCalendar /> */}
                <div className='about_dasma_ctr'>
                  <div className='about_dasma_hdr'>
                    <span><i class="bi bi-buildings-fill"></i>Our Beloved City of Dasmariñas</span>
                  </div>

                  <div className='about_dasma_body'>
                    <span>
                      Dasmariñas, fondly called Dasma, is a vibrant and bustling city in Cavite, Philippines. Officially becoming a city on November 25, 2009, it has earned the title “University City of Cavite” for its thriving educational institutions and dynamic student life. Strategically linking Cavite to Metro Manila, Dasma has grown into a hub of commerce, culture, and progress.
                    </span>
                    <span>
                      Visitors and locals alike enjoy a rich mix of experiences, from shopping at Robinsons Place and SM City Dasmariñas to dining and nightlife along Aguinaldo Highway and Paliparan District. Families can unwind in the city’s parks and plazas, while history enthusiasts explore old churches and heritage sites that echo Dasma’s revolutionary past. Celebrated festivals like the Dasmariñas City Fiesta highlight the city’s deep Catholic roots and lively cultural spirit. With its booming commerce, expanding residential communities, and energetic student population, Dasmariñas stands as a city full of life, opportunity, and pride.
                    </span>
                    <div className='show_more_btn'>
                      <span className='show_more_label'>
                        <a href='https://cavite.gov.ph/home/cities-and-municipalities/city-of-dasmarinas/' target='_blank'>Show More</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col_two'>
                <BaseImageSlider />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return this.getMyDashboard();
  }
};

MyDashboard.contextType = StoreContext;

export default observer(MyDashboard);
