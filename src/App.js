
//import GenerateReport from './screens/adminGenerateReport';
import IssueByStatusReport from './components/AdminGenerateReport/issue_by_status_report';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
    <div className="container">
     <IssueByStatusReport/>
    </div>
 </div>
  );
}
export default App;
