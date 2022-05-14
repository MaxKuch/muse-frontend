import { Form, Upload } from "antd"
import { InboxOutlined } from '@ant-design/icons'
import { Rule } from "antd/lib/form"

const normFile = (e: any) => { 
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
}
  
export interface UploadDraggeProps {
    label: string;
    disabled?: boolean;
    rules?: Rule[] | undefined,
    name: string;
    accept: string;
    help?: string;
}

const UploadDragger:React.FC<UploadDraggeProps> = ({ label, disabled = false, rules, name, accept, help }) => {
  return (
    <Form.Item 
        label={''}
        rules={rules} 
        name={name} 
        valuePropName="fileList" 
        getValueFromEvent={normFile}
        help={help}
    >
        <Upload.Dragger accept={accept} beforeUpload={() => false} disabled={disabled} className='upload-dragger'>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">{label}</p>
        </Upload.Dragger>
    </Form.Item>
  )
}

export default UploadDragger