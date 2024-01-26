import LoadingIndicator from './LoadingIndicator';

const LoadingScreen = (props: any) => {
  return (
    <div class="from-primary-500 to-primary-100 grid min-h-screen place-items-center bg-gradient-to-b">
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
