const Dashboard = (props) => {
  return (
    <div class="scrollbar-discreet h-screen max-h-screen overflow-y-auto">
      <div class="h-full">{props.children}</div>
    </div>
  );
};

export default Dashboard;
