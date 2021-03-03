import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { SingleData } from './types';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 20, offset: 4 },
};

type Props = {
  openModal: string;
  setOpenModal: Function;
  data?: SingleData;
  readOnly?: boolean;
};

const ModalView = (props: Props) => {
  const { openModal, setOpenModal, data, readOnly } = props;
  const [form] = Form.useForm();

  console.log(form);
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      return values;
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const onModalClose = () => {
    setOpenModal('');
  };
  const onModalSubmit = async () => {
    let values = await onCheck();
    console.log(values);
    if (values) {
      // DO SOMETHING WITH THE VALUE
      setOpenModal('');
    }
  };
  let useFooter = {};
  if (readOnly && openModal !== 'Delete') useFooter = { footer: null };

  return (
    <Modal
      title={openModal + ' Employee'}
      visible={openModal.length > 0}
      onCancel={onModalClose}
      onOk={onModalSubmit}
      {...useFooter}
    >
      <Form form={form} name="Employee" initialValues={data} labelAlign="left">
        <Form.Item
          {...formItemLayout}
          name="ID"
          label="ID"
          rules={[
            {
              required: openModal !== 'Add',
              message: 'Please input your name',
            },
          ]}
          hidden={openModal === 'Add'}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="Name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="Email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              validator: async (_, Email: string) => {
                if (
                  !Email ||
                  !Email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  )
                ) {
                  return Promise.reject(new Error('Need to be a valid email'));
                }
              },
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="Mobile"
          label="Mobile"
          rules={[
            {
              required: true,
              message: 'Please input your mobile number',
            },
            {
              validator: async (_, Mobile: string) => {
                if (!Mobile || !Mobile.match(/^[0-9]*$/)) {
                  return Promise.reject(new Error('Need to be all number'));
                }
              },
            },
          ]}
        >
          <Input placeholder="Mobile" />
        </Form.Item>
        <Form.List
          name="Address"
          // rules={[
          //   {
          //     validator: async (_, Address) => {
          //       if (!Address || Address.length < 1) {
          //         return Promise.reject(new Error('At least 1 Address'));
          //       }
          //     },
          //   },
          // ]}
          children={(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Address' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input address or delete this field.',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Address" style={{ width: '90%' }} />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              {!readOnly && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add Address
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              )}
            </>
          )}
        />
      </Form>
      {readOnly && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0)',
            // backgroundColor: 'red',
            width: 'calc(100% - 48px)',
            height: 'calc(100% - 48px)',
            top: 0,
          }}
        ></div>
      )}
    </Modal>
  );
};

export default ModalView;
