import "./App.css";

function App() {
  return (
    <>
      <div className="calculator">
        <div className="display">5 874</div>
        <div className="keysContainer">
          <div className="keys grey">C</div>
          <div className="keys grey">
            <span>
              <sup>&#43;</sup>/<sub>&minus;</sub>
            </span>
          </div>
          <div className="keys grey">%</div>
          <div className="keys orange">&divide;</div>
          <div className="keys">7</div>
          <div className="keys">8</div>
          <div className="keys">9</div>
          <div className="keys orange">&times;</div>
          <div className="keys">4</div>
          <div className="keys">5</div>
          <div className="keys">6</div>
          <div className="keys orange">&minus;</div>
          <div className="keys">1</div>
          <div className="keys">2</div>
          <div className="keys">3</div>
          <div className="keys orange">&#43;</div>
          <div className="keys zero">0</div>
          <div className="keys">,</div>
          <div className="keys orange">&#61;</div>
        </div>
      </div>
    </>
  );
}

export default App;
