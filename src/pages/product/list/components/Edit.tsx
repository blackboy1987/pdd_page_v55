import {Drawer} from 'antd';
import React, {useEffect, useState} from 'react';
import {queryDetail} from "@/pages/product/list/service";

type ChangeTitleProps = {
  visible: boolean;
  recordIds: number[];
  currentId: number;
  close: () => void;
};

const Edit: React.FC<ChangeTitleProps> = ({ visible,recordIds,currentId,close }) => {

  const [values,setValues] = useState<{[key: string]: any}>({});

  const loadData = async () =>{
    console.log(currentId);
    const result = await queryDetail({
      id: currentId,
    });
    setValues(result.data);
  }

  useEffect(()=>{
    loadData();
  },[])
  return (
    <Drawer
      width={window.innerWidth-180}
      destroyOnClose
      maskClosable={false}
      visible={visible}
      onClose={close}
      title={`${values.name}`}
    >
      sdafa
    </Drawer>
  );
};

export default Edit;
