import React, { useState } from 'react';
import { Table, Button } from 'antd';

import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';
import { Data, SingleData } from './types';
type Props = {
  data: Data;
  dispatch: Function;
};

let TableView = (props: Props) => {
  let [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const { data, dispatch } = props;
  const dataWithKey = data.map((singleData, index) => ({
    ...singleData,
    key: String(index),
  }));

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<SingleData> | SorterResult<SingleData>[],
    extra: TableCurrentDataSource<SingleData>,
  ) {
    console.log('params', pagination, filters, sorter, extra);
    setPagination(pagination);
  }

  const columns: ColumnsType<SingleData> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      sorter: (a, b) => a.ID.localeCompare(b.ID),
      width: 120,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
      sorter: (a, b) => a.Mobile.localeCompare(b.Mobile),
    },
    {
      title: 'Action',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                dispatch('Detail', record);
              }}
            >
              Detail
            </Button>
            <Button
              onClick={() => {
                dispatch('Edit', record);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                dispatch('Delete', record);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: 250,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataWithKey}
      onChange={onChange}
      pagination={{
        ...pagination,
        hideOnSinglePage: false,
        position: ['bottomCenter'],
        showSizeChanger: true,
      }}
      
    />
  );
};

export default TableView;
