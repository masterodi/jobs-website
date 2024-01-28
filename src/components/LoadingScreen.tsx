import { ParentComponent } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

const LoadingScreen: ParentComponent = (props) => {
  return (
    <div class="grid min-h-screen place-items-center bg-gradient-to-b from-primary-500 to-primary-100">
      <div>
        <div class="mx-auto h-12 w-12 [&>*]:h-full [&>*]:w-full">
          <LoadingIndicator />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default LoadingScreen;
