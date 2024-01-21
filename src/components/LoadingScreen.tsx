import LoadingIndicator from './LoadingIndicator';

const LoadingScreen = () => {
  return (
    <div class="grid min-h-screen place-items-center bg-gradient-to-b from-indigo-500 to-indigo-100">
      <div class="h-12 w-12 [&>*]:h-full [&>*]:w-full">
        <LoadingIndicator />
      </div>
    </div>
  );
};

export default LoadingScreen;
