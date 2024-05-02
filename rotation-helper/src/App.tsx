import React from 'react';
import logo from './logo.svg';
import './App.css';
import CourtComponent from './components/CourtComponent';
import Button from '@mui/material/Button';
import html2canvas from "html2canvas";

function App() {

  //TODO: drag and drop players from sidelines to court
  //TODO: link standby player types with their on-court replacements
  //    cont: standby link should also indicate serve or no serve
  //    cont: with special consideratoin for liberos, who can swap out for another player type


  //TODO: design idea: make rotation state retreivable based on team name/unique identifier
  //-> mongoDB connection, or make it simple username/password profile access
  function exportRotation(): void {
    const rotation = document.getElementById("court-widget")!;
    exportAsImage(rotation, "rotation.png")

  }

  //from https://blog.logrocket.com/export-react-components-as-images-html2canvas/#what-is-html2-canvas
  async function exportAsImage(el:HTMLElement, imageFileName:string) {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  }; 

  function downloadImage(blob:string, fileName:string){
    const fakeLink = window.document.createElement("a");
    
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <div className="App">
      <h2>
        Rotation Tool
      </h2>
      <CourtComponent />
      <Button onClick={exportRotation}>
        Screenshot Mode
      </Button>
      {
        /*
        Introduce serve/receive view toggle
        */
      }
    </div>

  );
}

export default App;
