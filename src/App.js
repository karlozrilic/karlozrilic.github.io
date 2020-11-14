import './App.css';
import './MobileApp.css';

function App() {
  return (
    <>
      <header className="container">
        <div className="row">
          <div className="border-bottom border-left border-right header col-md-12">
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <a className="logo" href="/"><img className="img-responsive" src={process.env.PUBLIC_URL + '/images/logo.png'} height="90" title="ZrilicH" alt="ZrilicH" /></a>
              </div>
              <nav className="navbar col-md-offset-4 col-md-8 col-sm-offset-1 col-sm-11 hidden-xs">
                <ul className="header-links">
                  <li className="header-link"><a href="#" className="active-link">Home</a></li>
                  <li className="header-link"><a href="#">Projects</a></li>
                  <li className="header-link"><a href="#">About</a></li>
                  <li className="header-link"><a href="#">Contact</a></li>
                </ul>
              </nav>
            </div>    
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center padding-top">
            <h1 className="border-bottom">Web developer</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
