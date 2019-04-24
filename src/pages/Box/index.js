import React, { useReducer, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import socket from 'socket.io-client';

import api, { baseURL } from '../../services/api';

import { MdInsertDriveFile } from 'react-icons/md';

import logo from '../../assets/logo.svg';
import './styles.css';

function reducer(box, action) {
  switch (action.type) {
    case 'ADD_FILE':
      return { ...box, files: [action.data, ...box.files] };
    case 'GET_BOX':
      return action.data;
    default:
      return box;
  }
}

const Box = props => {
  var [box, dispatchBox] = useReducer(reducer, {});

  function subscribeToNewFiles() {
    const boxId = props.match.params.id;
    const io = socket(baseURL);
    io.emit('connectRoom', boxId);
    io.on('file', data => {
      dispatchBox({ type: 'ADD_FILE', data: data });
    });
  }

  useEffect(() => {
    subscribeToNewFiles();
    async function fetchApi() {
      const boxId = props.match.params.id;
      const response = await api.get(`/boxes/${boxId}`);
      dispatchBox({ type: 'GET_BOX', data: response.data });
    }
    fetchApi();
  }, []);

  const handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const boxId = props.match.params.id;
      data.append('file', file);
      api.post(`/boxes/${boxId}/files`, data);
    });
  };

  return (
    <div id="box-container">
      <header>
        <img src={logo} alt="" />
        <h1>{box.title}</h1>
      </header>

      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className="upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste arquivos ou clique aqui</p>
          </div>
        )}
      </Dropzone>

      <ul>
        {box.files &&
          box.files.map(file => (
            <li key={file._id}>
              <a className="fileInfo" href={file.url} target="_blank">
                <MdInsertDriveFile size={24} color="#a5cfff" />
                <strong>{file.title}</strong>
              </a>
              <span>
                há {distanceInWords(file.createdAt, new Date(), { locale: pt })}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Box;
