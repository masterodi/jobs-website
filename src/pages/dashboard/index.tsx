const Dashboard = (props) => {
  return (
    <div class="h-screen border border-cyan-500">
      <div class="h-full bg-cyan-500">{props.children}</div>
    </div>
  );
};

export default Dashboard;
