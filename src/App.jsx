import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import './App.css'
import SavedPalettes from './components/SavedPalettes';
import CreatePalette from './components/CreatePalette';


function App() {

  return (
    <Router>
      <div className='wrapper'>
          <aside>
            <nav>
              <NavLink to="/">
                <div className="nav-link">
                  <span className="material-symbols-outlined">library_add</span>
                  <span>Create</span>
                </div>
              </NavLink>
              <NavLink to="/saved">
                <div className="nav-link">
                  <span className="material-symbols-outlined">palette</span>
                  <span>Saved</span>
                </div>
              </NavLink>
            </nav>
          </aside>
          <section>
            <Routes>
              <Route path="/" element={<CreatePalette />} />
              <Route path="/saved" element={<SavedPalettes />} />
            </Routes>
          </section>
      </div>
    </Router>
  )
}

export default App
