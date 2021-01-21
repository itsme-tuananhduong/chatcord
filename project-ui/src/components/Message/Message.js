function Message({ username, text, time }) {
  return (
    <div className="message">
      <p className="meta">
        {username} <span>{time}</span>
      </p>
      <p className="text">{text}</p>
    </div>
  );
}

export default Message;
