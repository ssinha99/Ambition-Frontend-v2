import React from 'react'
import Avatar from '@mui/material/Avatar';

interface ICustomAvatar{
    name?: string
}


function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name?: string) {
  const arr = name && name?.split(' ')
  const firstNameFirstLetter = arr && arr[0][0];
  const secondNameFirstLetter = arr && arr[1] && arr[1][0];
  return {
    sx: {
      bgcolor: name != undefined ?  stringToColor(name) : 'U',
    },
    children: name != undefined ? `${firstNameFirstLetter}${secondNameFirstLetter}` : 'U',
  };
}

const  CustomAvatar: React.FC<ICustomAvatar> = ({name}) => {
    console.log(name)
  return (
      <Avatar {...stringAvatar(name)} sx={{ width: 56, height: 56 }}/>
  );
}

export default CustomAvatar
