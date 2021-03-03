import React, { useState, useEffect } from 'react';
import { Button, Input, Typography } from 'antd';
import Table from './Table';
import ModalView from './Modal';
import DataFetcher from './DataFetcher';

import { Data, SingleData } from './types';

const { Search } = Input;
const { Title } = Typography;

const App = () => {
  let [data, setData] = useState<Data>([]);
  let [filteredData, setFilteredData] = useState<Data>([]);
  let [searchValue, setSearchValue] = useState('');

  const initialModalData = {
    ID: '',
    Name: '',
    Email: '',
    Mobile: '',
  };
  let [openModal, setOpenModal] = useState('');
  let [modalReadOnly, setModalReadOnly] = useState<boolean>(false);
  let [modalData, setModalData] = useState<SingleData>(initialModalData);

  useEffect(() => {
    (async () => {
      let initialData: Data = await DataFetcher();
      setData(initialData);
    })();
  }, []);

  const onSearch = (value: string) => {
    let searchedData = data.filter((singleData) => {
      if (
        singleData.ID.toLowerCase().includes(value.toLowerCase()) ||
        singleData.Name.toLowerCase().includes(value.toLowerCase()) ||
        singleData.Email.toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setFilteredData(searchedData);
    setSearchValue(value);
  };
  const onAdd = () => {
    setOpenModal('Add');
    setModalReadOnly(false);
    setModalData(initialModalData);
  };
  const tableDispatch = (state: string, data: SingleData) => {
    switch (state) {
      case 'Detail':
        setOpenModal(state);
        setModalReadOnly(true);
        setModalData(data);
        break;
      case 'Edit':
        setOpenModal(state);
        setModalReadOnly(false);
        setModalData(data);
        break;
      case 'Delete':
        setOpenModal(state);
        setModalReadOnly(true);
        setModalData(data);
        break;
      default:
        setOpenModal('');
        setModalReadOnly(false);
        setModalData(initialModalData);
        break;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        padding: 25,
      }}
    >
      <div
        style={{
          height: 50,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title level={3}>List Employee</Title>

        <div
          style={{
            width: 600,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Search
            placeholder="Search by ID, name, or email"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 400 }}
          />
          <Button onClick={onAdd}>Add</Button>
        </div>
      </div>
      <Table
        data={searchValue.length !== 0 ? filteredData || [] : data}
        dispatch={tableDispatch}
      ></Table>

      {openModal && (
        <ModalView
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={modalData}
          readOnly={modalReadOnly}
        ></ModalView>
      )}
    </div>
  );
};

export default App;
