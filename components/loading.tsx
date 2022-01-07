const Loading = ({ active, text }: { active: boolean, text: string }) => {
  return (
    <div style={{
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'backgroundColor': 'rgba(0, 0, 0, 0.7)',
      'zIndex': '1000',
      'display': active ? 'flex' : 'none',
      'flexDirection': 'column',
      'gap': '1rem',
      'alignItems': 'center',
      'justifyContent': 'center',
    }}>
      <div className="spinner"></div>
      <div className="spinner-text">{text}</div>
    </div>
  );
};

export default Loading;
