function Success() {
  return (
    <>
      <div className="card mx-auto my-5" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/02-lottie-tick-01-instant-2.gif"
              className=" img-fluid rounded-start"
              alt="success img alt"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-success">Success</h5>
              <p className="card-text"> Login Successful</p>
              <p className="card-text">
                <small className="text-muted text center">just now</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Success };
