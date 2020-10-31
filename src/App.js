import { ToastContainer } from 'react-toastify';
import  Invoice from './modules/invoice';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Invoice />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
};

export default App;
