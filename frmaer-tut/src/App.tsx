
import AnimatedText from './components/animated';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const texts = ['Welcome to ExpenseEye', 'Track Your Expenses', 'Save Smartly', 'Spend Wisely'];

  return (
    <main className='mx-auto'>
      <section className=''>
        <p className='fs-2'>scroll down</p>
      </section>

      <section className=''>
        <AnimatedText text={texts} className='text-primary h1' repeatDelay={1000} /> {/* Adjust repeatDelay as needed */}
      </section>
    </main>
  );
}

export default App;
