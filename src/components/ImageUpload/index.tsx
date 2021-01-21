import {Constants} from "@/utils/constants";
import {Upload} from "antd";
import React, {useState} from "react";
import {PlusOutlined,LoadingOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/lib/upload/interface";

export type ImageUploadProps = {
  callback: (url: string) => void;
  show?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({callback,show}) =>{

  const [uploading,setUploading] = useState<boolean>(false);

  const change=({file}: UploadChangeParam)=>{
    const {status,response} = file;
    if(status==='done'){
      setUploading(false)
      if(response.code===200){
        callback(response.data);
      }
    }else if(status==='uploading'){
      setUploading(true);
    }else{
      setUploading(false)
    }
  }

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{uploading ? "上传中" : "上传"}</div>
    </div>
  );
  return (
    <Upload
      action={Constants.uploadUrl}
      accept='image/png, image/jpeg'
      data={{
        token:localStorage.getItem("token")
      }}
      name='file'
      listType="picture-card"
      showUploadList={false}
      onChange={change}
    >
      {show ? uploadButton : null}
    </Upload>
  )
}

export default ImageUpload;
