import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import socket from 'socket.io-client';

import api, { baseURL } from '../../services/api';

import { MdInsertDriveFile } from 'react-icons/md';

import logo from '../../assets/logo.svg';
import './styles.css';

const Box = props => {
  const [box, setBox] = useState({});

  const subscribeToNewFiles = () => {
    const box = props.match.params.id;

    const io = socket(baseURL);

    io.emit('connectRoom', box);

    io.on('file', data => {
      setBox({
        ...box,
        files: [data, ...box.files]
      });
    });
  };

  // Use Effects with no dependencies is equal to component did Mount
  useEffect(async () => {
    subscribeToNewFiles();
    const boxId = props.match.param.id;
    const response = await api.get(`/boxes/${boxId}`);
    setBox(response.data);
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
