import { useNavigate } from '@solidjs/router';
import Button from './components/Button';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav class="sticky top-0 flex h-[60px] items-center justify-between gap-12 bg-gray-600/75 px-4 backdrop-blur-sm">
      <h2 class="text-2xl font-bold">
        <a href="/">Jobos</a>
      </h2>
      <ul>
        <li>
          <a class="text-lg" href="#">
            Jobs
          </a>
        </li>
      </ul>
      <Button onClick={() => navigate('/login')}>Get Started</Button>
    </nav>
  );
};

export default Navbar;
