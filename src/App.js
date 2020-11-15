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
                <a className="logo" href="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} height="90" title="ZrilicH" alt="ZrilicH" /></a>
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
            <h1 className="border-bottom h1">Web developer</h1>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row py-4" style={{backgroundColor: "#b8b8b8"}}>
          <div className="col-lg-8">
            <img className="img-responsive main-position" src={process.env.PUBLIC_URL + '/images/comp-mockup.png'} width="498" />
            <img className="hidden-xs phone-img" src={process.env.PUBLIC_URL + '/images/phone-mockup.png'} width="94" />
          </div>
          <div className="col-lg-4 sm-text-center">
            <div className="recent-project">
              <h1>Most recent project</h1>
              <p>Truth or Drink Web app and Android app</p>
            </div>
            <div className="recent-project-links">
              <a href="https://github.com/karlozrilic/truth_or_drink" target="_blank" className="btn github-btn">Github <div className="github-btn-icon"><i class="far fa-caret-circle-right"></i></div></a>
              <a href="https://play.google.com/store/apps/details?id=com.truthordrinkzrilich" target="_blank" className="btn github-btn">Google Play <div className="github-btn-icon"><i class="fab fa-google-play"></i></div></a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-4">
          <p>Sample text</p>
        </div>
      </div>
    </>
  );
}

export default App;
