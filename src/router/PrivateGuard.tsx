import { useNavigate } from '@solidjs/router';
import { Show, createEffect, createResource } from 'solid-js';
import { getSession } from '../api/authentication';

const PrivateGuard = (props: any) => {
  const navigate = useNavigate();
  const [session] = createResource(getSession);

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
