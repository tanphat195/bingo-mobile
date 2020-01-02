import { decode as atob, encode as btob } from 'base-64';

const rad: (x: number) => number = x => {
  return (x * Math.PI) / 180;
};

export const getDistance: (
  p1: { lat1: number; long1: number },
  p2: { lat2: number; long2: number },
  type?: 'M' | 'K',
) => number = ({ lat1, long1 }, { lat2, long2 }, type = 'M') => {
  const R = type === 'M' ? 6378137 : 6378137 / 1000; // Earth’s mean radius in meter
  const dLat = rad(lat2 - lat1);
  const dLong = rad(long2 - long1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};

export const converterDataURItoBlob = dataURI => {
  let byteString;
  let mimeString;
  let ia;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = encodeURI(dataURI.split(',')[1]);
  }
  // separate out the mime component
  mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};
