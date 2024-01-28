import { useNavigate } from '@solidjs/router';
import { ParentComponent, Show, createEffect } from 'solid-js';
import { useSessionContext } from '../Provider';

const PrivateGuard: ParentComponent = (props) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();

  createEffect(() => {
    if (!session.loading && !session()) {
      navigate('/login', { replace: true });
      return;
    }
  });

  return (
    <Show when={!session.loading} fallback="Loading...">
      {props.children}
    </Show>
  );
};

export default PrivateGuard;
