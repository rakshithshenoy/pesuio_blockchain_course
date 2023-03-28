import logo from "./images/logo192.png";
import Card from "./Card";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

function App() {
  return (
    <div className="App">
      <div className="container main">
        <p>Hello, welcome to Blockchain class</p>
        <img src={logo}></img>
        <Card
          cardImage={img1}
          title="Mountains"
          description="These are green mountains"
          price="1000"
        />
        <Card
          cardImage={img2}
          title="Car"
          description="Very fast car"
          price="20000"
        />
        <Card
          cardImage={img3}
          title="people"
          description="pink theme"
          price="3000"
        />
        
      </div>
    </div>
  );
}

export default App;
