import { useNavigate } from '@solidjs/router';
import { ParentComponent, Show, children, createEffect } from 'solid-js';
import { useSessionContext } from '../Provider';

const GuardNoSession: ParentComponent = (props) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const chldrn = children(() => props.children);

  createEffect(() => {
    if (!session.loading && !!session()) {
      navigate('/dashboard', { replace: true });
    }
  });

  return (
    <Show when={!session.loading} fallback="Loading...">
      {chldrn()}
    </Show>
  );
};

export default GuardNoSession;
