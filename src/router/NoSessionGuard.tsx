import { useNavigate } from '@solidjs/router';
import { Show, createEffect } from 'solid-js';
import { useSessionContext } from '../Provider';

const NoSessionGuard = (props: any) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();

  createEffect(() => {
    if (!session.loading && session()) {
      navigate('/', { replace: true });
      return;
    }
  });

  return (
    <Show when={!session.loading} fallback="Loading...">
      {props.children}
    </Show>
  );
};

export default NoSessionGuard;
