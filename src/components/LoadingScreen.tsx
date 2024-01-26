import LoadingIndicator from './LoadingIndicator';

const LoadingScreen = (props: any) => {
  return (
    <div class="grid min-h-screen place-items-center bg-gradient-to-b from-indigo-500 to-indigo-100">
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
