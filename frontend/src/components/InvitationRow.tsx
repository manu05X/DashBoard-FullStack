import React from "react";
import Profile from "assets/profile-6.png";

export function InvitationRow(props: any) {
  const { info, onSelectMember, checked } = props;
  return (
    <label className='app-checkbox flex items-center gap-x-3'>
      <img className='h-8 w-8 rounded-full' src={info.profilePic} />
      <span className='flex-1'>{info.fname} {info.lname}</span>
      <input checked={checked} onChange={event => onSelectMember(event.target.checked, info._id)} type='checkbox' />
    </label>
  );
}
