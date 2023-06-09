import React from "react";
import { useDispatch } from "react-redux";
import { DeleteProfile, UpdateProfile } from "../redux/actions/profileActions";
import { useNavigate } from 'react-router-dom';

function RowDetails({_id, user, tel, city, country, bio}) {
   const dispatch =  useDispatch()
   const navigate = useNavigate();
    const DeleteHandler = (id)=>{
      dispatch(DeleteProfile(id))
    }
    const UpdateHandler= ()=>{
      navigate(`/updateProfile/${_id}`);
    }
  return (
    <tr>
      <th>{user.name}</th>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{tel}</td>
      <td>{city}</td>
      <td>{country}</td>
      <td>{bio}</td>
      <td>
        <td>
        <button class="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
        </td>
        <td>
        <button class="btn btn-outline-warning" onClick={()=>UpdateHandler()}>update</button></td>
      </td>
    </tr>
  );
}

export default RowDetails;
