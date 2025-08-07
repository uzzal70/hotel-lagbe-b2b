// src/routes/DashboardRoutes.jsx

import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Pages/Dashboard';
import Layouts from '../components/Layout/Layouts';
import BookingHistory from '../components/BookingHistory/BookingHistory';
import HotelBookingList from '../components/Hotel/BookingList/HotelBookingList';
import FlightResult from '../components/Dashboard/FlightResults/FlightResult';
import InsuranceResult from '../components/Insurance/InsuranceResult';
import InsurancDetails from '../components/Insurance/InsurancDetails';
import FlightInformation from '../components/Dashboard/FlightInformation/FlightInformation';
import GroupFareFetch from '../components/GroupFare/GroupFareFetch';
import CreditHistory from '../components/Deposit/CreditHistory';
import PartialPayment from '../components/BookingHistory/PartialPayment/PartialPayment';
import ManualBookingList from '../components/BookingHistory/ManualBookingList';
import Deposit from '../components/Pages/Deposit';
import NotFound from '../components/NotFound';
import Response from '../components/Deposit/Response';
import Transaction from '../components/Deposit/Transaction';
import DepositRequest from '../components/Deposit/DepositRequest';
import BankList from '../components/Deposit/BankList';
import MFSList from '../components/Deposit/MFSList';
import ESimLists from '../components/Sim/ESimLists';
import InsuranceList from '../components/Insurance/InsuranceList';
import Reward from '../components/Pages/Reward';
import EventMain from '../components/Event/EventMain';
import Support from '../components/Support';
import SimSearchResultGetData from '../components/Sim/SimSearchResultGetData';
import ReviewPurchase from '../components/Sim/ReviewPurchase';
import SimOrder from '../components/Sim/SimOrder';
import HotelSearchResult from '../components/Hotel/HotelSearchResult';
import HotelDetails from '../components/Hotel/HotelDetails';
import ReviewHotelBooking from '../components/Hotel/ReviewHotelBooking';
import HotelBookingDetails from '../components/Hotel/BookingDetails/HotelBookingDetails';
import HotelGuestNameChange from '../components/Hotel/HotelGuestNameChange';
import VoidQuotation from '../components/BookingHistory/Void/VoidQuotation';
import RefundHistory from '../components/BookingHistory/Refund/RefundHistory';
import RefundQuotation from '../components/BookingHistory/Refund/RefundQuotation';
import ReissueHistory from '../components/BookingHistory/Reissue/ReissueHistory';
import ReissueQuotation from '../components/BookingHistory/Reissue/ReissueQuotation';
import StatusRequest from '../components/BookingHistory/StatusRequest';
import VoidHistory from '../components/BookingHistory/Void/VoidHistory';
import GroupFareHistory from '../components/BookingHistory/GroupFareHistory';
import InsuranceInformation from '../components/Insurance/InsuranceInformation';
import InsuranceBookingDetails from '../components/Insurance/InsuranceBookingDetails';
import TransactionHistory from '../components/TransactionHistory/TransactionHistory';
import SalesReport from '../components/TransactionHistory/SalesReport';
import Travellar from '../components/Pages/Travellar';
import AddTravellar from '../components/Travellar/AddTravellar';
import Tutorial from '../components/Tutorial';
import MyProfile from '../components/Account/MyProfile';
import AddStaff from '../components/Staff/AddStaff';
import Staff from '../components/Pages/Staff';
import PrivateRoute from './PrivateRoute';
import BookingDetails from '../components/BookingDetails/BookingDetails';
import PdfFetchData from '../components/BookingDetails/PDF/PdfFetchData';
import PNRImportDetails from '../components/Dashboard/PNRImport/PNRImportDetails';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Dashboard />} />

        {/* Flight  */}
        <Route path="search" element={<FlightResult />} />
        <Route path="passengerinformation" element={<FlightInformation />} />

        <Route path="allbooking" element={<BookingHistory />} />
        <Route path="bookinghistory" element={<BookingHistory />} />
        <Route path="manualbooking-list" element={<ManualBookingList />} />
        <Route path="groupfare" element={<GroupFareFetch />} />
        <Route path="saleshistory" element={<GroupFareHistory />} />

        <Route path="bookingdetails/:id" element={<BookingDetails />} />
        <Route path="request/:status/:id" element={<StatusRequest />} />
        <Route path="download/:id" element={<PdfFetchData />} />
        <Route path="pnrimportdetails" element={<PNRImportDetails />} />

        <Route path="void" element={<VoidHistory />} />
        <Route path="voidquotation" element={<VoidQuotation />} />
        <Route path="refund" element={<RefundHistory />} />
        <Route path="refundquotation" element={<RefundQuotation />} />

        <Route path="reissue" element={<ReissueHistory />} />
        <Route path="reissuequotation" element={<ReissueQuotation />} />

        {/* production label marge on component  */}
        {/* <Route
          path="reissueflightsearch"
          element={<ReissueFlightSearchLoad />}
        /> */}

        {/* <Route path="quotationprocess" element={<QuotationProcess />} />
        <Route path="quotationdetails" element={<QuotationDetails />} /> */}

        {/* Hotel  */}
        <Route path="hotelbookinglist" element={<HotelBookingList />} />
        <Route path="hotel">
          <Route index element={<HotelSearchResult />} />
          <Route
            path=":id/:traceId/:roomsNumber/:startDate/:endDate/:adult/:child/:nationality"
            element={<HotelDetails />}
          />
          <Route
            path="review"
            element={<ReviewHotelBooking />}
          />
          <Route
            path="confirm-hotel/:id/:hotelId"
            element={<HotelBookingDetails />}
          />
          <Route
            path="confirm-hotel/:id/:hotelId/guest-name-change"
            element={<HotelGuestNameChange />}
          />
        </Route>

        {/* Deposit  */}
        <Route path="deposit" element={<Deposit />} />
        <Route path="mobilebankinglist" element={<MFSList />} />
        <Route path="banklist" element={<BankList />} />
        <Route path="depositreq" element={<DepositRequest />} />
        <Route path="deposithistory" element={<Transaction />} />
        <Route path="payment/:message?" element={<Response />} />
        <Route path="emergencycredit" element={<CreditHistory />} />
        <Route path="partial" element={<PartialPayment />} />
        <Route path="transactionhistory" element={<TransactionHistory />} />
        <Route path="salesreport" element={<SalesReport />} />

        {/* Traveller  */}
        <Route path="travellar" element={<Travellar />} />
        <Route path="addtravellar" element={<AddTravellar />} />

        {/* Sim  */}
        <Route path="sim">
          <Route index element={<SimSearchResultGetData />} />
          <Route path=":id" element={<ReviewPurchase />} />
          <Route path="order/:id" element={<SimOrder />} />
        </Route>
        <Route path="esimhistory" element={<ESimLists />} />

        {/* Insurance  */}
        <Route path="insurance" element={<InsuranceResult />} />
        <Route path="insurancehistory" element={<InsuranceList />} />
        <Route path="insurancedetails" element={<InsurancDetails />} />
        <Route path="insuranceinformation" element={<InsuranceInformation />} />
        <Route
          path="insurancebookingdetails/:id"
          element={<InsuranceBookingDetails />}
        />

        <Route path="tutorial" element={<Tutorial />} />
        <Route path="reward" element={<Reward />} />
        <Route path="event" element={<EventMain />} />
        <Route path="support" element={<Support />} />

        <Route element={<PrivateRoute roles={['AGENT']} />}>
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="staff" element={<Staff />} />
          <Route path="addstaff" element={<AddStaff />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
