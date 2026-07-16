const DashboardCard = ({ title, value, type = "" }) => {
  return (
    <div className={`stat-card ${type}`}>
      <h3>{title}</h3>
      <div className="value">{value}</div>
    </div>
  );
};

export default DashboardCard;
