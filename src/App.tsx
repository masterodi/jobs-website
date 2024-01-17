import Navbar from './Navbar';

function App(props: any) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}

export default App;
