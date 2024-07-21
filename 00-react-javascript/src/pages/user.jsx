import { useEffect, useState } from 'react'
import { notification, Table } from "antd"
import { getUserApi } from '../util/api';

const UserPage = () => {

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserApi();

   

      if(res.EC && res.EC !== 0 ){
        notification.error({message: "Error", description: res.EM});
      }else{
        setDataSource(res);
      }
    }

    fetchUserData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div style={{padding: 30}}>
      <Table 
        bordered 
        dataSource={dataSource} 
        columns={columns}
        rowKey={"_id"}
       />
    </div>
  )
}

export default UserPage