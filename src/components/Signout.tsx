function Signout() {
  const onSignout = () => {
    localStorage.removeItem("user_id");
    window.location.reload();
  };

  return (
    <div
      style={{
        right: "10px",
        textAlign: "right",
      }}
    >
      <button
        type="button"
        className="btn btn-light"
        onClick={onSignout}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "5px 10px",
          fontSize: "1rem",
          fontWeight: "Bold",
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default Signout;
