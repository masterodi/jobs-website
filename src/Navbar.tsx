import { useNavigate } from '@solidjs/router';
import { BiRegularStats } from 'solid-icons/bi';
import { FiBriefcase, FiHome, FiInbox, FiMenu, FiSettings, FiTriangle } from 'solid-icons/fi';
import { Show } from 'solid-js';
import { useMenu, useSessionContext } from './Provider';
import { signOutUser } from './api/authentication';
import Button from './components/Button';
import Drawer from './components/Drawer';

const Navbar = () => {
  const navigate = useNavigate();
  const { session, refetch } = useSessionContext();
  const { isOpen: isMenuOpen, setOpen: setIsMenuOpen, toggle: toggleMenu } = useMenu();

  const signOut = async () => {
    await signOutUser();
    await refetch();
  };

  return (
    <>
      <nav class="sticky top-0 z-30 flex h-[60px] items-center justify-between gap-12 bg-transparent px-4 backdrop-blur-md">
        <div class="flex items-center gap-8">
          <h2 class="title-4">
            <a href="/">Jobbler</a>
          </h2>
        </div>
        <div>
          <Show when={session()}>
            <Button variant="text" onClick={toggleMenu}>
              <FiMenu />
            </Button>
          </Show>
        </div>
      </nav>

      <Show when={session()}>
        <Drawer side="right" open={isMenuOpen()} setOpen={setIsMenuOpen}>
          <div class="p-2">
            <ul>
              <li>
                <Button href="/dashboard" fluid variant="text" color="neutral" icon={<FiHome />}>
                  Home
                </Button>
              </li>
              <li>
                <Button href="/dashboard/inbox" fluid variant="text" color="neutral" icon={<FiInbox />}>
                  Inbox
                </Button>
              </li>
              <li>
                <Button href="/dashboard/jobs" fluid variant="text" color="neutral" icon={<FiBriefcase />}>
                  Jobs
                </Button>
              </li>
              <li>
                <Button href="/dashboard/applies" fluid variant="text" color="neutral" icon={<FiTriangle />}>
                  Applies
                </Button>
              </li>
              <li>
                <Button href="/dashboard/statistics" fluid variant="text" color="neutral" icon={<BiRegularStats />}>
                  Statistics
                </Button>
              </li>
              <li>
                <Button href="/dashboard/settings" fluid variant="text" color="neutral" icon={<FiSettings />}>
                  Settings
                </Button>
              </li>
              <li>
                <Button fluid variant="text" color="primary" onClick={signOut}>
                  Sign Out
                </Button>
              </li>
            </ul>
          </div>
        </Drawer>
      </Show>
    </>
  );
};

export default Navbar;
