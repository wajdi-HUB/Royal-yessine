import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Classnames from 'classnames';
import { UpdateProfile, GetProfile, GetProfileById } from "../redux/actions/profileActions";
import { useNavigate } from "react-router-dom";

function UpdateProfiles() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state => state.errors);
  const profiles = useSelector(state => state.profiles);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProfile(form, setShow, setMessage));
  };

  useEffect(() => {
    dispatch(GetProfileById());
  }, [dispatch]);

  useEffect(() => {
    setForm(profiles.profile);
  }, [profiles.profile]);

  return (
    <div className="container p-4 mt-4">
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i>
            <h2>Update Profile</h2>
          </div>
          <div
            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              {/* Form inputs */}
              <div className="mb-3">
                <label className="form-label">Telephone</label>
                <input
                  type="text"
                  className={Classnames("form-control", { "is-invalid": errors.tel })}
                  name="tel"
                  value={form?.tel || ""}
                  onChange={onChangeHandler}
                />
                {errors.tel && <div className="invalid-feedback">{errors.tel}</div>}
              </div>
              {/* Other form inputs */}
              {/* ... */}

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Update <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/profiles")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfiles;
