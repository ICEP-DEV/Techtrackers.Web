import StaffHeader from '../Navigation/StaffHeader';
import SideBar from '../Navigation/Sidebar';


function StaffNavs({Children}) {

    return (
        <div className="app-navigation scrollable-container">
            
          <StaffHeader />

          <SideBar />
          {Children}
        </div>
    )
};

export default StaffNavs;